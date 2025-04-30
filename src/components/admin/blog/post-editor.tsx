'use client'; // Mark as a Client Component

import React, { useState, useEffect } from "react";
import { PostData, PostEditorProps } from "@/types/post";
import { LuSave } from 'react-icons/lu'; // Import Save icon
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Import Arrow icons
import BlogPostView from "@/components/blog/blog-post-view"; // Import the reusable blog post view component


export const PostEditor: React.FC<PostEditorProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<PostData>({
    title: "",
    publishedAt: new Date().toISOString().split('T')[0], // Default to current date
    category: "",
    tags: [],
    summary: "",
    banner: "",
    alt: "",
    mathjax: false,
    content: "",
    ...initialData, // Overwrite defaults with initial data if provided
  });

  const [saving, setSaving] = useState(false); // State for saving status
  const [error, setError] = useState<string | null>(null); // State for errors
  const [success, setSuccess] = useState<string | null>(null); // State for success messages
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    basicInfo: true, // Keep basic info open by default
    bannerSettings: false,
    content: true, // Keep content open by default
  }); // State for collapsible sections

  // Update form data when initialData changes (e.g., editing a different post)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // Optionally reset open sections state when switching posts
      setOpenSections({ basicInfo: true, bannerSettings: false, content: true });
    }
  }, [initialData]);

  // Function to handle field changes
  const handleFieldChange = (field: keyof PostData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = async () => { // Made async to handle saving state
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await onSave(formData); // onSave is an async function passed from parent
      setSuccess("Post saved successfully!");
    } catch (err: any) {
      console.error("Error saving post:", err);
      setError(err.message || "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  // Toggle function for collapsible sections
  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to render a standard input field
  const renderInputField = (label: string, field: keyof PostData, type: string = "text") => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={field}
        name={field}
        value={formData[field] as string | number | readonly string[] | undefined} // Cast to appropriate types
        onChange={(e) => handleFieldChange(field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );

  // Helper to render a textarea field
  const renderTextareaField = (label: string, field: keyof PostData, rows: number = 5) => (
     <div>
       <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
       <textarea
         id={field}
         name={field}
         rows={rows}
         value={formData[field] as string} // Cast to string
         onChange={(e) => handleFieldChange(field, e.target.value)}
         className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
       ></textarea>
     </div>
   );

   // Helper to render a checkbox field
   const renderCheckboxField = (label: string, field: keyof PostData) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={field}
        name={field}
        checked={formData[field] as boolean} // Cast to boolean
        onChange={(e) => handleFieldChange(field, e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={field} className="ml-2 block text-sm font-medium text-gray-700">{label}</label>
    </div>
  );

  // Helper to render tags input
  const renderTagsField = (label: string, field: 'tags') => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        id={field}
        name={field}
        value={formData.tags.join(", ")}
        onChange={(e) => handleFieldChange('tags', e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag !== ""))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );


  return (
      <div className="w-full"> {/* Added wrapper div with full width */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Post Editor</h1> {/* Changed title */}
          <button
              onClick={handleSave} // Use new handleSave
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
              <LuSave className="mr-2" />
              {saving ? 'Saving...' : 'Save Post'} {/* Updated button text */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"> {/* Replicated grid layout */}

          {/* Editor Form Section */}
          <div className="lg:col-span-5"> {/* Assign 5 columns */}
            <div className="bg-white p-6 rounded-lg shadow-md h-full"> 
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2> 
            <div className="space-y-6"> {/* Inner div for form spacing */}

              {/* --- Basic Info --- */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('basicInfo')}>
                  Basic Information
                </h3>
                  <div className="space-y-4 mt-3">
                    {renderInputField("Title", "title")}
                    {renderInputField("Published At", "publishedAt", "date")} {/* Use date type */}
                    {renderInputField("Category", "category")}
                    {renderTagsField("Tags (comma-separated)", "tags")} {/* Use tags helper */}
                  </div>
                </div>

              {/* --- Banner Settings --- */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('bannerSettings')}>
                  Banner Settings
           
                </h3>
               
                  <div className="space-y-4 mt-3">
                    {renderInputField("Banner Image URL", "banner")}
                    {renderInputField("Banner Alt Text", "alt")}
                  </div>
        
              </div>


              {/* --- Content --- */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('content')}>
                  Content
                </h3>
                  <div className="space-y-4 mt-3">
                    {renderTextareaField("Summary", "summary", 3)} {/* Use textarea helper */}
                    {renderTextareaField("Content (Markdown)", "content", 15)} {/* Use textarea helper */}
                    {renderCheckboxField("Enable MathJax", "mathjax")} {/* Use checkbox helper */}
                  </div>
              </div>


            </div> {/* End inner spacing div */}
           </div> {/* End Editor Form Column Div */}


          </div>
              
            {/* Live Preview Section */}
          <div className="lg:col-span-7"> {/* Assign 7 columns */}
           
            <article className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto live-editing-blog"> 
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2> 
              <section className="blog-text"> 
                <BlogPostView post={formData} enableMath={formData.mathjax} /> 
              </section>
            </article>
            {/* Preview comment */}
            <div className="text-sm text-gray-500 text-center mt-2">
              Changes are previewed in real-time. This preview attempts to match the public blog post view styling. Custom components like and comments are not shown here.
            </div>

          </div> {/* End Grid Layout Div */}

                    
      </div>
    </div>
  );
};

export default PostEditor;
