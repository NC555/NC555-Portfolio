'use client';

import { useMemo } from 'react';
import { SidebarVisualEditor } from './sidebar-visual-editor';
import { wrapFieldsWithMeta } from 'tinacms';
import type { FieldPlugin, Field } from 'tinacms';

// This is a TinaCMS plugin that adds a visual editor for the sidebar configuration
export const SidebarVisualEditorPlugin: FieldPlugin = {
  __type: 'field',
  name: 'sidebar-visual-editor',
  Component: wrapFieldsWithMeta(({ field }: { field: Field }) => {
    // Memoize the component to prevent unnecessary re-renders
    const VisualEditor = useMemo(() => {
      return <SidebarVisualEditor />;
    }, []);

    return (
      <div className="sidebar-visual-editor-plugin">
        <div className="tinacms-field-label">
          <label>{field.label || 'Sidebar Preview'}</label>
          {field.description && (
            <p className="tinacms-field-description">{field.description}</p>
          )}
        </div>
        <div className="sidebar-visual-editor-container p-4 bg-gray-50 rounded-lg">
          {VisualEditor}
        </div>
      </div>
    );
  }),
};

export default SidebarVisualEditorPlugin;