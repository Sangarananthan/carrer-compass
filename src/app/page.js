import HeroSection from "@/components/hero-section";
import AboutFeatures from "@/components/about-features";
import CategoriesSection from "@/components/categories-section";
import HelpSection from "@/components/help-section";
import CTACards from "@/components/cta-cards";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutFeatures />
      <CategoriesSection />
      <HelpSection />
      <CTACards />
    </>
  );
}
