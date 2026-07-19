import About from "./components/About";
import CatalogSection from "./components/CatalogSection";
import DemoBanner from "./components/DemoBanner";
import Hero from "./components/Hero";
import SiteFooter from "./components/SiteFooter";
import VisitSection from "./components/VisitSection";

export default function NorthsideSupplyPage() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <About />
        <CatalogSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </>
  );
}
