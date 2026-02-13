"use client";
import { algoliasearch } from "algoliasearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  SearchBox,
  Hits,
  Pagination,
  RefinementList,
  CurrentRefinements,
  ClearRefinements,
} from "react-instantsearch";
import { MovieHit } from "@/components/features/movies/MovieHit";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export default function MoviesPage() {
  return (
    <main className="min-h-screenpy-12 px-6">
      <div className="max-w-7xl mx-auto">
        <InstantSearchNext
          searchClient={searchClient}
          indexName="movies_index"
          routing
        >
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="w-full lg:w-64 shrink-0">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-gray-900 italic tracking-tighter">
                  Filters
                </h2>
                <ClearRefinements
                  translations={{ resetText: "Clear All" }}
                  classNames={{
                    button:
                      "text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-20 transition-all",
                  }}
                />
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">
                    Genre
                  </h3>
                  <RefinementList
                    attribute="genre"
                    classNames={{
                      list: "space-y-3",
                      label: "flex items-center group cursor-pointer",
                      checkbox:
                        "w-5 h-5 rounded-md border-gray-200 text-blue-600 focus:ring-blue-500 transition-all",
                      labelText:
                        "ml-3 text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors",
                      count:
                        "ml-auto text-[10px] font-black bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-all",
                    }}
                  />
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-12 max-w-2xl">
                <SearchBox
                  placeholder="Search for movies, directors..."
                  classNames={{
                    root: "relative",
                    input:
                      "w-full bg-white border border-gray-100 rounded-2xl py-4 px-12 text-sm font-medium shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none",
                    submitIcon: "hidden",
                    resetIcon: "hidden",
                  }}
                />

                <div className="mt-4">
                  <CurrentRefinements
                    classNames={{
                      list: "flex flex-wrap gap-2",
                      item: "bg-white border border-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm",
                      label: "text-[10px] font-black uppercase text-gray-400",
                      categoryLabel: "text-[10px] font-black text-blue-600",
                      delete:
                        "text-gray-300 hover:text-red-500 transition-colors font-bold text-xs ml-1",
                    }}
                  />
                </div>
              </div>

              <Hits
                hitComponent={MovieHit}
                classNames={{
                  list: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8",
                }}
              />
              <div className="mt-16 pt-8 border-t border-gray-100">
                <Pagination
                  classNames={{
                    root: "flex justify-center",
                    list: "flex gap-2",
                    item: "w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all",
                    selectedItem:
                      "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200",
                  }}
                />
              </div>
            </div>
          </div>
        </InstantSearchNext>
      </div>
    </main>
  );
}
