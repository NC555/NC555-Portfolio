'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { LuUpload, LuX } from 'react-icons/lu';

const FALLBACK_AVATAR = '/logo256.png';

interface AvatarUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function AvatarUpload({ value, onChange }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'File upload failed');
        }

        const data = await response.json();
        onChange(data.filepath); // Update the parent state with the new file path
      } catch (err: any) {
        console.error('Upload error:', err);
        setError(err.message || 'Failed to upload image.');
        onChange(value); // Revert to previous value on error
      } finally {
        setUploading(false);
      }
    },
    [onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': [],
    },
    multiple: false,
  });

  const removeImage = () => {
    onChange(FALLBACK_AVATAR); // Set value to the fallback image path
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
      <div className="mt-1 flex items-center space-x-4">
        {value && value !== FALLBACK_AVATAR ? ( // Show uploaded image if value exists and is not the fallback
          <div className="relative group">
            <Image
              src={value} // value is guaranteed to be a valid path here
              alt="Avatar Preview"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
              // Add onError handler if needed, or ensure value is never empty/invalid string
              // For simplicity, we ensure `value` is null or a valid path
              // If value is null, this part won't render anyway due to the conditional check
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              aria-label="Remove image"
            >
              <LuX size={12} />
            </button>
          </div>
        ) : ( // Show fallback image or upload icon
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
            {/* If value is fallback or null/empty, show fallback image */}
            <Image
              src={FALLBACK_AVATAR}
              alt="Default Avatar"
              width={64}
              height={64}
              className="h-[75%] w-[75%] object-contain"
            />
          </div>
        )}

        <div
          {...getRootProps()}
          className={`flex-1 border-2 border-dashed rounded-md px-6 py-4 text-center cursor-pointer hover:border-blue-500 transition ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <p className="text-sm text-gray-500">Uploading...</p>
          ) : isDragActive ? (
            <p className="text-sm text-blue-500">Drop the image here...</p>
          ) : (
            <p className="text-sm text-gray-500">Drag & drop an image here, or click to select</p>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}