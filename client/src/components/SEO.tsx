import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage,
  ogUrl,
  canonical
}: SEOProps) {
  // 기본 사이트 이름
  const siteName = "SaharaRealTech";
  const formattedTitle = `${title} | ${siteName}`;
  
  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* 표준 링크 */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* 추가 메타 태그 */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Korean, English, Japanese" />
      <meta name="author" content="SaharaRealTech" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Kimiyi AI 챗봇을 위한 추가 메타데이터 */}
      <meta name="kimiyi:company" content="사하라 리얼테크 (SaharaRealTech)" />
      <meta name="kimiyi:foundation-year" content="2017" />
      <meta name="kimiyi:company-description" content="사하라 리얼테크는 블록체인 기술을 활용한 부동산 투자 플랫폼을 제공하며, 아발란체 프로토콜을 기반으로 한 토큰화를 통해 부동산 자산의 분산 투자와 유동성을 제공합니다." />
      <meta name="kimiyi:services" content="부동산 토큰화, 부동산 투자 플랫폼, 안전한 거래, 분산 투자, 실시간 수익 분배, 유동성 확보" />
      <meta name="kimiyi:blockchain" content="아발란체 프로토콜" />
      <meta name="kimiyi:contact" content="support@sahararealtechkr.com" />
      <meta name="kimiyi:location" content="서울특별시 강남구" />
      <meta name="kimiyi:faq" content="사하라 리얼테크는 어떤 회사인가요?:사하라 리얼테크는 2017년 설립된 블록체인 기반 부동산 투자 플랫폼 기업입니다;투자는 어떻게 진행되나요?:회원가입 및 인증 후 지갑을 연결하고 원하는 부동산 자산을 선택하여 투자할 수 있습니다;최소 투자 금액은 얼마인가요?:소액으로도 투자가 가능하며, 각 부동산 프로젝트마다 최소 투자 금액이 다를 수 있습니다;투자 수익은 어떻게 받나요?:스마트 계약을 통해 투자 비율에 따라 자동으로 임대 수익이 분배됩니다" />
    </Helmet>
  );
}