'use client';

import React, { useState, useEffect } from "react";
import { PortfolioData, PortfolioEditorProps } from "@/types/portfolio";
import { LuSave } from 'react-icons/lu';
import PortfolioPostView from "@/components/portfolio/portfolio-post-view";

export default function PortfolioEditor({ initialData, onSave, onCancel }: PortfolioEditorProps) {
  const [formData, setFormData] = useState<PortfolioData>({
    title: "",
    publishedAt: new Date().toISOString().split('T')[0], // Default to current date
    summary: "",
    category: "",
    banner: "",
    alt: "",
    image: "",
    content: "",
    ...initialData, // Overwrite defaults with initial data if provided
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    basicInfo: true,
    bannerSettings: false,
    content: true,
  });

  // Update form data when initialData changes (e.g., editing a different project)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setOpenSections({ basicInfo: true, bannerSettings: false, content: true });
    }
  }, [initialData]);

  const handleFieldChange = (field: keyof PortfolioData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await onSave(formData);
      setSuccess("Project saved successfully!");
    } catch (err: any) {
      console.error("Error saving project:", err);
      setError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderInputField = (label: string, field: keyof PortfolioData, type: string = "text") => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={field}
        name={field}
        value={formData[field] as string}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );

  const renderTextareaField = (label: string, field: keyof PortfolioData, rows: number = 5) => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        id={field}
        name={field}
        rows={rows}
        value={formData[field] as string}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
      ></textarea>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio Project Editor</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <LuSave className="mr-2" />
          {saving ? 'Saving...' : 'Save Project'}
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      {success && (
        <div className="p-3 mb-4 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form Section */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('basicInfo')}>
                  Basic Information
                </h3>
                <div className="space-y-4 mt-3">
                  {renderInputField("Title", "title")}
                  {renderInputField("Published At", "publishedAt", "date")}
                  {renderInputField("Category", "category")}
                  {renderTextareaField("Summary", "summary", 3)}
                </div>
              </div>

              {/* Banner Settings */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('bannerSettings')}>
                  Banner Settings
                </h3>
                <div className="space-y-4 mt-3">
                  {renderInputField("Banner Image URL", "banner")}
                  {renderInputField("Banner Alt Text", "alt")}
                  {renderInputField("Image URL", "image")}
                </div>
              </div>

              {/* Content */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('content')}>
                  Content
                </h3>
                <div className="space-y-4 mt-3">
                  {renderTextareaField("Content (Markdown)", "content", 15)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="lg:col-span-7">
          <article className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto live-editing-blog">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
<section className="blog-text">
            <PortfolioPostView project={formData} isAdminPreview={true} />
</section>
          </article>
          <div className="text-sm text-gray-500 text-center mt-2">
            Changes are previewed in real-time. This preview matches the public portfolio project view styling.
          </div>
        </div>
      </div>
    </div>
  );
}