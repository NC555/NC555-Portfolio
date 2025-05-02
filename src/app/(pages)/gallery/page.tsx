"use client";

import type { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import PageHeader from "@/components/page-header";
import FilterList from "@/components/filter/filter-list";
import PhotoGrid from "@/components/gallery/photo-grid";
import { PhotoMetadata } from "@/types/gallery";

// Import gallery configuration
import galleryConfig from "@/data/galleryConfig.json";

export default function Gallery() {
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") || "";

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Extract unique tags from photos
  const uniqueTags = Array.from(
    new Set(photos.flatMap((photo) => photo.tags))
  ).filter(Boolean);

  // Filter photos based on selected tag
  const filteredPhotos = selectedTag
    ? photos.filter((photo) => photo.tags.includes(selectedTag))
    : photos;

  if (loading) {
    return (
      <article>
        <div className="flex flex-col items-center justify-center px-4 py-12">
          <div className="flex justify-center items-center max-w-3xl mx-auto text-center">
            <h2 className="text-xl text-gray-500 dark:text-gray-400">
              Loading...
            </h2>
          </div>
        </div>
      </article>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <article>
        <PageHeader header={galleryConfig.header} />
        <div className="mb-6">
          <FilterList
            path="gallery"
            selectedTag={selectedTag}
            blogTags={uniqueTags}
          />
        </div>
        <PhotoGrid photos={filteredPhotos} />
      </article>
    </Suspense>
  );
}
