import { Sys } from "./system";
import { Asset } from "./asset";

export type ImageAlignment = "left" | "right" | "top" | "bottom";

export interface ImageWithTextSection {
  title: string;
  body: string;
  image?: Asset;
  alignment: ImageAlignment;
}

export interface HomePage {
  sys: Sys;
  fields: {
    heroTitle: string;
    heroSubtitle?: string;
    heroImage?: Asset;
    imageWithText?: ImageWithTextSection[];
  };
}

export interface LibraryPage {
  sys: Sys;
  fields: {
    title: string;
    pageSize?: number;
  };
}
