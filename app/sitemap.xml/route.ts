import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const sitemapPath = join(process.cwd(), "public", "sitemap.xml");
  const xml = await readFile(sitemapPath, "utf8");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
