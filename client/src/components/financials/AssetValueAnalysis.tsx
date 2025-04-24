import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface AssetValueAnalysisProps {
  propertyId: number;
}

interface AssetValueData {
  year: string;
  propertyValue: number;
  tokenValue: number;
  appreciation: number;
  marketAverage?: number;
}

export default function AssetValueAnalysis({ propertyId }: AssetValueAnalysisProps) {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  
  const { data, isLoading, error } = useQuery<AssetValueData[]>({
    queryKey: ["/api/financial/asset-value", propertyId],
    queryFn: async () => {
      const params = new URLSearchParams({
        propertyId: propertyId.toString()
      });
      const response = await fetch(`/api/financial/asset-value?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch asset value data");
      }
      return response.json();
    }
  });

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
        <p className="text-red-500">자산 가치 데이터를 불러올 수 없습니다.</p>
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

  const calculateGrowth = (): number => {
    if (data.length < 2) return 0;
    const startValue = data[0].propertyValue;
    const endValue = data[data.length - 1].propertyValue;
    return parseFloat(((endValue - startValue) / startValue * 100).toFixed(1));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-neutral-500">총 자산 가치 성장률</p>
          <p className="text-xl font-bold text-purple-600">{calculateGrowth()}%</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={viewType === "chart" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setViewType("chart")}
          >
            차트
          </Button>
          <Button 
            variant={viewType === "table" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setViewType("table")}
          >
            테이블
          </Button>
        </div>
      </div>

      {viewType === "chart" && (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} 만원`, '']}
                labelFormatter={(label) => `${label}년`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="propertyValue"
                name="자산 가치"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="tokenValue" 
                name="토큰 가치" 
                stroke="#82ca9d" 
              />
              {data[0].marketAverage && (
                <Line
                  type="monotone"
                  dataKey="marketAverage"
                  name="시장 평균"
                  stroke="#ffc658"
                  strokeDasharray="5 5"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {viewType === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">연도</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">자산 가치</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">토큰 가치</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">가치 상승률</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{item.year}년</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">₩ {item.propertyValue.toLocaleString()} 만원</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">₩ {item.tokenValue.toLocaleString()} 만원</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    <span className={item.appreciation > 0 ? "text-green-600" : "text-red-600"}>
                      {item.appreciation > 0 ? "+" : ""}{item.appreciation}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}