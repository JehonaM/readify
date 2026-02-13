"use client";

import { useEffect, useState } from "react";
import { algoliasearch } from "algoliasearch";
import Link from "next/link";
import { useParams } from "next/navigation";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export default function MovieDetailsPage() {
  const params = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovie() {
      if (!params.slug) return;
      try {
        const result = await client.getObject({
          indexName: "movies_index",
          objectID: params.slug as string,
        });
        setMovie(result);
      } catch (error) {
        console.error("Algolia Error:", error);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, [params.slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen font-black text-gray-300 animate-pulse">
        LOADING MOVIE...
      </div>
    );

  if (!movie)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-black mb-4">Movie Not Found</h2>
        <Link
          href="/movies"
          className="text-blue-600 font-bold hover:underline"
        >
          Back to Movies
        </Link>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:py-16">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/movies"
          className="group flex items-center text-gray-500 hover:text-blue-600 transition-all mb-8 text-sm font-medium"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span>Back to Library</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="w-full md:w-[320px] shrink-0">
            <div className="sticky top-8">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-[3/4] bg-gray-100"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x600?text=No+Poster";
                }}
              />
            </div>
          </div>

          <div className="flex-1 py-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre?.map((g: string) => (
                  <span
                    key={g}
                    className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter leading-none">
                {movie.title}
              </h1>
              <p className="text-lg text-gray-400 font-medium italic">
                Released in {movie.year}
              </p>
            </div>

            <div className="inline-flex items-center gap-4 bg-gray-50 rounded-xl px-5 py-3 mb-8 border border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Market Rating
                </p>
                <p className="text-2xl font-black text-blue-600">
                  ★ {movie.rating}
                </p>
              </div>
              <div className="text-[10px] font-bold px-2 py-1 rounded-md text-green-600 bg-green-50">
                HD AVAILABLE
              </div>
            </div>

            <div className="prose prose-sm max-w-none border-t border-gray-100 pt-6">
              <h3 className="text-gray-900 font-bold mb-3 uppercase tracking-widest text-[11px]">
                Synopsis
              </h3>
              <div className="text-gray-600 leading-relaxed italic border-l-2 border-blue-100 pl-4 text-base">
                {movie.description || "No synopsis available for this title."}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50">
              <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 active:scale-95 leading-none">
                Watch Trailer
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex gap-10">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Format
                </p>
                <p className="text-sm font-bold text-gray-700">Digital / 4K</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Ref ID
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {movie.objectID?.substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
