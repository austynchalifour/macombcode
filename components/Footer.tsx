import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <Image
            src="/logo.png"
            alt="Macomb Code"
            width={360}
            height={180}
            className="h-auto w-[160px] md:w-[200px]"
          />
          <p className="mt-3 text-ink-muted italic">
            Websites &amp; software for local businesses.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-ink-muted md:items-end">
          <p>Macomb County, Michigan</p>
          <p>© {new Date().getFullYear()} Macomb Code</p>
        </div>
      </div>
    </footer>
  );
}
