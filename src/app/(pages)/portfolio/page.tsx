import Image from "next/image";
import PageHeader from "@/components/page-header";
import FilterSelectBox from "@/components/filter/filter-select-box";
import FilterList from "@/components/filter/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";
import config from "@/data/appConfig.json";
import { LuEye } from "react-icons/lu";

const { title } = config;
const POSTS_PER_PAGE = 9;

export const metadata = {
  title: `Portfolio | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

type PortfolioQueryParams = Promise<{ tag?: string; page?: string }>;

export default async function Portfolio({
  searchParams,
}: {
  searchParams: PortfolioQueryParams;
}) {
  const { tag = "All", page = "1" } = await searchParams;

  const allPortfolioPosts = await getPortfolioPosts();
  const blogTags = [
    "All",
    ...Array.from(
      new Set(allPortfolioPosts.map((post) => post.metadata.category ?? "")),
    ),
  ];
  const selectedTag = tag;
  const currentPage = parseInt(page, 10);

  // Filter blogs based on the selected tag
  const filteredPortfolioPosts =
    selectedTag === "All"
      ? allPortfolioPosts
      : allPortfolioPosts.filter(
          (post) => post.metadata.category === selectedTag,
        );

  // Calculate total pages
  const totalPages = Math.ceil(filteredPortfolioPosts.length / POSTS_PER_PAGE);

  // Get blogs for current page
  const paginatedPortfolioPosts = filteredPortfolioPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <article>
      <PageHeader header="Nati's Portfolio" />
      <section className="projects">
        <FilterList
          path="portfolio"
          selectedTag={selectedTag}
          blogTags={blogTags}
        />
        <FilterSelectBox
          path="portfolio"
          selectedTag={selectedTag}
          blogTags={blogTags}
        />
        <ul className="project-list">
          {paginatedPortfolioPosts.map((post) => (
            <li
              key={post.slug}
              className="project-item active"
              data-category={post.metadata.category}
            >
              <ProgressBarLink
                href={`/portfolio/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <LuEye />
                  </div>
                  <Image
                    src={post.metadata.banner}
                    alt={post.metadata.alt || "Portfolio post image"}
                    width={960}
                    height={540}
                    priority
                    placeholder="blur"
                    loading="eager"
                    quality={50}
                    blurDataURL="https://docs.digital-hero.com/images/cover-with-NC555-com.png"
                  />
                </figure>
                <h3 className="project-title">
                  <MarkdownRenderer content={post.metadata.title} />
                </h3>
                <p className="project-category">{post.metadata.category}</p>
              </ProgressBarLink>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          selectedTag={selectedTag}
          basePath="/portfolio"
        />
      </section>
    </article>
  );
}
