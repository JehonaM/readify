export interface HomeSection {
  title: string;
  description: { json: any };
  image: { url: string };
}

export interface HomePageData {
  heroTitle: string;
  heroImage: { url: string };
  sections: HomeSection[];
}
