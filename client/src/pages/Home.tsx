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
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <>
      <SEO 
        title={t('home.seo.title', '블록체인 기반 부동산 투자 플랫폼')}
        description={t('home.seo.description', 'SaharaRealTech는 블록체인 기술을 활용한 부동산 투자 플랫폼으로, 토큰화를 통해 글로벌 부동산 투자를 민주화합니다. 고급 금융 분석과 다국어 지원을 제공합니다.')}
        keywords={t('home.seo.keywords', '부동산 투자, 블록체인, 토큰화, 부동산 토큰, 분산 투자, 실물 자산, Avalanche 프로토콜')}
        ogImage="https://saharatech.com/og-image.jpg"
      />
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
