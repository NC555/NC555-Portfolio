import type { Breakpoint } from "@/hooks/use-responsive-image-size";
export const breakpoints: Breakpoint[] = [
  { maxWidth: 250, size: { width: 80, height: 80 } },
  { maxWidth: 375, size: { width: 80, height: 80 } },
  { maxWidth: 580, size: { width: 80, height: 80 } },
  { maxWidth: 1250, size: { width: 120, height: 120 } },
  { maxWidth: Infinity, size: { width: 150, height: 150 } },
];
export const EXAMPLE_PATH = "blog-starter";
export const GALLERY_PATH = "uploads/gallery";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL =
  "https://docs.digital-hero.com/images/NC555.png";
