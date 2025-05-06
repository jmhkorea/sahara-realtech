import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const heroImageUrl = '/attached_assets/image_1746530349804.png';

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* 대표 이미지 섹션 - 가로 전체를 채우는 배너 */}
      <div className="w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <div className="relative">
            <div className="relative overflow-hidden">
              <img 
                src={heroImageUrl} 
                alt="블록체인 기반 부동산 투자"
                className="w-full object-cover h-[320px] md:h-[400px] lg:h-[480px] object-position-y-[20%]"
                style={{ objectPosition: '0 20%' }}
              />
              
              {/* 이미지에 이미 텍스트가 있으므로 추가 텍스트 제거 */}
            </div>
            
            {/* 이미지 변경 버튼 제거됨 */}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-pink-50 to-transparent z-20"></div>
        </div>
      </div>

      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-r from-pink-50 via-white to-pink-50">
        {/* 벚꽃 애니메이션 효과 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {mounted && (
            <>
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute animate-cherry-blossom-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-5%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${10 + Math.random() * 10}s`
                  }}
                >
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-pink-200 opacity-80 rounded-full blur-sm"></div>
                </div>
              ))}
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i + 20}
                  className="absolute animate-cherry-blossom-fall-2"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-8%`,
                    animationDelay: `${Math.random() * 15}s`,
                    animationDuration: `${15 + Math.random() * 15}s`
                  }}
                >
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pink-300 opacity-90 rounded-full blur-sm"></div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl relative">
            {/* 화사한 빛 효과 */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-pink-200 to-pink-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute top-20 right-0 w-60 h-60 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap">
              실제 세계 자산을 디지털화 하세요
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 mb-6 backdrop-blur-sm">
              아발란체 프로토콜 기반의 블록체인 기술로 부동산 투자의 진입장벽을 낮추고, 소액으로도 프리미엄 부동산에 투자할 수 있습니다.
            </p>
            
            <div className="p-4 bg-white rounded-xl shadow-lg border border-pink-100 backdrop-blur-sm mb-6">
              <p className="text-gray-700 font-medium text-sm md:text-base">
                사하라 리얼테크는 철저한 법 규제를 준수하고 보안 감사를 통해 <span className="font-semibold text-pink-600">신뢰를 우선</span>으로 합니다
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/properties">
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  투자하기
                </Button>
              </Link>
              <Link href="/token-securities-guide">
                <Button 
                  className="bg-white text-pink-600 hover:bg-pink-50 font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-md border border-pink-200 transform hover:-translate-y-1 transition-all"
                >
                  토큰 증권(STO) 제대로 알기
                </Button>
              </Link>
              <Link href="/real-world-assets-guide">
                <Button 
                  className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-md border border-purple-200 transform hover:-translate-y-1 transition-all"
                >
                  실제세계자산(RWA) 제대로 알기
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/how-to-invest">
                <Button 
                  variant="outline" 
                  className="bg-white/80 border border-pink-200 text-pink-700 hover:bg-pink-50 font-medium px-5 py-2 rounded-lg text-sm"
                >
                  토큰증권(STO) 상장 의뢰
                </Button>
              </Link>
              <Link href="/how-to-invest">
                <Button 
                  variant="outline" 
                  className="bg-white/80 border border-purple-200 text-purple-700 hover:bg-purple-50 font-medium px-5 py-2 rounded-lg text-sm"
                >
                  실제세계자산(RWA) 자산 유동화 하기
                </Button>
              </Link>
              <Link href="/company-introduction">
                <Button 
                  variant="outline" 
                  className="bg-white/80 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-5 py-2 rounded-lg text-sm"
                >
                  사하라 리얼테크 소개
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row mt-10 gap-4">
              <div className="flex-1 bg-white rounded-xl p-5 shadow-md border border-pink-100 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                <div className="flex items-center">
                  <span className="font-bold text-pink-600 mr-2">Avalanche</span>
                  <span className="font-medium text-slate-700">
                    {t('hero.avalancheBased', '기술 기반')}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {t('hero.avalancheDescription')}
                </p>
                <Link href="/avalanche-tech" className="mt-3 inline-block">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 font-medium rounded-lg"
                  >
                    기술 상세 보기
                  </Button>
                </Link>
              </div>
              
              <div className="flex-1 bg-white rounded-xl p-5 shadow-md border border-purple-100 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-2xl text-purple-600">10+</p>
                  <div className="bg-purple-50 rounded-full px-3 py-1 text-sm text-purple-600 font-medium">실시간 거래</div>
                </div>
                <p className="text-sm text-slate-600 mt-2">{t('hero.completedTransactions')}</p>
                <Link href="/avalanche-tech" className="mt-3 inline-block">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-300 text-purple-600 hover:bg-purple-50 font-medium rounded-lg"
                  >
                    자세히 알아보기 →
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl p-5 shadow-md border border-pink-100 backdrop-blur-sm relative">
              <div className="absolute -top-3 -right-2 transform rotate-12">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  <span>NEW</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                본 사이트의 다양한 데이터 분석 차트는 국내외 전문 기관의 API를 통해 실시간으로 제공되며, 
                이 모든 서비스는 본사만의 독자적인 기술로 직접 개발되었습니다.
              </p>
            </div>
          </div>
        </div>
        
        {/* 장식 요소 */}
        <div className="absolute -bottom-6 left-0 w-full h-12 bg-gradient-to-r from-pink-200/20 via-white/10 to-purple-200/20 backdrop-blur-sm"></div>
        <div className="absolute -bottom-8 right-0 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 right-10 w-6 h-6 bg-pink-300/30 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 left-10 w-4 h-4 bg-purple-300/30 rounded-full blur-sm"></div>
      </section>
    </div>
  );
}
