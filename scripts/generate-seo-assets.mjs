import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../src/config.js";
import { buildAbsoluteUrl, getSeoEntries } from "./seo-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildSitemapXml = (entries) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(buildAbsoluteUrl(entry.path))}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /
Disallow: /saved

Sitemap: ${SITE_URL}/sitemap.xml
`;

const run = async () => {
  const entries = await getSeoEntries();
  const sitemap = buildSitemapXml(entries);

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
  await fs.writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
