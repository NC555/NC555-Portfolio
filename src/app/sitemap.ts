import type { MetadataRoute } from "next";
import appConfig from "@/data/appConfig.json";

export const dynamic = "force-static";

const siteURL = appConfig.siteURL;

function mapPostsToSitemap(
  posts: { metadata: { publishedAt: string }; slug: string }[],
  prefix: string
) {
  return posts.map((post) => ({
    url: `${siteURL}/${prefix}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  let routes = ["", "/resume", "/portfolio", "/post", "/gallery"].map(
    (route) => ({
      url: `${siteURL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes];
}
