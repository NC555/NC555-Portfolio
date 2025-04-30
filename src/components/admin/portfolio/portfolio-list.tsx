'use client';

import React, { useState } from "react";
import { PortfolioProject, PortfolioData, PortfolioListProps } from "@/types/portfolio";
import PortfolioEditor from "./portfolio-editor";

export default function PortfolioList({ initialProjects }: PortfolioListProps) {
  // Use state to manage the data of the project being edited, or null for list view
  const [editingProjectData, setEditingProjectData] = useState<PortfolioData | null>(null);
  // Initialize projects state with the prop data
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);

  const handleCreateNew = () => {
    setEditingProjectData({
      title: "",
      publishedAt: new Date().toISOString().split('T')[0], // Default to current date YYYY-MM-DD
      summary: "",
      category: "",
      banner: "",
      alt: "",
      image: "",
      content: "",
      // slug is optional in PortfolioData and will be generated on save for new projects
    });
  };

  const handleEditProject = (slug: string) => {
    // Find the PortfolioProject data and transform it to PortfolioData
    const projectToEdit = projects.find(project => project.slug === slug);
    if (projectToEdit) {
      setEditingProjectData({
        title: projectToEdit.metadata.title,
        publishedAt: projectToEdit.metadata.publishedAt,
        summary: projectToEdit.metadata.summary,
        category: projectToEdit.metadata.category || "",
        banner: projectToEdit.metadata.banner,
        alt: projectToEdit.metadata.alt || "",
        image: projectToEdit.metadata.image || "",
        content: projectToEdit.content,
        slug: projectToEdit.slug, // Include slug for editing existing projects
      });
    } else {
      console.error("Project not found for editing:", slug);
      // Optionally show an error message to the user
    }
  };

  const handleSaveProject = async (data: PortfolioData) => {
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project via API');
      }

      const result = await response.json();
      // Refresh the projects list
      const updatedProjectsResponse = await fetch('/api/admin/portfolio');
      if (updatedProjectsResponse.ok) {
        const updatedProjects = await updatedProjectsResponse.json();
        setProjects(updatedProjects);
      }
      setEditingProjectData(null);
    } catch (error: any) {
      console.error("Error saving project:", error);
    }
  };

  const handleDeleteProject = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/portfolio?slug=${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project via API');
      }

      // Refresh the projects list
      const updatedProjectsResponse = await fetch('/api/admin/portfolio');
      if (updatedProjectsResponse.ok) {
        const updatedProjects = await updatedProjectsResponse.json();
        setProjects(updatedProjects);
      }
    } catch (error: any) {
      console.error("Error deleting project:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProjectData(null);
  };

  if (editingProjectData !== null) {
    return (
      <PortfolioEditor
        initialData={editingProjectData}
        onSave={handleSaveProject}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Portfolio</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreateNew}>
          Create New Project
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md h-[720px]">
        <h2 className="text-xl font-semibold mb-4">Projects List</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No portfolio projects found.</p>
        ) : (
          <ul className="h-[90%] overflow-y-auto">
            {projects.map((project) => (
              <li key={project.slug} className="border-b border-gray-200 py-2 flex justify-between items-center pie-25">
                <div>
                  <h3 className="text-xl font-medium">{project.metadata.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Category: {project.metadata.category || "None"} | Published: {new Date(project.metadata.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex">
                  <button
                    className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    onClick={() => handleEditProject(project.slug)}>
                    Edit
                  </button>
                  <button
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => handleDeleteProject(project.slug)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}