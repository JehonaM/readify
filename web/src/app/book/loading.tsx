export default function BookLoading() {
  return (
    <div className="container mx-auto px-6 pt-24 pb-12 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-md w-48 mb-10"></div>
      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-64 space-y-6">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-100 rounded w-24"></div>
              </div>
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <div className="h-12 bg-gray-100 rounded-xl mb-8 w-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-gray-200 rounded-2xl w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
