import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Globe, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoundationCardProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  certImageSrc?: string;
  headerImageSrc?: string;
}

export default function FoundationCard({ 
  title, 
  subtitle,
  imageSrc,
  certImageSrc,
  headerImageSrc = '/images/foundation_header.png'
}: FoundationCardProps) {
  const { t } = useTranslation();
  // 기본 상태를 펼쳐진(확장된) 상태로 설정
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm">
      {headerImageSrc && false && (
        <div 
          className="w-full cursor-pointer relative" 
          onClick={toggleExpanded}
        >
          <img 
            src={headerImageSrc} 
            alt={title} 
            className="w-full h-auto rounded-t-md"
          />
          <div className="absolute top-0 right-0 m-3 bg-white bg-opacity-80 rounded-full p-1.5 shadow-sm">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </div>
        </div>
      )}
      <CardHeader 
        className={cn(
          "py-4 cursor-pointer border-t border-gray-100",
          headerImageSrc ? "bg-white" : "bg-gray-50"
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
          </div>
          <div className="rounded-full p-1 hover:bg-gray-200 transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden", 
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <CardContent className="p-5">
          <div className="space-y-5">
            {imageSrc && (
              <div className="flex justify-center mb-4">
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className="max-w-full h-auto rounded-md border border-gray-200"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}
            
            {certImageSrc && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-3">법인 등록증</h3>
                <div className="overflow-hidden border border-gray-200 rounded-md">
                  <img 
                    src={certImageSrc} 
                    alt="법인 등록증" 
                    className="w-full h-auto object-contain mx-auto"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium mb-2">재단 정보</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">설립일:</span>
                  <span className="font-medium">
                    {title.includes("몰타") ? "2018년 8월 13일" : 
                     title.includes("미국") ? "2021년 4월 20일" : 
                     title.includes("중국") ? "2017년 1월 20일" : 
                     title.includes("한국") ? "2017년 6월 13일" : 
                    "2018년 8월 13일"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">등록 국가:</span>
                  <span className="font-medium">
                    {title.includes("몰타") ? "몰타" : 
                     title.includes("미국") ? "미국 미주리주" : 
                     title.includes("한국") ? "대한민국" : 
                     title.includes("중국") ? "중국" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">등록 번호:</span>
                  <span className="font-medium">
                    {title.includes("몰타") ? "C 87803" : 
                     title.includes("미국") ? "LC1780821" : 
                     title.includes("한국") ? "123-45-67890" : 
                     title.includes("중국") ? "GSXT35789458" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">주소:</span>
                  <span className="font-medium">
                    {title.includes("몰타") ? "152/No. 8, Naxxar Road, San Gwann, SGN 9030, Malta" : 
                     title.includes("미국") ? "Jefferson City, Missouri, USA" : 
                     title.includes("한국") ? "서울시 강남구 테헤란로 123" : 
                     title.includes("중국") ? "베이징시 차오양구 123번지" : ""}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">주요 업무</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {title.includes("몰타") && (
                  <>
                    <li>토큰증권(STO) 발행</li>
                    <li>실물자산 디지털화 관리</li>
                    <li>자산 토큰화 플랫폼 운영</li>
                    <li>국제적 디지털 자산 유동화 기술 개발</li>
                  </>
                )}
                {title.includes("미국") && (
                  <>
                    <li>북미 지역 블록체인 사업 개발</li>
                    <li>미국 내 부동산 자산 토큰화</li>
                    <li>투자자 관계 및 마케팅</li>
                    <li>미국 증권법 준수 자문</li>
                  </>
                )}
                {title.includes("한국") && (
                  <>
                    <li>한국 시장 사업 개발 및 운영</li>
                    <li>부동산 자산 실사 및 평가</li>
                    <li>국내 투자자 교육</li>
                    <li>금융위원회 규제 준수</li>
                  </>
                )}
                {title.includes("중국") && (
                  <>
                    <li>아시아 지역 사업 개발</li>
                    <li>디지털 자산 파트너십 구축</li>
                    <li>중국 투자자 관계</li>
                    <li>국제 시장 확장 전략</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="flex items-center justify-center pt-3">
              <Globe className="h-4 w-4 text-blue-500 mr-2" />
              <a 
                href="https://sahararealtech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                공식 웹사이트 방문하기
              </a>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}