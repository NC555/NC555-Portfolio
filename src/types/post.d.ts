export type Post = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  content: string;
  // content: React.ReactNode;
  link: string;
  alt: string;
};

export type PostData = {
  title: string;
  publishedAt: string; // Consider using Date type or more specific string format
  category: string;
  tags: string[]; // Or string separated by commas? Markdown uses YAML array.
  summary: string;
  banner: string;
  alt?: string;
  mathjax?: boolean; // Defaults to false if not present
  content: string; // Markdown body
  // Add slug here as it's used for identification, though not part of frontmatter
  slug?: string;
};

export type BlogPost = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    category?: string;
    banner: string;
    alt?: string;
    image?: string;
    tags: string[]; // Added tags to metadata
    mathjax?: boolean; // Added mathjax to metadata
  };
  slug: string;
  tweetIds: string[];
  content: string;
};

export type BlogListProps = {
  initialPosts: BlogPost[];
};

export interface PostEditorProps {
  initialData?: PostData;
  onSave: (data: PostData) => void;
  onCancel: () => void;
}
