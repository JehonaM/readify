import { getEntries } from "@/lib/contentful/client";
import { algoliasearch } from "algoliasearch";
import { NextResponse } from "next/server";

export async function GET() {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!,
  );

  const QUERY = `query { bookCollection { items { sys { id } title slug authors coverImage { url } taxonomy } } }`;
  const data = await getEntries(QUERY);
  const books = data?.bookCollection?.items || [];

  const algoliaObjects = books.map((book: any) => ({
    objectID: book.sys.id,
    title: book.title,
    slug: book.slug,
    authors: book.authors,
    image: book.coverImage?.url,
    category: book.taxonomy?.[0] || "General",
  }));

  await client.saveObjects({
    indexName: "books_index",
    objects: algoliaObjects,
  });

  return NextResponse.json({
    message: "Sync Successful!",
    count: algoliaObjects.length,
  });
}
