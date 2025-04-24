import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            실제 세계 자산을 디지털화 하세요
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4">
            아발란체 프로토콜 기반의 블록체인 기술로 부동산 투자의 진입장벽을 낮추고, 소액으로도 프리미엄 부동산에 투자할 수 있습니다.
          </p>
          
          <div className="p-3 bg-white/20 backdrop-blur-sm border-l-4 border-white rounded-md mb-4">
            <p className="text-white font-semibold text-sm md:text-base">
              사하라 리얼테크는 철저한 법 규제를 준수하고 보안 감사를 통해 신뢰를 우선으로 한다
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/properties">
              <Button 
                className="bg-white text-primary hover:bg-white/90 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto"
              >
                투자하기
              </Button>
            </Link>
            <Link href="/token-securities-guide">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto"
              >
                증권형 토큰(Security Token) 제대로 알기
              </Button>
            </Link>
            <Link href="/real-world-assets-guide">
              <Button 
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto"
              >
                실제세계자산(RWA) 제대로 알기
              </Button>
            </Link>
            <Link href="/global-case-studies">
              <Button 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto"
              >
                해외 사례로 본 전망
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/how-to-invest">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto text-sm md:text-base"
              >
                증권형 토큰(Security Token) 상장 의뢰
              </Button>
            </Link>
            <Link href="/how-to-invest">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto text-sm md:text-base"
              >
                실제세계자산(RWA) 자산 유동화 하기
              </Button>
            </Link>
            <Link href="/company-introduction">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-4 py-3 md:px-6 md:py-4 w-full sm:w-auto text-sm md:text-base"
              >
                사하라 리얼테크 소개
              </Button>
            </Link>
          </div>
          
          <Link href="/avalanche-tech">
            <div className="flex items-center mt-8 bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-bold text-white mr-2">Avalanche</span>
                  <span className="font-inter font-medium">
                    {t('hero.avalancheBased', '기술 기반')}
                  </span>
                </div>
                <p className="text-sm text-white/80 mt-1">
                  {t('hero.avalancheDescription')}
                </p>
              </div>
              <div className="border-l border-white/20 pl-4">
                <p className="font-bold font-inter text-xl">10+</p>
                <p className="text-sm text-white/80">{t('hero.completedTransactions')}</p>
              </div>
            </div>
          </Link>
          
          <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-lg p-4 backdrop-blur-sm border border-blue-400/30 relative">
            <div className="absolute -top-3 -right-2 transform rotate-12">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                <span>NEW</span>
              </div>
            </div>
            <p className="text-sm text-white">
              본 사이트의 다양한 데이터 분석 차트는 국내외 전문 기관의 API를 통해 실시간으로 제공되며, 
              이 모든 서비스는 본사만의 독자적인 기술로 직접 개발되었습니다.
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>
    </section>
  );
}
