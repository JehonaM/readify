import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface ImageWithTextProps {
  title: string;
  description: any;
  image: string;
  alignment: "left" | "right";
}

export default function ImageWithText({
  title,
  description,
  image,
  alignment,
}: ImageWithTextProps) {
  const isLeft = alignment === "left";

  return (
    <div
      className={`flex flex-col md:flex-row gap-10 items-start my-20 ${isLeft ? "" : "md:flex-row-reverse"}`}
    >
      <div className="flex-1 relative aspect-video w-full rounded-xl shadow-lg ">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <div className="prose prose-lg text-gray-600">
          {documentToReactComponents(description)}
        </div>
      </div>
    </div>
  );
}
