import Link from "next/link";

export function BookHit({ hit }: any) {
  const imageUrl = hit.image?.startsWith("http")
    ? hit.image
    : `https:${hit.image}`;

  const formattedBook = {
    title: hit.title,
    author: hit.authors ? hit.authors[0] : hit.author || "Autor i panjohur",
    coverImage: {
      url: imageUrl,
    },
    slug: hit.slug,
    rating: hit.rating || 0,
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-[3/4] bg-gray-100 w-full relative">
        {formattedBook.coverImage.url && (
          <img
            src={formattedBook.coverImage.url}
            alt={formattedBook.title}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg line-clamp-1">
          {formattedBook.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{formattedBook.author}</p>

        <Link
          href={`/book/${formattedBook.slug}`}
          className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
        >
          Shiko Detajet
        </Link>
      </div>
    </div>
  );
}
