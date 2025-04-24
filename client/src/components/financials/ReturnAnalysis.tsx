import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ReturnAnalysisProps {
  propertyId: number;
  analysisType?: 'coc' | 'irr' | 'comparison';
  className?: string;
}

// Types for different return analysis data structures
interface CoCData {
  coc: number;
  details: {
    name: string;
    value: number;
    description?: string;
  }[];
}

interface IRRData {
  irr: number;
  yearlyData: {
    year: number;
    cashFlow: number;
    propertyValue: number;
    totalReturn: number;
  }[];
}

interface ComparisonData {
  comparisonData: {
    name: string;
    returns: number;
    risk: number;
    color: string;
  }[];
}

export default function ReturnAnalysis({ propertyId, analysisType = 'coc', className }: ReturnAnalysisProps) {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>(analysisType);

  // API call to get return analysis data
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/financial/return-analysis', selectedAnalysisType, propertyId],
    queryFn: async () => {
      const params = new URLSearchParams({
        analysisType: selectedAnalysisType,
        propertyId: propertyId.toString()
      });
      const response = await fetch(`/api/financial/return-analysis?${params.toString()}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className={`w-full h-[200px] flex items-center justify-center ${className}`}>
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-red-500">수익률 데이터를 불러올 수 없습니다.</p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </div>
    );
  }

  // Render different charts based on analysis type
  const renderChart = () => {
    switch (selectedAnalysisType) {
      case 'coc':
        const cocData = data as CoCData;
        return (
          <div className="space-y-2">
            <div className="text-center mb-2">
              <span className="text-lg font-bold text-emerald-600">{cocData.coc}%</span>
              <p className="text-xs text-neutral-500">현금 투자 수익률 (CoC)</p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={cocData.details}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'irr':
        const irrData = data as IRRData;
        return (
          <div className="space-y-2">
            <div className="text-center mb-2">
              <span className="text-lg font-bold text-blue-600">{irrData.irr}%</span>
              <p className="text-xs text-neutral-500">내부 수익률 (IRR)</p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={irrData.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalReturn" stroke="#3b82f6" />
                <Line type="monotone" dataKey="cashFlow" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'comparison':
        const comparisonData = data as ComparisonData;
        return (
          <div className="space-y-2">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                layout="vertical"
                data={comparisonData.comparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax + 2']} fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="returns" name="수익률 (%)" radius={[0, 4, 4, 0]}>
                  {comparisonData.comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        
      default:
        return <div>데이터 형식을 인식할 수 없습니다.</div>;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={selectedAnalysisType} onValueChange={setSelectedAnalysisType}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="coc">현금 수익률</TabsTrigger>
          <TabsTrigger value="irr">내부 수익률</TabsTrigger>
          <TabsTrigger value="comparison">투자 비교</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedAnalysisType}>
          {renderChart()}
        </TabsContent>
      </Tabs>
    </div>
  );
}