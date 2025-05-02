import type { Metadata } from "next";
import React, { Suspense } from "react";
import GalleryClient from "@/components/gallery/gallery-client"; // Import the new client component

// Import gallery configuration
import galleryConfig from "@/data/galleryConfig.json";

export default function Gallery() {
  // No client-side hooks here, the logic is in GalleryClient

  return (
    <Suspense fallback={<div>Loading gallery...</div>}>
      {" "}
      {/* Added a more specific fallback */}
      <GalleryClient galleryConfig={galleryConfig} />{" "}
      {/* Render the client component */}
    </Suspense>
  );
}
