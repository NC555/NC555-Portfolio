'use client';

import React, { useState, useEffect } from 'react';
import { PhotoMetadata } from '@/types/gallery';
import PhotoEditor from './photo-editor';

export default function PhotoList() {
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<PhotoMetadata | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleCreateNew = () => {
    setEditingPhoto({ id: '', filename: '', tags: [], description: '', category: '' });
  };

  const handleEditPhoto = (id: string) => {
    const photoToEdit = photos.find(photo => photo.id === id);
    if (photoToEdit) {
      setEditingPhoto(photoToEdit);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (err) {
      console.error('Error deleting photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete photo');
    }
  };

  const handleSavePhoto = async (photo: PhotoMetadata) => {
    try {
      const isNew = photo.id === '';
      const method = isNew ? 'POST' : 'PUT';
      const body = isNew ? { filename: photo.filename, tags: photo.tags, description: photo.description, category: photo.category } : { id: photo.id, tags: photo.tags, description: photo.description, category: photo.category };

      const response = await fetch('/api/admin/gallery', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(isNew ? 'Failed to add photo' : 'Failed to update photo');
      }

      const updatedPhoto = await response.json();
      if (isNew) {
        setPhotos([...photos, updatedPhoto]);
      } else {
        setPhotos(photos.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
      }
      setEditingPhoto(null);
    } catch (err) {
      console.error('Error saving photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to save photo');
    }
  };

  const handleCancelEdit = () => {
    setEditingPhoto(null);
  };

  if (editingPhoto) {
    return (
      <PhotoEditor
        initialData={editingPhoto}
        onSave={handleSavePhoto}
        onCancel={handleCancelEdit}
      />
    );
  }

  if (loading) {
    return <div>Loading photos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="admin-main">
      <div className="w-full">
        <div className="grid grid-cols-1">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Gallery Photos</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCreateNew}
            >
              Add New Photo
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-[720px]">
            <h2 className="text-xl font-semibold mb-4">Photos List</h2>
            {photos.length === 0 ? (
              <p className="text-gray-600">No photos found.</p>
            ) : (
              <ul className="h-[90%] overflow-y-auto">
                {photos.map((photo) => (
                  <li key={photo.id} className="border-b border-gray-200 py-2 flex justify-between items-center pie-25">
                    <div className="flex items-center">
                      <img
                        src={`/uploads/gallery/${photo.filename}`}
                        alt={photo.filename}
                        className="w-12 h-12 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-medium">
                          {photo.description || 'No description'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Tags: {photo.tags.length > 0 ? photo.tags.join(', ') : 'None'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Category: {photo.category || 'Not set'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          FileName: {photo.filename}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        onClick={() => handleEditPhoto(photo.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        onClick={() => handleDeletePhoto(photo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
