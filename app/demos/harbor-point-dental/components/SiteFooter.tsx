import Link from "next/link";
import { practice } from "@/lib/demos/harbor-point-dental/data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--hp-blue-deep)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="hp-display text-3xl">{practice.name}</p>
          <p className="mt-2 max-w-sm text-white/80">{practice.tagline}</p>
          <p className="mt-4 text-sm text-white/70">{practice.address}</p>
        </div>
        <div className="text-sm text-white/75">
          <p>
            Demo built by{" "}
            <Link
              href="/"
              className="text-white"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.55)" }}
            >
              Macomb Code
            </Link>
          </p>
          <p className="mt-1">Appointment API · integrated intake · soft-blue brand system</p>
        </div>
      </div>
    </footer>
  );
}
