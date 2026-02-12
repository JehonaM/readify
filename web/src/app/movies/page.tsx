"use client";
import { algoliasearch } from "algoliasearch";
import { InstantSearch, SearchBox, Hits, Configure } from "react-instantsearch";
import { MovieHit } from "@/components/features/movies/MovieHit"; 

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export default function MoviesPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 mt-10 px-6">
      <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filtra</h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 uppercase font-semibold">
            Zhanret
          </p>
          <p className="text-xs text-gray-400 italic">
            Këtu mund të shtoni RefinementList për zhanret më vonë.
          </p>
        </div>
      </aside>


      <section className="flex-1 px-8">
        <InstantSearch searchClient={searchClient} indexName="movies_index">
          <Configure hitsPerPage={10} />
          <div className="flex justify-center mb-8">
            <SearchBox
              placeholder="Search for movies..."
              className="w-full"
              classNames={{
                root: "relative",
                input:
                  "w-full p-4 pl-12 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all",
                submitIcon: "hidden",
                resetIcon: "hidden",
              }}
            />
          </div>

          <Hits
            hitComponent={MovieHit}
            classNames={{
              list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            }}
          />
        </InstantSearch>
      </section>
    </div>
  );
}
