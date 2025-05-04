import React from "react";
import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import PageHeader from "@/components/page-header";
import Comments from "@/components/comments";
import { PostData } from "@/types/post";
import { LuFacebook, LuTwitter } from "react-icons/lu";
import config from "@/data/appConfig.json";
import blogConfig from "@/data/blogConfig.json";

const { giscusConfig: rawGiscusConfig } = config;
const giscusConfig = {
  ...rawGiscusConfig,
  repo: rawGiscusConfig.repo as `${string}/${string}`,
  mapping: rawGiscusConfig.mapping as "pathname",
  reactionsEnabled: rawGiscusConfig.reactionsEnabled as "1" | "0",
  emitMetadata: rawGiscusConfig.emitMetadata as "1" | "0",
  inputPosition: rawGiscusConfig.inputPosition as "top" | "bottom",
  loading: rawGiscusConfig.loading as "lazy" | "eager",
  theme: rawGiscusConfig.theme as
    | "light"
    | "dark"
    | "dark_dimmed"
    | "dark_high_contrast"
    | "dark_protanopia"
    | "dark_deuteranopia"
    | "dark_tritanopia"
    | "light_high_contrast"
    | "light_protanopia"
    | "light_deuteranopia"
    | "light_tritanopia"
    | "transparent_dark"
    | "preferred_color_scheme",
};

interface BlogPostViewProps {
  post: PostData;
  enableMath?: boolean;
  isAdminPreview?: boolean; // Add prop to distinguish between admin preview and public view
}

const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  enableMath = false,
  isAdminPreview = false,
}) => {
  // Basic date formatting for display
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const shareUrl = isAdminPreview
    ? "#"
    : `https://www.NC555.com/post/${post.slug}`;
  const shareText = "Check out this post:";

  return (
    <div>
      <article>
        <section className="blog-text">
          {/* Blog Header */}
          <header>
            <h1 className="relative pb-[7px] mb-[30px] font-semibold text-3xl text-light-gray after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[3px] after:rounded-sm after:bg-text-gradient-yellow sm:pb-[15px] sm:after:w-[40px] sm:after:h-[5px] md:pb-[20px]">
              {blogConfig.header}
            </h1>
          </header>

          <div className="w-[100%]">
            {/* Title */}
            <h2 className="font-semibold text-3xl text-white-2">
              <MarkdownRenderer content={post.title || "Untitled Post"} />
            </h2>

            {/* Metadata and Sharing */}
            <div className="flex items-center justify-between mt-4 text-sm w-full text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <span>{formattedDate}</span>
                {post.category && (
                  <>
                    <span
                      className="w-1 h-1 bg-current rounded-full"
                      aria-hidden="true"
                    ></span>
                    <span>{post.category}</span>
                  </>
                )}
              </div>
              {!isAdminPreview && (
                <div className="flex items-center space-x-2 ml-4">
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-yellow-crayola transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <LuFacebook className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-yellow-crayola transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <LuTwitter className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="separator"></div>

            {/* Content */}
            <div className="text-light-gray">
              <MarkdownRenderer
                content={post.content || "No content"}
                enableMath={enableMath}
              />
            </div>
          </div>
        </section>
      </article>

      {/* Comments Section - Only for public view */}
      {!isAdminPreview && (
        <article style={{ marginTop: "1rem" }}>
          <section className="blog-text">
            <PageHeader header="Comments" />
            <Comments giscusConfig={giscusConfig} />
          </section>
        </article>
      )}
    </div>
  );
};

export default BlogPostView;
