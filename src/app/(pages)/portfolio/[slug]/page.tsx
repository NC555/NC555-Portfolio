import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import PortfolioPostView from "@/components/portfolio/portfolio-post-view";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";

import "@/styles/blog/blog-text.css";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let posts = await getPortfolioPosts();
  let post = posts.find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    banner,
  } = post.metadata;
  let ogImage = banner
    ? `https://digital-hero.com${banner}`
    : `https://digital-hero.com/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      siteName: "Nati Cabti - Digitial Hero | Open Source Enthusiast",
      description,
      type: "article",
      publishedTime,
      url: `https://digital-hero.com/portfolio/${post.slug}`,
      locale: "en_US",
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  noStore();
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let daysLater: number = 0;
  if (targetDate > currentDate) {
    daysLater = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  if (daysLater > 365) {
    return `${fullDate} (${daysLater}d later)`;
  } else if (daysLater > 30) {
    const weeksAgo = Math.floor(daysLater / 7);
    return `${fullDate} (${weeksAgo}w later)`;
  } else if (daysLater > 7) {
    const monthsAgo = Math.floor(daysLater / 30);
    return `${fullDate} (${monthsAgo}mo later)`;
  } else if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export default async function Portfolio(props: { params: tParams }) {
  const { slug } = await props.params;
  let posts = await getPortfolioPosts();
  let post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <PortfolioPostView
      project={{
        title: post.metadata.title,
        publishedAt: post.metadata.publishedAt,
        summary: post.metadata.summary,
        category: post.metadata.category || "",
        banner: post.metadata.banner,
        alt: post.metadata.alt || "",
        image: post.metadata.image || "",
        content: post.content,
      }}
    />
  );
}
