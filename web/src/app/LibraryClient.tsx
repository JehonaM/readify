"use client";
import React, { useState } from "react";
import Link from "next/link";

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
      {/* SIDEBAR - FILTRA */}
      <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filtra</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">
              Kategoritë
            </h3>
            <ul className="space-y-2">
              {/* Butoni për të hequr filtrat */}
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

      {/* LISTA E LIBRAVE (GRID) */}
      <section className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book: any, index: number) => (
            <div
              key={`${book.slug}-${index}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="aspect-[3/4] bg-gray-100 w-full overflow-hidden">
                {book.coverImage?.url ? (
                  <img
                    src={book.coverImage.url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Pa Imazh
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg leading-tight mb-2 text-gray-900">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {book.authors?.join(", ")}
                </p>

                {/* 3. Linku për PDP */}
                <Link
                  href={`/book/${book.slug}`}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                >
                  Shiko Detajet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
