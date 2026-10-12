Reference snapshot of https://www.biv.com.au
Captured 2026-10-12 from a local machine (Python/urllib crawler, Chrome user agent).
Site is WordPress + BeTheme theme (CSS under www.biv.com.au/wp-content/themes/betheme/).

LAYOUT
  www.biv.com.au/<path>/index.html   rendered HTML for each page
  www.biv.com.au/wp-content/...      theme CSS, fonts, icons, and uploaded images
  www.biv.com.au/sitemap.xml, wp-sitemap*.xml, robots.txt
  wp-api-pages.json                  WP REST API dump of all 15 pages (/wp-json/wp/v2/pages?per_page=100):
                                     clean title/content HTML per page, handy for copying text

PAGES CAPTURED (15, matches wp-sitemap-posts-page-1.xml exactly)
  https://www.biv.com.au/
  https://www.biv.com.au/about-us/
  https://www.biv.com.au/services/biv/
  https://www.biv.com.au/services/sfp/
  https://www.biv.com.au/services/whs/
  https://www.biv.com.au/services/asb/
  https://www.biv.com.au/testimonials/
  https://www.biv.com.au/building-insurance-valuation/
  https://www.biv.com.au/sinking-fund-plans/
  https://www.biv.com.au/work-health-and-safety/
  https://www.biv.com.au/asbestos-reports/
  https://www.biv.com.au/contact-us/
  https://www.biv.com.au/quote-request/
  https://www.biv.com.au/legal/
  https://www.biv.com.au/services/

UPLOADED IMAGES (all 8 referenced by any page/CSS were captured)
  www.biv.com.au/wp-content/uploads/2018/04/UEV-IMG_9964.jpg
  www.biv.com.au/wp-content/uploads/2018/04/ar.png
  www.biv.com.au/wp-content/uploads/2018/04/biv-icon.png
  www.biv.com.au/wp-content/uploads/2018/04/biv-logo-2.png
  www.biv.com.au/wp-content/uploads/2018/04/biv.png
  www.biv.com.au/wp-content/uploads/2018/04/gaussian-blur2.jpg
  www.biv.com.au/wp-content/uploads/2018/04/m-sfp.png
  www.biv.com.au/wp-content/uploads/2018/04/whs.png

ASSETS: 95 files under wp-content (theme CSS, fonts, images, plugin CSS).

FAILED
  https://www.biv.com.au/sitemap_index.xml  -> 404 (does not exist; site uses /wp-sitemap.xml, captured)

SKIPPED ON PURPOSE
  All .js files (jQuery, BeTheme scripts, Contact Form 7 JS), RSS feeds, per-page /wp-json/ oEmbed endpoints.
  ?p=<id> shortlinks were fetched but deleted: each is a duplicate of a page above.
  No videos or files over 5 MB were found.
