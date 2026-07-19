import { getMenu } from "@/lib/cms/romeo-and-vine/client";
import DemoBanner from "./components/DemoBanner";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import ReserveSection from "./components/ReserveSection";
import SiteFooter from "./components/SiteFooter";
import Story from "./components/Story";

export default async function RomeoAndVinePage() {
  const menu = await getMenu();

  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <Story />
        <MenuSection
          specials={menu.dailySpecials.filter((s) => s.available)}
          sections={menu.sections}
          updatedAt={menu.updatedAt}
        />
        <ReserveSection restaurant={menu.restaurant} />
      </main>
      <SiteFooter restaurant={menu.restaurant} />
    </>
  );
}
