import { getEntries } from "@/lib/contentful/client";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPricing(bookId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(
      `${baseUrl}/api/pricing?bookId=${encodeURIComponent(bookId)}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    const charSum = bookId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      price: ((charSum % 50) + 15.99).toFixed(2),
      availability: charSum % 2 === 0 ? "in stock" : "pre-order",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const BOOK_QUERY = `
    query {
      bookCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          sys { id }
          title
          authors 
          numberOfPages
          coverImage { url }
          shortDescription { json }
          taxonomiesCollection(limit: 5) {
            items { 
              title 
              slug 
            }
          }
        }
      }
    }
  `;

  const data = await getEntries(BOOK_QUERY);
  const book = data?.bookCollection?.items[0];

  if (!book) {
    notFound();
  }

  const pricing = await getPricing(book.sys.id);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:py-16">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/book"
          className="group flex items-center text-gray-500 hover:text-blue-600 transition-all mb-8 text-sm"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span>Back to Library</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-full md:w-[320px] shrink-0">
            <div className="sticky top-8">
              <img
                src={book.coverImage?.url}
                alt={book.title}
                className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-[3/4]"
              />
            </div>
          </div>

          <div className="flex-1 py-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {book.taxonomiesCollection?.items.map(
                  (tax: any) =>
                    tax && (
                      <span
                        key={tax.slug}
                        className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                      >
                        {tax.title}
                      </span>
                    ),
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">
                {book.title}
              </h1>
              <p className="text-lg text-gray-400 italic">
                by {book.authors?.join(", ") || "Unknown Author"}
              </p>
            </div>

            <div className="inline-flex items-center gap-4 bg-gray-50 rounded-xl px-5 py-3 mb-8 border border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Market Price
                </p>
                <p className="text-2xl font-black text-blue-600">
                  ${pricing.price}
                </p>
              </div>
              <div
                className={`text-[10px] font-bold px-2 py-1 rounded-md ${pricing.availability === "in stock" ? "text-green-600 bg-green-50" : "text-orange-500 bg-orange-50"}`}
              >
                {pricing.availability.toUpperCase()}
              </div>
            </div>

            <div className="prose prose-sm max-w-none border-t border-gray-100 pt-6">
              <h3 className="text-gray-900 font-bold mb-3 uppercase tracking-widest text-[11px]">
                Description
              </h3>
              <div className="text-gray-600 leading-relaxed italic border-l-2 border-blue-100 pl-4 text-base">
                {book.shortDescription?.json?.content?.[0]?.content?.[0]
                  ?.value || "No description available for this book."}
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < (book.rating || 4) ? "text-yellow-400" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-gray-400 ml-2">
                ({book.rating || "4.0"})
              </span>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 flex gap-10">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Pages
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {book.numberOfPages || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Ref ID
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {book.sys.id.substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
