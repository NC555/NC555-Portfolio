# Sidebar Visual Editor

This directory contains components for the visual editor feature for the sidebar configuration in the admin panel.

## Overview

The sidebar visual editor allows you to see changes to the sidebar in real-time as you edit the configuration. This makes it easier to visualize how your changes will affect the sidebar's appearance before saving them.

## Components

- `sidebar-visual-editor.tsx`: The main component that renders the sidebar preview and provides a save button to apply changes.
- `sidebar-visual-editor-plugin.tsx`: A plugin that integrates the visual editor into the admin interface.
- `tina-cms-provider.tsx`: A custom provider that registers the visual editor plugin.

## How It Works

We've implemented a custom admin interface that includes:

1. A form for editing the sidebar configuration
2. A real-time preview of the sidebar that updates as you edit the form
3. A save button that updates the configuration and triggers revalidation

## Usage

1. Navigate to the admin panel at `/admin`.
2. Go to the "Sidebar Editor" section.
3. Edit the sidebar configuration fields (profile information, contacts, social links).
4. The visual editor will update in real-time to show how your changes will affect the sidebar.
5. Click the "Save Changes" button to apply your changes to the live site.

## Admin Pages

- `/admin`: The main admin dashboard with links to different sections.
- `/admin/sidebar-editor`: The sidebar visual editor page.
- `/admin/tinacms`: The original TinaCMS admin interface (if needed).

## API Routes

- `/api/tina/gql`: Handles GraphQL queries and mutations for the sidebar configuration.
- `/api/tina/sidebar/update`: Handles updating the sidebar configuration and triggering revalidation.

## Styling

The visual editor uses custom CSS defined in `src/styles/admin/sidebar-visual-editor.css` to ensure it looks good in the admin panel.
