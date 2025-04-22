import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/properties">
              <Button 
                className="bg-white text-primary hover:bg-white/90 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto"
              >
                투자하기
              </Button>
            </Link>
            <Link href="/how-to-invest">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto text-sm md:text-base"
              >
                토큰증권(STO) 상장 의뢰
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/how-to-invest">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto text-sm md:text-base"
              >
                실제세계자산(RWA) 자산 유동화 하기
              </Button>
            </Link>
            <Link href="/team">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto text-sm md:text-base"
              >
                서비스 알아보기
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center mt-8 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold text-white mr-2">Avalanche</span>
                <span className="font-inter font-medium">
                  {t('hero.avalancheBased')}
                </span>
              </div>
              <p className="text-sm text-white/80 mt-1">
                {t('hero.avalancheDescription')}
              </p>
            </div>
            <div className="border-l border-white/20 pl-4">
              <p className="font-bold font-inter text-xl">30,000+</p>
              <p className="text-sm text-white/80">{t('hero.completedTransactions')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>
    </section>
  );
}
