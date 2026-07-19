export type Project = {
  name: string;
  type: string;
  result: string;
  tone: "bg-band-a" | "bg-band-b" | "bg-band-c";
  /** External project URL, or omit to link to contact */
  url?: string;
};

export const projects: Project[] = [
  {
    name: "CalculatorDepot",
    type: "Programmatic SEO",
    result:
      "A scalable calculator platform built for search — templated pages, structured data, and interactive tools designed to capture high-intent organic traffic at scale. Not a brochure site: a growth engine.",
    tone: "bg-band-a",
  },
  {
    name: "Etch A Sketch",
    type: "Interactive experience",
    result:
      "Exactly what it sounds like — a browser-based Etch A Sketch for a client who wanted something playful. Twist the knobs (or use your keyboard), draw on the classic gray screen, and shake to clear. Pure fun, built clean.",
    tone: "bg-band-b",
  },
];
