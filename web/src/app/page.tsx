import { getHomePageData } from "@/lib/contentful/queries";
import Hero from "../components/shared/Hero";
import ImageWithText from "../components/shared/ImageWithText";
export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <main>
      <Hero title={data.heroTitle} image={data.heroImage.url} />
      <section className="container mx-auto py-16 px-6">
        {data.sections.map((section: any, index: number) => (
          <ImageWithText
            key={index}
            title={section.title}
            description={section.description.json}
            image={section.image.url}
            alignment={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </section>
    </main>
  );
}
