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
}

export default function FoundationCard({ 
  title, 
  subtitle,
  imageSrc,
  certImageSrc 
}: FoundationCardProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300">
      <CardHeader 
        className="bg-gray-50 py-4 cursor-pointer"
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
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium mb-2">재단 정보</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">설립일:</span>
                  <span className="font-medium">2018년 8월 13일</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">등록 국가:</span>
                  <span className="font-medium">몰타</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">등록 번호:</span>
                  <span className="font-medium">C 87803</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">주소:</span>
                  <span className="font-medium">152/No. 8, Naxxar Road, San Gwann, SGN 9030, Malta</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">주요 업무</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>블록체인 기반 부동산 자산 토큰화</li>
                <li>디지털 자산 관리 및 거래 플랫폼 운영</li>
                <li>부동산 투자 전략 개발 및 컨설팅</li>
                <li>글로벌 부동산 시장 리서치 및 분석</li>
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