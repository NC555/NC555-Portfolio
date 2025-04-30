'use client';

import React, { useState, useEffect } from 'react';
import { PhotoMetadata } from '@/types/gallery';
import { useDropzone } from 'react-dropzone';

interface PhotoEditorProps {
  initialData: PhotoMetadata;
  onSave: (photo: PhotoMetadata) => Promise<void>;
  onCancel: () => void;
}

export default function PhotoEditor({ initialData, onSave, onCancel }: PhotoEditorProps) {
  const [photoData, setPhotoData] = useState<PhotoMetadata>(initialData);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const isNew = initialData.id === '';

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setUploadError(null);
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/gallery/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setPhotoData({ ...photoData, tags });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoData({ ...photoData, description: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhotoData({ ...photoData, category: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadError(null);

    try {
      if (isNew && file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/admin/gallery/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload photo');
        }

        const result = await response.json();
        const updatedPhoto = { ...photoData, filename: result.filename, id: '' };
        await onSave(updatedPhoto);
      } else {
        await onSave(photoData);
      }
    } catch (err) {
      console.error('Error saving photo:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to save photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md w-[600px]">
      <h2 className="text-2xl font-semibold mb-4">{isNew ? 'Add New Photo' : 'Edit Photo'}</h2>
      
      {isNew && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-gray-700">Selected file: {file.name}</p>
            ) : (
              <p className="text-gray-500">
                Drag and drop a photo here, or click to select a file
              </p>
            )}
          </div>
        </div>
      )}

      {!isNew && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Photo</label>
          <img
            src={`/uploads/gallery/${photoData.filename}`}
            alt="Current photo"
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={photoData.tags.join(', ')}
          onChange={handleTagChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., nature, landscape, travel"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={photoData.description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter photo description"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={photoData.category}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {uploadError && (
        <div className="mb-4 text-red-500 text-sm">{uploadError}</div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          disabled={uploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={uploading || (isNew && !file)}
        >
          {uploading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}