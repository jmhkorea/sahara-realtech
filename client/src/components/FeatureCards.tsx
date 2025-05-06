import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Building, 
  Shield, 
  Clock, 
  Globe, 
  ExternalLink, 
  ChevronDown,
  Coins,
  BarChart3
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  bgColorClass: string;
  textColorClass: string;
  borderColorClass: string;
  isExternal?: boolean;
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  linkText, 
  bgColorClass,
  textColorClass,
  borderColorClass,
  isExternal = false 
}: FeatureCardProps) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden border ${borderColorClass} shadow-sm hover:shadow-md transition-all duration-300 group w-full flex flex-col`}>
      <div className="p-6 flex flex-col h-full">
        <div className={`w-16 h-16 ${bgColorClass} rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">
          {description}
        </p>
        <div className="mt-auto">
          {isExternal ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`inline-flex items-center ${textColorClass} text-sm font-medium group-hover:underline`}
            >
              {linkText}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          ) : (
            <Link href={link}>
              <div className={`inline-flex items-center ${textColorClass} text-sm font-medium group-hover:underline`}>
                {linkText}
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function FeatureCards() {
  const { t } = useTranslation();
  const [openAccordion, setOpenAccordion] = useState<string>("features");

  const cardFeatures = [
    {
      icon: <Building className="h-8 w-8 text-blue-600" />,
      title: "부동산 토큰화",
      description: "실물 부동산을 블록체인 상의 디지털 토큰으로 변환하여 소액으로도 투자할 수 있습니다.",
      link: "/real-estate-tokenization",
      linkText: "자세히 알아보기",
      bgColorClass: "bg-blue-100",
      textColorClass: "text-blue-600",
      borderColorClass: "border-blue-100"
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "안전한 거래",
      description: "스마트 컨트랙트를 통해 안전하고 투명한 부동산 거래가 보장되며, 모든 기록은 블록체인에 영구 저장됩니다.",
      link: "/secure-transactions",
      linkText: "자세히 알아보기",
      bgColorClass: "bg-emerald-100",
      textColorClass: "text-emerald-600",
      borderColorClass: "border-emerald-100"
    },
    {
      icon: <Coins className="h-8 w-8 text-purple-600" />,
      title: "분산 투자",
      description: "소액으로 여러 프리미엄 부동산에 분산 투자하여 리스크를 낮추고 안정적인 수익을 기대할 수 있습니다.",
      link: "/portfolio",
      linkText: "자세히 알아보기",
      bgColorClass: "bg-purple-100",
      textColorClass: "text-purple-600",
      borderColorClass: "border-purple-100"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-rose-600" />,
      title: "실시간 수익 분배",
      description: "투자 비율에 따라 임대 수익이 자동으로 분배되며, 블록체인을 통해 모든 과정이 투명하게 공개됩니다.",
      link: "/how-to-invest",
      linkText: "자세히 알아보기",
      bgColorClass: "bg-rose-100",
      textColorClass: "text-rose-600",
      borderColorClass: "border-rose-100"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "유동성 확보",
      description: "부동산 투자의 가장 큰 단점인 유동성 문제를 해결하여 필요할 때 쉽게 자본을 회수할 수 있습니다.",
      link: "/liquidity-enhancement",
      linkText: "자세히 알아보기",
      bgColorClass: "bg-blue-100",
      textColorClass: "text-blue-600",
      borderColorClass: "border-blue-100"
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: "글로벌 유동성 파트너사",
      description: "CTG Prime과의 파트너십을 통해 글로벌 시장에서 부동산 토큰의 유동성을 확보하고 국제 투자자와 연결됩니다.",
      link: "https://www.ctgprime.com/platform",
      linkText: "파트너사 방문하기",
      bgColorClass: "bg-indigo-100",
      textColorClass: "text-indigo-600",
      borderColorClass: "border-indigo-100",
      isExternal: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            블록체인 기반 부동산 투자의 핵심 특징
          </h2>
          <p className="text-gray-500">
            사하라 리얼테크가 제공하는 혁신적인 블록체인 부동산 투자 플랫폼의 주요 특징을 알아보세요.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className="border border-pink-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-50/30 to-purple-50/30"
            value={openAccordion}
            onValueChange={setOpenAccordion}
          >
            <AccordionItem value="features" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center text-xl font-semibold text-gray-800">
                  <span>핵심 특징 알아보기</span>
                  <ChevronDown className="h-5 w-5 ml-2 text-pink-500 shrink-0 transition-transform duration-200" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {cardFeatures.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      link={feature.link}
                      linkText={feature.linkText}
                      bgColorClass={feature.bgColorClass}
                      textColorClass={feature.textColorClass}
                      borderColorClass={feature.borderColorClass}
                      isExternal={feature.isExternal}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
                linkText={feature.linkText}
                bgColorClass={feature.bgColorClass}
                textColorClass={feature.textColorClass}
                borderColorClass={feature.borderColorClass}
                isExternal={feature.isExternal}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}