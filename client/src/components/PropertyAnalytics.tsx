import { useState, useEffect } from "react";
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
  Radar,
  ScatterChart,
  Scatter,
  LineChart as RechartsLineChart,
  Line
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
  AlertCircle,
  CheckCircle,
  Briefcase,
  LineChart as LineChartIcon
} from "lucide-react";
import AssetValueAnalysisTab from "@/components/AssetValueAnalysisTab";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyAnalyticsProps {
  property: Property;
}

export default function PropertyAnalytics({ property }: PropertyAnalyticsProps) {
  const { t } = useTranslation();
  const [cashflowPeriod, setCashflowPeriod] = useState("monthly");
  const [chartType, setChartType] = useState("cashflow");
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState("cashflow");
  const [assetValuePeriod, setAssetValuePeriod] = useState("5year");
  
  // 탭 변경 시, 콘솔에 로그 출력
  useEffect(() => {
    console.log("선택된 탭:", selectedAnalysisTab);
  }, [selectedAnalysisTab]);

  // 헤더 설명 텍스트
  const headerDescription = "SaharaRealTech의 고급 금융 분석 도구를 통해 부동산 투자의 수익성, 현금 흐름, 세금 효과 및 포트폴리오 성과를 분석해보세요. 전문가 수준의 부동산 금융 분석으로 더 나은 투자 결정을 내리실 수 있습니다.";
  
  // API 호출 및 데이터 가져오기
  const { data: cashflowData, isLoading: isCashflowLoading } = useQuery({
    queryKey: ['/api/financial/cashflow', cashflowPeriod],
    queryFn: () => fetch(`/api/financial/cashflow?chartType=${cashflowPeriod}`).then(res => res.json())
  });

  const { data: returnAnalysisData, isLoading: isReturnLoading } = useQuery({
    queryKey: ['/api/financial/return-analysis', 'coc'],
    queryFn: () => fetch('/api/financial/return-analysis?analysisType=coc').then(res => res.json())
  });
  
  const { data: irrData, isLoading: isIrrLoading } = useQuery({
    queryKey: ['/api/financial/return-analysis', 'irr'],
    queryFn: () => fetch('/api/financial/return-analysis?analysisType=irr').then(res => res.json())
  });
  
  const { data: comparisonData, isLoading: isComparisonLoading } = useQuery({
    queryKey: ['/api/financial/return-analysis', 'comparison'],
    queryFn: () => fetch('/api/financial/return-analysis?analysisType=comparison').then(res => res.json())
  });
  
  const { data: marketData, isLoading: isMarketLoading } = useQuery({
    queryKey: ['/api/financial/market-indicators'],
    queryFn: () => fetch('/api/financial/market-indicators').then(res => res.json())
  });
  
  const { data: portfolioData, isLoading: isPortfolioLoading } = useQuery({
    queryKey: ['/api/financial/portfolio-analysis'],
    queryFn: () => fetch('/api/financial/portfolio-analysis').then(res => res.json())
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-primary/5 text-primary">
                  시장 지표 및 예측
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>시장 지표 및 예측</DialogTitle>
                  <DialogDescription>
                    부동산 시장 지표와 미래 추세를 확인하여 투자 결정에 활용하세요
                  </DialogDescription>
                </DialogHeader>
                
                {isMarketLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : marketData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium">시장 추세</CardTitle>
                          <CardDescription>주요 부동산 시장 지표</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsLineChart
                                data={marketData.marketTrends}
                                margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line 
                                  type="monotone" 
                                  dataKey="가격지수" 
                                  stroke="#3b82f6" 
                                  activeDot={{ r: 8 }} 
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="거래량" 
                                  stroke="#10b981" 
                                />
                              </RechartsLineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* 생략: 시장 예측 카드 */}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>데이터를 불러오는 중 오류가 발생했습니다</span>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          {/* 현금 흐름 분석 탭 */}
          <TabsContent value="cashflow">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-medium">현금 흐름 분석</CardTitle>
                    <CardDescription>월별 수입, 지출 및 순현금흐름을 분석하세요</CardDescription>
                  </div>
                  <Select
                    value={cashflowPeriod}
                    onValueChange={setCashflowPeriod}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">월별</SelectItem>
                      <SelectItem value="quarterly">분기별</SelectItem>
                      <SelectItem value="yearly">연간</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {isCashflowLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : cashflowData ? (
                  <div className="space-y-6">
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={cashflowData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Bar dataKey="수입" fill="#3b82f6" />
                          <Bar dataKey="지출" fill="#ef4444" />
                          <Bar dataKey="순현금흐름" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>데이터를 불러오는 중 오류가 발생했습니다</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 수익률 분석 탭 */}
          <TabsContent value="returns">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-medium">투자 수익률 분석</CardTitle>
                    <CardDescription>예상 수익률과 투자 회수 기간을 확인하세요</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isReturnLoading || isIrrLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : returnAnalysisData && irrData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-green-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-700">현금 수익률 (CoC)</p>
                              <p className="text-2xl font-bold text-green-800">{returnAnalysisData.coc}%</p>
                            </div>
                            <DollarSign className="h-10 w-10 text-green-500 opacity-80" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-purple-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-purple-700">내부 수익률</p>
                              <p className="text-2xl font-bold text-purple-800">{irrData.irr}%</p>
                            </div>
                            <TrendingUp className="h-10 w-10 text-purple-500 opacity-80" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-blue-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-700">자본 회수 기간</p>
                              <p className="text-2xl font-bold text-blue-800">4.3년</p>
                            </div>
                            <Calendar className="h-10 w-10 text-blue-500 opacity-80" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>데이터를 불러오는 중 오류가 발생했습니다</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 자산 가치 분석 탭 */}
          <TabsContent value="assetValue">
            {selectedAnalysisTab === 'assetValue' && (
              <AssetValueAnalysisTab formatCurrency={formatCurrency} />
            )}
          </TabsContent>
          
          {/* 금융 상품 비교 탭 */}
          <TabsContent value="comparison">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-medium">금융 상품 비교</CardTitle>
                    <CardDescription>다양한 투자 유형의 수익률과 위험을 비교하세요</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isComparisonLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : comparisonData ? (
                  <div className="space-y-6">
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart 
                          outerRadius={120} 
                          width={500} 
                          height={300} 
                          data={comparisonData.radarData}
                        >
                          <PolarGrid />
                          <PolarAngleAxis dataKey="criteria" />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} />
                          <Radar 
                            name="부동산 토큰" 
                            dataKey="propertyToken" 
                            stroke="#3b82f6" 
                            fill="#3b82f680" 
                            fillOpacity={0.6} 
                          />
                          <Radar 
                            name="전통적 부동산" 
                            dataKey="traditionalProperty" 
                            stroke="#ef4444" 
                            fill="#ef444480" 
                            fillOpacity={0.6} 
                          />
                          <Radar 
                            name="주식" 
                            dataKey="stocks" 
                            stroke="#10b981" 
                            fill="#10b98180" 
                            fillOpacity={0.6} 
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>데이터를 불러오는 중 오류가 발생했습니다</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 세금 및 비용 분석 탭 */}
          <TabsContent value="tax">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-medium">세금 및 비용 분석</CardTitle>
                    <CardDescription>투자 과정에서 발생하는 세금과 비용을 분석하세요</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: '취득세', value: 1.3 },
                            { name: '등록세', value: 0.8 },
                            { name: '재산세', value: 0.3 },
                            { name: '종합부동산세', value: 0.6 },
                            { name: '양도소득세', value: 2.5 },
                            { name: '관리비', value: 1.2 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            { name: '취득세', value: 1.3, color: '#3b82f6' },
                            { name: '등록세', value: 0.8, color: '#10b981' },
                            { name: '재산세', value: 0.3, color: '#f59e0b' },
                            { name: '종합부동산세', value: 0.6, color: '#ef4444' },
                            { name: '양도소득세', value: 2.5, color: '#8b5cf6' },
                            { name: '관리비', value: 1.2, color: '#ec4899' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">세금 절감 전략</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-2 list-disc pl-5">
                          <li>
                            <span className="font-medium">토큰화 구조 활용:</span> 자산 토큰화를 통해 부분 소유권 취득 시 세금 효율성 증가
                          </li>
                          <li>
                            <span className="font-medium">장기 보유 전략:</span> 1년 이상 보유 시 양도소득세 감면 혜택
                          </li>
                          <li>
                            <span className="font-medium">법인 구조 활용:</span> 특정 상황에서 법인을 통한 투자로 세금 효율화
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">비용 최적화 전략</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-2 list-disc pl-5">
                          <li>
                            <span className="font-medium">거래 비용 감소:</span> 토큰 기반 거래로 중개 수수료 절감
                          </li>
                          <li>
                            <span className="font-medium">공동 관리:</span> 분산형 소유권을 통한 관리 비용 공유
                          </li>
                          <li>
                            <span className="font-medium">스마트 계약 활용:</span> 자동화된 계약 처리로 법률 비용 절감
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 포트폴리오 분석 탭 */}
          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-medium">포트폴리오 분석</CardTitle>
                    <CardDescription>자산 배분과 다각화 효과를 확인하세요</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isPortfolioLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : portfolioData ? (
                  <div className="space-y-6">
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <CartesianGrid />
                          <XAxis 
                            type="number" 
                            dataKey="risk" 
                            name="위험도" 
                            unit="%" 
                            domain={[0, 15]}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="return" 
                            name="수익률" 
                            unit="%" 
                            domain={[0, 15]}
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value) => `${value}%`}
                          />
                          <Legend />
                          <Scatter 
                            name="현재 포트폴리오" 
                            data={portfolioData.currentPortfolio} 
                            fill="#3b82f6"
                          />
                          <Scatter 
                            name="최적화된 포트폴리오" 
                            data={portfolioData.optimizedPortfolio} 
                            fill="#10b981"
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-blue-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium">포트폴리오 구성</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={portfolioData.allocation}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={90}
                                  fill="#8884d8"
                                  paddingAngle={2}
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                  <Cell fill="#3b82f6" />
                                  <Cell fill="#10b981" />
                                  <Cell fill="#f59e0b" />
                                  <Cell fill="#8b5cf6" />
                                  <Cell fill="#ec4899" />
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-green-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium">다각화 효과</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={[
                                  { name: '단일 자산', risk: 12, return: 8 },
                                  { name: '다각화 포트폴리오', risk: 7, return: 10 },
                                ]}
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="risk" name="위험도 (%)" fill="#ef4444" />
                                <Bar dataKey="return" name="수익률 (%)" fill="#10b981" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-72">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>데이터를 불러오는 중 오류가 발생했습니다</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}