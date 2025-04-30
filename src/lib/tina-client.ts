// We're not using the TinaCMS client directly anymore
// Instead, we're using fetch to call our API route

// Helper function to get sidebar configuration
export async function getSidebarConfigFromTina() {
  try {
    // Since we don't have the generated queries yet, we'll use the raw API
    const response = await fetch("/api/tina/gql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetSidebarConfig {
            sidebarConfig(relativePath: "sidebarConfig.json") {
              profile {
                firstName
                lastName
                preferredName
                status
                avatar
              }
              contacts {
                title
                content
                link
                icon
              }
              socialLinks {
                name
                url
                icon
              }
            }
          }
        `,
      }),
    });

    const json = await response.json();
    return json.data.sidebarConfig;
  } catch (error) {
    console.error("Error fetching sidebar config from Tina:", error);
    return null;
  }
}
