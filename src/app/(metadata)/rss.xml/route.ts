import { NextResponse } from "next/server";
import RSS from "rss";
import { getBlogPosts } from "@/lib/db/v1/post";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";
import config from "@/data/appConfig.json";

const { title, description, author, siteURL, openGraph } = config;
const { images } = openGraph;
const { url } = images[0];
const imageUrl = url;

export async function GET() {
  const feed = new RSS({
    title: title,
    description: description,
    site_url: siteURL,
    feed_url: `${siteURL}/rss.xml`,
    language: "en-US",
    image_url: imageUrl,
  });

  let posts = await getBlogPosts();

  for (const post of posts) {
    let { title, publishedAt, summary } = post.metadata;

    feed.item({
      title,
      url: `${siteURL}/post/${post.slug}`,
      publishedAt,
      description: summary,
      author: author,
    });
  }

  let projects = await getPortfolioPosts();

  for (const project of projects) {
    let { title, publishedAt, summary } = project.metadata;

    feed.item({
      title,
      url: `${siteURL}/portfolio/${project.slug}`,
      publishedAt,
      description: summary,
      author: author,
    });
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
