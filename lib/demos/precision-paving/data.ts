export const company = {
  name: "Precision Paving & Sealing LLC",
  shortName: "Precision Paving",
  phone: "(248) 270-5246",
  phoneHref: "tel:+12482705246",
  email: "Brandon.Precisionpaving@gmail.com",
  city: "Waterford Township, MI",
  tagline: "Clean work. Durable results. Fair pricing.",
  facebook: "https://www.facebook.com/precisionpavingllc/",
} as const;

export const services = [
  {
    id: "asphalt",
    name: "Asphalt paving",
    summary:
      "New driveways, parking lots, and asphalt installs built for Michigan weather and long wear.",
  },
  {
    id: "sealing",
    name: "Sealcoating",
    summary:
      "Protect and refresh faded asphalt — a clean black finish that lasts longer and looks sharp.",
  },
  {
    id: "concrete",
    name: "Concrete",
    summary:
      "Walks, pads, and concrete work done clean — square edges, solid base, fair price.",
  },
  {
    id: "striping",
    name: "Line striping",
    summary:
      "Parking lots from faded to flawless — clear lines that look organized and professional.",
  },
  {
    id: "gravel",
    name: "Gravel & base",
    summary:
      "Gravel driveways and base prep that set the job up right before the surface goes down.",
  },
  {
    id: "excavation",
    name: "Excavation",
    summary:
      "Site prep and excavation so the pavement sits on a solid foundation — not shortcuts.",
  },
] as const;

export const promises = [
  {
    title: "Locally owned",
    copy: "Waterford Township–based crew that shows up, does clean work, and stands behind it.",
  },
  {
    title: "Built to last",
    copy: "We focus on durability — proper prep and materials so the job holds up season after season.",
  },
  {
    title: "Fair pricing",
    copy: "Straight estimates, no games. Free quotes so you know the number before we start.",
  },
  {
    title: "From driveways to lots",
    copy: "Residential and commercial — paving, sealing, concrete, gravel, striping, and more.",
  },
] as const;

export const areas = [
  "Waterford Township",
  "Pontiac",
  "White Lake",
  "Commerce",
  "Independence",
  "Orion",
  "Clarkston",
  "Oakland County",
  "Metro Detroit",
] as const;
