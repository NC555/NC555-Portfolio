import React from "react";
import PortfolioList from "@/components/admin/portfolio/portfolio-list";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";
import { PortfolioProject } from "@/types/portfolio";

// Make the page component async to fetch data on the server
export default async function AdminPortfolioPage() {
  // Fetch portfolio projects on the server
  const initialProjects: PortfolioProject[] = await getPortfolioPosts();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1">
        <div className="items-center">
          {/* Pass the fetched data to the Client Component */}
          <PortfolioList initialProjects={initialProjects} />
        </div>
      </div>
    </div>
  );
}