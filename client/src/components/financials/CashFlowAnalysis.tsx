import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CashFlowAnalysisProps {
  propertyId: number;
  chartType?: "monthly" | "yearly" | "breakdown";
}

interface CashFlowData {
  name: string;
  수입?: number;
  지출?: number;
  순현금흐름?: number;
  [key: string]: string | number | undefined;
}

export default function CashFlowAnalysis({ propertyId, chartType = "monthly" }: CashFlowAnalysisProps) {
  const [selectedChartType, setSelectedChartType] = useState<string>(chartType);

  // Fetch data based on chart type
  const { data, isLoading, error } = useQuery<CashFlowData[]>({
    queryKey: ["/api/financial/cashflow", selectedChartType, propertyId],
    queryFn: async () => {
      const params = new URLSearchParams({
        chartType: selectedChartType,
        propertyId: propertyId.toString()
      });
      const response = await fetch(`/api/financial/cashflow?${params.toString()}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다');
      }
      return response.json();
    }
  });

  const handleChartTypeChange = (type: string) => {
    setSelectedChartType(type);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">데이터를 불러올 수 없습니다.</p>
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

  // Colors for different data series
  const colors = {
    수입: "#4ade80",
    지출: "#f87171",
    순현금흐름: "#60a5fa",
    임대: "#8b5cf6",
    세금: "#ec4899",
    유지보수: "#f59e0b",
    관리비: "#06b6d4"
  };
  
  // Dynamically determine which values are present in the data
  const dataKeys = data.length > 0 
    ? Object.keys(data[0]).filter(key => key !== 'name' && data[0][key] !== undefined)
    : [];

  return (
    <div className="w-full">
      <Tabs defaultValue={selectedChartType} onValueChange={handleChartTypeChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="monthly">월별 현금 흐름</TabsTrigger>
          <TabsTrigger value="yearly">연도별 현금 흐름</TabsTrigger>
          <TabsTrigger value="breakdown">항목별 분석</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedChartType}>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} tickFormatter={(value) => `${value >= 1000 ? `${value/1000}K` : value}`} />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} 만원`, '']}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                {dataKeys.map((key, index) => (
                  <Bar 
                    key={index}
                    dataKey={key} 
                    fill={colors[key as keyof typeof colors] || `hsl(${index * 40}, 70%, 60%)`}
                    name={key}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}