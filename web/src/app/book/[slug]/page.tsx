import { getEntries } from "@/lib/contentful/client";
import Link from "next/link";

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
        title
        shortDescription {
          json
        }
        authors
        coverImage {
          url
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
          {/* KOLONA E IMAZHIT */}
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
                nga {book.authors?.join(", ")}
              </p>
            </div>

            <div className="h-px w-20 bg-blue-500 mb-8"></div>

            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <h3 className="text-gray-900 font-bold mb-3 uppercase tracking-wider text-sm">
                Përshkrimi
              </h3>
              <p className="whitespace-pre-wrap italic">
                {book.shortDescription?.json?.content[0]?.content[0]?.value ||
                  "Nuk ka përshkrim të disponueshëm."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
