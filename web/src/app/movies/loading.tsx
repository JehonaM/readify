export default function MovieLoading() {
  return (
    <div className="container mx-auto px-6 pt-24 pb-12 animate-pulse">
      <header className="mb-10">
        <div className="h-10 bg-gray-200 rounded-md w-64 mb-4"></div>
        <div className="h-5 bg-gray-100 rounded w-80"></div>
      </header>

      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-64 bg-gray-50 p-6 rounded-xl h-fit space-y-6">
          <div className="h-6 bg-gray-200 rounded w-40"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          <div className="h-14 bg-gray-100 rounded-xl w-full border-2 border-gray-50"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-4 space-y-4 shadow-sm"
              >
                <div className="aspect-video bg-gray-200 rounded-lg w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-blue-50 rounded w-16"></div>
                  <div className="h-6 bg-blue-50 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
