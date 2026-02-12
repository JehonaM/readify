import { NextResponse } from "next/server";
import { algoliasearch } from "algoliasearch";
import { getEntries } from "../../../lib/contentful/client";
import { AlgoliaBook } from "@/types/algolia";

export async function GET() {
  try {
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      process.env.ALGOLIA_ADMIN_KEY!,
    );

    const QUERY = `query {
      bookCollection {
        items {
          sys { id }
          title
          slug
          rating
          coverImage { url }
          taxonomiesCollection { 
            items { 
               ... on Taxonomy { title }
            }
          }
        }
      }
    }`;

    const data = await getEntries(QUERY);
    const books = data?.bookCollection?.items || [];

    const algoliaObjects: AlgoliaBook[] = books.map((book: any) => ({
      objectID: book.sys.id,
      title: book.title,
      slug: book.slug,
      image: book.coverImage?.url ? `https:${book.coverImage.url}` : "",
      category: book.taxonomiesCollection?.items?.map((t: any) => t.title) || [
        "General",
      ],
      rating: Number(book.rating) || 0,
    }));

    await client.saveObjects({
      indexName: "books_index",
      objects: algoliaObjects,
    });

    return NextResponse.json({
      message: "Sync Successful!",
      count: algoliaObjects.length,
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { error: "Sync failed", details: error.message },
      { status: 500 },
    );
  }
}
