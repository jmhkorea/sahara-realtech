import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NetCashFlowTrendProps {
  className?: string;
}

export default function NetCashFlowTrend({ className }: NetCashFlowTrendProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm", className)}>
      <CardHeader 
        className="bg-gray-50 py-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-md">순현금흐름 트랜드</CardTitle>
            <p className="text-sm text-gray-500 mt-1">시간에 따른 순현금흐름 추이</p>
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
          <div className="text-center">
            <p className="text-red-500 text-sm">데이터를 불러올 수 없습니다.</p>
            <Button 
              variant="outline"
              size="sm"
              className="mt-3"
            >
              다시 시도
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}