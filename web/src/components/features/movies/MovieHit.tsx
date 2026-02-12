import React from "react";

export function MovieHit({ hit }: any) {
  const imageUrl = hit.image || "";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
      <div className="aspect-[2/3] bg-gray-100 w-full relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={hit.title}
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">
            Pa poster
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg line-clamp-1 text-gray-900">
          {hit.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hit.description || "Pa përshkrim"}
        </p>

        <div className="flex flex-wrap gap-1 mt-auto">
          {hit.genre?.map((g: string) => (
            <span
              key={g}
              className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded uppercase font-bold"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
