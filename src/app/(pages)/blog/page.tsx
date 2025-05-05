import { Suspense } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import FilterSelectBox from "@/components/filter/filter-select-box";
import FilterList from "@/components/filter/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import { getBlogPosts } from "@/lib/db/v1/post";
const blogConfig = require("@/data/blogConfig.json");

export const metadata = {
  title: `Post | ${blogConfig.metaTitle}`,
  description: blogConfig.metaDescription,
};
const POSTS_PER_PAGE = blogConfig.postPerPage;

type BlogQueryParams = { tag?: string; page?: string };

async function BlogPosts({
  searchParams,
}: {
  searchParams: BlogQueryParams | Promise<BlogQueryParams>;
}) {
  // Resolve searchParams if it's a Promise
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : searchParams;
  // Explicitly access searchParams properties
  const tag = resolvedParams?.tag ?? "All";
  const page = resolvedParams?.page ?? "1";
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
      <FilterList path="blog" selectedTag={selectedTag} blogTags={blogTags} />
      <FilterSelectBox
        path="blog"
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
                  src={post.metadata.banner || "/placeholder.jpg"}
                  alt={post.metadata.alt || "Blog post image"}
                  width={960}
                  height={540}
                  loading="eager"
                  priority
                  placeholder="blur"
                  blurDataURL="https://docs.digital-hero.com/images/NC555.png"
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
        basePath="/blog"
      />
    </section>
  );
}

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default function Post({ searchParams }: BlogPageProps) {
  return (
    <article>
      <PageHeader header={blogConfig.header} />
      <Suspense fallback={<Loading />}>
        <BlogPosts searchParams={searchParams} />
      </Suspense>
    </article>
  );
}
