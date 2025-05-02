import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { nunito } from "@/app/fonts";
import Header from "@/components/layout/header";
import ClientSideBar from "@/components/layout/side-bar/client-side-bar";
import Hello from "@/components/hello";
import { ProgressBar } from "@/components/progress-bar";
import { WebVitals } from "@/components/web-vitals";
import appConfig from "@/data/appConfig.json";

import type { Metadata } from "next";
import type { JsonLdHtml } from "@/types/json-ld";

import "@/app/globals.css";

const navigationLinks = appConfig.navigationLinks;

const { googleAnalyticId, googleTagManagerId } = appConfig.googleProvider;

const { jsonLdPerson, homeMetaData } = appConfig;

export const metadata: Metadata = {
  ...homeMetaData,
  metadataBase: new URL(homeMetaData.metadataBase as string),
};

const addJsonLd = (): JsonLdHtml => {
  return {
    __html: JSON.stringify(jsonLdPerson, null, 2),
  };
};

async function HomeLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // Fetch sidebar data using the API route to leverage caching and revalidation
  const sidebarRes = await fetch(`/api/sidebar`, {
    next: { tags: ["sidebar"] }, // Tag for revalidation
  });
  // Define default structure including sidebarFooter
  let sidebarData = {
    profile: {
      avatar: "",
      firstName: "",
      lastName: "",
      preferredName: "",
      status: "",
    },
    contacts: [],
    socialLinks: [],
    sidebarFooter: [], // Add default empty array
  };
  if (sidebarRes.ok) {
    try {
      sidebarData = await sidebarRes.json();
    } catch (e) {
      console.error("Failed to parse sidebar data:", e);
      // Use default empty data on parse error
    }
  } else {
    const text = await sidebarRes.text();
    console.error(
      "Failed to fetch sidebar data:",
      sidebarRes.status,
      sidebarRes.statusText
    );
    console.error("Response content:", text.substring(0, 500)); // Log the first 500 chars
    // Use default empty data on fetch error
  }
  const { profile, contacts, socialLinks, sidebarFooter } = sidebarData; // Destructure sidebarFooter
  const { firstName, lastName, preferredName } = profile;
  const middleName = ""; // Default value if not in the JSON

  return (
    <>
      <WebVitals gaId={googleAnalyticId} />
      {/* Keep ProgressBar wrapping main content */}
      <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
        <main>
          {/* Move Hello inside main */}
          <Hello />
          <ClientSideBar
            avatar={sidebarData.profile.avatar}
            firstName={firstName}
            lastName={lastName}
            middleName={middleName}
            preferredName={preferredName}
            status={sidebarData.profile.status}
            contacts={sidebarData.contacts}
            socialLinks={sidebarData.socialLinks}
            sidebarFooter={sidebarData.sidebarFooter}
          />
          <div className="main-content">
            <Header navigationLinks={navigationLinks} />
            {children}
          </div>
        </main>
      </ProgressBar>
      {/* Keep Script tag at the end */}
      <Script
        id="application/ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={addJsonLd()}
        key="NC555-website-jsonld"
      />
    </>
  );
}

export default HomeLayout;
