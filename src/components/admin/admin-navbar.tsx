'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuMenu, LuX, LuSettings, LuPencil, LuHouse, LuBook, LuFileText } from 'react-icons/lu';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-purple-900 text-white sticky top-0 z-40 shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Image src="/logo256.png" alt="Admin Logo" width={40} height={40} className="mr-2" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="flex space-x-4">
          <Link href="/admin" className={`flex items-center px-3 py-2 rounded-md hover:bg-purple-800 transition-colors ${typeof window !== 'undefined' && window.location.pathname === '/admin' ? 'bg-purple-800' : ''}`}>
            <LuSettings className="mr-2" size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/" className={`flex items-center px-3 py-2 rounded-md hover:bg-purple-800 transition-colors ${typeof window !== 'undefined' && window.location.pathname === '/' ? 'bg-purple-800' : ''}`}>
            <LuHouse className="mr-2" size={18} />
            <span>View Site</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Image src="/logo256.png" alt="Admin Logo" width={40} height={40} className="mr-2" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <button onClick={toggleMenu} className="focus:outline-none">
          <LuMenu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-purple-900 z-50 w-3/4 transition-transform duration-300 transform translate-x-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-purple-800">
              <div className="flex items-center">
                <Image src="/logo256.png" alt="Admin Logo" width={40} height={40} className="mr-2" />
              </div>
              <button onClick={toggleMenu} className="focus:outline-none">
                <LuX size={24} />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-2 overflow-y-auto">
              <Link href="/admin" className={`flex items-center px-3 py-2 rounded-md hover:bg-purple-800 transition-colors ${typeof window !== 'undefined' && window.location.pathname === '/admin' ? 'bg-purple-800' : ''}`} onClick={toggleMenu}>
                <LuSettings className="mr-2" size={18} />
                <span>Dashboard</span>
              </Link>
              <Link href="/" className={`flex items-center px-3 py-2 rounded-md hover:bg-purple-800 transition-colors ${typeof window !== 'undefined' && window.location.pathname === '/' ? 'bg-purple-800' : ''}`} onClick={toggleMenu}>
                <LuHouse className="mr-2" size={18} />
                <span>View Site</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}