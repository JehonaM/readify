// import { getEntries } from "@/lib/contentful/client";
// import LibraryClient from "./LibraryClient";

// export default async function LibraryPage() {
//   const query = `
//     query {
//       bookCollection {
//         items {
//           title
//           slug
//           authors
//           coverImage { url }
//         }
//       }
//       taxonomyTermCollection {
//         items {
//           title
//           slug
//           type
//         }
//       }
//     }
//   `;

//   try {
//     const data = await getEntries(query);

//     return (
//       <main className="p-10">
//         <h1 className="text-3xl font-bold mb-6">Libraria Readify</h1>
//         <LibraryClient
//           initialBooks={data?.bookCollection?.items || []}
//           categories={data?.taxonomyTermCollection?.items || []}
//         />
//       </main>
//     );
//   } catch (error) {
//     return (
//       <div className="p-10 text-red-500">
//         Gabim: Nuk u morën të dhënat. Kontrollo terminalin!
//       </div>
//     );
//   }
// }

import { getEntries } from "../lib/contentful/client";
import Hero from "../components/Hero";
import ImageWithText from "../components/ImageWithText";

async function getHomePageData() {
  const query = `
    query {
      homePageCollection(limit: 1) {
        items {
          heroTitle
          heroImage { url }
          sectionsCollection {
            items {
              ... on ImageWithText {
                title
                description { json }
                image { url }
              }
            }
          }
        }
      }
    }
  `;

  const data = await getEntries(query);
  const home = data.homePageCollection.items[0];

  return {
    heroTitle: home.heroTitle,
    heroImage: home.heroImage,
    sections: home.sectionsCollection.items,
  };
}
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
