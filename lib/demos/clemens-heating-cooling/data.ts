export type ServiceType =
  | "heating"
  | "cooling"
  | "plumbing"
  | "maintenance"
  | "emergency";

export type Service = {
  id: ServiceType;
  name: string;
  summary: string;
};

export type CoveredZip = {
  zip: string;
  city: string;
  response: string;
};

export const company = {
  name: "Clemens Heating & Cooling",
  shortName: "Clemens",
  phone: "(586) 555-0198",
  phoneHref: "tel:+15865550198",
  email: "service@clemenshvac.demo",
  address: "312 N. Groesbeck Highway, Mount Clemens, MI 48043",
  hours: "Mon–Sat 7am–7pm · 24/7 emergency",
  tagline: "Heat, cool, and plumbing for Macomb County homes.",
};

export const services: Service[] = [
  {
    id: "heating",
    name: "Heating",
    summary: "Furnace repair, install, and no-heat emergencies.",
  },
  {
    id: "cooling",
    name: "Cooling",
    summary: "AC tune-ups, replacements, and same-day diagnostics.",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    summary: "Water heaters, leaks, drains, and fixture work.",
  },
  {
    id: "maintenance",
    name: "Maintenance plans",
    summary: "Seasonal checkups that keep systems from breaking mid-blizzard.",
  },
  {
    id: "emergency",
    name: "Emergency service",
    summary: "After-hours dispatch when the house hits 58° or the pipe bursts.",
  },
];

/** Macomb County & near-border ZIPs Clemens covers */
export const coveredZips: CoveredZip[] = [
  { zip: "48043", city: "Mount Clemens", response: "Same-day" },
  { zip: "48046", city: "Mount Clemens", response: "Same-day" },
  { zip: "48035", city: "Clinton Township", response: "Same-day" },
  { zip: "48036", city: "Clinton Township", response: "Same-day" },
  { zip: "48038", city: "Clinton Township", response: "Same-day" },
  { zip: "48045", city: "Harrison Township", response: "Same-day" },
  { zip: "48047", city: "Chesterfield", response: "Next-day" },
  { zip: "48051", city: "Chesterfield", response: "Next-day" },
  { zip: "48042", city: "Macomb Township", response: "Next-day" },
  { zip: "48044", city: "Macomb Township", response: "Next-day" },
  { zip: "48310", city: "Sterling Heights", response: "Same-day" },
  { zip: "48312", city: "Sterling Heights", response: "Same-day" },
  { zip: "48313", city: "Sterling Heights", response: "Same-day" },
  { zip: "48314", city: "Sterling Heights", response: "Same-day" },
  { zip: "48088", city: "Warren", response: "Next-day" },
  { zip: "48089", city: "Warren", response: "Next-day" },
  { zip: "48091", city: "Warren", response: "Next-day" },
  { zip: "48092", city: "Warren", response: "Next-day" },
  { zip: "48093", city: "Warren", response: "Next-day" },
  { zip: "48066", city: "Roseville", response: "Next-day" },
  { zip: "48081", city: "St. Clair Shores", response: "Next-day" },
  { zip: "48082", city: "St. Clair Shores", response: "Next-day" },
  { zip: "48080", city: "St. Clair Shores", response: "Next-day" },
  { zip: "48026", city: "Fraser", response: "Next-day" },
  { zip: "48015", city: "Center Line", response: "Next-day" },
  { zip: "48021", city: "Eastpointe", response: "Next-day" },
  { zip: "48315", city: "Shelby Township", response: "Next-day" },
  { zip: "48316", city: "Shelby Township", response: "Next-day" },
  { zip: "48317", city: "Shelby Township", response: "Next-day" },
  { zip: "48095", city: "Washington Township", response: "Scheduled" },
  { zip: "48065", city: "Romeo", response: "Scheduled" },
  { zip: "48096", city: "Ray Township", response: "Scheduled" },
  { zip: "48005", city: "Armada", response: "Scheduled" },
  { zip: "48050", city: "New Haven", response: "Scheduled" },
  { zip: "48062", city: "Richmond", response: "Scheduled" },
  { zip: "48041", city: "Memphis", response: "Scheduled" },
  { zip: "48048", city: "Lenox Township", response: "Scheduled" },
];

const zipMap = new Map(coveredZips.map((z) => [z.zip, z]));

export function lookupZip(raw: string): CoveredZip | null {
  const zip = raw.replace(/\D/g, "").slice(0, 5);
  if (zip.length !== 5) return null;
  return zipMap.get(zip) ?? null;
}

export const serviceLabels: Record<ServiceType, string> = {
  heating: "Heating",
  cooling: "Cooling",
  plumbing: "Plumbing",
  maintenance: "Maintenance plan",
  emergency: "Emergency service",
};
