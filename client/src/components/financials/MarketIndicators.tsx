import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketIndicatorsData {
  marketTrends: {
    date: string;
    가격지수: number;
    거래량: number;
  }[];
  pricePrediction: {
    month: string;
    낙관적: number;
    예상: number;
    보수적: number;
  }[];
  impactFactors: {
    factor: string;
    value: number;
  }[];
  keyIndicators: {
    name: string;
    value: number;
    change: number;
  }[];
  priceIndices: {
    date: string;
    residentialIndex: number;
    commercialIndex: number;
    regionalIndex: number;
  }[];
  marketComparison: {
    period: string;
    stockMarket: number;
    bondMarket: number;
    realEstate: number;
    propertyType: number;
  }[];
}

export default function MarketIndicators() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('trends');
  
  // 시장 지표 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['market-indicators'],
    queryFn: async () => {
      const response = await fetch('/api/financial/market-indicators');
      if (!response.ok) {
        throw new Error('Failed to fetch market indicators data');
      }
      return response.json() as Promise<MarketIndicatorsData>;
    }
  });

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-4">
        <Skeleton className="h-[250px] w-full mb-4" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  // 에러 처리
  if (error || !data) {
    return (
      <Alert variant="destructive" className="bg-red-50 text-red-800 border border-red-200">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription>
          {t('common.errorLoading', '데이터를 불러오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.')}
        </AlertDescription>
      </Alert>
    );
  }
  
  // 시장 트렌드 차트
  const renderMarketTrendChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data.marketTrends}
        margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          yAxisId="left" 
          orientation="left" 
          stroke="#4D72AA"
          label={{ value: '가격지수', angle: -90, position: 'insideLeft' }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          stroke="#FF6B6B"
          label={{ value: '거래량', angle: 90, position: 'insideRight' }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="가격지수"
          stroke="#4D72AA"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 5 }}
        />
        <Bar
          yAxisId="right"
          dataKey="거래량"
          fill="#FF6B6B"
          barSize={15}
          opacity={0.6}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
  
  // 가격 예측 차트
  const renderPricePredictionChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data.pricePrediction}
        margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={data.pricePrediction[0].예상} stroke="#666" strokeDasharray="3 3" />
        <Area 
          type="monotone" 
          dataKey="낙관적" 
          stroke="#82ca9d" 
          fill="#82ca9d" 
          fillOpacity={0.2}
        />
        <Area 
          type="monotone" 
          dataKey="예상" 
          stroke="#4D72AA" 
          fill="#4D72AA" 
          fillOpacity={0.4}
        />
        <Area 
          type="monotone" 
          dataKey="보수적" 
          stroke="#FF6B6B" 
          fill="#FF6B6B" 
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
  
  // 시장 영향 요소 차트
  const renderImpactFactorsChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.impactFactors}>
        <PolarGrid />
        <PolarAngleAxis dataKey="factor" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Radar 
          name="영향력" 
          dataKey="value" 
          stroke="#4D72AA" 
          fill="#4D72AA" 
          fillOpacity={0.6}
        />
        <Legend />
        <Tooltip formatter={(value) => [`${value}/10`, '영향력']} />
      </RadarChart>
    </ResponsiveContainer>
  );
  
  // 부동산 유형별 가격 지수 차트
  const renderPriceIndicesChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.priceIndices}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          name="주거용 부동산" 
          dataKey="residentialIndex" 
          stroke="#4D72AA" 
          strokeWidth={2} 
          dot={{ r: 2 }}
        />
        <Line 
          type="monotone" 
          name="상업용 부동산" 
          dataKey="commercialIndex" 
          stroke="#FF6B6B" 
          strokeWidth={2} 
          dot={{ r: 2 }}
        />
        <Line 
          type="monotone" 
          name="해당 지역 부동산" 
          dataKey="regionalIndex" 
          stroke="#82ca9d" 
          strokeWidth={2} 
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  
  // 투자 수단별 비교 차트
  const renderMarketComparisonChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data.marketComparison}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar name="주식 시장" dataKey="stockMarket" fill="#FF6B6B" />
        <Bar name="채권 시장" dataKey="bondMarket" fill="#FFBB28" />
        <Bar name="부동산 평균" dataKey="realEstate" fill="#82ca9d" />
        <Bar name="해당 부동산 유형" dataKey="propertyType" fill="#4D72AA" />
      </BarChart>
    </ResponsiveContainer>
  );
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex justify-center bg-transparent">
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
          >
            시장 트렌드
          </TabsTrigger>
          <TabsTrigger
            value="forecast"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
          >
            가격 예측
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
          >
            시장 비교
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="trends">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollapsibleCard
              title="부동산 시장 트렌드"
              description="가격 지수와 거래량 추이"
            >
              <div className="h-80">
                {renderMarketTrendChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="부동산 유형별 가격 지수"
              description="주거용, 상업용 및 지역별 부동산 가격 비교"
            >
              <div className="h-80">
                {renderPriceIndicesChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="시장 영향 요소 분석"
              description="부동산 시장에 영향을 미치는 주요 요인"
            >
              <div className="h-80">
                {renderImpactFactorsChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="주요 시장 지표"
              description="현재 부동산 시장의 핵심 지표"
            >
              <div className="grid grid-cols-1 gap-4 h-80 overflow-y-auto p-4">
                {data.keyIndicators.map((indicator, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="py-4 px-6">
                      <CardTitle className="text-lg flex justify-between items-center">
                        {indicator.name}
                        <Badge variant={indicator.change > 0 ? 'default' : 'destructive'} className={`ml-2 ${indicator.change > 0 ? 'bg-green-500' : ''}`}>
                          {indicator.change > 0 ? '+' : ''}{indicator.change}%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-6">
                      <div className="text-2xl font-bold">{indicator.value}</div>
                      <CardDescription className="mt-1">
                        {indicator.name.includes('가격') ? '기준: 2020년 = 100' : 
                          indicator.name.includes('금리') ? '연율' : 
                            indicator.name.includes('거래량') ? '지난 달 대비' : ''}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleCard>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          <div className="grid grid-cols-1 gap-6">
            <CollapsibleCard
              title="부동산 가격 예측 (12개월)"
              description="가격 예측 모델에 따른 낙관적/예상/보수적 시나리오 분석"
            >
              <div className="h-80">
                {renderPricePredictionChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="시장 예측 분석"
              description="예측 정확도와 주요 가격 변동 요인 분석"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">예측 정확도</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">단기 예측 (3개월)</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">중기 예측 (6개월)</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">장기 예측 (12개월)</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">주요 가격 변동 요인</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">1</span>
                      <div>
                        <p className="font-medium">금리 정책 변화</p>
                        <p className="text-sm text-gray-600">중앙은행의 금리 인상/인하 정책에 따른 영향</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">2</span>
                      <div>
                        <p className="font-medium">부동산 정책</p>
                        <p className="text-sm text-gray-600">세금, 대출 규제 등 정부 정책의 변화</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">3</span>
                      <div>
                        <p className="font-medium">수급 불균형</p>
                        <p className="text-sm text-gray-600">공급 물량과 수요 간의 시장 균형 변화</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleCard>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="grid grid-cols-1 gap-6">
            <CollapsibleCard
              title="투자 수단별 수익률 비교"
              description="주식, 채권, 부동산 시장 간의 수익률 비교"
            >
              <div className="h-80">
                {renderMarketComparisonChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="부동산 투자의 상대적 위치"
              description="다양한 투자 수단과의 비교 분석"
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">최근 시장 분석</h3>
                <p className="mb-4 text-gray-700">
                  부동산 시장은 최근 {data.marketComparison[data.marketComparison.length - 1].realEstate > data.marketComparison[data.marketComparison.length - 2].realEstate ? '상승' : '하락'} 
                  추세를 보이고 있으며, 주식 시장 대비 {data.marketComparison[data.marketComparison.length - 1].realEstate > data.marketComparison[data.marketComparison.length - 1].stockMarket ? '높은' : '낮은'} 
                  수익률을 기록하고 있습니다. 특히 해당 부동산 유형은 부동산 시장 평균 대비 
                  {data.marketComparison[data.marketComparison.length - 1].propertyType > data.marketComparison[data.marketComparison.length - 1].realEstate ? ' 우수한' : ' 유사한'} 
                  성과를 보여주고 있습니다.
                </p>
                
                <h4 className="font-medium mt-6 mb-2">투자 수단별 특징 비교</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left border">투자 수단</th>
                        <th className="py-2 px-4 text-left border">유동성</th>
                        <th className="py-2 px-4 text-left border">변동성</th>
                        <th className="py-2 px-4 text-left border">진입 장벽</th>
                        <th className="py-2 px-4 text-left border">장기 수익률</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border font-medium">주식</td>
                        <td className="py-2 px-4 border">높음</td>
                        <td className="py-2 px-4 border">높음</td>
                        <td className="py-2 px-4 border">낮음</td>
                        <td className="py-2 px-4 border">중상</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">채권</td>
                        <td className="py-2 px-4 border">중상</td>
                        <td className="py-2 px-4 border">낮음</td>
                        <td className="py-2 px-4 border">중간</td>
                        <td className="py-2 px-4 border">중하</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">부동산</td>
                        <td className="py-2 px-4 border">낮음</td>
                        <td className="py-2 px-4 border">중간</td>
                        <td className="py-2 px-4 border">높음</td>
                        <td className="py-2 px-4 border">중상</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">토큰화 부동산</td>
                        <td className="py-2 px-4 border">중상</td>
                        <td className="py-2 px-4 border">중간</td>
                        <td className="py-2 px-4 border">낮음</td>
                        <td className="py-2 px-4 border">중상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapsibleCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}