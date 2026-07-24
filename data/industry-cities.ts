export type IndustryCityPage = {
  industrySlug: string;
  citySlug: string;
  intro: string;
};

/** Top cities for industry × location landings */
export const industryCityAllowlist = [
  "clinton-township",
  "sterling-heights",
  "warren",
  "shelby-township",
  "macomb-township",
  "st-clair-shores",
] as const;

export type IndustryCitySlug = (typeof industryCityAllowlist)[number];

/**
 * Allowlisted industry × city landing pages (5 × 6 = 30).
 * Combinations not listed here 404.
 */
export const industryCityPages: IndustryCityPage[] = [
  // Restaurants
  {
    industrySlug: "restaurants",
    citySlug: "clinton-township",
    intro:
      "Clinton Township diners search by corridor and cuisine before they commit. Macomb Code builds restaurant websites that put menus, hours, and reservations first — so hungry locals choose your kitchen instead of scrolling to the next option.",
  },
  {
    industrySlug: "restaurants",
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights restaurants compete along Hall Road and neighborhood strips where mobile search decides dinner. We design sites that load fast, showcase the menu, and make call, directions, or reserve the obvious next step.",
  },
  {
    industrySlug: "restaurants",
    citySlug: "warren",
    intro:
      "Warren’s dining scene spans casual spots and destination kitchens. Macomb Code builds restaurant websites that capture Van Dyke and 12 Mile search traffic with clear menus, atmosphere, and booking paths.",
  },
  {
    industrySlug: "restaurants",
    citySlug: "shelby-township",
    intro:
      "Shelby Township guests plan nights out online. We design restaurant sites that feel local, highlight what’s on the plate, and convert Hall Road browsers into reserved tables and takeout orders.",
  },
  {
    industrySlug: "restaurants",
    citySlug: "macomb-township",
    intro:
      "Macomb Township families and date-night diners discover restaurants on their phones. Macomb Code builds menu-first websites that make hours, location, and reservations effortless.",
  },
  {
    industrySlug: "restaurants",
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores lakeside dining deserves a site that matches the vibe. We design restaurant websites for Jefferson and marina-area kitchens — polished, mobile-ready, and built to fill seats.",
  },
  // Roofing
  {
    industrySlug: "roofing",
    citySlug: "clinton-township",
    intro:
      "Clinton Township homeowners call the first roofing company that looks ready. Macomb Code builds roofing websites with quote-first CTAs, storm messaging, and local proof so you capture high-intent leads.",
  },
  {
    industrySlug: "roofing",
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights roofing leads come from urgent searches and careful comparisons. We design sites that lead with trust, services, and a mobile quote form that works in under a minute.",
  },
  {
    industrySlug: "roofing",
    citySlug: "warren",
    intro:
      "Warren’s housing stock and commercial buildings create steady roofing demand. Macomb Code builds contractor websites that turn Van Dyke–area searches into inspection and replacement calls.",
  },
  {
    industrySlug: "roofing",
    citySlug: "shelby-township",
    intro:
      "Shelby Township roofing companies win when storm and repair searches hit a fast, credible site. We design quote-driven pages with photo proof and clear service-area messaging.",
  },
  {
    industrySlug: "roofing",
    citySlug: "macomb-township",
    intro:
      "Macomb Township’s growth means new roofs and replacements. Macomb Code builds roofing websites that help homeowners request quotes quickly and trust your crew before you arrive.",
  },
  {
    industrySlug: "roofing",
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores lakeside weather is hard on roofs. We design roofing sites that capture local repair and replacement demand with emergency CTAs and neighborhood credibility.",
  },
  // HVAC
  {
    industrySlug: "hvac",
    citySlug: "clinton-township",
    intro:
      "When AC fails in Clinton Township, homeowners search and call. Macomb Code builds HVAC websites with tap-to-call, seasonal offers, and service pages that convert emergency and install leads.",
  },
  {
    industrySlug: "hvac",
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights HVAC companies compete on response time and trust. We design sites that put the phone number first, explain heating and cooling services clearly, and capture maintenance plan signups.",
  },
  {
    industrySlug: "hvac",
    citySlug: "warren",
    intro:
      "Warren winters and summers drive urgent HVAC searches. Macomb Code builds contractor websites that load fast on mobile and route homeowners to call or request service without friction.",
  },
  {
    industrySlug: "hvac",
    citySlug: "shelby-township",
    intro:
      "Shelby Township homeowners expect polished HVAC brands. We design websites that showcase installs, repairs, and tune-ups — with lead forms that capture system type and urgency.",
  },
  {
    industrySlug: "hvac",
    citySlug: "macomb-township",
    intro:
      "Macomb Township’s newer homes still need reliable HVAC partners. Macomb Code builds sites that win install and service searches with local messaging and clear next steps.",
  },
  {
    industrySlug: "hvac",
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores lakeside homes need heating and cooling they can trust. We design HVAC websites that feel local, load quickly, and make emergency contact obvious after hours.",
  },
  // Dentists
  {
    industrySlug: "dentists",
    citySlug: "clinton-township",
    intro:
      "Clinton Township patients choose dentists who look calm, credible, and easy to book. Macomb Code builds dental websites with clear services, insurance notes, and appointment paths that reduce front-desk friction.",
  },
  {
    industrySlug: "dentists",
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights dental practices compete for new-patient searches every week. We design sites that highlight your team, services, and booking CTAs — without stock-photo genericism.",
  },
  {
    industrySlug: "dentists",
    citySlug: "warren",
    intro:
      "Warren families research dental offices before they call. Macomb Code designs dentist websites that build trust fast and make requesting an appointment the obvious next step.",
  },
  {
    industrySlug: "dentists",
    citySlug: "shelby-township",
    intro:
      "Shelby Township patients expect modern dental brands online. We build practice sites with service clarity, calming design, and mobile appointment requests that match how your office works.",
  },
  {
    industrySlug: "dentists",
    citySlug: "macomb-township",
    intro:
      "Macomb Township’s growing households need dental homes. Macomb Code builds websites that help new patients find you, understand services, and request a visit with confidence.",
  },
  {
    industrySlug: "dentists",
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores dental practices benefit from a polished lakeside-adjacent brand. We design dentist sites that feel professional, local, and ready for appointment requests.",
  },
  // Contractors
  {
    industrySlug: "contractors",
    citySlug: "clinton-township",
    intro:
      "Clinton Township contractors win when homeowners can see proof and request a quote in seconds. Macomb Code builds contractor websites with project galleries, service lists, and mobile CTAs built for calls.",
  },
  {
    industrySlug: "contractors",
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights remodeling and trade businesses compete against polished online rivals. We design contractor sites that showcase capability, clarify service areas, and convert quote requests.",
  },
  {
    industrySlug: "contractors",
    citySlug: "warren",
    intro:
      "Warren’s residential and light-commercial work starts with a search. Macomb Code builds contractor websites that turn Van Dyke–area inquiries into scheduled estimates.",
  },
  {
    industrySlug: "contractors",
    citySlug: "shelby-township",
    intro:
      "Shelby Township homeowners hire contractors who look organized online. We design sites with galleries, trust signals, and quote forms that work on phones at the kitchen table.",
  },
  {
    industrySlug: "contractors",
    citySlug: "macomb-township",
    intro:
      "Macomb Township growth means renovations and outdoor projects. Macomb Code builds contractor websites that capture that demand with clear offers and local SEO structure.",
  },
  {
    industrySlug: "contractors",
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores property owners look for reliable contractors before storms and seasons hit. We design trade websites that lead with proof, services, and a one-tap path to request a quote.",
  },
];

export function getIndustryCityPage(
  industrySlug: string,
  citySlug: string,
): IndustryCityPage | undefined {
  return industryCityPages.find(
    (page) =>
      page.industrySlug === industrySlug && page.citySlug === citySlug,
  );
}

export function getIndustryCitiesForIndustry(industrySlug: string) {
  return industryCityPages.filter((page) => page.industrySlug === industrySlug);
}

export function getIndustryCitiesForCity(citySlug: string) {
  return industryCityPages.filter((page) => page.citySlug === citySlug);
}
