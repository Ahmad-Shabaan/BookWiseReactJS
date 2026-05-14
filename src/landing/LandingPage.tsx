import Navbar from "@/shared/components/layout/Header/Navbar";
import { HeroSection } from "./sections/Hero/HeroSection";
import TrendingSection from "./sections/Trending/TrendingSection";
import MarketingSection from "./sections/Marketing/MarketingSection";
import FeaturesSection from "./sections/Features/FeaturesSection";
import AuthorsSection from "./sections/Authors/AuthorsSection";
import UserFlowSection from "./sections/UserFlow/UserFlowSection";
import { TestimonialsSection } from "./sections/Testimonials/TestimonialsSection";
import PricingSection from "./sections/Pricing/PricingSection";
import FAQSection from "./sections/FAQ/FAQSection";
import { CTASection } from "./sections/CTA/CTASection";
import Footer from "@/shared/components/layout/Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <TrendingSection />
      <MarketingSection />
      <FeaturesSection />
      <AuthorsSection />
      <UserFlowSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;
