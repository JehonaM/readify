import Image from "next/image";

interface HeroProps {
  title: string;
  image: string;
}

export default function Hero({ title, image }: HeroProps) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider">
          {title}
        </h1>
      </div>
    </section>
  );
}
