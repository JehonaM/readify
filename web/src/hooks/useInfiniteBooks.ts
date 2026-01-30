"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Book, CollectionResponse } from "@/types/cms";
import { getEntries } from "@/lib/contentful/client";

interface UseInfiniteBooksOptions {
  initialBooks: CollectionResponse<Book>;
  pageSize?: number;
  mode?: "infinite" | "paged";
}

export function useInfiniteBooks({
  initialBooks,
  pageSize = 5,
  mode = "infinite",
}: UseInfiniteBooksOptions) {
  const searchParams = useSearchParams();
  const selectedTaxonomies = searchParams.getAll("tax");

  const [books, setBooks] = useState(initialBooks.items);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialBooks.items.length >= pageSize);

  const loadNextPage = useCallback(async () => {
    if (!hasMore) return;

    const nextPage = page + 1;
    const skip = (nextPage - 1) * pageSize;

    const filters: Record<string, any> = {
      content_type: "book",
      limit: pageSize,
      skip,
    };

    if (selectedTaxonomies.length > 0) {
      filters["fields.taxonomies.sys.id[in]"] = selectedTaxonomies.join(",");
    }

    const res: CollectionResponse<Book> = await getEntries<Book>(filters);

    if (mode === "infinite") {
      setBooks((prev) => [...prev, ...res.items]);
    } else {
      setBooks(res.items);
    }

    setPage(nextPage);
    setHasMore(res.items.length >= pageSize);
  }, [hasMore, page, pageSize, selectedTaxonomies, mode]);


  useEffect(() => {
    setBooks(initialBooks.items);
    setPage(1);
    setHasMore(initialBooks.items.length >= pageSize);
  }, [initialBooks, selectedTaxonomies, pageSize]);

  const observerRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (mode !== "infinite") return;
      if (!node) return;

      const observer = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            await loadNextPage();
          }
        },
        { rootMargin: "200px" },
      );

      observer.observe(node);

      return () => observer.disconnect();
    },
    [loadNextPage, hasMore, mode],
  );

  return {
    books,
    page,
    hasMore,
    loadNextPage,
    observerRefCallback,
  };
}






