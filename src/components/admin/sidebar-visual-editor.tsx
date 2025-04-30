'use client';

import { useEffect } from 'react';
import SideBar from '@/components/layout/side-bar';
import { Contact, SocialLink, VCardIconType } from '@/types/config';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as PiIcons from 'react-icons/pi';
import * as FaIcons from 'react-icons/fa6';
import * as GoIcons from '@primer/octicons-react';
import { LuInfo, LuSave } from 'react-icons/lu'; // Default icon and save icon
import { useSidebarVisualEditor } from '@/hooks/use-sidebar-visual-editor';

// Import the CSS for the visual editor
import '@/styles/admin/sidebar-visual-editor.css';

// Icon mapping to dynamically load icons from strings
const iconMap: Record<string, any> = {
  ...LuIcons,
  ...MdIcons,
  ...PiIcons,
  ...FaIcons,
  ...GoIcons,
};

// Default icon to use if the icon is not found
const DefaultIcon = LuInfo;

interface SidebarVisualEditorProps {
  formValues?: {
    profile?: {
      firstName: string;
      lastName: string;
      preferredName: string;
      status: string;
      avatar: string;
    };
    contacts?: Array<{
      icon: string;
      title: string;
      content: string;
      link?: string;
    }>;
    socialLinks?: Array<{
      url: string;
      icon: string;
      name: string;
    }>;
  };
}

export function SidebarVisualEditor({ formValues }: SidebarVisualEditorProps) {
  // Use our custom hook for real-time updates
  const { formState, setFormState, saving, error, saveChanges } = useSidebarVisualEditor();

  // Initialize formState with formValues if provided
  useEffect(() => {
    if (formValues && !formState) {
      setFormState(formValues);
    }
  }, [formValues, formState, setFormState]);
  
  // Use either the form state from the hook or the passed-in form values
  const sidebarData = formState || formValues;

  // If no data, show a loading state
  if (!sidebarData) {
    return <div className="p-4 text-center">Loading sidebar preview...</div>;
  }

  // Convert icon strings to actual icon components
  const contacts: Contact[] = sidebarData.contacts?.map((contact: any) => ({
    ...contact,
    icon: (iconMap[contact.icon] || DefaultIcon) as VCardIconType,
  })) || [];

  const socialLinks: SocialLink[] = sidebarData.socialLinks?.map((link: any) => ({
    ...link,
    icon: (iconMap[link.icon] || DefaultIcon) as VCardIconType,
  })) || [];

  return (
    <div className="sidebar-preview-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Live Preview</h2>
        <button
          onClick={saveChanges}
          disabled={saving}
          className="sidebar-save-button"
        >
          <LuSave size={16} />
          {saving ? 'Saving...' : 'Save & Update'}
        </button>
      </div>
      
      {error && (
        <div className="sidebar-error-message">
          {error}
        </div>
      )}
      
      <div className="sidebar-preview">
        <SideBar
          avatar={sidebarData.profile?.avatar || ''}
          firstName={sidebarData.profile?.firstName || ''}
          lastName={sidebarData.profile?.lastName || ''}
          middleName=""
          preferredName={sidebarData.profile?.preferredName || ''}
          status={sidebarData.profile?.status || ''}
          contacts={contacts}
          socialLinks={socialLinks}
        />
      </div>
      
      <div className="sidebar-help-text">
        Changes are previewed in real-time. Click "Save & Update" to apply changes to the live site.
      </div>
    </div>
  );
}

export default SidebarVisualEditor;