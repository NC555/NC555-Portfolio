'use client';

import { useState, useEffect } from 'react';
import { LuSave } from 'react-icons/lu';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import HomePagePreview from '@/components/admin/home-page-preview'; // Import the preview component
import { HomeConfig } from '@/types/about';


export default function HomeEditorPage() {
  const [homeData, setHomeData] = useState<HomeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({}); // General state for collapsible sections

  // Fetch the home page data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/homeConfig'); // Use the new API route
        if (!response.ok) {
          throw new Error('Failed to fetch home configuration');
        }
        const data: HomeConfig = await response.json();
        setHomeData(data);
      } catch (err: any) {
        console.error('Error fetching home data:', err);
        setError('Failed to load home configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to save changes
  const saveChanges = async () => {
    if (!homeData) return;
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/homeConfig', { // Use the new API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update home configuration');
      }

      setSuccess('Home configuration updated successfully');
    } catch (err: any) {
      console.error('Error saving home configuration:', err);
      setError(err.message || 'Failed to update home configuration');
    } finally {
      setSaving(false);
    }
  };

  // Function to handle field changes (handles nested paths)
  const handleFieldChange = (fieldPath: string, value: any) => {
    setHomeData((prevData) => {
      if (!prevData) return null;

      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
      const pathParts = fieldPath.split('.');
      let current = newData;

      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        // Handle array indices if present (e.g., "about.lifestyles.0.title")
        const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
         if (arrayMatch) {
          current = current[arrayMatch[1]][parseInt(arrayMatch[2], 10)];
        } else if (!current[part]) {
           // If intermediate path doesn't exist, initialize it (basic object initialization)
           current[part] = {};
           current = current[part];
         }
         else {
           current = current[part];
         }
      }

      const lastPart = pathParts[pathParts.length - 1];
      const lastArrayMatch = lastPart.match(/(\w+)\[(\d+)\]/);
      if (lastArrayMatch) {
         current[lastArrayMatch[1]][parseInt(lastArrayMatch[2], 10)] = value;
      } else {
         current[lastPart] = value;
      }


      return newData;
    });
  };

   // Toggle function for collapsible sections
   const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };


  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading home configuration...</p>
      </div>
    );
  }

  if (!homeData) {
     return <div className="p-8 text-center text-red-500">Failed to load configuration data.</div>;
  }


  // Helper to render a standard input field
  const renderInputField = (label: string, fieldPath: string, placeholder?: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={fieldPath.split('.').reduce((o, k) => {
          if (!o) return '';
          const arrayMatch = k.match(/(\w+)\[(\d+)\]/);
          if (arrayMatch) {
            const arr = o[arrayMatch[1]];
            return arr && arr[parseInt(arrayMatch[2], 10)] !== undefined ? arr[parseInt(arrayMatch[2], 10)] : '';
          }
          return o[k] !== undefined ? o[k] : '';
        }, homeData as any) || ''}
        onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
        placeholder={placeholder || label}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );

  // Helper to render a textarea field
  const renderTextareaField = (label: string, fieldPath: string, rows: number = 5) => (
     <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
       <textarea
         value={fieldPath.split('.').reduce((o, k) => {
             if (!o) return '';
             const arrayMatch = k.match(/(\w+)\[(\d+)\]/);
              if (arrayMatch) {
                 const arr = o[arrayMatch[1]];
                 return arr && arr[parseInt(arrayMatch[2], 10)] !== undefined ? arr[parseInt(arrayMatch[2], 10)] : '';
              }
              return o[k] !== undefined ? o[k] : '';
           }, homeData as any) || ''}
         onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
         rows={rows}
         className="w-full px-3 py-2 border border-gray-300 rounded-md"
       />
     </div>
   );


  return (
    <div className="w-full"> 
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Home Page Editor</h1>
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

      {/* Layout Grid - Replicating sidebar editor layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"> {/* Changed to 12-column grid */}

        {/* Form Section */}
        <div className="lg:col-span-5"> {/* Assign 5 columns */}
          {/* Inner wrapper for styling and full height */}
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
          <h2 className="text-xl font-semibold mb-4">Edit Configuration</h2>
          <div className="space-y-6"> {/* Inner div for form spacing */}
            {/* --- Basic Info --- */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center">
                Basic Information
              </h3>

                <div className="space-y-4 mt-3">
                  {renderInputField("Header", "about.header")}
                  {renderInputField("GitHub Username", "about.githubUsername")}
                  {renderInputField("Introduction Header", "about.introductionHeaderText")}
                  {renderTextareaField("Introduction (Markdown)", "about.introduction")}
                </div>

            </div>

            {/* --- Tech Stacks --- */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('techStacks')}>
                Tech Stacks
                
              </h3>
                <div className="space-y-4 mt-3">
                  {renderInputField("Tech Stack Header Text", "about.techStackHeaderText")}
                </div>

                <div className="space-y-4 mt-3">
                  {/* Programming Languages */}
                  <div className="border rounded p-3">
                    <h4 className="font-medium text-gray-800 mb-2 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('programmingLanguages')}>
                      Programming Languages ({homeData.about.techStacks?.programmingLanguages?.length || 0})
                      {openSections['programmingLanguages'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </h4>
                    {openSections['programmingLanguages'] && homeData.about.techStacks?.programmingLanguages?.map((stack, index) => (
                      <div key={`lang-${index}`} className="border-t pt-2 mt-2 space-y-2">
                        <p className="text-sm text-gray-600">Language #{index + 1} (Icon: {stack.icon})</p>
                        {renderInputField(`Name`, `about.techStacks.programmingLanguages[${index}].name`)}
                      </div>
                    ))}
                  </div>
                  {/* Frameworks */}
                  <div className="border rounded p-3">
                    <h4 className="font-medium text-gray-800 mb-2 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('frameworks')}>
                      Frameworks & Tools ({homeData.about.techStacks?.frameworks?.length || 0})
                      {openSections['frameworks'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </h4>
                    {openSections['frameworks'] && homeData.about.techStacks?.frameworks?.map((stack, index) => (
                      <div key={`framework-${index}`} className="border-t pt-2 mt-2 space-y-2">
                        <p className="text-sm text-gray-600">Framework #{index + 1} (Icon: {stack.icon})</p>
                        {renderInputField(`Name`, `about.techStacks.frameworks[${index}].name`)}
                      </div>
                    ))}
                  </div>
                </div>
             
            </div>

            {/* --- Globe Settings --- */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('globe')}>
                Globe Settings
                {openSections['globe'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </h3>
              {openSections['globe'] && (
                <div className="space-y-4 mt-3">
                  {renderInputField("Location String", "about.globe.locationString")}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marker Location (Lat, Lon)</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        step="any"
                        value={homeData.about.globe?.markerLocation?.[0] ?? ''}
                        onChange={(e) => handleFieldChange(`about.globe.markerLocation[0]`, parseFloat(e.target.value))}
                        placeholder="Latitude"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="number"
                        step="any"
                        value={homeData.about.globe?.markerLocation?.[1] ?? ''}
                        onChange={(e) => handleFieldChange(`about.globe.markerLocation[1]`, parseFloat(e.target.value))}
                        placeholder="Longitude"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* --- Lifestyles --- */}
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-3 cursor-pointer flex justify-between items-center" onClick={() => toggleSection('lifestyles')}>
                Lifestyles ({homeData.about.lifestyles?.length || 0})
                {openSections['lifestyles'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </h3>

              {openSections['lifestyles'] && (
                <>
                  <div className="border rounded p-3 mb-3 space-y-3"> 
                    {renderInputField("Lifestyle Header Text", "about.lifestyleHeaderText")}
                  </div>

                  {homeData.about.lifestyles?.map((lifestyle, index) => (
                    <div key={index} className="border rounded p-3 mb-3 space-y-3">
                      <h4 className="font-medium text-gray-800">Lifestyle #{index + 1} (Icon: {lifestyle.icon})</h4>
                      {renderInputField(`Title`, `about.lifestyles[${index}].title`)}
                      {renderInputField(`Text`, `about.lifestyles[${index}].text`)}
                    </div>
                  ))}
                </>
              )}
              {/* Add button could be implemented here */}
            </div>



          </div> {/* End inner spacing div */}
        </div> {/* End Form Section Column Div */}
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-7 preview-section"> {/* Assign 7 columns */}
          {/* Wrapper like sidebar editor, full height */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 h-full">
             <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
             {/* Pass the 'about' part of the state to the preview component */}
             {/* Preview component itself will handle its internal styling (no scale) */}
             <HomePagePreview aboutData={homeData?.about || null} />
          </div>

          <div className="text-sm text-gray-500 text-center preview-comment">
            Changes are previewed in real-time. Click "Save Changes" to update the configuration file.
          </div>
        </div> {/* End Preview Section Column Div */}

      </div> {/* End Grid Layout Div */}
    </div>
  );
}