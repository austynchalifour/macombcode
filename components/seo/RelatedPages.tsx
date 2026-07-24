import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
};

export default function RelatedPages({
  groups,
}: {
  groups: Array<{ title: string; links: RelatedLink[] }>;
}) {
  const visible = groups.filter((group) => group.links.length > 0);
  if (visible.length === 0) return null;

  return (
    <div className="mt-16 border-t border-mist pt-10">
      {visible.map((group, index) => (
        <div key={group.title} className={index > 0 ? "mt-10" : undefined}>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {group.title}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-sm font-semibold text-navy transition-colors hover:text-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
