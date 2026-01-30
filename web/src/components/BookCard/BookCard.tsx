import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/cms";
import { contentfulImage } from "@/lib/contentful/image";
import { Rating } from "../Rating/Rating";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { title, slug, coverImage, authors, rating } = book.fields;

  const imageUrl = coverImage?.fields.file.url;

  return (
    <article className="book-card">
      <Link href={`/book/${slug}`}>
        {imageUrl && (
          <Image
            src={contentfulImage(imageUrl, { width: 240 })}
            alt={coverImage.fields.title}
            width={240}
            height={360}
            className="rounded"
          />
        )}

        <h3 className="mt-2 font-semibold">{title}</h3>
      </Link>

      {authors && <p className="text-sm text-gray-600">{authors.join(", ")}</p>}

      {rating && <Rating value={rating} />}
    </article>
  );
}
