<?php
/**
 * Enquiry / quote request handler for cPanel hosting.
 *
 * The static site posts here either as JSON (JavaScript enabled) or as a normal
 * form post (JavaScript disabled). Every field is validated here, mirroring
 * src/lib/enquiry-schema.ts; the browser's validation is only for convenience.
 *
 * Configuration (never commit real values):
 *   1. A PHP file OUTSIDE the web root, two levels above this script
 *      (e.g. /home/<cpanel-user>/vc-enquiry-config.php), returning an array:
 *        <?php return [
 *          'to'      => 'enquiries@valuationcertificates.com.au',
 *          'from'    => 'no-reply@valuationcertificates.com.au',
 *          'origins' => ['https://valuationcertificates.com.au', 'https://www.valuationcertificates.com.au'],
 *        ];
 *   2. Or environment variables ENQUIRY_TO, ENQUIRY_FROM, ENQUIRY_ALLOWED_ORIGINS
 *      (comma-separated).
 * Mail is sent with PHP mail(), which on cPanel goes through the server's MTA.
 * Enable SPF and DKIM for the sending domain in cPanel > Email Deliverability.
 */

declare(strict_types=1);

const MAX_BODY_BYTES = 32768;
const RATE_LIMIT_MAX = 5;          // submissions...
const RATE_LIMIT_WINDOW = 600;     // ...per 10 minutes per IP
const MIN_FILL_SECONDS = 3;        // faster than this is almost certainly a bot

const SERVICES = [
    'Building Insurance Valuation (Aust. wide)',
    'External Combustible Cladding Clearance Certificates',
    '10 Year Capital Works Fund Plan (NSW)',
    'WHS (Safety) Report (NSW, QLD, SA, ACT, WA)',
    '10 Year Sinking Fund Plan (ACT, QLD, SA)',
    'OHS (Safety) Report (VIC)',
    '10 Year Reserve Plan (WA)',
    'Common Property Life Cycle Maintenance Report',
    '10 Year Maintenance Fund Plan (VIC)',
    'Asbestos Report (Register + Management Plan)',
];
const PREFERENCES = ['Call back', 'Email back'];

const GENERIC_ERROR = "Sorry, we couldn't send your request just now. Please try again, or call us on 1300 107 280.";

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: same-origin');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false
    || stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Method not allowed.'], $wantsJson);
}

$config = load_config();
if ($config['to'] === '' || $config['from'] === '') {
    error_log('enquiry: mail recipient or sender is not configured');
    respond(500, ['ok' => false, 'message' => GENERIC_ERROR], $wantsJson);
}

// Cross-site request check. There are no cookies or sessions, but this stops
// other websites from using the form as a mail relay.
if (!origin_allowed($config['origins'])) {
    respond(403, ['ok' => false, 'message' => GENERIC_ERROR], $wantsJson);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'message' => GENERIC_ERROR], $wantsJson);
}

$input = $wantsJson && stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false
    ? json_decode($raw, true)
    : parse_form($raw);
if (!is_array($input)) {
    respond(400, ['ok' => false, 'message' => GENERIC_ERROR], $wantsJson);
}

// Honeypot: real visitors never see this field. Pretend success so bots move on.
if (trim(str_value($input['website'] ?? '')) !== '') {
    respond(200, ['ok' => true], $wantsJson);
}

$startedAt = str_value($input['startedAt'] ?? '');
if ($startedAt !== '' && ctype_digit($startedAt)) {
    $elapsed = time() - intdiv((int) $startedAt, 1000);
    if ($elapsed < MIN_FILL_SECONDS) {
        respond(400, ['ok' => false, 'message' => 'Please take a moment to check your details, then send again.'], $wantsJson);
    }
}

if (!rate_limit_ok(client_ip())) {
    respond(429, ['ok' => false, 'message' => 'Too many requests. Please wait a few minutes, or call us on 1300 107 280.'], $wantsJson);
}

[$data, $errors] = validate($input);
if ($errors) {
    respond(422, ['ok' => false, 'message' => 'Please check the highlighted fields.', 'errors' => $errors], $wantsJson);
}

if (!send_mail($config, $data)) {
    error_log('enquiry: mail() returned false');
    respond(502, ['ok' => false, 'message' => GENERIC_ERROR], $wantsJson);
}

respond(200, ['ok' => true], $wantsJson);

// ---------------------------------------------------------------------------

