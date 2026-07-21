export type ServicePlan = {
  name: string;
  priceLabel: string;
  blurb: string;
  includes: string[];
  featured?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  shortCopy: string;
  outcomes: string[];
  plans: ServicePlan[];
};

export const services: Service[] = [
  {
    slug: "websites",
    name: "Websites",
    eyebrow: "Website retainers",
    headline: "A site that keeps working after launch.",
    intro:
      "Marketing sites and storefronts built to convert — then cared for month after month so you stay fast, clear, and easy to contact.",
    shortCopy:
      "Marketing sites and storefronts designed to convert — clear structure, strong brand presence, and performance that feels instant.",
    outcomes: [
      "Clear offers and calls to action that turn visits into calls and quotes",
      "Mobile-first pages that load fast on local search traffic",
      "Ongoing updates so hours, services, and seasonal offers stay accurate",
      "A partner who already knows your stack when something breaks",
    ],
    plans: [
      {
        name: "Site Care",
        priceLabel: "$149/mo",
        blurb:
          "Keep the lights on — hosting coordination, backups, and small fixes without hunting freelancers.",
        includes: [
          "Hosting coordination, SSL, and backups",
          "Minor text and image updates",
          "Bug fixes and uptime checks",
          "Email support with next-business-day response",
        ],
      },
      {
        name: "Site Growth",
        priceLabel: "$299/mo",
        blurb:
          "Care plus steady improvements — local SEO basics, form checks, and monthly polish that wins more leads.",
        includes: [
          "Everything in Site Care",
          "Monthly design or content improvements",
          "Basic local SEO and page structure tweaks",
          "Form and lead-path monitoring",
        ],
        featured: true,
      },
      {
        name: "Site Partner",
        priceLabel: "$499/mo",
        blurb:
          "Priority turnaround and conversion work when the site is a core part of how you get customers.",
        includes: [
          "Everything in Site Growth",
          "Priority turnaround on requests",
          "Conversion tweaks and CTA testing",
          "Quarterly check-in call",
        ],
      },
    ],
  },
  {
    slug: "software",
    name: "Software",
    eyebrow: "Software retainers",
    headline: "Custom tools that keep pace with how you operate.",
    intro:
      "Scheduling, intake, dashboards, and workflows built for your team — then improved on a monthly cadence instead of a one-and-done handoff.",
    shortCopy:
      "Custom tools for operations, scheduling, and customer workflows so your team spends less time wrestling spreadsheets.",
    outcomes: [
      "Tools shaped around your real process, not generic software templates",
      "Less spreadsheet busywork for scheduling, intake, and follow-up",
      "Integrations that connect the systems you already use",
      "A reserved monthly capacity so features don’t wait on “someday”",
    ],
    plans: [
      {
        name: "Sprint",
        priceLabel: "$750/mo",
        blurb:
          "Scoped monthly improvements on an existing tool — a small feature batch without a full project kickoff.",
        includes: [
          "Monthly scoped feature or fix batch",
          "Bug triage and small UX improvements",
          "Async updates on progress",
          "Best for tools we already built or maintain",
        ],
      },
      {
        name: "Build",
        priceLabel: "$1,500/mo",
        blurb:
          "Ongoing feature development, integrations, and workflow automation as your operations grow.",
        includes: [
          "Everything in Sprint",
          "Ongoing feature development",
          "Integrations and workflow automation",
          "Monthly planning check-in",
        ],
        featured: true,
      },
      {
        name: "Ops",
        priceLabel: "$2,500/mo",
        blurb:
          "Dedicated capacity and a priority queue for the tools that run your day-to-day.",
        includes: [
          "Everything in Build",
          "Reserved monthly engineering capacity",
          "Priority request queue",
          "Ops and support for the tools we build",
        ],
      },
    ],
  },
  {
    slug: "support",
    name: "Support",
    eyebrow: "Support retainers",
    headline: "A local partner before Monday morning.",
    intro:
      "Updates, improvements, and someone who already knows your stack — so issues get fixed before they cost you leads.",
    shortCopy:
      "Updates, improvements, and a partner who knows your stack when something needs fixing before Monday morning.",
    outcomes: [
      "Someone familiar with your site or tools when something breaks",
      "Proactive maintenance instead of emergency fire drills",
      "Small improvements that compound month over month",
      "Clear response expectations you can plan around",
    ],
    plans: [
      {
        name: "Essentials",
        priceLabel: "$99/mo",
        blurb:
          "Monitoring and small fixes for sites we know — coverage when something needs attention.",
        includes: [
          "Light monitoring for sites we maintain",
          "Small fixes and content corrections",
          "Email support",
          "Best for low-change sites that still need a backstop",
        ],
      },
      {
        name: "Priority",
        priceLabel: "$199/mo",
        blurb:
          "Faster response, monthly improvements, and a partner who stays fluent in your stack.",
        includes: [
          "Everything in Essentials",
          "Faster response window",
          "Monthly improvements and polish",
          "Stack familiarity for sites and simple tools",
        ],
        featured: true,
      },
      {
        name: "Dedicated",
        priceLabel: "$349/mo",
        blurb:
          "Reserved hours and same-week requests when support is part of how you run the business.",
        includes: [
          "Everything in Priority",
          "Reserved monthly hours",
          "Proactive maintenance",
          "Same-week request handling",
        ],
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
