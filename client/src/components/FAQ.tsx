import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useTranslation();
  const [isFaqOpen, setIsFaqOpen] = useState(true);
  
  const faqItems: FAQItem[] = [
    {
      id: "faq-1",
      question: t('faq.items.howItWorks.question'),
      answer: t('faq.items.howItWorks.answer')
    },
    {
      id: "faq-2",
      question: t('faq.items.whereToTrade.question'),
      answer: t('faq.items.whereToTrade.answer')
    },
    {
      id: "faq-3",
      question: t('faq.items.howToReceiveReturns.question'),
      answer: t('faq.items.howToReceiveReturns.answer')
    },
    {
      id: "faq-4",
      question: t('faq.items.minInvestment.question'),
      answer: t('faq.items.minInvestment.answer')
    },
    {
      id: "faq-5",
      question: t('faq.items.legalSafety.question'),
      answer: t('faq.items.legalSafety.answer')
    },
    // 토큰 프로젝트 상세 페이지에서 추가된 FAQ
    {
      id: "faq-6",
      question: "SRA 토큰은 어떤 법적 지위를 가지나요?",
      answer: "SRA 토큰은 해당 부동산의 수익권을 디지털화한 자산으로, 증권형 토큰(Security Token)에 해당합니다. 관련 법규에 따라 발행 및 유통되며, 투자자는 실물 자산에 기반한 수익권을 보유하게 됩니다."
    },
    {
      id: "faq-7",
      question: "토큰 소유자는 어떤 권리를 갖게 되나요?",
      answer: "토큰 소유자는 보유 토큰 비율에 따라 임대 수익 배당을 받을 권리, 자산 운영에 관한 주요 의사결정에 참여할 권리, 그리고 자산 매각 시 수익을 분배받을 권리를 갖습니다."
    },
    {
      id: "faq-8",
      question: "배당은 어떻게 이루어지나요?",
      answer: "배당은 분기별로 이루어지며, 스마트 컨트랙트를 통해 자동으로 지급됩니다. 임대 수익에서 운영 비용을 제외한 순이익이 토큰 소유 비율에 따라 분배됩니다."
    },
    // 부동산 상세 페이지에서 추가된 FAQ
    {
      id: "faq-9",
      question: "부동산 토큰화의 장점은 무엇인가요?",
      answer: "부동산 토큰화는 유동성 증가, 소액 투자 접근성 향상, 거래 비용 절감, 글로벌 투자자 참여 가능, 투명한 소유권 관리 등의 장점이 있습니다. 특히 블록체인 기술을 통해 중개자 없이 직접 거래가 가능해 효율성이 높아집니다."
    },
    {
      id: "faq-10",
      question: "투자 위험 요소는 무엇인가요?",
      answer: "부동산 시장 변동성, 규제 변화, 임대 수요 감소, 관리 비용 증가 등의 위험이 있습니다. 사하라 리얼테크는 이러한 위험을 최소화하기 위해 철저한 실사와 전문적인 자산 관리를 제공합니다."
    }
  ];

  const toggleFaqCard = () => {
    setIsFaqOpen(!isFaqOpen);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Card className="border border-neutral-200 rounded-lg overflow-hidden mb-6">
          <div 
            className="p-5 bg-neutral-50 flex justify-between items-center cursor-pointer"
            onClick={toggleFaqCard}
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              {t('faq.title')}
            </h2>
            {isFaqOpen ? (
              <ChevronUp className="h-6 w-6 text-neutral-500" />
            ) : (
              <ChevronDown className="h-6 w-6 text-neutral-500" />
            )}
          </div>
          
          {isFaqOpen && (
            <CardContent className="pt-6">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <p className="text-neutral-400">
                  {t('faq.subtitle')}
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border border-neutral-200 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="p-5 bg-neutral-50 hover:bg-neutral-100 font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="p-5 bg-white border-t border-neutral-200 text-neutral-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}
