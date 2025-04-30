import { useState } from "react";

interface SidebarConfig {
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
}

// Hook for handling real-time updates to the sidebar configuration
export function useSidebarVisualEditor() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formState, setFormState] = useState<SidebarConfig | null>(null);

  // Function to save changes and trigger revalidation
  const saveChanges = async (data: any) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // Trigger revalidation via our custom API route
      const response = await fetch("/api/tina/sidebar/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to update sidebar configuration"
        );
      }

      setSuccess("Sidebar configuration updated successfully");
    } catch (err: any) {
      console.error("Error saving sidebar configuration:", err);
      setError(err.message || "Failed to update sidebar configuration");
    } finally {
      setSaving(false);
    }
  };

  return {
    formState,
    setFormState,
    saving,
    error,
    success,
    saveChanges,
    setError,
    setSuccess,
  };
}

export default useSidebarVisualEditor;
