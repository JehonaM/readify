import { Document } from '@contentful/rich-text-types';
import { Sys } from './system';
import { Asset } from './asset';
import { TaxonomyTerm } from './taxonomy';

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
