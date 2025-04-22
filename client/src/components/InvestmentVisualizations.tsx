import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// 시각화 컴포넌트들 (차후 개별 파일로 분리)
import ReturnRateChart from './visualizations/ReturnRateChart';
import MarketTrendsMap from './visualizations/MarketTrendsMap';
import InvestmentComparison from './visualizations/InvestmentComparison';
import ROICalculator from './visualizations/ROICalculator';
import PropertyValueChart from './visualizations/PropertyValueChart';
import TokenizationProcess from './visualizations/TokenizationProcess';
import RiskManagement from './visualizations/RiskManagement';
import GlobalOpportunities from './visualizations/GlobalOpportunities';

export default function InvestmentVisualizations() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('returnRates');

  return (
    <section className="bg-neutral-50 py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            투자 데이터 시각화
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            SaharaRealTech에서 제공하는 부동산 투자 데이터를 시각적으로 확인하세요. 
            지역별 수익률, 시장 동향, 투자 방식 비교 등 다양한 분석 자료를 통해 더 현명한 투자 결정을 내리실 수 있습니다.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center gap-2 bg-transparent h-auto p-1">
            <TabsTrigger 
              value="returnRates" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              수익률 차트
            </TabsTrigger>
            <TabsTrigger 
              value="marketTrends" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              시장 동향
            </TabsTrigger>
            <TabsTrigger 
              value="investmentComparison" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              투자 방식 비교
            </TabsTrigger>
            <TabsTrigger 
              value="roiCalculator" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              수익 시뮬레이션
            </TabsTrigger>
            <TabsTrigger 
              value="propertyValue" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              가치 평가
            </TabsTrigger>
            <TabsTrigger 
              value="tokenization" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              토큰화 과정
            </TabsTrigger>
            <TabsTrigger 
              value="riskManagement" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              리스크 관리
            </TabsTrigger>
            <TabsTrigger 
              value="globalOpportunities" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              글로벌 투자
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <TabsContent value="returnRates">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>지역별 평균 수익률</CardTitle>
                    <CardDescription>다양한 지역의 부동산 투자 수익률을 비교해보세요</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ReturnRateChart chartType="region" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>부동산 유형별 수익률</CardTitle>
                    <CardDescription>오피스, 아파트, 상업시설, 리조트, 회원권 등 유형별 수익률 비교</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ReturnRateChart chartType="propertyType" />
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>최근 5년간 수익률 추세</CardTitle>
                    <CardDescription>지난 5년간 부동산 유형별 수익률 변화 추이</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ReturnRateChart chartType="trend" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="marketTrends">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>지역별 부동산 가격 상승률</CardTitle>
                    <CardDescription>국내 및 해외 주요 지역의 부동산 가격 변동 히트맵</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96">
                    <MarketTrendsMap mapType="priceGrowth" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>토큰화 자산 거래량</CardTitle>
                    <CardDescription>SaharaRealTech 플랫폼 내 토큰화 자산의 거래량 추이</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <MarketTrendsMap mapType="tokenTrading" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>부동산 시장 주요 지표</CardTitle>
                    <CardDescription>공실률, 임대료 변동, 가격 변동 등 주요 지표 대시보드</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <MarketTrendsMap mapType="marketIndicators" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 나머지 TabsContent는 추후 구현 */}
            <TabsContent value="investmentComparison">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">추후 업데이트 예정</p>
              </div>
            </TabsContent>

            <TabsContent value="roiCalculator">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">추후 업데이트 예정</p>
              </div>
            </TabsContent>

            <TabsContent value="propertyValue">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">추후 업데이트 예정</p>
              </div>
            </TabsContent>

            <TabsContent value="tokenization">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">추후 업데이트 예정</p>
              </div>
            </TabsContent>

            <TabsContent value="riskManagement">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">추후 업데이트 예정</p>
              </div>
            </TabsContent>

            <TabsContent value="globalOpportunities">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">추후 업데이트 예정</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}