import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-stone-900 py-14 text-white/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Logo variant="compact" theme="dark" />
            <p className="mt-4 text-sm text-white/60">
              <strong className="text-white">Independent booking guide.</strong> Not the official
              Sagrada Familia website — we curate guided tours and tickets from licensed operators
              and earn a commission on bookings made through our links, at no extra cost to you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-white">Explore</p>
              <ul className="mt-3 space-y-2">
                <li><Link href="/#tours" className="hover:text-white">Guided Tours</Link></li>
                <li><Link href="/#tower-access" className="hover:text-white">Tower Access</Link></li>
                <li><Link href="/#prices" className="hover:text-white">Tour Prices</Link></li>
                <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Company</p>
              <ul className="mt-3 space-y-2">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Sagrada Familia</p>
              <p className="mt-3 text-white/50">
                Carrer de Mallorca, 401<br />08013 Barcelona, Spain
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Sagrada Familia Guided Tours. All prices shown in EUR and
          subject to change by the ticket operator.
        </p>
      </div>
    </footer>
  );
}
