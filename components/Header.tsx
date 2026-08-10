import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-900/10 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-900/70 md:flex">
          <Link href="/" className="hover:text-basilica-plum">Home</Link>
          <Link href="/about" className="hover:text-basilica-plum">About Us</Link>
          <Link href="/blog" className="hover:text-basilica-plum">Blog</Link>
          <Link href="/contact" className="hover:text-basilica-plum">Contact</Link>
        </nav>
        <Link
          href="/#tours"
          className="rounded-full bg-basilica-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-basilica-terracotta/90"
        >
          Book a Tour
        </Link>
      </div>
    </header>
  );
}
