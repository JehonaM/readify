import { Sys } from "./system";

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
