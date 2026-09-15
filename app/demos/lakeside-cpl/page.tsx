import Courses from "./components/Courses";
import DemoBanner from "./components/DemoBanner";
import EnrollSection from "./components/EnrollSection";
import Hero from "./components/Hero";
import PathfinderSection from "./components/PathfinderSection";
import Schedule from "./components/Schedule";
import SiteFooter from "./components/SiteFooter";
import WhyUs from "./components/WhyUs";

export default function LakesideCplPage() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <Courses />
        <PathfinderSection />
        <WhyUs />
        <Schedule />
        <EnrollSection />
      </main>
      <SiteFooter />
    </>
  );
}
