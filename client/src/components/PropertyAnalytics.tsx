import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Property } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  DollarSign,
  BarChart2,
  Activity,
  PieChart as PieChartIcon,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface PropertyAnalyticsProps {
  property: Property;
}

export default function PropertyAnalytics({ property }: PropertyAnalyticsProps) {
  const { t } = useTranslation();
  const [cashflowPeriod, setCashflowPeriod] = useState("monthly");
  const [chartType, setChartType] = useState("cashflow");
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState("cashflow");
  const [assetValuePeriod, setAssetValuePeriod] = useState("5year");

  // 헤더 설명 텍스트
  const headerDescription = "SaharaRealTech의 고급 금융 분석 도구를 통해 부동산 투자의 수익성, 현금 흐름, 세금 효과 및 포트폴리오 성과를 분석해보세요. 전문가 수준의 부동산 금융 분석으로 더 나은 투자 결정을 내리실 수 있습니다.";
  
  // API 호출 및 데이터 가져오기
  const { data: cashflowData, isLoading: isCashflowLoading } = useQuery({
    queryKey: ['/api/financial/cashflow', cashflowPeriod],
    queryFn: () => fetch(`/api/financial/cashflow?chartType=${cashflowPeriod}`).then(res => res.json())
  });

  const { data: assetValueData, isLoading: isAssetValueLoading } = useQuery({
    queryKey: ['/api/financial/asset-value'],
    queryFn: () => fetch('/api/financial/asset-value').then(res => res.json())
  });

  const { data: returnAnalysisData, isLoading: isReturnLoading } = useQuery({
    queryKey: ['/api/financial/return-analysis', 'coc'],
    queryFn: () => fetch('/api/financial/return-analysis?analysisType=coc').then(res => res.json())
  });
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-neutral-600 mb-6 max-w-4xl mx-auto">{headerDescription}</p>
        
        <Tabs defaultValue="cashflow" className="w-full" onValueChange={setSelectedAnalysisTab}>
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="cashflow">현금 흐름 분석</TabsTrigger>
            <TabsTrigger value="returns">수익률 분석</TabsTrigger>
            <TabsTrigger value="assetValue">자산 가치 분석</TabsTrigger>
            <TabsTrigger value="comparison">금융 상품 비교</TabsTrigger>
            <TabsTrigger value="tax">세금 및 비용 분석</TabsTrigger>
            <TabsTrigger value="portfolio">포트폴리오 분석</TabsTrigger>
          </TabsList>
          
          <div className="mx-auto text-center mb-4">
            <Button variant="outline" className="bg-primary/5 text-primary">
              시장 지표 및 예측
            </Button>
          </div>
          
          <TabsContent value="cashflow">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">현금 흐름 분석</CardTitle>
                  <Select
                    value={cashflowPeriod}
                    onValueChange={setCashflowPeriod}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="차트 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">월별</SelectItem>
                      <SelectItem value="quarterly">분기별</SelectItem>
                      <SelectItem value="yearly">연간</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>이 부동산의 현금 흐름 구성과 예상 수익을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  {isCashflowLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : cashflowData ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={cashflowData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="수입" 
                          stackId="1"
                          stroke="#10b981" 
                          fill="#10b981"
                          name="수입"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="지출" 
                          stackId="1"
                          stroke="#ef4444" 
                          fill="#ef4444"
                          name="지출"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="순현금흐름" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          fill="#3b82f680"
                          name="순현금흐름"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                      <span>데이터를 불러오는 중 오류가 발생했습니다</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="py-2 px-4">
                      <CardTitle className="text-sm font-medium">연간 수입</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-lg font-bold text-primary">{formatCurrency(Number(property.totalValue) * (Number(property.expectedReturn) / 100))}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-2 px-4">
                      <CardTitle className="text-sm font-medium">월 평균 수입</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-lg font-bold text-primary">{formatCurrency(Number(property.totalValue) * (Number(property.expectedReturn) / 100) / 12)}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-2 px-4">
                      <CardTitle className="text-sm font-medium">현금 수익률</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-lg font-bold text-primary">{Number(property.expectedReturn).toFixed(1)}%</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="returns">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">수익률 분석</CardTitle>
                <CardDescription>투자 수익률과 성과 지표를 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 p-8 text-center bg-neutral-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-neutral-500">구현 중입니다...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assetValue">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">자산 가치 분석</CardTitle>
                  <Select
                    value={assetValuePeriod}
                    onValueChange={setAssetValuePeriod}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5year">5년</SelectItem>
                      <SelectItem value="10year">10년</SelectItem>
                      <SelectItem value="20year">20년</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>부동산 자산의 가치 변화 예측을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 p-8 text-center bg-neutral-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-neutral-500">구현 중입니다...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">금융 상품 비교</CardTitle>
                <CardDescription>다양한 투자 상품과 비교하여 수익성을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 p-8 text-center bg-neutral-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-neutral-500">구현 중입니다...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tax">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">세금 및 비용 분석</CardTitle>
                <CardDescription>부동산 투자에 관련된 세금과 비용을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 p-8 text-center bg-neutral-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-neutral-500">구현 중입니다...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">포트폴리오 분석</CardTitle>
                <CardDescription>전체 투자 포트폴리오에서의 위치와 영향을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 p-8 text-center bg-neutral-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                  <p className="text-neutral-500">구현 중입니다...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}