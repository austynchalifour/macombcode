export type VisitType =
  | "cleaning"
  | "checkup"
  | "new-patient"
  | "emergency"
  | "cosmetic"
  | "kids";

export type VisitOption = {
  id: VisitType;
  name: string;
  duration: string;
  summary: string;
};

export const practice = {
  name: "Harbor Point Family Dental",
  shortName: "Harbor Point",
  phone: "(586) 555-0174",
  phoneHref: "tel:+15865550174",
  email: "hello@harborpointdental.demo",
  address: "24800 Jefferson Avenue, St. Clair Shores, MI 48080",
  hours: "Mon–Thu 8am–5pm · Fri 8am–2pm",
  tagline: "Gentle dentistry for the whole family — by the lake.",
};

export const visitTypes: VisitOption[] = [
  {
    id: "cleaning",
    name: "Cleaning & exam",
    duration: "60 min",
    summary: "Routine cleaning, exam, and X-rays as needed.",
  },
  {
    id: "checkup",
    name: "Problem-focused visit",
    duration: "45 min",
    summary: "Tooth pain, chips, sensitivity, or a second look.",
  },
  {
    id: "new-patient",
    name: "New patient visit",
    duration: "75 min",
    summary: "Full exam, cleaning, and a calm walkthrough of your plan.",
  },
  {
    id: "kids",
    name: "Kids' appointment",
    duration: "45 min",
    summary: "Friendly visits for little smiles — no rush, no scares.",
  },
  {
    id: "cosmetic",
    name: "Cosmetic consult",
    duration: "30 min",
    summary: "Whitening, bonding, or smile goals — no pressure.",
  },
  {
    id: "emergency",
    name: "Dental emergency",
    duration: "Same day",
    summary: "Broken tooth, swelling, or pain that can't wait.",
  },
];

export const timeSlots = [
  { value: "08:00", label: "8:00 am" },
  { value: "09:00", label: "9:00 am" },
  { value: "10:00", label: "10:00 am" },
  { value: "11:00", label: "11:00 am" },
  { value: "13:00", label: "1:00 pm" },
  { value: "14:00", label: "2:00 pm" },
  { value: "15:00", label: "3:00 pm" },
  { value: "16:00", label: "4:00 pm" },
];

export const visitLabels: Record<VisitType, string> = Object.fromEntries(
  visitTypes.map((v) => [v.id, v.name]),
) as Record<VisitType, string>;

export const carePoints = [
  {
    title: "Book online, skip the phone tag",
    body: "Pick a time, finish intake once, and walk in ready — forms done before you arrive.",
  },
  {
    title: "Family care, one roof",
    body: "Kids, parents, and grandparents — same gentle team that remembers your name.",
  },
  {
    title: "Insurance, explained plainly",
    body: "We check benefits ahead when we can, so chair-side surprises stay rare.",
  },
];
