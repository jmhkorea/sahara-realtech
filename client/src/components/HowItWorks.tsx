import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  UserCheck,
  Wallet,
  Building,
  LineChart
} from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-neutral-400">
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-24 h-3/4 w-1 bg-primary/30 -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="md:text-right md:pr-12 relative">
              <div className="absolute right-0 top-0 md:top-6 -translate-y-1/2 md:translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-10 text-xl font-bold hidden md:flex">1</div>
              <div className="md:hidden flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">1</div>
                <h3 className="text-xl font-bold">{t('howItWorks.steps.step1.title')}</h3>
              </div>
              <h3 className="text-xl font-bold mb-4 hidden md:block">{t('howItWorks.steps.step1.title')}</h3>
              <p className="text-neutral-400 mb-4">{t('howItWorks.steps.step1.description')}</p>
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
                <div className="flex items-center">
                  <UserCheck className="text-primary mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">{t('howItWorks.steps.step1.highlight')}</span>
                </div>
              </div>
            </div>
            
            <div className="md:pl-12"></div>
            
            <div className="md:text-left"></div>
            
            <div className="md:pl-12 relative">
              <div className="absolute left-0 top-0 md:top-6 -translate-y-1/2 md:-translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-10 text-xl font-bold hidden md:flex">2</div>
              <div className="md:hidden flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">2</div>
                <h3 className="text-xl font-bold">{t('howItWorks.steps.step2.title')}</h3>
              </div>
              <h3 className="text-xl font-bold mb-4 hidden md:block">{t('howItWorks.steps.step2.title')}</h3>
              <p className="text-neutral-400 mb-4">{t('howItWorks.steps.step2.description')}</p>
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
                <div className="flex items-center">
                  <Wallet className="text-primary mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">{t('howItWorks.steps.step2.highlight')}</span>
                </div>
              </div>
            </div>
            
            <div className="md:text-right md:pr-12 relative">
              <div className="absolute right-0 top-0 md:top-6 -translate-y-1/2 md:translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-10 text-xl font-bold hidden md:flex">3</div>
              <div className="md:hidden flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">3</div>
                <h3 className="text-xl font-bold">{t('howItWorks.steps.step3.title')}</h3>
              </div>
              <h3 className="text-xl font-bold mb-4 hidden md:block">{t('howItWorks.steps.step3.title')}</h3>
              <p className="text-neutral-400 mb-4">{t('howItWorks.steps.step3.description')}</p>
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
                <div className="flex items-center">
                  <Building className="text-primary mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">{t('howItWorks.steps.step3.highlight')}</span>
                </div>
              </div>
            </div>
            
            <div className="md:pl-12"></div>
            
            <div className="md:text-left"></div>
            
            <div className="md:pl-12 relative">
              <div className="absolute left-0 top-0 md:top-6 -translate-y-1/2 md:-translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-10 text-xl font-bold hidden md:flex">4</div>
              <div className="md:hidden flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">4</div>
                <h3 className="text-xl font-bold">{t('howItWorks.steps.step4.title')}</h3>
              </div>
              <h3 className="text-xl font-bold mb-4 hidden md:block">{t('howItWorks.steps.step4.title')}</h3>
              <p className="text-neutral-400 mb-4">{t('howItWorks.steps.step4.description')}</p>
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
                <div className="flex items-center">
                  <LineChart className="text-primary mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">{t('howItWorks.steps.step4.highlight')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link href="/properties">
            <Button className="inline-block px-8 py-4 text-lg">
              {t('howItWorks.startNowButton')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
