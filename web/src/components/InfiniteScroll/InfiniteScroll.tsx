"use client";

import { useInfiniteBooks } from "@/hooks/useInfiniteBooks";

export default function LibraryClient({ initialBooks }) {
  const { books, loadMore, hasMore, mode, setMode } =
    useInfiniteBooks(initialBooks);

  return (
    <>
      <button
        onClick={() => setMode(mode === "infinite" ? "paged" : "infinite")}
      >
        Toggle Pagination
      </button>

      <div className="grid">
        {books.map((book) => (
          <BookCard key={book.sys.id} book={book} />
        ))}
      </div>

      {mode === "infinite" && hasMore && (
        <button onClick={loadMore}>Load more</button>
      )}
    </>
  );
}
