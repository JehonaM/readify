export interface AlgoliaBook {
  objectID: string;
  title: string;
  slug: string;
  image: string;
  category: string[];
  rating: number;
  [key: string]: any;
}
