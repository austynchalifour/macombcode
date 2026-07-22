import type { Metadata } from "next";
import Approach from "@/components/Approach";
import CitiesBanner from "@/components/CitiesBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: {
    absolute: "Macomb Code | Websites & Software for Local Businesses",
  },
  description: business.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Macomb Code | Websites & Software for Local Businesses",
    description: business.description,
    url: "/",
    images: [{ url: business.ogImage, alt: business.name }],
  },
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <CitiesBanner />
        <Work />
        <Services />
        <Approach />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
