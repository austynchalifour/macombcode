export const bookingConfig = {
  title: "Free 15-minute walkthrough",
  description:
    "See the Macomb Code site and live demos in action — how a local business site should feel when it’s working.",
  durationMinutes: 15,
  timezone: "America/Detroit",
  timezoneLabel: "Eastern Time",
  /** 0 = Sunday … 6 = Saturday. Mon–Fri. */
  weekdays: [1, 2, 3, 4, 5] as number[],
  /** Local wall-clock hours in timezone */
  startHour: 9,
  endHour: 17,
  /** How many calendar days ahead (from tomorrow). */
  bookableDays: 14,
  /** Earliest bookable day offset from today (1 = tomorrow). */
  minLeadDays: 1,
} as const;

export type BookingPreference = "phone" | "video";
