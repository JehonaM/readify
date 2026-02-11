import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b fixed w-full z-50 top-0 left-0">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          READIFY
        </Link>

        <div className="space-x-8">
          <Link href="/" className="hover:text-blue-500 font-medium">
            Home
          </Link>
          <Link href="/book" className="hover:text-blue-500 font-medium">
            Books
          </Link>
          <Link href="/movies" className="hover:text-blue-500 font-medium">
            Movies
          </Link>
        </div>
      </nav>
    </header>
  );
}
