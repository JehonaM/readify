export interface CollectionResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}
