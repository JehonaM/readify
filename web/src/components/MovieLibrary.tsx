"use client";

import { algoliasearch } from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
} from "react-instantsearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

function Hit({ hit }: any) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src={hit.image}
        alt={hit.title}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h3 className="font-bold text-lg">{hit.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{hit.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {hit.genre?.map((g: string) => (
          <span
            key={g}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MovieLibraryClient() {
  return (
    <InstantSearch searchClient={searchClient} indexName="movies_index">
      <div className="flex flex-col md:flex-row gap-10 mt-8">

        <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-xl h-fit">
          <h2 className="font-bold text-xl mb-6 border-b pb-2">
            Filter by Genre
          </h2>
          <RefinementList
            attribute="genre"
            className="custom-refinement-list"
            classNames={{
              list: "space-y-2",
              label:
                "flex items-center gap-2 cursor-pointer hover:text-blue-600",
              checkbox: "w-4 h-4 rounded border-gray-300 text-blue-600",
              count: "text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-auto",
            }}
          />
        </aside>

        <div className="flex-1">
          <div className="mb-8">
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
            hitComponent={Hit}
            classNames={{
              list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
            }}
          />
        </div>
      </div>
    </InstantSearch>
  );
}
