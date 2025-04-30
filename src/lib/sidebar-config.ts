import fs from "fs";
import path from "path";

// Type for the sidebar configuration JSON
interface SidebarConfig {
  profile: {
    firstName: string;
    lastName: string;
    preferredName: string;
    status: string;
    avatar: string;
  };
  contacts: Array<{
    icon: string;
    title: string;
    content: string;
    link?: string;
  }>;
  socialLinks: Array<{
    url: string;
    icon: string;
    name: string;
  }>;
}

// Function to get the sidebar configuration
export function getSidebarConfig() {
  try {
    // Read the sidebar configuration from the JSON file
    const filePath = path.join(process.cwd(), "src/data/sidebarConfig.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: SidebarConfig = JSON.parse(fileContents);

    // Return the data without converting icon strings to components
    // This avoids the "Functions cannot be passed directly to Client Components" error
    return {
      profile: data.profile,
      contacts: data.contacts,
      socialLinks: data.socialLinks,
    };
  } catch (error) {
    console.error("Error loading sidebar configuration:", error);
    // Return empty arrays as fallback
    return {
      profile: {
        firstName: "",
        lastName: "",
        preferredName: "",
        status: "",
        avatar: "",
      },
      contacts: [],
      socialLinks: [],
    };
  }
}
