import Areas from "./components/Areas";
import DemoBanner from "./components/DemoBanner";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import Services from "./components/Services";
import SiteFooter from "./components/SiteFooter";
import WhyUs from "./components/WhyUs";

export default function PrecisionPavingPage() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Areas />
        <QuoteSection />
      </main>
      <SiteFooter />
    </>
  );
}
