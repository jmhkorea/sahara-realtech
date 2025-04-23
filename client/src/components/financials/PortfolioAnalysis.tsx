import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter, Cell,
  XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';

interface PortfolioData {
  allocation: { name: string; value: number }[];
  performance: { name: string; 수익률: number }[];
  riskAnalysis: {
    totalRisk: number;
    diversificationScore: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
  holdings: {
    name: string;
    allocation: number;
    returns: number;
    risk: number;
  }[];
}

export default function PortfolioAnalysis() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overall');
  
  // 포트폴리오 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio-analysis'],
    queryFn: async () => {
      const response = await fetch('/api/financial/portfolio-analysis');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      return response.json() as Promise<PortfolioData>;
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
  
  // 색상 배열
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  // 투자 자산 유형별 분포 (파이 차트)
  const renderAllocationChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data.allocation}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.allocation.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
  
  // 기간별 수익률 (라인 차트)
  const renderPerformanceChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.performance}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="수익률" 
          stroke="#4D72AA" 
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  
  // 위험-수익 분석 (산점도 차트)
  const renderRiskReturnChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="risk" 
          name="위험도" 
          domain={[0, 10]} 
          label={{ value: '위험도', position: 'bottom', offset: 0 }}
        />
        <YAxis 
          type="number" 
          dataKey="returns" 
          name="수익률" 
          domain={[0, 15]} 
          label={{ value: '수익률 (%)', angle: -90, position: 'insideLeft' }}
        />
        <ZAxis 
          type="number" 
          dataKey="allocation" 
          range={[50, 400]} 
          name="투자 비중"
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          /* 
          formatter는 Tooltip 컴포넌트에서 사용되지 않고, 
          대신 아래의 content prop이 사용됩니다
          */
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-2 border rounded shadow-sm">
                  <p className="font-bold">{payload[0].payload.name}</p>
                  <p>수익률: {payload[0].payload.returns}%</p>
                  <p>위험도: {payload[0].payload.risk}</p>
                  <p>투자 비중: {payload[0].payload.allocation}%</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Scatter 
          name="포트폴리오 구성 자산" 
          data={data.holdings} 
          fill="#4D72AA"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
  
  // 포트폴리오 다각화 분석 (레이더 차트)
  const renderDiversificationChart = () => {
    // 레이더 차트 데이터 가공
    const radarData = [
      {
        subject: '다각화 점수',
        A: data.riskAnalysis.diversificationScore / 10, // 0-10 스케일로 변환
        fullMark: 10,
      },
      {
        subject: '수익성',
        A: data.holdings.reduce((acc, item) => acc + item.returns, 0) / data.holdings.length / 1.5, // 평균 수익률을 0-10 스케일로 변환
        fullMark: 10,
      },
      {
        subject: '안정성',
        A: 10 - data.riskAnalysis.volatility, // 변동성이 낮을수록 안정성 높음
        fullMark: 10,
      },
      {
        subject: '효율성',
        A: data.riskAnalysis.sharpeRatio * 2, // 샤프 비율 0-10 스케일로 변환
        fullMark: 10,
      },
      {
        subject: '하방 보호',
        A: 10 - (data.riskAnalysis.maxDrawdown / 3), // 최대 하락폭이 낮을수록 보호 잘됨
        fullMark: 10,
      },
    ];
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={90} domain={[0, 10]} />
          <Radar
            name="포트폴리오 성과"
            dataKey="A"
            stroke="#4D72AA"
            fill="#4D72AA"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  };
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex justify-center bg-transparent">
          <TabsTrigger
            value="overall"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
          >
            전체 개요
          </TabsTrigger>
          <TabsTrigger
            value="riskReturn"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
          >
            위험-수익 분석
          </TabsTrigger>
          <TabsTrigger
            value="diversification"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
          >
            다각화 분석
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="overall">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollapsibleCard
              title="자산 유형별 분포"
              description="부동산 포트폴리오 구성 비율"
            >
              <div className="h-80">
                {renderAllocationChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="기간별 수익률"
              description="투자 기간에 따른 포트폴리오 수익률 추이"
            >
              <div className="h-80">
                {renderPerformanceChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="포트폴리오 건전성 지표"
              description="투자 포트폴리오의 주요 성과 지표"
              className="md:col-span-2"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-center">총 위험도</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 text-center">
                    <span className="text-xl font-bold">{data.riskAnalysis.totalRisk.toFixed(1)}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {data.riskAnalysis.totalRisk < 6 ? '낮음' : '보통'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-center">다각화 점수</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 text-center">
                    <span className="text-xl font-bold">{data.riskAnalysis.diversificationScore}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {data.riskAnalysis.diversificationScore > 70 ? '양호' : '개선 필요'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-center">변동성</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 text-center">
                    <span className="text-xl font-bold">{data.riskAnalysis.volatility.toFixed(1)}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {data.riskAnalysis.volatility < 5 ? '안정적' : '다소 높음'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-center">샤프 비율</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 text-center">
                    <span className="text-xl font-bold">{data.riskAnalysis.sharpeRatio.toFixed(2)}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {data.riskAnalysis.sharpeRatio > 1 ? '우수' : '보통'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-center">최대 하락폭</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 text-center">
                    <span className="text-xl font-bold">{data.riskAnalysis.maxDrawdown.toFixed(1)}%</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {data.riskAnalysis.maxDrawdown < 15 ? '양호' : '주의'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CollapsibleCard>
          </div>
        </TabsContent>
        
        <TabsContent value="riskReturn">
          <div className="grid grid-cols-1 gap-6">
            <CollapsibleCard
              title="자산별 위험-수익 분석"
              description="포트폴리오 구성 자산의 위험과 수익 관계 (원 크기는 투자 비중)"
            >
              <div className="h-96">
                {renderRiskReturnChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="보유 자산 상세"
              description="포트폴리오 구성 자산 목록"
            >
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">자산명</th>
                    <th className="text-right py-3 px-4">투자 비중</th>
                    <th className="text-right py-3 px-4">수익률</th>
                    <th className="text-right py-3 px-4">위험도</th>
                  </tr>
                </thead>
                <tbody>
                  {data.holdings.map((asset, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="py-3 px-4 font-medium">{asset.name}</td>
                      <td className="py-3 px-4 text-right">{asset.allocation}%</td>
                      <td className="py-3 px-4 text-right">{asset.returns}%</td>
                      <td className="py-3 px-4 text-right">{asset.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CollapsibleCard>
          </div>
        </TabsContent>
        
        <TabsContent value="diversification">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollapsibleCard
              title="포트폴리오 다각화 분석"
              description="다양한 측면에서의 포트폴리오 성과 평가"
            >
              <div className="h-80">
                {renderDiversificationChart()}
              </div>
            </CollapsibleCard>
            
            <CollapsibleCard
              title="포트폴리오 효율성"
              description="효율적 시장 이론에 따른 포트폴리오 평가"
            >
              <div className="space-y-6 p-4">
                <div>
                  <h4 className="font-medium mb-2">다각화 평가</h4>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm">
                      현재 포트폴리오는 다각화 점수 <span className="font-semibold">{data.riskAnalysis.diversificationScore}/100</span>으로
                      {data.riskAnalysis.diversificationScore > 70 ? ' 적절히 다각화되어 있습니다.' : ' 추가 다각화가 필요합니다.'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">효율성 분석</h4>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm">
                      현재 포트폴리오의 샤프 비율은 <span className="font-semibold">{data.riskAnalysis.sharpeRatio.toFixed(2)}</span>으로
                      {data.riskAnalysis.sharpeRatio > 1 ? 
                        ' 위험 대비 수익률이 효율적입니다.' : 
                        ' 위험 대비 수익률이 다소 낮은 상태입니다.'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">개선 권장사항</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      {data.riskAnalysis.diversificationScore < 80 ? 
                        '다각화를 위해 새로운 지역/유형의 부동산 추가 검토' : 
                        '현재 다각화 수준 유지'}
                    </li>
                    <li>
                      {data.riskAnalysis.volatility > 5 ? 
                        '포트폴리오 변동성 감소를 위한 안정적 자산 비중 확대' : 
                        '현재 변동성 수준 적절'}
                    </li>
                    <li>
                      {data.riskAnalysis.maxDrawdown > 15 ? 
                        '하락 위험 관리를 위한 위험 분산 전략 수립' : 
                        '리스크 관리 전략 유지'}
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}