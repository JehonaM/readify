import { Sys } from "./system";

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
