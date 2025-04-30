// Type definitions for portfolio projects
export type PortfolioMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category?: string;
  banner: string;
  alt?: string;
  image?: string;
};

export type PortfolioProject = {
  metadata: PortfolioMetadata;
  slug: string;
  tweetIds: string[];
  content: string;
};

export type PortfolioData = {
  title: string;
  publishedAt: string;
  summary: string;
  category: string;
  banner: string;
  alt: string;
  image: string;
  content: string;
  slug?: string; // Optional for new projects, will be generated on save
};

export interface PortfolioListProps {
  initialProjects: PortfolioProject[];
}

export interface PortfolioEditorProps {
  initialData?: PortfolioData;
  onSave: (data: PortfolioData) => Promise<void>;
  onCancel: () => void;
}
