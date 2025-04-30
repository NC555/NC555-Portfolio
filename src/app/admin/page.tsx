'use client';

import Link from 'next/link';
import { LuPencil, LuSettings, LuHouse, LuBook, LuFileText } from 'react-icons/lu';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the admin dashboard. Use the links below to manage your portfolio website.
        </p>
        
        {/* Settings Section */}
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link 
            href="/admin"
            className="block p-6 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-purple-500 p-2 rounded-full text-white mr-3">
                <LuSettings size={20} />
              </div>
              <h3 className="text-lg font-semibold">Settings</h3>
            </div>
            <p className="text-gray-600">
              Configure general settings for your portfolio website.
            </p>
          </Link>
          
          <Link
            href="/"
            className="block p-6 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-green-500 p-2 rounded-full text-white mr-3">
                <LuHouse size={20} />
              </div>
              <h3 className="text-lg font-semibold">View Site</h3>
            </div>
            <p className="text-gray-600">
              Go to your portfolio website to see your changes live.
            </p>
          </Link>
        </div>
        
        {/* Editors Section */}
        <h2 className="text-xl font-semibold mb-4">Editors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/sidebar-editor"
            className="block p-6 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-blue-500 p-2 rounded-full text-white mr-3">
                <LuPencil size={20} />
              </div>
              <h3 className="text-lg font-semibold">Sidebar Editor</h3>
            </div>
            <p className="text-gray-600">
              Edit your sidebar configuration with real-time visual preview.
            </p>
          </Link>
          
          <Link
            href="/admin/home-editor"
            className="block p-6 bg-yellow-50 rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-yellow-500 p-2 rounded-full text-white mr-3">
                <LuPencil size={20} />
              </div>
              <h3 className="text-lg font-semibold">Home Editor</h3>
            </div>
            <p className="text-gray-600">
              Edit your home page configuration.
            </p>
          </Link>
          
          <Link
            href="/admin/resume-editor"
            className="block p-6 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-indigo-500 p-2 rounded-full text-white mr-3">
                <LuFileText size={20} />
              </div>
              <h3 className="text-lg font-semibold">Resume Editor</h3>
            </div>
            <p className="text-gray-600">
              Edit your resume content and layout.
            </p>
          </Link>
          
          <Link
            href="/admin/gallery-editor"
            className="block p-6 bg-pink-50 rounded-lg border border-pink-100 hover:bg-pink-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-pink-500 p-2 rounded-full text-white mr-3">
                <LuPencil size={20} />
              </div>
              <h3 className="text-lg font-semibold">Gallery Editor</h3>
            </div>
            <p className="text-gray-600">
              Manage your photo collection for the gallery page.
            </p>
          </Link>
          
          <Link
            href="/admin/portfolio"
            className="block p-6 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-orange-500 p-2 rounded-full text-white mr-3">
                <LuPencil size={20} />
              </div>
              <h3 className="text-lg font-semibold">Portfolio Editor</h3>
            </div>
            <p className="text-gray-600">
              Manage your portfolio projects.
            </p>
          </Link>
        </div>
        
        {/* Blog Section */}
        <h2 className="text-xl font-semibold mb-4">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/blog"
            className="block p-6 bg-teal-50 rounded-lg border border-teal-100 hover:bg-teal-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="bg-teal-500 p-2 rounded-full text-white mr-3">
                <LuBook size={20} />
              </div>
              <h3 className="text-lg font-semibold">Blog Management</h3>
            </div>
            <p className="text-gray-600">
              Create, edit, and manage your blog posts.
            </p>
          </Link>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
            <h3 className="font-medium">Visual Sidebar Editor Added</h3>
            <p className="text-sm text-gray-600">
              You can now edit your sidebar with a real-time visual preview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}