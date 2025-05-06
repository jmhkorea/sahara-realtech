import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  UserCheck,
  Wallet,
  LineChart,
  ChevronDown,
  Building, 
  BarChart3
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProcessStep {
  icon: React.ReactNode;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  bgColorClass: string;
  iconColorClass: string;
  numberColorClass: string;
  contentBgClass: string;
}

export default function InvestmentProcess() {
  const { t } = useTranslation();
  const [openAccordion, setOpenAccordion] = useState<string>("investment-process");

  // 투자 프로세스 단계
  const processSteps: ProcessStep[] = [
    {
      icon: <UserCheck className="h-5 w-5" />,
      stepNumber: 1,
      title: "회원가입 및 인증",
      subtitle: "회원가입 및 인증",
      description: "블록체인 기반 부동산 투자를 위해 본인 인증을 완료하고 계정을 생성합니다.",
      features: [
        {
          icon: <UserCheck className="h-5 w-5" />,
          title: "빠르고 간편한 KYC 인증 절차",
          description: "간소화된 KYC 프로세스로 신속하게 가입하고 투자를 시작할 수 있습니다."
        }
      ],
      bgColorClass: "bg-pink-100",
      iconColorClass: "text-pink-600",
      numberColorClass: "text-pink-600",
      contentBgClass: "bg-pink-50"
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      stepNumber: 2,
      title: "지갑 연결",
      subtitle: "지갑 연결",
      description: "아발란체 프로토콜을 지원하는 디지털 지갑을 연결하여 투자를 준비합니다.",
      features: [
        {
          icon: <Wallet className="h-5 w-5" />,
          title: "MetaMask, Avalanche Wallet 등 지원",
          description: "메타마스크나 아발란체 월렛과 같은 주요 디지털 지갑을 손쉽게 연결할 수 있습니다."
        }
      ],
      bgColorClass: "bg-purple-100",
      iconColorClass: "text-purple-600",
      numberColorClass: "text-purple-600",
      contentBgClass: "bg-purple-50"
    },
    {
      icon: <Building className="h-5 w-5" />,
      stepNumber: 3,
      title: "투자 자산 검색 및 투자",
      subtitle: "투자자산 선택 및 투자",
      description: "다양한 부동산 자산 중에서 투자하고 싶은 자산을 선택하고 원하는 금액만큼 투자합니다.",
      features: [
        {
          icon: <Building className="h-5 w-5" />,
          title: "부동산 정보 및 투자 분석",
          description: "각 부동산 자산의 상세 정보, 예상 수익률, 위험 등급 등을 확인하고 정보에 기반한 투자 결정을 내릴 수 있습니다."
        }
      ],
      bgColorClass: "bg-rose-100",
      iconColorClass: "text-rose-600",
      numberColorClass: "text-rose-600",
      contentBgClass: "bg-rose-50"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      stepNumber: 4,
      title: "수익 관리",
      subtitle: "수익 확인 및 관리",
      description: "투자한 자산의 수익률을 실시간으로 모니터링하고 배당금을 관리할 수 있습니다.",
      features: [
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "다양한 수익 분석 도구",
          description: "수익 그래프, 배당금 내역, 자산 가치 변동 등 다양한 분석 도구를 통해 투자 성과를 확인할 수 있습니다."
        },
        {
          icon: <LineChart className="h-5 w-5" />,
          title: "자동화된 배당금 지급",
          description: "스마트 컨트랙트를 통해 자동으로 배당금이 지급되며, 모든 거래 내역은 블록체인에 투명하게 기록됩니다."
        }
      ],
      bgColorClass: "bg-green-100",
      iconColorClass: "text-green-600",
      numberColorClass: "text-green-600",
      contentBgClass: "bg-green-50"
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <Accordion 
          type="single" 
          collapsible 
          className="border border-pink-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-50/30 to-purple-50/30"
          value={openAccordion}
          onValueChange={setOpenAccordion}
        >
          <AccordionItem value="investment-process" className="border-b-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center text-xl font-semibold text-gray-800">
                <span>부동산 투자 프로세스 알아보기</span>
                <ChevronDown className="h-5 w-5 ml-2 text-pink-500 shrink-0 transition-transform duration-200" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4 mt-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="border rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`${step.bgColorClass} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                          <span className={`${step.numberColorClass} font-bold text-xl`}>{step.stepNumber}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{step.title}</h3>
                          <p className="text-sm text-gray-500">{step.subtitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 border-t">
                      <div className="mt-4">
                        <p className="text-gray-700 mb-4">
                          {step.description}
                        </p>
                        {step.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className={`${step.contentBgClass} p-4 rounded-md flex items-start space-x-3 ${featureIndex > 0 ? 'mt-3' : ''}`}
                          >
                            <div className={`${step.iconColorClass} mt-0.5 flex-shrink-0`}>
                              {feature.icon}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${step.numberColorClass}`}>{feature.title}</p>
                              <p className={`text-xs ${step.iconColorClass} mt-1`}>
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}