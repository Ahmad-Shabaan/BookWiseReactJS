import Navbar from "@/shared/components/layout/Header/Navbar";
import { HeroSection } from "./sections/Hero/HeroSection";
import TrendingSection from "./sections/Trending/TrendingSection";
// import MarketingSection from "./sections/Marketing/MarketingSection";
// import FeaturesSection from "./sections/Features/FeaturesSection";
// import AuthorsSection from "./sections/Authors/AuthorsSection";
// import UserFlowSection from "./sections/UserFlow/UserFlowSection";
// import { TestimonialsSection } from "./sections/Testimonials/TestimonialsSection";
// import PricingSection from "./sections/Pricing/PricingSection";
// import FAQSection from "./sections/FAQ/FAQSection";
// import { CTASection } from "./sections/CTA/CTASection";
import Footer from "@/shared/components/layout/Footer/Footer";
import { useScrollToHash } from "@/shared/hooks/useScrollToHash";
import LazySection from "./components/LazySection";
import SkeletonSection from "./components/SkeletonSection";

const LandingPage = () => {
  useScrollToHash();
  return (
    <main className="min-h-svh">
      <Navbar />
      <HeroSection />
      <TrendingSection />
      <LazySection
        load={() => import("./sections/Marketing/MarketingSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/Features/FeaturesSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/Authors/AuthorsSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/UserFlow/UserFlowSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/Testimonials/TestimonialsSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/Pricing/PricingSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/FAQ/FAQSection")}
        fallback={<SkeletonSection />}
      />
      <LazySection
        load={() => import("./sections/CTA/CTASection")}
        fallback={<SkeletonSection />}
      />

      {/* <MarketingSection /> */}
      {/* <FeaturesSection /> */}
      {/* <AuthorsSection /> */}
      {/* <UserFlowSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}
      {/* <FAQSection /> */}
      {/* <CTASection /> */}
      <Footer />
    </main>
  );
};

export default LandingPage;
