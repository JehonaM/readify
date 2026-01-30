import { getEntries } from "@/lib/contentful/client";
import Link from "next/link";

async function getPricing(bookId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  try {
    const res = await fetch(
      `${baseUrl}/api/pricing?bookId=${encodeURIComponent(bookId)}`,
      {
        cache: "no-store",
      },
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
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const BOOK_QUERY = `
query {
  bookCollection(where: { slug: "${slug}" }, limit: 1) {
    items {
      sys { id }
      title
      authors 
      numberOfPages
      coverImage {
        url
      }
      shortDescription {
        json
      }
      taxonomiesCollection {
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
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold">Libri nuk u gjet!</h1>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">
          Kthehu te Libraria
        </Link>
      </div>
    );
  }

  const pricing = await getPricing(book.sys.id);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <span className="mr-2 text-xl">←</span>
          <span className="font-medium">Mbrapa te Libraria</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row shadow-blue-100/50">
          <div className="md:w-2/5 bg-gray-100 flex items-center justify-center p-8">
            <img
              src={book.coverImage?.url}
              alt={book.title}
              className="w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 p-8 md:p-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-blue-600 font-semibold italic">
                nga {book.authors?.join(", ") || "Autor i panjohur"}
              </p>

              <div className="flex gap-2 mt-3">
                {book.taxonomiesCollection?.items.map((tax: any) => (
                  <span
                    key={tax.slug}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tax.title}
                  </span>
                ))}
              </div>

              <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-4xl font-black text-blue-700">
                  ${pricing.price}
                </p>
                <p
                  className={`text-sm font-bold mt-1 ${pricing.availability === "in stock" ? "text-green-600" : "text-orange-500"}`}
                >
                  STATUSI: {pricing.availability.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="h-px w-20 bg-blue-500 mb-8"></div>

            <div className="prose prose-lg text-gray-700">
              <h3 className="text-gray-900 font-bold mb-3 uppercase tracking-wider text-sm">
                Përshkrimi
              </h3>
              <div className="italic text-gray-600">
                {book.shortDescription?.json?.content?.[0]?.content?.[0]
                  ?.value || "Përshkrimi po ngarkohet..."}
              </div>
              <p className="mt-6 text-sm text-gray-400 border-t pt-4">
                Faqe: {book.numberOfPages} | ID: {book.sys.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
