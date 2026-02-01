import { getEntries } from "@/lib/contentful/client";
import LibraryClient from "./LibraryClient";

export default async function LibraryPage() {
  const query = `
    query {
      bookCollection {
        items {
          title
          slug
          authors
          coverImage { url }
        }
      }
      taxonomyTermCollection {
        items {
          title
          slug
          type
        }
      }
    }
  `;

  try {
    const data = await getEntries(query);

    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">Libraria Readify</h1>
        <LibraryClient
          initialBooks={data?.bookCollection?.items || []}
          categories={data?.taxonomyTermCollection?.items || []}
        />
      </main>
    );
  } catch (error) {
    return (
      <div className="p-10 text-red-500">
        Gabim: Nuk u morën të dhënat. Kontrollo terminalin!
      </div>
    );
  }
}
