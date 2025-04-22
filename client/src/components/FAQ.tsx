import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useTranslation();
  
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
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('faq.title')}
          </h2>
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
      </div>
    </section>
  );
}
