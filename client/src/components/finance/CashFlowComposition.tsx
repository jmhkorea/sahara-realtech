import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronDown, ChevronUp, RefreshCw, Award, ExternalLink, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CashFlowCompositionProps {
  className?: string;
}

export default function CashFlowComposition({ className }: CashFlowCompositionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isTechCertExpanded, setIsTechCertExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleTechCertExpanded = () => {
    setIsTechCertExpanded(!isTechCertExpanded);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => setIsRetrying(false), 1500);
  };

  return (
    <div className="space-y-4">
      <Card className={cn("overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm", className)}>
        <CardHeader 
          className="bg-gray-50 py-4 cursor-pointer"
          onClick={toggleExpanded}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md">현금 흐름 구성 요소</CardTitle>
              <p className="text-sm text-gray-500 mt-1">현금 흐름을 구성하는 수입과 지출 항목의 비율</p>
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
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <CardContent className="pt-4 pb-5">
            {isRetrying ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin mb-4">
                  <RefreshCw className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-gray-500">데이터를 불러오는 중...</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-red-500 text-sm">데이터를 불러올 수 없습니다.</p>
                <div className="mt-4 mb-6">
                  <img 
                    src="/images/cash_flow_composition_error.png" 
                    alt="현금 흐름 구성 에러" 
                    className="mx-auto max-w-full rounded-md border border-gray-200"
                    style={{ maxHeight: "250px" }}
                  />
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-3 flex items-center mx-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRetry();
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> 다시 시도
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* 회사 보유 기술 인증서 카드 */}
      <Card className="overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm">
        <CardHeader 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 cursor-pointer"
          onClick={toggleTechCertExpanded}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md flex items-center">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                회사 보유 기술 인증서
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                사하라 리얼테크의 기술 역량을 인증하는 공식 인증서
              </CardDescription>
            </div>
            <div className="rounded-full p-1 hover:bg-blue-100 transition-colors">
              {isTechCertExpanded ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </div>
        </CardHeader>
        
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isTechCertExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <CardContent className="pt-4 pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <FileCheck className="h-6 w-6 text-blue-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900">블록체인 기술 특허</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      부동산 자산 토큰화 및 분산 거래 시스템 관련 특허 기술
                    </p>
                    <div className="mt-2 flex">
                      <a href="#" className="text-xs text-blue-600 flex items-center hover:underline">
                        특허 인증서 보기
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <FileCheck className="h-6 w-6 text-indigo-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-indigo-900">금융 보안 인증</h3>
                    <p className="text-sm text-indigo-800 mt-1">
                      디지털 자산 보안 및 금융 거래 시스템 인증
                    </p>
                    <div className="mt-2 flex">
                      <a href="#" className="text-xs text-indigo-600 flex items-center hover:underline">
                        보안 인증서 보기
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                사하라 리얼테크는 블록체인 기술 및 금융 보안 분야에서 다수의 인증을 획득하여 기술적 신뢰성을 확보하고 있습니다.
                모든 인증서는 정부 기관 및 공인된 인증 기관을 통해 검증되었습니다.
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}