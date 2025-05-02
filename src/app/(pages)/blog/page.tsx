import { Suspense } from "react";
import Image from "next/image";
// Replace Balancer with a simple span
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import FilterSelectBox from "@/components/filter/filter-select-box";
import FilterList from "@/components/filter/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { getBlogPosts } from "@/lib/db/v1/post";

// Fetch blog configuration data
const blogConfig = require("@/data/blogConfig.json");

export const metadata = {
  title: `Post | ${blogConfig.metaTitle}`,
  description: blogConfig.metaDescription,
};

type BlogQueryParams = { tag?: string; page?: string };

async function BlogPosts({ searchParams }: { searchParams: BlogQueryParams }) {
  // Explicitly access searchParams properties
  const tag = searchParams?.tag ?? "All";
  const page = searchParams?.page ?? "1";
  let allBlogs = await getBlogPosts();
  const blogTags = [
    "All",
    ...Array.from(
      new Set(allBlogs.map((post) => post.metadata.category ?? ""))
    ),
  ];
  const selectedTag = tag;
  const currentPage = parseInt(page, 10);

  // Filter blogs based on the selected tag
  const filteredBlogs =
    selectedTag === "All"
      ? allBlogs
      : allBlogs.filter((post) => post.metadata.category === selectedTag);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  // Get blogs for current page
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="blog-posts">
      <FilterList path="post" selectedTag={selectedTag} blogTags={blogTags} />
      <FilterSelectBox
        path="post"
        selectedTag={selectedTag}
        blogTags={blogTags}
      />
      <ul className="blog-posts-list">
        {paginatedBlogs.map((post) => (
          <li
            key={post.slug}
            className="blog-post-item active"
            data-category={post.metadata.category}
          >
            <ProgressBarLink
              href={`/blog/${post.slug}`}
              rel="noopener noreferrer"
              className="blog-headers"
            >
              <figure className="blog-banner-box">
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || "Blog post image"}
                  width={1600}
                  height={900}
                  priority={false}
                  placeholder="blur"
                  loading="eager"
                  blurDataURL="https://docs.digital-hero.com/images/cover-with-NC555-com.png"
                />
              </figure>
              <div className="blog-content">
                <div className="blog-meta">
                  <p className="blog-category">{post.metadata.category}</p>
                  <span className="dot"></span>
                  <time dateTime={post.metadata.publishedAt}>
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-us",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                </div>
                <h3 className="text-2xl text-white-2 font-semibold leading-[1.3] transition-all hover:text-orange-yellow-crayola">
                  <span>
                    <MarkdownRenderer content={post.metadata.title} />
                  </span>
                </h3>
                <MarkdownRenderer
                  className="text-light-gray text-s font-light leading-6 overflow-hidden line-clamp-2"
                  content={post.metadata.summary}
                />
              </div>
            </ProgressBarLink>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        selectedTag={selectedTag}
        basePath="/post"
      />
    </section>
  );
}

export default function Post({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <article>
      <PageHeader header={blogConfig.header} />
      <Suspense fallback={<Loading />}>
        <BlogPosts searchParams={searchParams} />
      </Suspense>
    </article>
  );
}
