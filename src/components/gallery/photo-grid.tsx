import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { PhotoMetadata } from "@/types/gallery";
import { GALLERY_PATH } from "@/config/constants";

interface PhotoGridProps {
  photos: PhotoMetadata[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {photos.map((photo, idx) => (
          <BlurFade key={photo.id} delay={0.25 + idx * 0.05} inView>
            <img
              className="mb-4 size-full rounded-lg object-contain"
              src={`/${GALLERY_PATH}/${photo.filename}`}
              alt={`Photo ${idx + 1}${
                photo.tags.length > 0 ? ` - ${photo.tags.join(", ")}` : ""
              }`}
            />
          </BlurFade>
        ))}
      </div>
      {photos.length === 0 && (
        <p className="text-center text-gray-600 mt-4">No photos available.</p>
      )}
    </section>
  );
}
