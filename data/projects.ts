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
    name: "Romeo & Vine",
    type: "Restaurant demo",
    result:
      "A family-owned Italian wine bar site with a live CMS-driven menu, daily specials, and a working reservation widget — proof we build systems, not just pretty pages.",
    tone: "bg-band-a",
    url: "/demos/romeo-and-vine",
  },
  {
    name: "Clemens Heating & Cooling",
    type: "Home services demo",
    result:
      "An HVAC site with a ZIP service-area checker and a quote form that routes by job type — the kind of local utility that turns browsers into booked calls.",
    tone: "bg-band-b",
    url: "/demos/clemens-heating-cooling",
  },
  {
    name: "Harbor Point Family Dental",
    type: "Medical / dental demo",
    result:
      "A St. Clair Shores dental site with online booking tied to patient intake — visit type, schedule, insurance, and medical history in one flow that cuts phone tag.",
    tone: "bg-band-c",
    url: "/demos/harbor-point-dental",
  },
  {
    name: "Northside Supply Co.",
    type: "Retail demo",
    result:
      "A Romeo hardware & home-goods shop with a searchable in-stock catalog and category filters — browse the shelf online, call to hold. Realistic for retailers who aren't ready for full e-commerce.",
    tone: "bg-band-a",
    url: "/demos/northside-supply",
  },
  {
    name: "CalculatorDepot",
    type: "Programmatic SEO",
    result:
      "A scalable calculator platform built for search — templated pages, structured data, and interactive tools designed to capture high-intent organic traffic at scale. Not a brochure site: a growth engine.",
    tone: "bg-band-b",
    url: "https://calculatorsdepot.com/",
  },
  {
    name: "Etch A Sketch",
    type: "Interactive experience",
    result:
      "Exactly what it sounds like — a browser-based Etch A Sketch for a client who wanted something playful. Twist the knobs (or use your keyboard), draw on the classic gray screen, and shake to clear. Pure fun, built clean.",
    tone: "bg-band-c",
    url: "https://etchasketch.app/",
  },
];
