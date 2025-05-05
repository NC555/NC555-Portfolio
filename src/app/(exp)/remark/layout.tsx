import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { nunito } from "@/app/fonts";
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/side-bar";
import Hello from "@/components/hello";
import { ProgressBar } from "@/components/progress-bar";
import WebVitalsWrapper from "@/components/web-vitals/web-vitals-wrapper";
import config from "@/data/appConfig.json";

import "@/app/globals.css";

const {
  title,
  description,
  author,
  keywords,
  openGraph,
  avatar,
  status,
  navigationLinks,
  siteURL,
} = config;

const { googleAnalyticId, googleTagManagerId } = config.googleProvider;

const firstName = "First"; // Placeholder
const lastName = "Last"; // Placeholder
const middleName = ""; // Placeholder
const preferredName = "Preferred"; // Placeholder

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [{ name: author }],
  creator: author,
  keywords: keywords,
  openGraph: {
    url: openGraph.url,
    type: "website",
    siteName: openGraph.siteName,
    title: openGraph.title,
    description: openGraph.description,
    images: openGraph.images,
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: "https://docs.digital-hero.com/images/NC555.png",
  },
  icons: {
    icon: "/favicon-96x96.png",
    shortcut: "/favicon-96x96.png",
    apple: [
      {
        url: "/logo256.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

const addJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Person",
      "givenName": "${firstName}", 
      "familyName": "${lastName}", 
      "additionalName": "${preferredName}", 
      "gender": "male",
      "birthPlace": "New Taipei, TW",
      "nationality": "Taiwan",
      "alumniOf":[
        {
          "@type": "CollegeOrUniversity",
          "name": "National Central University",
          "sameAs": "https://www.ncu.edu.tw/"
        },
      ],
      "jobTitle": "Software Engineer",
      "skills": "Software Engineering, Web Development, Open Source",
      "image": "https://nc555.online/images/profile.webp",
      "url": "${siteURL}",
      "sameAs": [
        "https://www.linkedin.com/in/NC555/",
        "http://github.com/NC555",
        "https://medium.com/@NC555",
      ]
    }`,
  };
};

function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.className}`}>
      <WebVitalsWrapper gaId={googleAnalyticId} />
      <body>
        <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
          <Hello />
          <main>
            <SideBar
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              middleName={middleName}
              preferredName={preferredName}
              status={status}
            />
            <div className="main-content">
              <Header navigationLinks={navigationLinks} />
              {children}
            </div>
          </main>
        </ProgressBar>
        <Script
          id="application/ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="NC555-website-jsonld"
        />
      </body>
      <GoogleAnalytics gaId={googleAnalyticId} />
      <GoogleTagManager gtmId={googleTagManagerId} />
    </html>
  );
}

export default RootLayout;
