'use client';

import { usePathname } from 'next/navigation';
import { TinaCmsProvider } from './admin/tina-cms-provider';

// This component decides whether to use the TinaCMS provider based on the current path
export function TinaProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Only use the TinaCMS provider in the admin section
  const isAdminPath = pathname?.startsWith('/admin');
  
  if (isAdminPath) {
    return <TinaCmsProvider>{children}</TinaCmsProvider>;
  }
  
  // For regular pages, just render the children
  return <>{children}</>;
}