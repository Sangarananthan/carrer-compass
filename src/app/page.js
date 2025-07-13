import HeroSection from "@/components/hero-section";
import AboutFeatures from "@/components/about-features";
import CategoriesSection from "@/components/categories-section";
import HelpSection from "@/components/help-section";
import CTACards from "@/components/cta-cards";
import PopularCoursesSection from "@/components/popular-courses-section";
import ReviewsSection from "@/components/reviews-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutFeatures />
      <CategoriesSection />
      <PopularCoursesSection />
      <HelpSection />
      <CTACards />
      <ReviewsSection />
    </>
  );
}
