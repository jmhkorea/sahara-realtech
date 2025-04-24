import { useTranslation } from "react-i18next";
import FoundationCard from "@/components/FoundationCard";

// 이미지를 public 폴더 경로로 변경
const maltaFoundationCertSrc = "/images/malta_cert.png";
const maltaCompanyCertSrc = "/images/malta_company_cert.png";
const foundationLogoSrc = "/images/foundation_logo.png";
const foundationHeaderSrc = "/images/foundation_header.png";
const companyCertificationSrc = "/images/company_certification.png";

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
        
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FoundationCard
              title="미국 사업자 등록증"
              subtitle="미국 미주리주 법인 - 북미 지역 본부"
              imageSrc={foundationLogoSrc}
              headerImageSrc="/images/company_certification.png"
              certImageSrc="/images/us_company_cert.jpg"
            />
            
            <FoundationCard
              title="한국 사업자 등록증"
              subtitle="한국 경기도 성남시 법인 - 아시아 지역 총괄"
              imageSrc={foundationLogoSrc}
              headerImageSrc="/images/company_certification.png"
              certImageSrc="/images/korea_company_cert.jpg"
            />
            
            <FoundationCard
              title="중국 사업자 등록증"
              subtitle="중국 쓰촨성 법인 - 중국 시장 진출"
              imageSrc={foundationLogoSrc}
              headerImageSrc="/images/company_certification.png"
              certImageSrc="/images/china_company_cert.jpg"
            />
          </div>
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