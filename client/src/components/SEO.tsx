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
    </Helmet>
  );
}