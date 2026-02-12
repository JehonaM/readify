import { Document } from "@contentful/rich-text-types";
import { Sys } from "./cms/system";
import { Asset } from "./asset";
import { TaxonomyTerm } from "./cms/taxonomy";

export interface Sys {
  id: string;
}

export interface CollectionResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

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

export interface Book {
  sys: Sys;
  fields: {
    title: string;
    slug: string;

    shortDescription?: Document;
    description?: Document;

    coverImage?: Asset;
    numberOfPages?: number;

    authors?: string[];
    externalResourceLink?: string;

    taxonomies?: TaxonomyTerm[];

    rating?: number;
  };
}

export type TaxonomyType = "genre" | "audience" | "language";

export interface TaxonomyTerm {
  sys: Sys;
  fields: {
    title: string;
    slug: string;
    type: TaxonomyType;
    parent?: TaxonomyTerm;
  };
}

export interface AssetFile {
  url: string;
  contentType: string;
  fileName: string;
  details?: {
    image?: {
      width: number;
      height: number;
    };
  };
}

export interface Asset {
  sys: Sys;
  fields: {
    title: string;
    description?: string;
    file: AssetFile;
  };
}

export interface TaxonomyFacet {
  count: number;
}
