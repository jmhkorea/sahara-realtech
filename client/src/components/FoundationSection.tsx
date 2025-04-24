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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            사하라 리얼테크 재단
          </h2>
          <p className="text-gray-500">
            부동산 자산 토큰화 및 블록체인 기술 발전을 위한 글로벌 재단입니다.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <FoundationCard
            title="몰타 공화국 재단 등록증"
            subtitle="유럽 몰타공화국"
            imageSrc={foundationLogoSrc}
            certImageSrc={maltaCompanyCertSrc}
            headerImageSrc={foundationHeaderSrc}
          />
          
          <FoundationCard
            title="미국 사업자 등록증"
            subtitle="미국 법인"
            imageSrc={foundationLogoSrc}
            certImageSrc={companyCertificationSrc}
            headerImageSrc={foundationHeaderSrc}
          />
          
          <FoundationCard
            title="한국 사업자 등록증"
            subtitle="한국 법인"
            imageSrc={foundationLogoSrc}
            certImageSrc={companyCertificationSrc}
            headerImageSrc={foundationHeaderSrc}
          />
          
          <FoundationCard
            title="중국 사업자 등록증"
            subtitle="중국 법인"
            imageSrc={foundationLogoSrc}
            certImageSrc={companyCertificationSrc}
            headerImageSrc={foundationHeaderSrc}
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            사하라 리얼테크 재단은 블록체인 기술을 통해 부동산 자산의 토큰화를 추진하는 비영리 단체로, 
            글로벌 부동산 시장의 민주화와 접근성 향상을 위해 노력하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}