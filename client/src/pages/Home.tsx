import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import BlockchainDetails from "@/components/BlockchainDetails";
import HowItWorks from "@/components/HowItWorks";
import InvestmentVisualizations from "@/components/InvestmentVisualizations";
import FinancialAnalytics from "@/components/FinancialAnalytics";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedProperties />
      <BlockchainDetails />
      <HowItWorks />
      <InvestmentVisualizations />
      <FinancialAnalytics />
      <FAQ />
      <Newsletter />
    </>
  );
}
