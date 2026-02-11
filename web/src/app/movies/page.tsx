import MovieLibrary from "@/components/MovieLibrary";

export const metadata = {
  title: "Movies | Readify Search",
  description: "Discover and filter movies using Algolia Search API.",
};

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-6 pb-12">
        <MovieLibrary />
      </div>
    </main>
  );
}
