import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Work />
        <Services />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
