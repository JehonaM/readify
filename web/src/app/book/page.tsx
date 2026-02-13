"use client";
import React, { useState } from "react";
import { algoliasearch } from "algoliasearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  SearchBox,
  Hits,
  InfiniteHits,
  Pagination,
  RefinementList,
  ClearRefinements,
  Configure,
} from "react-instantsearch";
import { BookHit } from "@/components/features/books/BookHit";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export default function LibraryPage() {
  const [isInfinite, setIsInfinite] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <InstantSearchNext
        searchClient={searchClient}
        indexName="books_index"
        routing={true}
      >
        <Configure hitsPerPage={5} />

        <div className="flex flex-col md:flex-row gap-10">
          <aside className="w-full md:w-64">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold italic text-gray-800">
                Filters
              </h2>
              <ClearRefinements
                translations={{ resetButtonText: "Clear All" }}
                classNames={{
                  button: "text-sm text-blue-600 hover:text-blue-800",
                }}
              />
            </div>
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Categories
              </h3>
              <RefinementList
                attribute="category"
                classNames={{
                  count:
                    "ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-[10px]",
                  label:
                    "flex items-center cursor-pointer py-1 text-sm hover:text-blue-600",
                  checkbox: "mr-2 rounded border-gray-300",
                }}
              />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
              <div className="relative w-full">
                <SearchBox
                  placeholder="Search by title, author, or category..."
                  classNames={{
                    input:
                      "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                    submitIcon:
                      "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 fill-gray-400",
                    resetIcon: "hidden",
                  }}
                />
              </div>

              <button
                onClick={() => setIsInfinite(!isInfinite)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100 whitespace-nowrap"
              >
                {isInfinite
                  ? "Switch to Pagination"
                  : "Switch to Infinite Scroll"}
              </button>
            </div>

            <div className="min-h-[500px]">
              {isInfinite ? (
                <InfiniteHits
                  hitComponent={BookHit}
                  showPrevious={false}
                  classNames={{
                    list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                    loadMore:
                      "w-full mt-10 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition",
                  }}
                />
              ) : (
                <div className="space-y-12">
                  <Hits
                    hitComponent={BookHit}
                    classNames={{
                      list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                    }}
                  />
                  <div className="flex justify-center border-t border-gray-100 pt-8">
                    <Pagination
                      classNames={{
                        list: "flex gap-2",
                        item: "w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition",
                        selectedItem:
                          "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700",
                        link: "w-full h-full flex items-center justify-center",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </InstantSearchNext>
    </div>
  );
}
