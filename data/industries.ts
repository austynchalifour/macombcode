export type IndustryFaq = {
  question: string;
  answer: string;
};

export type Industry = {
  slug: string;
  name: string;
  singular: string;
  keywordPhrase: string;
  intro: string;
  painPoints: string[];
  benefits: string[];
  faqs: IndustryFaq[];
  relatedDemoSlugs: string[];
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    singular: "restaurant",
    keywordPhrase: "restaurant website designer Michigan",
    intro:
      "Macomb Code builds restaurant websites that make menus easy to scan, reservations obvious, and your location impossible to miss — so hungry locals choose you instead of scrolling past.",
    painPoints: [
      "Outdated menus that force guests to call for hours, specials, or pricing",
      "Slow mobile pages that lose diners searching near dining corridors",
      "Weak Google presence compared to chains with polished booking flows",
      "No clear path from “looking for dinner” to a reserved table or takeout order",
    ],
    benefits: [
      "Menu-first layouts that load fast on phones",
      "Clear CTAs for call, directions, reserve, or order",
      "Local SEO structure for city and corridor searches",
      "Seasonal update paths so specials stay current",
    ],
    faqs: [
      {
        question: "Do you build websites for restaurants in Macomb County?",
        answer:
          "Yes. We design restaurant sites for Macomb County kitchens, cafés, bars, and banquet spaces — with menus, hours, location, and booking paths built for mobile diners.",
      },
      {
        question: "Can you update menus without a developer every time?",
        answer:
          "We set up simple update workflows so you can change specials, hours, and seasonal items without waiting on a freelancer for every tweak.",
      },
      {
        question: "Will my restaurant site help with local search?",
        answer:
          "We structure pages, titles, and location signals so guests searching near your city or corridor can find you — then convert with clear next steps.",
      },
    ],
    relatedDemoSlugs: ["romeo-and-vine"],
  },
  {
    slug: "roofing",
    name: "Roofing",
    singular: "roofing company",
    keywordPhrase: "roofing website designer Michigan",
    intro:
      "Roofing companies in Michigan win when homeowners can request a quote in seconds. We build roofing websites that lead with trust, services, and a fast path to a storm or inspection call.",
    painPoints: [
      "Generic template sites that look like every other contractor",
      "Buried contact forms that cost storm-season leads",
      "No service-area clarity for Macomb County and nearby suburbs",
      "Weak proof — missing photos, reviews, or financing CTAs",
    ],
    benefits: [
      "Quote-first hero and sticky call buttons on mobile",
      "Service pages for repair, replacement, and inspections",
      "Local landing structure for cities you actually serve",
      "Photo and review placement that builds trust fast",
    ],
    faqs: [
      {
        question: "What should a roofing website include?",
        answer:
          "Clear services, service areas, storm/emergency messaging, photo proof, financing notes if you offer them, and a quote form that works on phones in under a minute.",
      },
      {
        question: "Can you help us rank for roofing searches in our city?",
        answer:
          "Yes. We build city-aware pages and on-page structure aimed at high-intent searches like roofing and roof repair near your Macomb County markets.",
      },
      {
        question: "How fast can a roofing site launch?",
        answer:
          "Timeline depends on scope, photos, and content readiness. Many roofing marketing sites ship in weeks — we map a realistic plan on the first call.",
      },
    ],
    relatedDemoSlugs: ["northside-supply"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    singular: "HVAC company",
    keywordPhrase: "HVAC website designer Michigan",
    intro:
      "When AC fails in July or heat drops in January, homeowners search and call the first company that looks ready. We build HVAC sites that capture emergency and install leads around the clock.",
    painPoints: [
      "Buried phone numbers on mobile when customers need help now",
      "No seasonal messaging for tune-ups, installs, or emergency repair",
      "Confusing service lists that don’t match how people search",
      "Sites that feel national-franchise generic instead of local",
    ],
    benefits: [
      "Tap-to-call and emergency CTAs above the fold",
      "Service pages for heating, cooling, installs, and maintenance",
      "Local SEO for Macomb County cities you cover",
      "Lead forms that capture address, system type, and urgency",
    ],
    faqs: [
      {
        question: "Do you design HVAC websites for Michigan companies?",
        answer:
          "Yes. We build HVAC marketing sites for Macomb County and Metro Detroit contractors — focused on phone calls, service bookings, and seasonal campaigns.",
      },
      {
        question: "Can the site handle emergency repair traffic?",
        answer:
          "We prioritize mobile speed, click-to-call, and clear emergency messaging so after-hours searchers can reach you without hunting for a number.",
      },
      {
        question: "Do you have an HVAC demo we can preview?",
        answer:
          "Yes — see our Clemens Heating & Cooling demo for an example of how we present HVAC services, trust, and lead capture.",
      },
    ],
    relatedDemoSlugs: ["clemens-heating-cooling"],
  },
  {
    slug: "dentists",
    name: "Dentists",
    singular: "dental practice",
    keywordPhrase: "dentist website designer Michigan",
    intro:
      "Dental practices need websites that feel calm, credible, and easy to book. We design dentist sites that highlight services, insurance clarity, and appointment paths for Macomb County patients.",
    painPoints: [
      "Stock-photo sites that don’t build patient trust",
      "Hard-to-find new-patient or emergency booking paths",
      "Unclear insurance and service information",
      "Slow pages that frustrate patients on mobile",
    ],
    benefits: [
      "Warm, professional design that matches your chairside care",
      "Clear paths to request appointments and call the office",
      "Service pages for cleanings, cosmetics, implants, and more",
      "Local SEO so nearby patients find your practice first",
    ],
    faqs: [
      {
        question: "Do you build websites for dental offices?",
        answer:
          "Yes. We design dentist websites for Macomb County practices — with services, team trust, insurance notes, and appointment CTAs patients expect.",
      },
      {
        question: "Can patients request appointments online?",
        answer:
          "We can integrate or design appointment request flows that match how your front desk works — from simple forms to deeper booking tools.",
      },
      {
        question: "Is there a dental demo we can review?",
        answer:
          "Yes — Harbor Point Dental is our practice demo showing how we present services, trust, and booking for local patients.",
      },
    ],
    relatedDemoSlugs: ["harbor-point-dental"],
  },
  {
    slug: "contractors",
    name: "Contractors",
    singular: "contractor",
    keywordPhrase: "contractor website designer Michigan",
    intro:
      "General contractors and trade businesses win work when homeowners and property managers can see proof and request a quote quickly. We build contractor websites built for calls and project inquiries.",
    painPoints: [
      "Outdated sites that don’t show recent projects or licenses",
      "Quote forms that ask for too much or break on mobile",
      "No clear service list for remodeling, repair, or commercial work",
      "Weak local visibility against competitors with modern sites",
    ],
    benefits: [
      "Project galleries and trust signals that sell capability",
      "Quote CTAs that work on phones at the jobsite and at home",
      "Service and area pages for Macomb County markets",
      "Fast, mobile-first builds that protect lead quality",
    ],
    faqs: [
      {
        question: "What types of contractors do you work with?",
        answer:
          "Remodelers, general contractors, paving and outdoor trades, supply-adjacent businesses, and specialty trades across Macomb County — as long as the goal is more qualified leads.",
      },
      {
        question: "Can you showcase our past projects?",
        answer:
          "Yes. We structure galleries and case-style sections so visitors see the quality of your work before they call.",
      },
      {
        question: "Will the site help with Google searches in our city?",
        answer:
          "We build on-page structure and local landing paths aimed at high-intent contractor searches in the cities you serve.",
      },
    ],
    relatedDemoSlugs: ["northside-supply"],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const industrySlugs = industries.map((industry) => industry.slug);
