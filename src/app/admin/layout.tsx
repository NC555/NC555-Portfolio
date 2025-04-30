import type { Metadata } from 'next';
import Link from 'next/link';
import { TinaCmsProvider } from '@/components/admin/tina-cms-provider';
import AdminNavbar from '@/components/admin/admin-navbar';
import appConfig from '@/data/appConfig.json'; // Import the new config

// Import styles
import '@/app/globals.css';
import '@/styles/admin.css';


export const metadata: Metadata = {
  title: 'Admin Panel - Portfolio',
  description: 'Admin panel for managing the portfolio website',
  icons: {
    icon: appConfig.favicons.admin,
    shortcut: appConfig.favicons.admin,
    apple: appConfig.favicons.admin,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TinaCmsProvider>
      {/* Remove inter.className to inherit font from root layout */}
      <div className="admin-panel">
        <AdminNavbar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </TinaCmsProvider>
  );
}