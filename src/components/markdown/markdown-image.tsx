"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MarkdownImageProps {
  src: string;
  alt?: string;
}

function MarkdownImage({ src, alt }: MarkdownImageProps) {
  const [aspectRatio, setAspectRatio] = useState(1);

  return (
    <div className="my-10 text-center">
      <div
        className="relative rounded-2xl overflow-hidden max-h-[100%]"
        style={{
          maxWidth: "100%",
          aspectRatio: aspectRatio,
        }}
      >
        <Image
          className="object-contain rounded-2xl"
          src={src}
          alt={alt ?? "Image"}
          fill
          priority={true}
          onLoadingComplete={(target) => {
            setAspectRatio(target.naturalWidth / target.naturalHeight);
          }}
        />
      </div>
      {alt && (
        <div className="mt-2 text-sm text-light-gray-70 text-center mb-4">
          {alt}
        </div>
      )}
    </div>
  );
}

export default MarkdownImage;
