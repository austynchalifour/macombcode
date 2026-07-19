import BookSection from "./components/BookSection";
import Care from "./components/Care";
import DemoBanner from "./components/DemoBanner";
import Hero from "./components/Hero";
import SiteFooter from "./components/SiteFooter";
import VisitSection from "./components/VisitSection";

export default function HarborPointDentalPage() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <Care />
        <BookSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </>
  );
}
