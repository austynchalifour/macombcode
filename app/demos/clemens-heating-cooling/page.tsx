import CoverageSection from "./components/CoverageSection";
import DemoBanner from "./components/DemoBanner";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import Services from "./components/Services";
import SiteFooter from "./components/SiteFooter";

export default function ClemensHeatingCoolingPage() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <Services />
        <CoverageSection />
        <QuoteSection />
      </main>
      <SiteFooter />
    </>
  );
}
