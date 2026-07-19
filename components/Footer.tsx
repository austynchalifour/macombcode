import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-paper-warm">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-14">
          <div>
            <Image
              src="/logo.png"
              alt="Macomb Code"
              width={360}
              height={180}
              className="h-auto w-[148px] md:w-[168px]"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Websites and software for local businesses across Macomb County.
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <a
                  href="mailto:info@macombcode.com"
                  className="transition-colors hover:text-navy"
                >
                  info@macombcode.com
                </a>
              </li>
              <li>Macomb County, Michigan</li>
              <li>
                <Link
                  href="/cities"
                  className="transition-colors hover:text-navy"
                >
                  Service areas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-mist pt-6 text-xs text-ink-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Macomb Code. All rights reserved.</p>
          <p>Serving businesses across Macomb County.</p>
        </div>
      </div>
    </footer>
  );
}
