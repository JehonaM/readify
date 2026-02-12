import Link from "next/link";

export function BookHit({ hit }: any) {
  const imageUrl = hit.image?.url || hit.image;
  const authorName = Array.isArray(hit.authors)
    ? hit.authors[0]
    : hit.author || "Unknown Author";
  const categoryName = Array.isArray(hit.category)
    ? hit.category[0]
    : hit.category;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col group">
      <div className="aspect-[3/4] bg-gray-100 w-full relative overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl}
            alt={hit.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {categoryName && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {categoryName}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-md line-clamp-2 mb-1 h-12">
          {hit.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{authorName}</p>

        <Link
          href={`/book/${hit.slug}`}
          className="mt-auto w-full bg-black text-white py-2 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