/** @return array{to:string,from:string,origins:string[]} */
function load_config(): array
{
    $file = dirname(__DIR__, 2) . '/vc-enquiry-config.php';
    $cfg = is_file($file) ? (array) (include $file) : [];
    $origins = $cfg['origins'] ?? array_filter(array_map('trim', explode(',', (string) getenv('ENQUIRY_ALLOWED_ORIGINS'))));
    return [
        'to' => trim((string) ($cfg['to'] ?? getenv('ENQUIRY_TO') ?: '')),
        'from' => trim((string) ($cfg['from'] ?? getenv('ENQUIRY_FROM') ?: '')),
        'origins' => array_values(array_map(fn ($o) => rtrim((string) $o, '/'), (array) $origins)),
    ];
}

/** @param string[] $allowed */
function origin_allowed(array $allowed): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '' && !empty($_SERVER['HTTP_REFERER'])) {
        $p = parse_url($_SERVER['HTTP_REFERER']);
        if (isset($p['scheme'], $p['host'])) {
            $origin = $p['scheme'] . '://' . $p['host'] . (isset($p['port']) ? ':' . $p['port'] : '');
        }
    }
    if ($origin === '') {
        return false;
    }
    if ($allowed) {
        return in_array(rtrim($origin, '/'), $allowed, true);
    }
    // No list configured: accept only this server's own host.
    $host = $_SERVER['HTTP_HOST'] ?? '';
    return $host !== '' && parse_url($origin, PHP_URL_HOST) === explode(':', $host)[0];
}

/** Parses application/x-www-form-urlencoded, keeping repeated keys as arrays. */
function parse_form(string $raw): array
{
    $out = [];
    foreach (explode('&', $raw) as $pair) {
        if ($pair === '') {
            continue;
        }
        [$k, $v] = array_pad(explode('=', $pair, 2), 2, '');
        $k = urldecode($k);
        $v = urldecode($v);
        if (str_ends_with($k, '[]')) {
            $k = substr($k, 0, -2);
        }
        if (array_key_exists($k, $out)) {
            $out[$k] = array_merge((array) $out[$k], [$v]);
        } else {
            $out[$k] = $v;
        }
    }
    // Checkbox groups are arrays even with one selection.
    if (isset($out['services']) && !is_array($out['services'])) {
        $out['services'] = [$out['services']];
    }
    return $out;
}

function str_value(mixed $v): string
{
    return is_string($v) ? $v : (is_int($v) || is_float($v) ? (string) $v : '');
}

/** Collapses whitespace (including newlines) and trims, like the client schema. */
function single_line(mixed $v): string
{
    $s = str_value($v);
    if (!mb_check_encoding($s, 'UTF-8')) {
        return '';
    }
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    return trim(preg_replace('/\s+/u', ' ', $s) ?? '');
}

/** @return array{0:array<string,mixed>,1:array<string,string>} */
function validate(array $in): array
{
    $e = [];
    $d = [];

    $services = $in['services'] ?? [];
    $services = is_array($services) ? array_values(array_unique(array_map('str_value', $services))) : [];
    if (!$services) {
        $e['services'] = 'Please choose at least one service.';
    } elseif (array_diff($services, SERVICES)) {
        $e['services'] = 'Please choose from the listed services.';
    }
    $d['services'] = $services;

    $fields = [
        'name' => [100, true, 2, 'Please enter your name.'],
        'phone' => [30, true, 1, 'Please enter a phone number.'],
        'email' => [254, true, 1, 'Please enter a valid email address.'],
        'address' => [200, true, 5, 'Please enter the property address.'],
        'lots' => [6, false, 0, ''],
        'strataPlan' => [100, false, 0, ''],
        'managerName' => [100, false, 0, ''],
        'managerCompany' => [100, false, 0, ''],
    ];
    foreach ($fields as $key => [$max, $required, $min, $msg]) {
        $v = single_line($in[$key] ?? '');
        if (mb_strlen($v) > $max) {
            $e[$key] = "Please keep this under {$max} characters.";
        } elseif ($required && mb_strlen($v) < $min) {
            $e[$key] = $msg;
        }
        $d[$key] = $v;
    }

    if (!isset($e['phone']) && !preg_match('/^\+?[0-9 ()-]{8,}$/', $d['phone'])) {
        $e['phone'] = 'Please enter a valid phone number.';
    }
    if (!isset($e['email']) && !filter_var($d['email'], FILTER_VALIDATE_EMAIL)) {
        $e['email'] = 'Please enter a valid email address.';
    }
    if (!isset($e['lots']) && $d['lots'] !== '' && (!ctype_digit($d['lots']) || (int) $d['lots'] < 1)) {
        $e['lots'] = 'Please enter a whole number above zero.';
    }

    $instructions = str_value($in['instructions'] ?? '');
    $instructions = mb_check_encoding($instructions, 'UTF-8') ? $instructions : '';
    $instructions = trim(str_replace(["\r\n", "\r"], "\n", $instructions));
    $instructions = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $instructions) ?? '';
    if (mb_strlen($instructions) > 2000) {
        $e['instructions'] = 'Please keep this under 2000 characters.';
    }
    $d['instructions'] = $instructions;

    $pref = str_value($in['preference'] ?? '');
    if (!in_array($pref, PREFERENCES, true)) {
        $e['preference'] = 'Please choose how we should reply.';
    }
    $d['preference'] = $pref;

    return [$d, $e];
}

