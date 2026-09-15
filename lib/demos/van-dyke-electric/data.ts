export type ServiceType =
  | "emergency"
  | "panel"
  | "ev"
  | "lighting"
  | "outlets"
  | "generator";

export type Urgency = "emergency" | "urgent" | "schedule";

export type Service = {
  id: ServiceType;
  name: string;
  summary: string;
};

export type Symptom = {
  id: string;
  label: string;
  hint: string;
  urgency: Urgency;
  service: ServiceType;
  headline: string;
  body: string;
};

export const company = {
  name: "Van Dyke Electric",
  shortName: "Van Dyke",
  phone: "(586) 555-0134",
  phoneHref: "tel:+15865550134",
  email: "service@vandykeelectric.demo",
  address: "24850 Van Dyke Avenue, Warren, MI 48093",
  hours: "Mon–Fri 7am–6pm · Sat 8am–2pm · 24/7 emergency",
  tagline: "Licensed electricians for Warren, Sterling Heights, and Macomb County.",
};

export const services: Service[] = [
  {
    id: "emergency",
    name: "Emergency electrical",
    summary: "No power, sparks, burning smell — after-hours dispatch when it can’t wait until morning.",
  },
  {
    id: "panel",
    name: "Panel upgrades",
    summary: "100- to 200-amp service, new breakers, and the capacity a remodel or EV charger actually needs.",
  },
  {
    id: "ev",
    name: "EV charger install",
    summary: "Level 2 home chargers wired to code — load calc, permit, and a clean run from the panel.",
  },
  {
    id: "lighting",
    name: "Lighting & remodel",
    summary: "Recessed cans, kitchen rewires, and finish work that looks like it belonged there all along.",
  },
  {
    id: "outlets",
    name: "Outlets & circuits",
    summary: "Dead receptacles, GFCI, dedicated circuits, and the mystery trip you keep resetting.",
  },
  {
    id: "generator",
    name: "Generator hookup",
    summary: "Standby generator transfer switches so a DTE outage doesn’t take the whole house with it.",
  },
];

export const promises = [
  {
    title: "Licensed & insured",
    copy: "Michigan-licensed electricians. We pull permits when the job requires them — no gray-area work.",
  },
  {
    title: "24/7 emergency",
    copy: "A real on-call number, not a voicemail that rings until Monday. After-hours when it’s unsafe to wait.",
  },
  {
    title: "Straight answers",
    copy: "What’s wrong, what it costs, and what can wait. No scare-upsell on a tripped breaker.",
  },
  {
    title: "Local trucks",
    copy: "Based on Van Dyke in Warren — we already drive your streets. Same-day when the board allows.",
  },
] as const;

export const areas = [
  "Warren",
  "Sterling Heights",
  "Center Line",
  "Roseville",
  "Fraser",
  "Clinton Township",
  "Madison Heights",
  "Eastpointe",
  "Utica",
  "Macomb County",
] as const;

export const symptoms: Symptom[] = [
  {
    id: "burning",
    label: "Burning smell or smoke",
    hint: "From an outlet, switch, or the panel",
    urgency: "emergency",
    service: "emergency",
    headline: "Treat this as an emergency",
    body: "If you can do it safely, shut off the breaker. If you see smoke, get out and call 911 first. Then call us — don’t wait on a form.",
  },
  {
    id: "sparks",
    label: "Sparks or a hot outlet",
    hint: "Heat, crackle, or scorch marks",
    urgency: "emergency",
    service: "emergency",
    headline: "Unplug and call now",
    body: "A hot or sparking receptacle can become a fire. Stop using that circuit and we’ll dispatch. This is not a next-week job.",
  },
  {
    id: "blackout",
    label: "Whole house is dark",
    hint: "Neighbors may still have power",
    urgency: "emergency",
    service: "emergency",
    headline: "If it’s just your house, call",
    body: "Check the street — if neighbors are lit, it’s likely your service or panel. We’ll talk you through a safe check and roll a truck if needed.",
  },
  {
    id: "trips",
    label: "Breaker keeps tripping",
    hint: "Same breaker, over and over",
    urgency: "urgent",
    service: "outlets",
    headline: "Urgent — don’t keep resetting it",
    body: "A breaker that trips twice is doing its job. We’ll diagnose overload vs. a fault and tell you if it can wait until morning.",
  },
  {
    id: "outlet",
    label: "One room or outlet is dead",
    hint: "Rest of the house is fine",
    urgency: "schedule",
    service: "outlets",
    headline: "Schedule a diagnostic",
    body: "Usually a GFCI, loose connection, or a tired circuit. Not an emergency — we’ll get you on the board this week.",
  },
  {
    id: "ev",
    label: "I want an EV charger",
    hint: "Level 2 at home",
    urgency: "schedule",
    service: "ev",
    headline: "We’ll quote the install",
    body: "Panel capacity, run length, and permit — that’s the job. Tell us the vehicle and garage layout and we’ll price a clean Level 2 hookup.",
  },
  {
    id: "panel",
    label: "Need more amps / a new panel",
    hint: "Remodel, addition, or charger",
    urgency: "schedule",
    service: "panel",
    headline: "Panel upgrades get a site visit",
    body: "We’ll look at the existing service, load, and what you’re adding. Straight estimate — no surprise change orders after we open the cover.",
  },
  {
    id: "lighting",
    label: "Lighting or remodel wiring",
    hint: "Kitchen, cans, or a finish-out",
    urgency: "schedule",
    service: "lighting",
    headline: "Book a remodel walkthrough",
    body: "Send photos or a punch list. We’ll price the electrical so your GC or your weekend isn’t guessing.",
  },
  {
    id: "generator",
    label: "Standby generator hookup",
    hint: "Transfer switch and interlock",
    urgency: "schedule",
    service: "generator",
    headline: "Generator work is quoted on-site",
    body: "Transfer equipment has to match your panel and the unit. We’ll confirm what you have and what the inspector will want.",
  },
];

export const serviceLabels: Record<ServiceType, string> = {
  emergency: "Emergency electrical",
  panel: "Panel upgrade",
  ev: "EV charger install",
  lighting: "Lighting & remodel",
  outlets: "Outlets & circuits",
  generator: "Generator hookup",
};

export const SERVICE_PRESET_KEY = "vde-service";
export const SERVICE_PRESET_EVENT = "vde-preset-service";
