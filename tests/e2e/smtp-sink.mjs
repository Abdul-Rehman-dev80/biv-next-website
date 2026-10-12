// A tiny SMTP server for end-to-end tests. It accepts any message and appends
// it to the file named by SMTP_SINK_FILE so tests can assert the email arrived.
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createServer } from "node:net";

const port = Number(process.env.SMTP_SINK_PORT ?? 2525);
const file = process.env.SMTP_SINK_FILE ?? ".e2e/smtp-sink.jsonl";
mkdirSync(path.dirname(file), { recursive: true });
writeFileSync(file, "");

createServer((socket) => {
  let data = false;
  let message = "";
  let buffer = "";
  const reply = (line) => socket.write(`${line}\r\n`);
  reply("220 sink ESMTP");
  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    let idx;
    while ((idx = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      if (data) {
        if (line === ".") {
          data = false;
          appendFileSync(file, JSON.stringify({ message }) + "\n");
          message = "";
          reply("250 OK queued");
        } else message += line.replace(/^\./, "") + "\n";
        continue;
      }
      const cmd = line.slice(0, 4).toUpperCase();
      if (cmd === "EHLO") reply("250-sink\r\n250 AUTH PLAIN LOGIN");
      else if (cmd === "HELO") reply("250 sink");
      else if (cmd === "AUTH") reply("235 Authentication successful");
      else if (cmd === "DATA") {
        data = true;
        reply("354 End data with <CR><LF>.<CR><LF>");
      } else if (cmd === "QUIT") {
        reply("221 Bye");
        socket.end();
      } else reply("250 OK");
    }
  });
  socket.on("error", () => {});
}).listen(port, "127.0.0.1", () => console.log(`SMTP sink on ${port}`));
