export type ServiceCityPage = {
  serviceSlug: "websites";
  citySlug: string;
  /** Unique intro for this service × city combination */
  intro: string;
};

/**
 * Allowlisted service × city landing pages.
 * Combinations not listed here 404.
 */
export const serviceCityPages: ServiceCityPage[] = [
  {
    serviceSlug: "websites",
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights businesses compete across Hall Road, Van Dyke, and dense residential corridors. A clear, fast website helps customers choose you before they drive past three other options.",
  },
  {
    serviceSlug: "websites",
    citySlug: "warren",
    intro:
      "Warren’s manufacturers, retailers, and service firms need sites that load fast on mobile and make the next step obvious — call, quote, or book — for customers searching along Van Dyke and 12 Mile.",
  },
  {
    serviceSlug: "websites",
    citySlug: "clinton-township",
    intro:
      "Clinton Township shops, clinics, and contractors win when the website matches how locals search: by neighborhood, corridor, and “near me.” We build sites that turn that traffic into real inquiries.",
  },
  {
    serviceSlug: "websites",
    citySlug: "macomb-township",
    intro:
      "Macomb Township’s growing mix of professionals and service businesses needs a digital storefront that feels local and trustworthy — not a template that could belong to any suburb.",
  },
  {
    serviceSlug: "websites",
    citySlug: "shelby-township",
    intro:
      "Shelby Township businesses along Hall Road and beyond need sites that look sharp, load quickly, and make it easy for busy customers to get in touch on the first visit.",
  },
  {
    serviceSlug: "websites",
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores restaurants, marina businesses, and professional services benefit from a polished site that reflects lakeside reputation and converts browsers into booked tables or appointments.",
  },
];

export function getServiceCityPage(
  serviceSlug: string,
  citySlug: string,
): ServiceCityPage | undefined {
  return serviceCityPages.find(
    (page) =>
      page.serviceSlug === serviceSlug && page.citySlug === citySlug,
  );
}

export function isAllowedServiceCity(
  serviceSlug: string,
  citySlug: string,
): boolean {
  return Boolean(getServiceCityPage(serviceSlug, citySlug));
}
