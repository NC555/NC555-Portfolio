import type { MetadataRoute } from "next";
import appConfig from "@/data/appConfig.json";

const { siteURL } = appConfig;

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Basic rules configuration that's always included
  const baseConfig: MetadataRoute.Robots = {
    rules: [
      {
        userAgent: "*",
      },
    ],
  };

  // Only include sitemap and host when siteURL has a value
  if (siteURL) {
    return {
      ...baseConfig,
      sitemap: `${siteURL}/sitemap.xml`,
      host: siteURL,
    };
  }

  return baseConfig;
}
