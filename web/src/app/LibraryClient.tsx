"use client";
import React, { useState } from "react";
import Link from "next/link";
import { algoliasearch } from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { BookHit } from "@/components/BookHit";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export default function LibraryClient({ initialBooks, categories }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBooks = selectedCategory
    ? initialBooks.filter((book: any) => {
        return book.taxonomyTermCollection?.items?.some(
          (term: any) =>
            term.title.toLowerCase() === selectedCategory.toLowerCase(),
        );
      })
    : initialBooks;

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-10 px-6">
      <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filtra</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">
              Kategoritë
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cat"
                  checked={!selectedCategory}
                  onChange={() => setSelectedCategory(null)}
                  className="rounded"
                />
                <label
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-700 cursor-pointer"
                >
                  Të gjitha
                </label>
              </li>
              {categories.map((cat: any) => (
                <li key={cat.slug} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={cat.slug}
                    checked={selectedCategory === cat.title}
                    onChange={() =>
                      setSelectedCategory(
                        selectedCategory === cat.title ? null : cat.title,
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={cat.slug}
                    className={`text-sm cursor-pointer transition-colors ${selectedCategory === cat.title ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500"}`}
                  >
                    {cat.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <section className="flex-1 px-8">
        <InstantSearch searchClient={searchClient} indexName="books_index">
          <div className="flex justify-center mb-8">
            <SearchBox
              placeholder="Kërko libra..."
              className="w-full max-w-md p-2 border rounded-lg shadow-sm"
            />
          </div>

          <Hits
            hitComponent={BookHit}
            classNames={{
              list: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
              item: "h-full",
            }}
          />
        </InstantSearch>
      </section>
    </div>
  );
}
