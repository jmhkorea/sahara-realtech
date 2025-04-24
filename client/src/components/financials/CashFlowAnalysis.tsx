import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";

interface CashFlowAnalysisProps {
  propertyId?: number;
  chartType?: "monthly" | "yearly" | "breakdown" | "trend" | "composition";
  className?: string;
}

interface CashFlowData {
  name: string;
  수입?: number;
  지출?: number;
  순현금흐름?: number;
  value?: number;
  [key: string]: string | number | undefined;
}

// 샘플 데이터 - 데이터가 없거나 에러일 때도 UI를 보여주기 위해 사용
const sampleMonthlyData = [
  { name: '1월', 수입: 4000, 지출: 2400, 순현금흐름: 1600 },
  { name: '2월', 수입: 4500, 지출: 2100, 순현금흐름: 2400 },
  { name: '3월', 수입: 5000, 지출: 2500, 순현금흐름: 2500 },
  { name: '4월', 수입: 4700, 지출: 2700, 순현금흐름: 2000 },
  { name: '5월', 수입: 4300, 지출: 2200, 순현금흐름: 2100 },
  { name: '6월', 수입: 4800, 지출: 2400, 순현금흐름: 2400 },
];

const sampleTrendData = [
  { name: '1월', 순현금흐름: 1600 },
  { name: '2월', 순현금흐름: 2400 },
  { name: '3월', 순현금흐름: 2500 },
  { name: '4월', 순현금흐름: 2000 },
  { name: '5월', 순현금흐름: 2100 },
  { name: '6월', 순현금흐름: 2400 },
  { name: '7월', 순현금흐름: 2800 },
  { name: '8월', 순현금흐름: 2900 },
  { name: '9월', 순현금흐름: 2700 },
  { name: '10월', 순현금흐름: 3000 },
  { name: '11월', 순현금흐름: 3200 },
  { name: '12월', 순현금흐름: 3400 },
];

const sampleCompositionData = [
  { name: "임대수익", value: 65 },
  { name: "주차수익", value: 15 },
  { name: "부대시설", value: 12 },
  { name: "기타수익", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function CashFlowAnalysis({ propertyId, chartType = "monthly", className }: CashFlowAnalysisProps) {
  const [selectedChartType, setSelectedChartType] = useState<string>(chartType);
  // 데이터 로딩 상태에 대한 명시적인 제어를 위한 상태 추가
  const [showDataLoadingError, setShowDataLoadingError] = useState(chartType === "trend" || chartType === "composition");
  const [retrying, setRetrying] = useState(false);

  // API 요청 파라미터 준비
  const apiParams = new URLSearchParams();
  if (propertyId) {
    apiParams.append('propertyId', propertyId.toString());
  }
  apiParams.append('chartType', selectedChartType);

  // Fetch data based on chart type
  const { data, isLoading, error, refetch } = useQuery<CashFlowData[]>({
    queryKey: ["/api/financial/cashflow", selectedChartType, propertyId || 'all'],
    queryFn: async () => {
      if (showDataLoadingError) {
        // 일부 차트 타입에서 데이터를 불러올 수 없음을 시뮬레이션
        throw new Error('데이터를 불러올 수 없습니다');
      }
      
      const response = await fetch(`/api/financial/cashflow?${apiParams.toString()}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다');
      }
      return response.json();
    },
    refetchOnWindowFocus: false
  });

  const handleChartTypeChange = (type: string) => {
    setSelectedChartType(type);
    setShowDataLoadingError(type === "trend" || type === "composition");
  };

  const handleRetry = () => {
    setRetrying(true);
    setShowDataLoadingError(false);
    refetch().finally(() => setRetrying(false));
  };

  if (isLoading || retrying) {
    return (
      <div className={`w-full h-[200px] flex items-center justify-center ${className}`}>
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    );
  }

  if (error || !data) {
    if (selectedChartType === "trend" || selectedChartType === "composition") {
      return (
        <div className={`text-center p-6 ${className}`}>
          <p className="text-red-500 mb-2">데이터를 불러올 수 없습니다.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 items-center flex mx-auto"
            onClick={handleRetry}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> 다시 시도
          </Button>
        </div>
      );
    }
    
    return (
      <div className={`text-center p-4 ${className}`}>
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
  const dataKeys = data && data.length > 0 
    ? Object.keys(data[0]).filter(key => key !== 'name' && data[0][key] !== undefined)
    : [];

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={selectedChartType} onValueChange={handleChartTypeChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="monthly">월별 현금 흐름</TabsTrigger>
          <TabsTrigger value="trend">순현금흐름 트렌드</TabsTrigger>
          <TabsTrigger value="composition">구성 항목 분석</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedChartType}>
          {selectedChartType === "monthly" && (
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
          )}
          
          {selectedChartType === "trend" && (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data || sampleTrendData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone"
                    dataKey="순현금흐름"
                    stroke="#60a5fa"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {selectedChartType === "composition" && (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data || sampleCompositionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {(data || sampleCompositionData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}