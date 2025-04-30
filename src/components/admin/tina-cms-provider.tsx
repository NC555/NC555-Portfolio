'use client';

import { TinaProvider } from 'tinacms';
import { TinaCMS, FieldPlugin } from 'tinacms';
import { SidebarVisualEditorPlugin } from './sidebar-visual-editor-plugin';
import { useEffect, useState } from 'react';

// Create a custom TinaCMS instance with our plugins
export function TinaCmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<TinaCMS | null>(null);

  useEffect(() => {
    // Initialize TinaCMS in local mode
    const tinacms = new TinaCMS({
      enabled: true,
      sidebar: {
        position: 'displace',
        buttons: {
          save: 'Save Changes',
          reset: 'Reset',
        },
      },
      apis: {
        load: {
          onPersist: async (data: any) => {
            console.log('Saving data:', data);
            return data;
          },
          onRequest: async () => {
            console.log('Loading data');
            return {};
          },
        },
      },
    });

    // Register our custom plugins
    tinacms.plugins.add(SidebarVisualEditorPlugin as FieldPlugin);

    // Add event listeners for form events
    tinacms.events.subscribe('forms:submit:success', () => {
      console.log('Form submitted successfully');
    });

    tinacms.events.subscribe('forms:submit:error', (error) => {
      console.error('Form submission error:', error);
    });

    setCms(tinacms);
  }, []);

  if (!cms) {
    return <div className="p-4 text-center">Loading TinaCMS...</div>;
  }

  return (
    <div className="tina-cms-provider">
      {children}
    </div>
  );
}

export default TinaCmsProvider;