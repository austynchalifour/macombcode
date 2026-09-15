export type CourseType = "first-time" | "renewal" | "private" | "basics";

export type Course = {
  id: CourseType;
  name: string;
  summary: string;
  duration: string;
};

export type PathOption = {
  id: string;
  label: string;
  hint: string;
  course: CourseType;
  headline: string;
  body: string;
  bring: string;
  nextStep: string;
};

export type ClassDate = {
  id: string;
  date: string;
  time: string;
  course: CourseType;
  seats: number;
};

export const company = {
  name: "Lakeside CPL",
  shortName: "Lakeside",
  phone: "(586) 555-0182",
  phoneHref: "tel:+15865550182",
  email: "classes@lakesidecpl.demo",
  address: "39800 Jefferson Avenue, Harrison Township, MI 48045",
  hours: "Classes by schedule · Office Mon–Fri 9am–5pm",
  tagline:
    "Michigan Concealed Pistol License training for Macomb County — first-time, renewal, and fundamentals.",
};

export const courses: Course[] = [
  {
    id: "first-time",
    name: "First-time CPL",
    duration: "8 hours",
    summary:
      "Classroom + range qualification for your first Michigan Concealed Pistol License — paperwork walkthrough included.",
  },
  {
    id: "renewal",
    name: "CPL renewal",
    duration: "4 hours",
    summary:
      "Renewal refresher and qualification so you’re ready when the clerk asks for your certificate.",
  },
  {
    id: "private",
    name: "Private lesson",
    duration: "1–2 hours",
    summary:
      "One-on-one range time for grip, draw, or confidence before class day — not a substitute for the CPL course.",
  },
  {
    id: "basics",
    name: "NRA basics",
    duration: "Half day",
    summary:
      "Foundational pistol safety and handling for new shooters who aren’t ready for CPL day yet.",
  },
];

export const pathOptions: PathOption[] = [
  {
    id: "new-cpl",
    label: "I need my first Michigan CPL",
    hint: "Never held a CPL before",
    course: "first-time",
    headline: "Book a first-time CPL course",
    body: "You’ll complete classroom instruction and a live-fire qualification. We issue a certificate you take to the Macomb County Clerk — this is training, not the license itself.",
    bring: "Valid photo ID, eye/ear protection (loaners available), and a notepad.",
    nextStep: "After class: apply or renew at the County Clerk with your certificate.",
  },
  {
    id: "renewing",
    label: "My CPL is up for renewal",
    hint: "License expiring or expired recently",
    course: "renewal",
    headline: "Book a renewal class",
    body: "Shorter classroom + qualification focused on what’s changed and proving you’re still safe on the line. Bring your current or expired CPL if you have it.",
    bring: "Photo ID, current/expired CPL if available, eye/ear protection.",
    nextStep: "File renewal with the clerk using your new certificate.",
  },
  {
    id: "nervous",
    label: "I’m new to pistols / want private help",
    hint: "Before or after a group class",
    course: "private",
    headline: "Schedule a private lesson",
    body: "Quiet one-on-one time to dial in fundamentals. Great before a first-time CPL so class day isn’t your first trigger press.",
    bring: "Photo ID. Firearm optional — we can provide a training pistol for lessons.",
    nextStep: "Most students follow up with a first-time CPL course.",
  },
  {
    id: "fundamentals",
    label: "I want basics, not a CPL yet",
    hint: "Safety and handling first",
    course: "basics",
    headline: "Start with NRA basics",
    body: "Half-day fundamentals without the CPL paperwork track. When you’re ready for a license course, we’ll place you in the right date.",
    bring: "Photo ID and comfortable closed-toe shoes.",
    nextStep: "Graduate into a first-time CPL when you’re ready.",
  },
];

export const upcomingClasses: ClassDate[] = [
  {
    id: "ft-0328",
    date: "Sat, Mar 28",
    time: "8:00 am – 4:00 pm",
    course: "first-time",
    seats: 6,
  },
  {
    id: "rn-0404",
    date: "Sat, Apr 4",
    time: "9:00 am – 1:00 pm",
    course: "renewal",
    seats: 8,
  },
  {
    id: "bs-0411",
    date: "Sat, Apr 11",
    time: "9:00 am – 1:00 pm",
    course: "basics",
    seats: 10,
  },
  {
    id: "ft-0418",
    date: "Sat, Apr 18",
    time: "8:00 am – 4:00 pm",
    course: "first-time",
    seats: 4,
  },
  {
    id: "rn-0502",
    date: "Sat, May 2",
    time: "9:00 am – 1:00 pm",
    course: "renewal",
    seats: 8,
  },
];

export const promises = [
  {
    title: "NRA-certified instructors",
    copy: "Classroom and range led by instructors who teach Michigan CPL requirements — not weekend YouTube tactics.",
  },
  {
    title: "Macomb County focus",
    copy: "We train for the clerk’s desk you’ll actually visit. Harrison Township base, students from Warren to Chesterfield.",
  },
  {
    title: "Safety first, always",
    copy: "Clear range commands, slow when it needs to be slow, and zero tolerance for unsafe handling.",
  },
  {
    title: "Straight answers",
    copy: "What the class covers, what the clerk handles, and what we don’t do — no scare-upsell, no legal advice.",
  },
] as const;

export const areas = [
  "Harrison Township",
  "Mount Clemens",
  "Clinton Township",
  "Chesterfield",
  "St. Clair Shores",
  "Macomb Township",
  "New Baltimore",
  "Fraser",
  "Roseville",
  "Macomb County",
] as const;

export const courseLabels: Record<CourseType, string> = {
  "first-time": "First-time CPL",
  renewal: "CPL renewal",
  private: "Private lesson",
  basics: "NRA basics",
};

export const COURSE_PRESET_KEY = "lcpl-course";
export const COURSE_PRESET_EVENT = "lcpl-preset-course";
