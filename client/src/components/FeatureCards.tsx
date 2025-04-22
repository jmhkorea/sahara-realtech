import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowRight, Building, Shield, Clock } from "lucide-react";

export default function FeatureCards() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            블록체인 기반 부동산 투자의 핵심 특징
          </h2>
          <p className="text-gray-500">
            사하라 리얼테크가 제공하는 혁신적인 블록체인 부동산 투자 플랫폼의 주요 특징을 알아보세요.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 부동산 토큰화 */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">부동산 토큰화</h3>
              <p className="text-sm text-gray-600 mb-6">
                실물 부동산을 블록체인 상의 디지털 토큰으로 변환하여 소액으로도 투자할 수 있습니다.
              </p>
              <Link href="/real-estate-tokenization">
                <div className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:underline">
                  자세히 알아보기
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
          
          {/* 안전한 거래 */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">안전한 거래</h3>
              <p className="text-sm text-gray-600 mb-6">
                스마트 컨트랙트를 통해 안전하고 투명한 부동산 거래가 보장되며, 모든 기록은 블록체인에 영구 저장됩니다.
              </p>
              <Link href="/secure-transactions">
                <div className="inline-flex items-center text-emerald-600 text-sm font-medium group-hover:underline">
                  자세히 알아보기
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
          
          {/* 유동성 확보 */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">유동성 확보</h3>
              <p className="text-sm text-gray-600 mb-6">
                부동산 투자의 가장 큰 단점인 유동성 문제를 해결하여 필요할 때 쉽게 자본을 회수할 수 있습니다.
              </p>
              <Link href="/liquidity-enhancement">
                <div className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:underline">
                  자세히 알아보기
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}