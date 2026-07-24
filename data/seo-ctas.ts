export type SeoCta = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
};

export const seoCtas = {
  freeReview: {
    href: "/analyze",
    label: "Get Your Free Website Review",
    variant: "primary",
  },
  bookCall: {
    href: "/book",
    label: "Book A Call",
    variant: "secondary",
  },
  requestDemo: {
    href: "/#work",
    label: "Request Website Demo",
    variant: "secondary",
  },
} as const satisfies Record<string, SeoCta>;

export const defaultSeoCtaList: SeoCta[] = [
  seoCtas.freeReview,
  seoCtas.bookCall,
  seoCtas.requestDemo,
];

export function demoCta(demoPath: string, label = "View Related Demo"): SeoCta {
  return {
    href: demoPath,
    label,
    variant: "secondary",
  };
}
