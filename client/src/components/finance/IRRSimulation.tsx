import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface IRRSimulationProps {
  className?: string;
}

export default function IRRSimulation({ className }: IRRSimulationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => setIsRetrying(false), 1500);
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm", className)}>
      <CardHeader 
        className="bg-gray-50 py-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-md">내부수익률(IRR) 시뮬레이션</CardTitle>
            <p className="text-sm text-gray-500 mt-1">다양한 시나리오에 따른 내부수익률 시뮬레이션</p>
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
              <p className="text-red-500 text-sm">수익률 데이터를 불러올 수 없습니다.</p>
              <div className="mt-4 mb-6">
                <img 
                  src="/images/irr_simulation_error.png" 
                  alt="IRR 시뮬레이션 에러" 
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
  );
}