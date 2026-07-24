import type { City } from "@/data/cities";
import type { Industry } from "@/data/industries";
import type { WebDesignCityContent } from "@/data/web-design-cities";

export function webDesignCityTitle(city: City) {
  return `${city.name} Web Design Company`;
}

export function webDesignCityH1(city: City) {
  return `Professional Website Design in ${city.name}, MI`;
}

export function webDesignCityDescription(
  city: City,
  page: WebDesignCityContent,
) {
  const clipped =
    page.intro.length > 155 ? `${page.intro.slice(0, 152).trim()}…` : page.intro;
  return clipped;
}

export function industryTitle(industry: Industry) {
  return `${industry.name} Website Designer Michigan`;
}

export function industryH1(industry: Industry) {
  return `Website Design for ${industry.name} in Michigan`;
}

export function industryDescription(industry: Industry) {
  const clipped =
    industry.intro.length > 155
      ? `${industry.intro.slice(0, 152).trim()}…`
      : industry.intro;
  return clipped;
}

export function industryCityTitle(industry: Industry, city: City) {
  return `${city.name} ${industry.singular} Website Designer`;
}

export function industryCityH1(industry: Industry, city: City) {
  return `${industry.name} Website Design in ${city.name}, MI`;
}

export function industryCityDescription(
  industry: Industry,
  city: City,
  intro: string,
) {
  const clipped =
    intro.length > 155 ? `${intro.slice(0, 152).trim()}…` : intro;
  return clipped || `${industry.name} website design for ${city.name} businesses by Macomb Code.`;
}

export function cityHubTitle(city: City) {
  return `${city.name} Websites & Software`;
}

export function cityHubDescription(city: City, typeLabel: string) {
  return `Websites, software, and AI solutions for businesses in ${city.name}, Michigan. Macomb Code helps ${typeLabel} companies get found online and win more work across Macomb County.`;
}

export const websiteProcessSteps = [
  {
    title: "Discover",
    copy: "We clarify your offer, customers, and what a win looks like — leads, bookings, or brand clarity.",
  },
  {
    title: "Structure",
    copy: "We map pages, CTAs, and local SEO structure so visitors know what you do and how to reach you.",
  },
  {
    title: "Design & build",
    copy: "We design and develop a fast, mobile-first site that matches your brand and converts traffic.",
  },
  {
    title: "Launch & care",
    copy: "We launch cleanly, then optionally stay on retainer for updates, SEO tweaks, and improvements.",
  },
] as const;
