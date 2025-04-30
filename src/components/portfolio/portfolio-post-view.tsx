import React from "react";
import Image from "next/image";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import PageHeader from "@/components/page-header";
import { PortfolioData } from "@/types/portfolio";

interface PortfolioPostViewProps {
  project: PortfolioData;
  isAdminPreview?: boolean; 
}

const PortfolioPostView: React.FC<PortfolioPostViewProps> = ({ project, isAdminPreview = false }) => {
  // Basic date formatting for display
  const formattedDate = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div>
      <article>
        <section className="blog-text">
          {/* Portfolio Header */}
          <PageHeader header="Nati's Portfolio" />
          
          {/* Title */}
          <h1 className="title font-semibold text-2xl font-text-2xl tracking-tighter max-w-[650px] text-light-gray">
            <MarkdownRenderer content={project.title || "Untitled Project"} />
          </h1>
          
          {/* Metadata */}
          <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
            <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
              <span>{formattedDate}</span>
              {project.category && (
                <>
                  <span className="w-1 h-1 bg-current rounded-full" aria-hidden="true"></span>
                  <span>{project.category}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Summary */}
          {project.summary && (
            <div className="mb-4 max-w-[650px] text-light-gray">
              <MarkdownRenderer content={project.summary} />
            </div>
          )}
          
          {/* Content */}
          <div className="prose max-w-[650px] text-light-gray">
            {project.content ? (
              <MarkdownRenderer content={project.content} />
            ) : (
              <p className="text-gray-500 italic">No content provided.</p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default PortfolioPostView;