function client_ip(): string
{
    // REMOTE_ADDR only: X-Forwarded-For is client-controlled unless a trusted proxy sets it.
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** File-based fixed-window limiter; good enough for a single cPanel server. */
function rate_limit_ok(string $ip): bool
{
    $dir = sys_get_temp_dir() . '/vc-enquiry-rl';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return true; // fail open rather than block genuine enquiries
    }
    $file = $dir . '/' . hash('sha256', $ip . '|' . __FILE__) . '.json';
    $fh = @fopen($file, 'c+');
    if ($fh === false) {
        return true;
    }
    flock($fh, LOCK_EX);
    $now = time();
    $state = json_decode((string) stream_get_contents($fh), true);
    $hits = array_values(array_filter(
        is_array($state) ? $state : [],
        fn ($t) => is_int($t) && $t > $now - RATE_LIMIT_WINDOW
    ));
    $ok = count($hits) < RATE_LIMIT_MAX;
    if ($ok) {
        $hits[] = $now;
    }
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);
    return $ok;
}

function send_mail(array $config, array $d): bool
{
    $lines = [
        'New enquiry from valuationcertificates.com.au',
        '',
        'Services:',
        ...array_map(fn ($s) => "  - {$s}", $d['services']),
        '',
        "Name: {$d['name']}",
        "Phone: {$d['phone']}",
        "Email: {$d['email']}",
        "Property address: {$d['address']}",
        'Number of lots: ' . ($d['lots'] !== '' ? $d['lots'] : '-'),
        "Preferred reply: {$d['preference']}",
        '',
        'Strata plan no: ' . ($d['strataPlan'] ?: '-'),
        'Strata manager: ' . ($d['managerName'] ?: '-'),
        'Strata management company: ' . ($d['managerCompany'] ?: '-'),
        '',
        'Special instructions:',
        $d['instructions'] !== '' ? $d['instructions'] : '-',
    ];
    $body = implode("\r\n", $lines);

    // Header values are built only from validated config and a validated email
    // address (single_line() already removed CR/LF), so header injection is not possible.
    $headers = [
        'From: Valuation Certificates website <' . $config['from'] . '>',
        'Reply-To: ' . $d['email'],
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: valuationcertificates-enquiry',
    ];
    $subject = '=?UTF-8?B?' . base64_encode('Quote request: ' . mb_substr($d['address'], 0, 80)) . '?=';

    if (getenv('ENQUIRY_DRY_RUN') === '1') {
        return true; // used by automated tests; never set in production
    }
    return mail($config['to'], $subject, $body, implode("\r\n", $headers), '-f' . $config['from']);
}

function respond(int $status, array $payload, bool $json): never
{
    http_response_code($status);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    if ($payload['ok'] ?? false) {
        header('Location: /thank-you/', true, 303);
        exit;
    }
    // No-JavaScript fallback: a minimal page explaining the problem.
    header('Content-Type: text/html; charset=utf-8');
    $msg = htmlspecialchars((string) ($payload['message'] ?? GENERIC_ERROR), ENT_QUOTES, 'UTF-8');
    $items = '';
    foreach (($payload['errors'] ?? []) as $err) {
        $items .= '<li>' . htmlspecialchars((string) $err, ENT_QUOTES, 'UTF-8') . '</li>';
    }
    echo '<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex"><title>We could not send your request</title>'
        . '<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;color:#0b1f33}a{color:#0b7263}</style></head><body>'
        . '<h1>We could not send your request</h1><p>' . $msg . '</p>' . ($items ? "<ul>{$items}</ul>" : '')
        . '<p><a href="/quote-request/">Go back to the form</a> or call <a href="tel:1300107280">1300 107 280</a>.</p></body></html>';
    exit;
}
