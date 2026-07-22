"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#contact", label: "Contact" },
];

const phoneDisplay = "586-368-2259";
const phoneHref = "tel:+15863682259";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" className="block w-[148px] shrink-0 md:w-[180px]">
          <Image
            src="/logo.png"
            alt="Macomb Code"
            width={360}
            height={180}
            className="h-auto w-full"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-sm font-semibold text-navy/70 transition-colors hover:text-orange"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={phoneHref}
              className="font-display text-sm font-semibold text-navy/70 transition-colors hover:text-orange"
            >
              {phoneDisplay}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          <a
            href={phoneHref}
            className="font-display text-sm font-semibold text-navy transition-colors hover:text-orange"
            aria-label={`Call ${phoneDisplay}`}
          >
            Call
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-6 bg-navy transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-navy transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-navy transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-mist/70 px-5 py-5 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-2xl font-bold text-navy"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={phoneHref}
                className="font-display text-2xl font-bold text-navy"
                onClick={() => setOpen(false)}
              >
                {phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
