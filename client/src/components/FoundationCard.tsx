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
    <Card className="overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm max-w-sm">
      {headerImageSrc && (
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
          "py-3 cursor-pointer border-t border-gray-100",
          headerImageSrc ? "bg-white" : "bg-gray-50"
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="rounded-full p-1 hover:bg-gray-200 transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
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
        <CardContent className="p-3">
          <div className="space-y-3">
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
                <h3 className="text-base font-medium mb-2">법인 등록증</h3>
                
                <div className="flex items-center justify-center py-2 px-2 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <a 
                      href={certImageSrc}
                      download={
                        title.includes("몰타") ? "malta_company_cert.png" : 
                        title.includes("미국") ? "us_company_cert.jpg" : 
                        title.includes("한국") ? "korea_company_cert.jpg" : 
                        title.includes("중국") ? "china_company_cert.jpg" : ""
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs py-1 px-2 rounded-md transition-colors"
                    >
                      등록증 다운로드
                    </a>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-white border border-gray-200 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-xs">등록증 유형:</span>
                    <span className="text-xs text-gray-600">
                      {title.includes("몰타") ? "몰타 법인 등록증 (LLC)" : 
                       title.includes("미국") ? "미주리주 법인 증서" : 
                       title.includes("한국") ? "대한민국 사업자등록증" : 
                       title.includes("중국") ? "중국 영업집조" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-xs">등록증 형식:</span>
                    <span className="text-xs text-gray-600">
                      {certImageSrc.endsWith('.jpg') || certImageSrc.endsWith('.jpeg') ? 'JPEG 이미지' : 
                       certImageSrc.endsWith('.png') ? 'PNG 이미지' : '이미지 파일'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-base font-medium mb-2">재단 정보</h3>
              <div className="bg-gray-50 p-3 rounded-md space-y-1 text-xs">
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
                     title.includes("한국") ? "145-86-00817" : 
                     title.includes("중국") ? "91510100M62PXCA4A" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">주소:</span>
                  <span className="font-medium text-right max-w-[65%]">
                    {title.includes("몰타") ? "152/No. 8, Naxxar Road, San Gwann, Malta" : 
                     title.includes("미국") ? "Jefferson City, Missouri, USA" : 
                     title.includes("한국") ? "경기도 성남시 분당구 백현로 97, 1226호" : 
                     title.includes("중국") ? "사천성 성도 고신구 디부광장 2호 804" : ""}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-1">주요 업무</h3>
              <ul className="list-disc pl-4 space-y-0.5 text-xs text-gray-700">
                {title.includes("몰타") && (
                  <>
                    <li>토큰증권(STO) 발행 및 관리</li>
                    <li>유럽 내 실물자산 디지털화 사업</li>
                    <li>자산 토큰화 플랫폼 글로벌 운영</li>
                    <li>국제적 디지털 자산 유동화 기술 개발</li>
                    <li>유럽 연합 블록체인 규제 준수</li>
                    <li>MFSA(몰타 금융감독원) 인증</li>
                  </>
                )}
                {title.includes("미국") && (
                  <>
                    <li>북미 지역 블록체인 사업 개발</li>
                    <li>미국 내 부동산 자산 토큰화</li>
                    <li>미국 투자자 관계 및 마케팅</li>
                    <li>미국 증권법(SEC) 준수 자문</li>
                    <li>미국 블록체인 부동산 시장 분석</li>
                    <li>미주리주 법인 인증 기업</li>
                  </>
                )}
                {title.includes("한국") && (
                  <>
                    <li>한국 시장 사업 개발 및 총괄</li>
                    <li>한국 부동산 자산 실사 및 평가</li>
                    <li>한국 투자자 교육 및 컨설팅</li>
                    <li>금융위원회 규제 준수 자문</li>
                    <li>한국 부동산 디지털화 사업</li>
                    <li>한국 블록체인 협회 정회원사</li>
                  </>
                )}
                {title.includes("중국") && (
                  <>
                    <li>중국 및 아시아 지역 사업 개발</li>
                    <li>중국 디지털 자산 파트너십 구축</li>
                    <li>중국 투자자 관계 및 마케팅</li>
                    <li>아시아 시장 확장 전략 수립</li>
                    <li>홍콩/싱가포르 진출 전략</li>
                    <li>사천성 블록체인 산업 협회</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="flex items-center justify-center pt-2">
              <Globe className="h-3 w-3 text-blue-500 mr-1" />
              <a 
                href="https://sahararealtech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xs"
              >
                웹사이트 방문
              </a>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}