import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";
import InvestmentVisualizations from "@/components/InvestmentVisualizations";
import FinancialAnalytics from "@/components/FinancialAnalytics";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import InvestmentGuide from "@/components/InvestmentGuide";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <InvestmentGuide />
      <FeatureCards />
      <FeaturedProperties />
      <HowItWorks />
      <InvestmentVisualizations />
      <FinancialAnalytics />
      <FAQ />
      <Newsletter />
    </>
  );
}
