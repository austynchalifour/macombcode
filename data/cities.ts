export type CityRegion = "north" | "central" | "south";
export type CityType = "city" | "village" | "charter-township" | "township";

export type City = {
  name: string;
  slug: string;
  type: CityType;
  region: CityRegion;
  /** Short local hook for unique on-page copy */
  highlight: string;
};

export const cities: City[] = [
  // South
  {
    name: "Warren",
    slug: "warren",
    type: "city",
    region: "south",
    highlight:
      "Michigan’s third-largest city and a hub for manufacturers, retailers, and service businesses along major corridors like Van Dyke and 12 Mile.",
  },
  {
    name: "Center Line",
    slug: "center-line",
    type: "city",
    region: "south",
    highlight:
      "A compact, walkable city nestled inside Warren — ideal for local shops and professionals who need a clear online presence.",
  },
  {
    name: "Eastpointe",
    slug: "eastpointe",
    type: "city",
    region: "south",
    highlight:
      "A southern Macomb community with strong neighborhood businesses along Gratiot and Nine Mile.",
  },
  {
    name: "Fraser",
    slug: "fraser",
    type: "city",
    region: "south",
    highlight:
      "A close-knit city where local contractors, clinics, and family businesses compete on trust and visibility.",
  },
  {
    name: "Roseville",
    slug: "roseville",
    type: "city",
    region: "south",
    highlight:
      "A retail- and service-heavy city where customers often search online before they ever walk through the door.",
  },
  {
    name: "St. Clair Shores",
    slug: "st-clair-shores",
    type: "city",
    region: "south",
    highlight:
      "A lakeside city with restaurants, marina businesses, and professional services that need a polished digital storefront.",
  },
  {
    name: "Grosse Pointe Shores",
    slug: "grosse-pointe-shores",
    type: "city",
    region: "south",
    highlight:
      "A small lakeside community on Macomb’s southern edge where reputation and presentation matter.",
  },
  // Central
  {
    name: "Sterling Heights",
    slug: "sterling-heights",
    type: "city",
    region: "central",
    highlight:
      "One of Michigan’s largest cities — home to diverse businesses, medical offices, and growing service brands.",
  },
  {
    name: "Utica",
    slug: "utica",
    type: "city",
    region: "central",
    highlight:
      "A historic downtown city surrounded by fast-growing suburban demand for modern websites and tools.",
  },
  {
    name: "Mount Clemens",
    slug: "mount-clemens",
    type: "city",
    region: "central",
    highlight:
      "Macomb County’s seat — a downtown core of law firms, clinics, restaurants, and civic neighbors.",
  },
  {
    name: "New Baltimore",
    slug: "new-baltimore",
    type: "city",
    region: "central",
    highlight:
      "An Anchor Bay city where local shops, waterfront businesses, and service providers serve nearby townships.",
  },
  {
    name: "Clinton Township",
    slug: "clinton-township",
    type: "charter-township",
    region: "central",
    highlight:
      "One of Macomb’s most populated communities, with dense commercial corridors and strong local competition online.",
  },
  {
    name: "Chesterfield Township",
    slug: "chesterfield-township",
    type: "charter-township",
    region: "central",
    highlight:
      "A growing Anchor Bay township with contractors, retailers, and new businesses establishing their brands.",
  },
  {
    name: "Harrison Township",
    slug: "harrison-township",
    type: "charter-township",
    region: "central",
    highlight:
      "A lakeside township where marina services, restaurants, and home services need to show up in local search.",
  },
  {
    name: "Macomb Township",
    slug: "macomb-township",
    type: "township",
    region: "central",
    highlight:
      "A fast-growing community with new neighborhoods, family businesses, and demand for modern digital tools.",
  },
  {
    name: "Shelby Township",
    slug: "shelby-township",
    type: "charter-township",
    region: "central",
    highlight:
      "A major northern suburb with busy corridors along Hall Road and Mound — ripe for strong web presence.",
  },
  // North
  {
    name: "Washington Township",
    slug: "washington-township",
    type: "charter-township",
    region: "north",
    highlight:
      "A northern Macomb community blending suburban growth with nearby Romeo Village amenities.",
  },
  {
    name: "Romeo",
    slug: "romeo",
    type: "village",
    region: "north",
    highlight:
      "A historic village with downtown charm — perfect for boutique brands and local service businesses.",
  },
  {
    name: "Armada",
    slug: "armada",
    type: "village",
    region: "north",
    highlight:
      "A small northern village where word of mouth still matters — and a sharp website multiplies it.",
  },
  {
    name: "Armada Township",
    slug: "armada-township",
    type: "township",
    region: "north",
    highlight:
      "An agricultural northern township where local operators need clear, professional online presence.",
  },
  {
    name: "Bruce Township",
    slug: "bruce-township",
    type: "township",
    region: "north",
    highlight:
      "A rural-suburban township north of Romeo with growing home-service and small-business demand.",
  },
  {
    name: "Ray Township",
    slug: "ray-township",
    type: "township",
    region: "north",
    highlight:
      "A quieter northern township where local contractors and family businesses serve a wide radius.",
  },
  {
    name: "Lenox Township",
    slug: "lenox-township",
    type: "township",
    region: "north",
    highlight:
      "Home to New Haven and nearby corridors — a practical market for websites that drive phone calls.",
  },
  {
    name: "New Haven",
    slug: "new-haven",
    type: "village",
    region: "north",
    highlight:
      "A growing village along Gratiot where new businesses need to stand out from day one.",
  },
  {
    name: "Richmond",
    slug: "richmond",
    type: "city",
    region: "north",
    highlight:
      "A northern gateway city serving Macomb and St. Clair customers who search locally for services.",
  },
  {
    name: "Richmond Township",
    slug: "richmond-township",
    type: "township",
    region: "north",
    highlight:
      "A rural township around Richmond where local operators win with clear websites and strong reviews.",
  },
  {
    name: "Memphis",
    slug: "memphis",
    type: "city",
    region: "north",
    highlight:
      "A small city on Macomb’s northern edge where local businesses serve a broad surrounding area.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getCitiesByRegion(region: CityRegion): City[] {
  return cities.filter((city) => city.region === region);
}

export function typeLabel(type: CityType): string {
  switch (type) {
    case "charter-township":
      return "charter township";
    case "township":
      return "township";
    case "village":
      return "village";
    default:
      return "city";
  }
}
