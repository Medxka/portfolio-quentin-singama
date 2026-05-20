import { Hero } from "@/components/Hero";
import { StatusSection } from "@/components/StatusSection";
import { FeaturedMusthane } from "@/components/FeaturedMusthane";
import { SelectedWork } from "@/components/SelectedWork";

export default function Home() {
  return (
    <>
      <Hero />
      <StatusSection />
      <FeaturedMusthane />
      <SelectedWork />
    </>
  );
}
