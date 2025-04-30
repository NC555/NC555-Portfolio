/**
 * see import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
 * TODO: #360
 */

export type OpenGraph = {
  url: string;
  type: string;
  siteName: string;
  title: string;
  description: string;
  images: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
};
