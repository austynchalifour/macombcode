import Areas from "./components/Areas";
import DemoBanner from "./components/DemoBanner";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import Services from "./components/Services";
import SiteFooter from "./components/SiteFooter";
import TriageSection from "./components/TriageSection";
import WhyUs from "./components/WhyUs";

export default function VanDykeElectricPage() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <Services />
        <TriageSection />
        <WhyUs />
        <Areas />
        <QuoteSection />
      </main>
      <SiteFooter />
    </>
  );
}
