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
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium">가격 예측</CardTitle>
                          <CardDescription>향후 12개월 예상 가격</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={marketData.pricePrediction}
                                margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area 
                                  type="monotone" 
                                  dataKey="낙관적" 
                                  stackId="1"
                                  stroke="#10b981" 
                                  fill="#10b98120"
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="예상" 
                                  stackId="1"
                                  stroke="#3b82f6" 
                                  fill="#3b82f640"
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="보수적" 
                                  stackId="1"
                                  stroke="#ef4444" 
                                  fill="#ef444420"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium">영향 요인</CardTitle>
                          <CardDescription>가격에 영향을 미치는 주요 요소</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart 
                                outerRadius={85} 
                                width={400} 
                                height={250} 
                                data={marketData.impactFactors}
                              >
                                <PolarGrid />
                                <PolarAngleAxis dataKey="factor" />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                                <Radar 
                                  name="영향도" 
                                  dataKey="value" 
                                  stroke="#8884d8" 
                                  fill="#8884d8" 
                                  fillOpacity={0.6} 
                                />
                                <Legend />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-md font-medium mb-3">주요 시장 지표 요약</h3>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-neutral-100">
                              <th className="py-2 px-3 text-left font-medium">지표</th>
                              <th className="py-2 px-3 text-right font-medium">현재 값</th>
                              <th className="py-2 px-3 text-right font-medium">변화율 (YoY)</th>
                              <th className="py-2 px-3 text-right font-medium">전망</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr>
                              <td className="py-2 px-3">금리</td>
                              <td className="py-2 px-3 text-right">3.8%</td>
                              <td className="py-2 px-3 text-right text-red-600">+0.2%</td>
                              <td className="py-2 px-3 text-right">안정적</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">인플레이션</td>
                              <td className="py-2 px-3 text-right">2.9%</td>
                              <td className="py-2 px-3 text-right text-red-600">+0.5%</td>
                              <td className="py-2 px-3 text-right">하향</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">LTV 비율</td>
                              <td className="py-2 px-3 text-right">60%</td>
                              <td className="py-2 px-3 text-right text-gray-500">0%</td>
                              <td className="py-2 px-3 text-right">안정적</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">Cap Rate</td>
                              <td className="py-2 px-3 text-right">5.2%</td>
                              <td className="py-2 px-3 text-right text-green-600">+0.3%</td>
                              <td className="py-2 px-3 text-right">상승</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">공실률</td>
                              <td className="py-2 px-3 text-right">4.5%</td>
                              <td className="py-2 px-3 text-right text-red-600">+0.8%</td>
                              <td className="py-2 px-3 text-right">상승</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-md font-medium mb-3">시장 전망 및 권장사항</h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-800 mb-2">단기 전망 (6-12개월)</h4>
                          <p className="text-sm text-blue-700">부동산 시장은 대부분 지역에서 안정세를 보이고 있으며, 일부 프리미엄 지역에서는 가격 상승이 예상됩니다. 금리 상승에 따른 대출 부담이 증가할 수 있으나, 자산 가치는 꾸준히 유지될 것으로 전망됩니다.</p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-purple-800 mb-2">장기 전망 (2-5년)</h4>
                          <p className="text-sm text-purple-700">장기적으로 가치가 상승할 것으로 예상되는 지역에 대한 투자가 권장됩니다. 인프라 발전, 인구 유입 및 정부 정책 변화를 고려하여 지속 가능한 가치 상승이 예상되는 자산에 집중하세요.</p>
                        </div>
                        
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-amber-800 mb-2">투자 권장사항</h4>
                          <ul className="space-y-1 text-sm text-amber-700">
                            <li className="flex">
                              <CheckCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                              <span>분산 투자 유지: 다양한 지역 및 자산 유형에 분산 투자하여 위험 완화</span>
                            </li>
                            <li className="flex">
                              <CheckCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                              <span>현금 흐름 중심: 안정적인 현금 흐름을 제공하는 자산 선호</span>
                            </li>
                            <li className="flex">
                              <CheckCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                              <span>금리 변동 대비: 고정 금리 및 장기 융자 옵션 고려</span>
                            </li>
                          </ul>
                        </div>
                      </div>
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
                {isReturnLoading || isIrrLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : returnAnalysisData && irrData ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-md font-medium mb-3">현금 수익률 (Cash on Cash)</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={returnAnalysisData.details}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis tickFormatter={(value) => `${value}%`} />
                              <Tooltip formatter={(value) => [`${value}%`, '수익률']} />
                              <Bar dataKey="value" fill="#10b981" barSize={40} radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-medium mb-3">내부 수익률 (IRR)</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={irrData.yearlyData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" tickFormatter={(value) => `${value}년차`} />
                              <YAxis tickFormatter={(value) => `${value}%`} />
                              <Tooltip formatter={(value) => [`${value}%`, '수익률']} />
                              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d880" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-green-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-700">현금 수익률</p>
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
                {isAssetValueLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : assetValueData ? (
                  <div className="space-y-6">
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={assetValueData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis 
                            yAxisId="left"
                            orientation="left"
                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                          />
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                          />
                          <Tooltip 
                            formatter={(value, name) => {
                              if (name === 'propertyValue') {
                                return [formatCurrency(Number(value)), '자산 가치'];
                              } else {
                                return [formatCurrency(Number(value)), '토큰 가치'];
                              }
                            }}
                            labelFormatter={(label) => `${label}년`}
                          />
                          <Legend />
                          <Area 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="propertyValue" 
                            stroke="#3b82f6" 
                            fill="#3b82f680"
                            name="자산 가치" 
                          />
                          <Area 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="tokenValue" 
                            stroke="#10b981" 
                            fill="#10b98180"
                            name="토큰 가치" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <Card className="bg-blue-50">
                        <CardContent className="pt-4">
                          <h3 className="text-sm text-blue-700 mb-1">초기 자산 가치 (2020)</h3>
                          <p className="text-xl font-bold text-blue-800">{formatCurrency(assetValueData[0].propertyValue)}</p>
                          <div className="mt-2 flex items-center">
                            <p className="text-xs text-blue-600">토큰 당 {formatCurrency(assetValueData[0].tokenValue)}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-green-50">
                        <CardContent className="pt-4">
                          <h3 className="text-sm text-green-700 mb-1">현재 자산 가치 (2024)</h3>
                          <p className="text-xl font-bold text-green-800">{formatCurrency(assetValueData[4].propertyValue)}</p>
                          <div className="mt-2 flex items-center">
                            <p className="text-xs text-green-600">토큰 당 {formatCurrency(assetValueData[4].tokenValue)}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-purple-50">
                        <CardContent className="pt-4">
                          <h3 className="text-sm text-purple-700 mb-1">5년 후 예상 가치 (2029)</h3>
                          <p className="text-xl font-bold text-purple-800">{formatCurrency(assetValueData[9].propertyValue)}</p>
                          <div className="mt-2 flex items-center">
                            <p className="text-xs text-purple-600">토큰 당 {formatCurrency(assetValueData[9].tokenValue)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-3">자산 가치 상승 요인</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        <div className="text-center">
                          <div className="inline-block w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                            <span className="font-medium text-blue-600">30%</span>
                          </div>
                          <p className="text-xs">위치</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-block w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                            <span className="font-medium text-green-600">15%</span>
                          </div>
                          <p className="text-xs">주변시설</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-block w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                            <span className="font-medium text-yellow-600">20%</span>
                          </div>
                          <p className="text-xs">교통</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-block w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                            <span className="font-medium text-purple-600">15%</span>
                          </div>
                          <p className="text-xs">건물상태</p>
                        </div>
                        <div className="text-center">
                          <div className="inline-block w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                            <span className="font-medium text-pink-600">20%</span>
                          </div>
                          <p className="text-xs">시장수요</p>
                        </div>
                      </div>
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
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">금융 상품 비교</CardTitle>
                <CardDescription>다양한 투자 상품과 비교하여 수익성을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                {isComparisonLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : comparisonData ? (
                  <div className="space-y-6">
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid />
                          <XAxis 
                            type="number" 
                            dataKey="risk" 
                            name="위험도" 
                            unit="점"
                            domain={[0, 10]} 
                            label={{ value: '위험도', position: 'bottom', offset: 0 }}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="roi" 
                            name="예상 수익률" 
                            unit="%"
                            domain={[0, 15]} 
                            label={{ value: '예상 수익률 (%)', angle: -90, position: 'insideLeft' }} 
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value, name) => {
                              if (name === 'roi') {
                                return [`${value}%`, '예상 수익률'];
                              } else if (name === 'risk') {
                                return [`${value}점`, '위험도'];
                              } else {
                                return [value, name];
                              }
                            }}
                          />
                          <Legend />
                          <Scatter 
                            name="부동산 비교" 
                            data={comparisonData.comparisonData} 
                            fill="#8884d8" 
                            shape={(props: any) => {
                              const { cx, cy, payload } = props;
                              // 현재 부동산은 강조 표시
                              if (payload.name === '현재 부동산') {
                                return (
                                  <circle 
                                    cx={cx} 
                                    cy={cy} 
                                    r={10} 
                                    stroke="#F59E0B" 
                                    strokeWidth={2}
                                    fill="#FBBF24" 
                                    fillOpacity={0.6} 
                                  />
                                );
                              }
                              return (
                                <circle 
                                  cx={cx} 
                                  cy={cy} 
                                  r={Math.sqrt(payload.size) / 2} 
                                  fill="#8884d8" 
                                  fillOpacity={0.6} 
                                />
                              );
                            }}
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="bg-white rounded-lg border p-4">
                        <h3 className="text-sm font-medium mb-1">일반 예금</h3>
                        <p className="text-2xl font-bold">2.8%</p>
                        <p className="text-xs text-gray-500">위험도: 매우 낮음</p>
                      </div>
                      
                      <div className="bg-white rounded-lg border p-4">
                        <h3 className="text-sm font-medium mb-1">국채</h3>
                        <p className="text-2xl font-bold">4.5%</p>
                        <p className="text-xs text-gray-500">위험도: 낮음</p>
                      </div>
                      
                      <div className="bg-white rounded-lg border p-4">
                        <h3 className="text-sm font-medium mb-1">주식 시장</h3>
                        <p className="text-2xl font-bold">8.2%</p>
                        <p className="text-xs text-gray-500">위험도: 중간-높음</p>
                      </div>
                      
                      <div className="bg-white rounded-lg border p-4">
                        <h3 className="text-sm font-medium mb-1">부동산 평균</h3>
                        <p className="text-2xl font-bold">9.7%</p>
                        <p className="text-xs text-gray-500">위험도: 중간</p>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg border-2 border-amber-200 p-4">
                        <h3 className="text-sm font-medium mb-1 text-amber-700">현재 투자</h3>
                        <p className="text-2xl font-bold text-amber-800">{Number(property.expectedReturn).toFixed(1)}%</p>
                        <p className="text-xs text-amber-600">위험도: 중간-낮음</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-800 mb-2">투자 상품 비교 특징</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 토큰화된 부동산은 일반 부동산에 비해 유동성이 더 높습니다.</li>
                        <li>• 분산 투자가 용이하여 위험도 대비 수익률이 높습니다.</li>
                        <li>• 소액으로 시작할 수 있어 투자 진입 장벽이 낮습니다.</li>
                        <li>• 블록체인 기술로 투명성과 안전성이 보장됩니다.</li>
                      </ul>
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
          
          <TabsContent value="tax">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">세금 및 비용 분석</CardTitle>
                <CardDescription>부동산 투자에 관련된 세금과 비용을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-md font-medium mb-3">세금 구성</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: '취득세', value: 4.6 },
                                { name: '재산세', value: 1.2 },
                                { name: '종합부동산세', value: 0.8 },
                                { name: '양도소득세', value: 3.4 },
                                { name: '소득세', value: 1.8 }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                            >
                              {[
                                { name: '취득세', value: 4.6 },
                                { name: '재산세', value: 1.2 },
                                { name: '종합부동산세', value: 0.8 },
                                { name: '양도소득세', value: 3.4 },
                                { name: '소득세', value: 1.8 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={[
                                  '#0891b2', '#0e7490', '#164e63', '#0369a1', '#075985'
                                ][index % 5]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, '세율']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-3">운영 비용 구성</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: '관리비', value: 2.8 },
                              { name: '보험료', value: 0.7 },
                              { name: '수리비', value: 1.2 },
                              { name: '공실 비용', value: 1.5 },
                              { name: '중개 수수료', value: 0.5 }
                            ]}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                            <YAxis type="category" dataKey="name" width={70} />
                            <Tooltip formatter={(value) => [`${value}%`, '비율']} />
                            <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="text-blue-800 text-md font-medium mb-3">토큰화 부동산 세금 혜택</h3>
                        <ul className="space-y-2 text-sm text-blue-700">
                          <li className="flex items-start">
                            <span className="inline-block rounded-full bg-blue-200 p-1 mr-2 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-blue-700" />
                            </span>
                            <span>취득세 및 양도소득세 세율 인하 (전통 부동산 대비 약 20% 인하)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block rounded-full bg-blue-200 p-1 mr-2 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-blue-700" />
                            </span>
                            <span>토큰 거래시 부동산 양도와 달리 취득세 감면 혜택</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block rounded-full bg-blue-200 p-1 mr-2 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-blue-700" />
                            </span>
                            <span>투자 규모에 따른 세제 혜택 (소액 투자자 세금 감면)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block rounded-full bg-blue-200 p-1 mr-2 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-blue-700" />
                            </span>
                            <span>특정 구역 투자시 추가 세제 혜택 제공</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-neutral-100">
                            <th className="py-2 px-3 text-left font-medium">세금/비용 항목</th>
                            <th className="py-2 px-3 text-right font-medium">일반 부동산</th>
                            <th className="py-2 px-3 text-right font-medium">토큰화 부동산</th>
                            <th className="py-2 px-3 text-right font-medium">차이</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 px-3">취득세</td>
                            <td className="py-2 px-3 text-right">4.6%</td>
                            <td className="py-2 px-3 text-right">3.5%</td>
                            <td className="py-2 px-3 text-right text-green-600">-1.1%</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">양도소득세</td>
                            <td className="py-2 px-3 text-right">6-42%</td>
                            <td className="py-2 px-3 text-right">6-35%</td>
                            <td className="py-2 px-3 text-right text-green-600">최대 -7%</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">종합부동산세</td>
                            <td className="py-2 px-3 text-right">0.5-2.7%</td>
                            <td className="py-2 px-3 text-right">0.4-2.5%</td>
                            <td className="py-2 px-3 text-right text-green-600">-0.2%</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">중개 수수료</td>
                            <td className="py-2 px-3 text-right">~0.9%</td>
                            <td className="py-2 px-3 text-right">0.1-0.5%</td>
                            <td className="py-2 px-3 text-right text-green-600">-0.4%</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">운영 비용</td>
                            <td className="py-2 px-3 text-right">관리 필요</td>
                            <td className="py-2 px-3 text-right">자동화</td>
                            <td className="py-2 px-3 text-right text-green-600">편의성 ↑</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                {isPortfolioLoading ? (
                  <Skeleton className="h-72 w-full" />
                ) : portfolioData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-md font-medium mb-3">자산 분배</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={portfolioData.allocation}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {portfolioData.allocation.map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={[
                                    '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'
                                  ][index % 5]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value}%`, '비율']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-medium mb-3">위험-수익률 분석</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart 
                              outerRadius={90} 
                              width={500} 
                              height={250} 
                              data={portfolioData.riskAnalysis}
                            >
                              <PolarGrid />
                              <PolarAngleAxis dataKey="subject" />
                              <PolarRadiusAxis angle={90} domain={[0, 10]} />
                              <Radar 
                                name="현재 포트폴리오" 
                                dataKey="value" 
                                stroke="#8884d8" 
                                fill="#8884d8" 
                                fillOpacity={0.6} 
                              />
                              <Radar 
                                name="이상적 포트폴리오" 
                                dataKey="optimal" 
                                stroke="#82ca9d" 
                                fill="#82ca9d" 
                                fillOpacity={0.6} 
                              />
                              <Legend />
                              <Tooltip />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-blue-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-700">포트폴리오 안정성</p>
                              <p className="text-2xl font-bold text-blue-800">8.5/10</p>
                            </div>
                            <Briefcase className="h-10 w-10 text-blue-500 opacity-80" />
                          </div>
                          <p className="text-xs text-blue-600 mt-2">분산투자로 인한 안정성 확보</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-green-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-700">포트폴리오 수익률</p>
                              <p className="text-2xl font-bold text-green-800">10.2%</p>
                            </div>
                            <TrendingUp className="h-10 w-10 text-green-500 opacity-80" />
                          </div>
                          <p className="text-xs text-green-600 mt-2">시장 평균보다 1.5% 높음</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-purple-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-purple-700">상관관계 점수</p>
                              <p className="text-2xl font-bold text-purple-800">7.8/10</p>
                            </div>
                            <LineChartIcon className="h-10 w-10 text-purple-500 opacity-80" />
                          </div>
                          <p className="text-xs text-purple-600 mt-2">낮은 자산간 상관관계</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-md font-medium text-amber-800 mb-2">투자 추천</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                          <p className="text-sm text-amber-700">현재 자산의 포트폴리오 영향도는 <span className="font-medium">긍정적</span>입니다.</p>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                          <p className="text-sm text-amber-700">위험 분산을 위해 다른 지역의 부동산 투자를 추가하는 것이 좋습니다.</p>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                          <p className="text-sm text-amber-700">전체 포트폴리오의 15-25% 사이로 부동산 자산 비율을 유지하세요.</p>
                        </div>
                      </div>
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