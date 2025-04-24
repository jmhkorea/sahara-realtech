import { useTranslation } from "react-i18next";

export default function FoundationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">
            사하라 리얼테크 회사 인증 및 등록증
          </h2>
          <p className="text-gray-600">
            글로벌 부동산 자산 디지털화를 주도하는 사하라 리얼테크의 국가별 공식 법인 등록증입니다.
            각 국가의 법률 및 규제를 준수하며 토큰증권과 실물자산 디지털화를 위한 안전한 블록체인 기술을 개발합니다.
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            사하라 리얼테크는 글로벌 블록체인 기술을 통해 부동산 자산의 토큰화를 추진하는 선도적인 기관으로, 
            북미, 아시아, 중국에 지사를 두고 글로벌 부동산 시장의 민주화와 접근성 향상을 위해 노력하고 있습니다. 
            각 국가별 금융 규제 준수와 함께 안정적인 토큰증권(STO) 발행 및 실물자산(RWA) 디지털화를 위한 
            표준 기술을 개발하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}