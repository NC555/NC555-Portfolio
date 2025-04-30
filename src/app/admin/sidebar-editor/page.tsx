'use client';

import { useState, useEffect } from 'react';
import SideBar from '@/components/layout/side-bar';
import { Contact, SocialLink, SidebarFooterItem } from '@/types/config'; // Assuming SidebarFooterItem is defined in types
import { LuSave } from 'react-icons/lu';
import { getIconComponent } from '@/lib/icon-utils';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Import icons for toggle
import AvatarUpload from '@/components/admin/avatar-upload'; // Import the new component

export default function VisualEditorPage() {
  const [sidebarData, setSidebarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openContacts, setOpenContacts] = useState<number[]>([]); // State to manage open contact sections
  const [openSocialLinks, setOpenSocialLinks] = useState<number[]>([]); // State to manage open social link sections
  const [openFooterLinks, setOpenFooterLinks] = useState<number[]>([]); // State for footer link sections


  // Fetch the sidebar data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sidebar');
        if (!response.ok) {
          throw new Error('Failed to fetch sidebar configuration');
        }
        const data = await response.json();
        setSidebarData(data);
      } catch (err: any) {
        console.error('Error fetching sidebar data:', err);
        setError('Failed to load sidebar configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to save changes
  const saveChanges = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // Save the changes via our custom API route
      const response = await fetch('/api/sidebar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sidebarData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update sidebar configuration');
      }

      setSuccess('Sidebar configuration updated successfully');
    } catch (err: any) {
      console.error('Error saving sidebar configuration:', err);
      setError(err.message || 'Failed to update sidebar configuration');
    } finally {
      setSaving(false);
    }
  };

  // Function to handle field changes
  const handleFieldChange = (field: string, value: any) => {
    // Parse the field path (e.g., "profile.firstName" -> ["profile", "firstName"])
    const fieldPath = field.split('.');
    
    setSidebarData((prevData: any) => {
      // Create a deep copy of the previous data
      const newData = JSON.parse(JSON.stringify(prevData));
      
      // Navigate to the correct object in the data structure
      let current = newData;
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      
      // Update the value
      current[fieldPath[fieldPath.length - 1]] = value;
      
      return newData;
    });
  };

  // Function to toggle contact section visibility
  const toggleContact = (index: number) => {
    setOpenContacts(prevOpen => 
      prevOpen.includes(index) ? prevOpen.filter(i => i !== index) : [...prevOpen, index]
    );
  };

  // Function to toggle social link section visibility
  const toggleSocialLink = (index: number) => {
    setOpenSocialLinks(prevOpen => 
      prevOpen.includes(index) ? prevOpen.filter(i => i !== index) : [...prevOpen, index]
    );
  };

  // Function to toggle footer link section visibility
  const toggleFooterLink = (index: number) => {
    setOpenFooterLinks(prevOpen =>
      prevOpen.includes(index) ? prevOpen.filter(i => i !== index) : [...prevOpen, index]
    );
  };


  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading sidebar configuration...</p>
      </div>
    );
  }

  // Convert icon strings to actual icon components for the preview using shared utility
  const contacts: Contact[] = sidebarData?.contacts || [];
  const socialLinks: SocialLink[] = sidebarData?.socialLinks || [];
  const sidebarFooter: SidebarFooterItem[] = sidebarData?.sidebarFooter || []; // Added footer data

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 md:p-8 pb-0">Sidebar Visual Editor</h1> {/* Adjusted title padding */}
      
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 mb-4 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8 pt-4"> {/* Changed to 12-column grid, added padding back to grid */}
        {/* Form Section */}
        <div className="lg:col-span-5"> {/* Assign 5 columns */}
           {/* Inner wrapper for styling and full height */}
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-semibold mb-4">Edit Configuration</h2>
            
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Profile Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={sidebarData?.profile?.firstName || ''}
                      onChange={(e) => handleFieldChange('profile.firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={sidebarData?.profile?.lastName || ''}
                      onChange={(e) => handleFieldChange('profile.lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  {/* Preferred Name field removed */}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <input
                      type="text"
                      value={sidebarData?.profile?.status || ''}
                      onChange={(e) => handleFieldChange('profile.status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <AvatarUpload
                    value={sidebarData?.profile?.avatar || null}
                    onChange={(newValue) => handleFieldChange('profile.avatar', newValue)}
                  />
                </div>
              </div>
              
              {/* Contacts Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-3">Contacts</h3>
                
                {sidebarData?.contacts?.map((contact: Contact, index: number) => {
                  const IconComponent = getIconComponent(contact.icon);
                  const isOpen = openContacts.includes(index);

                  return (
                    <div key={index} className="p-3 border rounded-md mb-3">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleContact(index)}
                      >
                        <div className="flex items-center">
                          {IconComponent && <IconComponent className="mr-2 text-xl" />}
                          <span className="text-sm font-medium text-gray-700">{contact.title}</span>
                        </div>
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                      
                      {isOpen && (
                        <div className="space-y-3 mt-3">
                          {/* Title is now non-editable and displayed above */}
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <input
                              type="text"
                              value={contact.content || ''}
                              onChange={(e) => {
                                const newContacts = [...sidebarData.contacts];
                                newContacts[index].content = e.target.value;
                                handleFieldChange('contacts', newContacts);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
                            <input
                              type="text"
                              value={contact.link || ''}
                              onChange={(e) => {
                                const newContacts = [...sidebarData.contacts];
                                newContacts[index].link = e.target.value;
                                handleFieldChange('contacts', newContacts);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          
                          {/* Icon input is removed */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Social Links Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Social Links</h3>
                
                {sidebarData?.socialLinks?.map((link: SocialLink, index: number) => {
                  const IconComponent = getIconComponent(link.icon);
                  const isOpen = openSocialLinks.includes(index);

                  return (
                    <div key={index} className="p-3 border rounded-md mb-3">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSocialLink(index)}
                      >
                        <div className="flex items-center">
                          {IconComponent && <IconComponent className="mr-2 text-xl" />}
                          <span className="text-sm font-medium text-gray-700">{link.name}</span>
                        </div>
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                      
                      {isOpen && (
                        <div className="space-y-3 mt-3">
                          {/* Name and Icon are now non-editable and displayed above */}
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                              type="text"
                              value={link.url || ''}
                              onChange={(e) => {
                                const newLinks = [...sidebarData.socialLinks];
                                newLinks[index].url = e.target.value;
                                handleFieldChange('socialLinks', newLinks);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          
                          {/* Icon and Name inputs are removed */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Footer Section */}
              <div className="border-b pb-4"> {/* Added border-b */}
                <h3 className="text-lg font-medium mb-3">Sidebar Footer</h3>
                
                {sidebarData?.sidebarFooter?.map((item: SidebarFooterItem, index: number) => {
                  const isOpen = openFooterLinks.includes(index);

                  return (
                    <div key={index} className="p-3 border rounded-md mb-3">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleFooterLink(index)}
                      >
                        {/* Display itemType or title as header */}
                        <span className="text-sm font-medium text-gray-700">{item.title} ({item.itemType})</span>
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                      
                      {isOpen && (
                        <div className="space-y-3 mt-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => {
                                const newFooter = [...sidebarData.sidebarFooter];
                                newFooter[index].title = e.target.value;
                                handleFieldChange('sidebarFooter', newFooter);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                              type="text"
                              value={item.url || ''}
                              onChange={(e) => {
                                const newFooter = [...sidebarData.sidebarFooter];
                                newFooter[index].url = e.target.value;
                                handleFieldChange('sidebarFooter', newFooter);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          {/* itemType is likely not editable here */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
            </div>
          </div> {/* End Form Section Column Inner Div */}
        </div> {/* End Form Section Column Div */}
        
        {/* Preview Section */}
        <div className="lg:col-span-7"> {/* Assign 7 columns */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <button
                onClick={saveChanges}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <LuSave className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg" style={{ maxWidth: '300px', margin: '0 auto' }}>
              {sidebarData && (
                <SideBar
                  avatar={sidebarData.profile.avatar}
                  firstName={sidebarData.profile.firstName}
                  lastName={sidebarData.profile.lastName}
                  middleName=""
                  preferredName={sidebarData.profile.preferredName}
                  status={sidebarData.profile.status}
                  contacts={contacts}
                  socialLinks={socialLinks}
                  // Pass sidebarFooter data to the preview
                  sidebarFooter={sidebarFooter}
                />
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 text-center">
            Changes are previewed in real-time. Click "Save Changes" to apply changes to the live site.
          </div>
        </div> {/* End Preview Section Column Div */}
      </div>
    </div>
  );
}