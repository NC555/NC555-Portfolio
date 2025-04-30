'use client';

import { useState, useEffect } from 'react';
import { LuSave } from 'react-icons/lu';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineAddCircleOutline, MdOutlineRemoveCircleOutline } from 'react-icons/md'; // Icons for add/remove
import ResumePagePreview from '@/components/admin/resume-page-preview'; // To be created
import { Resume } from '@/types/resume';
import { VCardIconType } from '@/types/config';

// Define interfaces for resume data (matching resumeConfig.json structure)
// Note: Icon types are string names as stored in JSON
interface ResumeItem {
  company: string;
  location: string;
  role: string;
  duration: string;
  tasksMarkdown: string;
}

interface ResumeSection {
  icon: string; // Icon name string
  title: string;
  items: ResumeItem[];
}

interface ResumeConfig {
  educations: ResumeSection;
  awardLeaderships: ResumeSection;
  teachingExperiences: ResumeSection;
  professionalExperiences: ResumeSection;
  // Add 'volunteering' here if needed in the future
  volunteering?: ResumeSection;
}

// Base empty item structure for adding new items
const emptyResumeItem: ResumeItem = {
  company: '',
  location: '',
  role: '',
  duration: '',
  tasksMarkdown: '',
};

export default function ResumeEditorPage() {
  const [resumeData, setResumeData] = useState<ResumeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    educations: true, // Open Education by default
    professionalExperiences: true, // Open Professional Experience by default
    awardLeaderships: false,
    teachingExperiences: false,
    volunteering: false,
  });

  // Fetch the resume data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/resumeConfig');
        if (!response.ok) {
          throw new Error('Failed to fetch resume configuration');
        }
        const data: ResumeConfig = await response.json();
        setResumeData(data);
      } catch (err: any) {
        console.error('Error fetching resume data:', err);
        setError('Failed to load resume configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to save changes
  const saveChanges = async () => {
    if (!resumeData) return;
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/resumeConfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData, null, 2), // Pretty print JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update resume configuration');
      }

      setSuccess('Resume configuration updated successfully');
    } catch (err: any) {
      console.error('Error saving resume configuration:', err);
      setError(err.message || 'Failed to update resume configuration');
    } finally {
      setSaving(false);
    }
  };


  const mapResumeConfigToResume = (config: ResumeConfig): Resume => {
    const defaultIcon = LuSave as unknown as VCardIconType; // for type compatibility
    return {
      educations: {
        ...config.educations,
        icon: defaultIcon
      },
      awardLeaderships: {
        ...config.awardLeaderships,
        icon: defaultIcon
      },
      teachingExperiences: {
        ...config.teachingExperiences,
        icon: defaultIcon
      },
      professionalExperiences: {
        ...config.professionalExperiences,
        icon: defaultIcon
      },
      volunteering: config.volunteering ? {
        ...config.volunteering,
        icon: defaultIcon
      } : undefined
    };
  };
  
  // Function to handle field changes (handles nested paths including arrays)
  const handleFieldChange = (sectionKey: keyof ResumeConfig, itemIndex: number, field: keyof ResumeItem, value: string) => {
    setResumeData((prevData) => {
      if (!prevData) return null;
  
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      const section = newData[sectionKey];
  
      if (section && section.items && section.items[itemIndex]) {
        (section.items[itemIndex] as any)[field] = value; // Use 'any' for dynamic field access
      }
  
      return newData;
    });
  };

   // Function to add a new item to a section
   const addItem = (sectionKey: keyof ResumeConfig) => {
    setResumeData((prevData) => {
      if (!prevData) return null;

      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      const section = newData[sectionKey];

      if (section && section.items) {
        section.items.push({...emptyResumeItem}); // Add a copy of the empty item
      } else if (section) {
         // If items array doesn't exist but section does, create it
         section.items = [{...emptyResumeItem}];
      }
       // If section doesn't exist, do nothing for now (shouldn't happen with initial structure)

      return newData;
    });
   };

  // Function to remove an item from a section
  const removeItem = (sectionKey: keyof ResumeConfig, itemIndex: number) => {
    setResumeData((prevData) => {
      if (!prevData) return null;

      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      const section = newData[sectionKey];

      if (section && section.items && section.items.length > itemIndex) {
        section.items.splice(itemIndex, 1);
      }

      return newData;
    });
  };


   // Toggle function for collapsible sections
   const toggleSection = (key: keyof ResumeConfig | 'editor') => { // Allow toggling editor form itself
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
   };


  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading resume configuration...</p>
      </div>
    );
  }

  if (!resumeData) {
     return <div className="p-8 text-center text-red-500">Failed to load configuration data.</div>;
  }


  const renderItemInputField = (label: string, sectionKey: keyof ResumeConfig, itemIndex: number, field: keyof ResumeItem, placeholder?: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={resumeData[sectionKey]?.items?.[itemIndex]?.[field] as string ?? ''}
        onChange={(e) => handleFieldChange(sectionKey, itemIndex, field, e.target.value)}
        placeholder={placeholder || label}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
  
  const renderItemTextareaField = (label: string, sectionKey: keyof ResumeConfig, itemIndex: number, field: keyof ResumeItem, rows: number = 5) => (
     <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
       <textarea
         value={resumeData[sectionKey]?.items?.[itemIndex]?.[field] as string ?? ''}
         onChange={(e) => handleFieldChange(sectionKey, itemIndex, field, e.target.value)}
         rows={rows}
         className="w-full px-3 py-2 border border-gray-300 rounded-md"
       />
     </div>
   );


  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Resume Editor</h1>
         <button
            onClick={saveChanges}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
            <LuSave className="mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
         </button>
      </div>

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

        {/* Form Section */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('editor')}>
              Edit Configuration
            </h2>

            <div className="space-y-6"> {/* Inner div for form spacing */}

              {/* --- Professional Experiences --- */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('professionalExperiences')}>
                  {resumeData.professionalExperiences.title} ({resumeData.professionalExperiences.items.length || 0})
                  {openSections['professionalExperiences'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </h3>
                {openSections['professionalExperiences'] && (
                  <div className="space-y-4 mt-3">
                     <button
                        onClick={() => addItem('professionalExperiences')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                        <MdOutlineAddCircleOutline className="mr-2" />
                        Add Item
                     </button>
                     {resumeData.professionalExperiences.items.map((item, index) => (
                       <div key={index} className="border rounded p-3 space-y-3">
                         <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-800">Item #{index + 1}</h4>
                            <button
                               onClick={() => removeItem('professionalExperiences', index)}
                               className="text-red-600 hover:text-red-800"
                               title="Remove item"
                               >
                               <MdOutlineRemoveCircleOutline size={20} />
                            </button>
                         </div>
                         {renderItemInputField("Company", "professionalExperiences", index, "company")}
                         {renderItemInputField("Location", "professionalExperiences", index, "location")}
                         {renderItemInputField("Role", "professionalExperiences", index, "role")}
                         {renderItemInputField("Duration", "professionalExperiences", index, "duration")}
                         {renderItemTextareaField("Tasks (Markdown)", "professionalExperiences", index, "tasksMarkdown")}
                       </div>
                     ))}
                  </div>
                )}
              </div>

              {/* --- Educations --- */}
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('educations')}>
                  {resumeData.educations.title} ({resumeData.educations.items.length || 0})
                  {openSections['educations'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </h3>
                {openSections['educations'] && (
                  <div className="space-y-4 mt-3">
                     <button
                        onClick={() => addItem('educations')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                        <MdOutlineAddCircleOutline className="mr-2" />
                        Add Item
                     </button>
                     {resumeData.educations.items.map((item, index) => (
                       <div key={index} className="border rounded p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-800">Item #{index + 1}</h4>
                             <button
                                onClick={() => removeItem('educations', index)}
                                className="text-red-600 hover:text-red-800"
                                title="Remove item"
                                >
                                <MdOutlineRemoveCircleOutline size={20} />
                             </button>
                          </div>
                         {renderItemInputField("Company", "educations", index, "company")}
                         {renderItemInputField("Location", "educations", index, "location")}
                         {renderItemInputField("Role", "educations", index, "role")}
                         {renderItemInputField("Duration", "educations", index, "duration")}
                         {renderItemTextareaField("Tasks (Markdown)", "educations", index, "tasksMarkdown")}
                       </div>
                     ))}
                  </div>
                )}
              </div>

              {/* --- Award & Leaderships --- */}
               <div className="border rounded-md p-4">
                 <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('awardLeaderships')}>
                   {resumeData.awardLeaderships.title} ({resumeData.awardLeaderships.items.length || 0})
                   {openSections['awardLeaderships'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                 </h3>
                 {openSections['awardLeaderships'] && (
                   <div className="space-y-4 mt-3">
                      <button
                         onClick={() => addItem('awardLeaderships')}
                         className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                         >
                         <MdOutlineAddCircleOutline className="mr-2" />
                         Add Item
                      </button>
                      {resumeData.awardLeaderships.items.map((item, index) => (
                        <div key={index} className="border rounded p-3 space-y-3">
                           <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-800">Item #{index + 1}</h4>
                             <button
                                onClick={() => removeItem('awardLeaderships', index)}
                                className="text-red-600 hover:text-red-800"
                                title="Remove item"
                                >
                                <MdOutlineRemoveCircleOutline size={20} />
                             </button>
                          </div>
                          {renderItemInputField("Company", "awardLeaderships", index, "company")}
                          {renderItemInputField("Location", "awardLeaderships", index, "location")}
                          {renderItemInputField("Role", "awardLeaderships", index, "role")}
                          {renderItemInputField("Duration", "awardLeaderships", index, "duration")}
                          {renderItemTextareaField("Tasks (Markdown)", "awardLeaderships", index, "tasksMarkdown")}
                        </div>
                      ))}
                   </div>
                 )}
               </div>

               {/* --- Teaching Experiences --- */}
               <div className="border rounded-md p-4">
                 <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('teachingExperiences')}>
                   {resumeData.teachingExperiences.title} ({resumeData.teachingExperiences.items.length || 0})
                   {openSections['teachingExperiences'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                 </h3>
                 {openSections['teachingExperiences'] && (
                   <div className="space-y-4 mt-3">
                      <button
                         onClick={() => addItem('teachingExperiences')}
                         className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                         >
                         <MdOutlineAddCircleOutline className="mr-2" />
                         Add Item
                      </button>
                      {resumeData.teachingExperiences.items.map((item, index) => (
                        <div key={index} className="border rounded p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-800">Item #{index + 1}</h4>
                             <button
                                onClick={() => removeItem('teachingExperiences', index)}
                                className="text-red-600 hover:text-red-800"
                                title="Remove item"
                                >
                                <MdOutlineRemoveCircleOutline size={20} />
                             </button>
                          </div>
                          {renderItemInputField("Company", "teachingExperiences", index, "company")}
                          {renderItemInputField("Location", "teachingExperiences", index, "location")}
                          {renderItemInputField("Role", "teachingExperiences", index, "role")}
                          {renderItemInputField("Duration", "teachingExperiences", index, "duration")}
                          {renderItemTextareaField("Tasks (Markdown)", "teachingExperiences", index, "tasksMarkdown")}
                        </div>
                      ))}
                   </div>
                 )}
               </div>

               {/* Optional: Add section for Volunteering if data is added */}
               {/*
               {resumeData.volunteering && ( // Conditionally render if 'volunteering' key exists
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('volunteering')}>
                      {resumeData.volunteering.title} ({resumeData.volunteering.items.length || 0})
                      {openSections['volunteering'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </h3>
                    {openSections['volunteering'] && (
                      <div className="space-y-4 mt-3">
                         <button
                            onClick={() => addItem('volunteering')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                            <MdOutlineAddCircleOutline className="mr-2" />
                            Add Item
                         </button>
                         {resumeData.volunteering.items.map((item, index) => (
                           <div key={index} className="border rounded p-3 space-y-3">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">Item #{index + 1}</h4>
                                 <button
                                    onClick={() => removeItem('volunteering', index)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Remove item"
                                    >
                                    <MdOutlineRemoveCircleOutline size={20} />
                                 </button>
                              </div>
                              {renderItemInputField("Company", "volunteering", index, "company")}
                              {renderItemInputField("Location", "volunteering", index, "location")}
                              {renderItemInputField("Role", "volunteering", index, "role")}
                              {renderItemInputField("Duration", "volunteering", index, "duration")}
                              {renderItemTextareaField("Tasks (Markdown)", "volunteering", index, "tasksMarkdown")}
                           </div>
                         ))}
                      </div>
                    )}
                  </div>
               )}
               */}


            </div> 

          </div> {/* End Form Section Column Div */}
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-7 preview-section">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            {/* Pass the transformed resumeData to the preview component */}
            <ResumePagePreview resumeData={mapResumeConfigToResume(resumeData)} />
         </div>

          <div className="text-sm text-gray-500 text-center preview-comment">
            Changes are previewed in real-time. Click "Save Changes" to update the configuration file. Sections with no items will not be displayed.
          </div>
        </div> {/* End Preview Section Column Div */}

      </div> {/* End Grid Layout Div */}
    </div>
  );
}
