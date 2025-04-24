import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FinanceAnalysisCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  expandedByDefault?: boolean;
  className?: string;
  buttonText?: string;
}

export default function FinanceAnalysisCard({
  title,
  subtitle,
  children,
  expandedByDefault = false,
  className,
  buttonText = "더보기"
}: FinanceAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);

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
            <CardTitle className="text-md">{title}</CardTitle>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
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
          {children}
          
          <div className="mt-4 text-center">
            {!isExpanded ? (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
              >
                {buttonText} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              >
                접기 <ChevronUp className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}