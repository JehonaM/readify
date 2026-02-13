import Link from "next/link";

export const MovieHit = ({ hit }: { hit: any }) => {
  return (
    <Link
      href={`/movies/${hit.objectID}`}
      className="group block h-full outline-none"
    >
      <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl hover:border-blue-100 transition-all duration-500 p-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={hit.image}
            alt={hit.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <span className="text-yellow-400 text-[9px]">★</span>
            <span className="text-white font-black text-[9px]">
              {hit.rating || "N/A"}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex gap-2 mb-2">
            {hit.genre?.slice(0, 1).map((g: string) => (
              <span
                key={g}
                className="text-[9px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded"
              >
                {g}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-black text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {hit.title}
          </h3>

          <p className="text-[11px] font-bold text-gray-400 mb-4 uppercase tracking-tight">
            Released • {hit.year}
          </p>

          <div className="mt-auto w-full bg-black text-white py-2 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors text-sm">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};
