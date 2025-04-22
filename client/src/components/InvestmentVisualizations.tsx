import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CollapsibleCard } from "@/components/ui/collapsible-card";

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
                <CollapsibleCard
                  title="지역별 평균 수익률"
                  description="다양한 지역의 부동산 투자 수익률을 비교해보세요"
                >
                  <div className="h-80">
                    <ReturnRateChart chartType="region" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="부동산 유형별 수익률"
                  description="오피스, 아파트, 상업시설, 리조트, 회원권 등 유형별 수익률 비교"
                >
                  <div className="h-80">
                    <ReturnRateChart chartType="propertyType" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="최근 5년간 수익률 추세"
                  description="지난 5년간 부동산 유형별 수익률 변화 추이"
                  className="md:col-span-2"
                >
                  <div className="h-80">
                    <ReturnRateChart chartType="trend" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="marketTrends">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollapsibleCard
                  title="지역별 부동산 가격 상승률"
                  description="국내 및 해외 주요 지역의 부동산 가격 변동 히트맵"
                  className="md:col-span-2"
                >
                  <div className="h-96">
                    <MarketTrendsMap mapType="priceGrowth" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="토큰화 자산 거래량"
                  description="SaharaRealTech 플랫폼 내 토큰화 자산의 거래량 추이"
                >
                  <div className="h-80">
                    <MarketTrendsMap mapType="tokenTrading" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="부동산 시장 주요 지표"
                  description="공실률, 임대료 변동, 가격 변동 등 주요 지표 대시보드"
                >
                  <div className="h-80">
                    <MarketTrendsMap mapType="marketIndicators" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="investmentComparison">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollapsibleCard
                  title="투자 방식별 비교"
                  description="토큰화 부동산, 전통적 부동산, 리츠(REITs) 등 다양한 투자 방식의 비교"
                >
                  <div className="h-80">
                    <InvestmentComparison comparisonType="radar" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="최소 투자금액 비교"
                  description="투자 방식별 최소 투자금액 비교"
                >
                  <div className="h-80">
                    <InvestmentComparison comparisonType="bar" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="roiCalculator">
              <ROICalculator />
            </TabsContent>

            <TabsContent value="propertyValue">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollapsibleCard
                  title="부동산 가치 평가 요소"
                  description="다양한 요소에 따른 부동산 가치 평가 분석"
                  className="md:col-span-2"
                >
                  <div className="h-96">
                    <PropertyValueChart chartType="radar" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="감정가 형성 요인 및 비교"
                  description="감정가에 영향을 주는 요소와 실거래가 비교"
                  className="md:col-span-2"
                >
                  <div className="h-96">
                    <PropertyValueChart chartType="factors" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="tokenization">
              <div className="grid grid-cols-1 gap-6">
                <CollapsibleCard
                  title="부동산 토큰화 프로세스"
                  description="부동산이 토큰화되는 전체 과정과 현재 진행 상황"
                >
                  <div className="pb-6">
                    <TokenizationProcess processType="timeline" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="토큰 분배 및 블록체인 통합"
                  description="토큰 분배 현황과 블록체인 통합 구조"
                >
                  <div className="pb-6">
                    <TokenizationProcess processType="distribution" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="riskManagement">
              <div className="grid grid-cols-1 gap-6">
                <CollapsibleCard
                  title="투자 리스크 분석 및 보호 장치"
                  description="부동산 투자 리스크 요소와 투자자 보호 메커니즘"
                >
                  <div className="pb-6">
                    <RiskManagement chartType="radar" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="분산 투자 효과 및 법적 보호"
                  description="다양한 자산 분산 투자의 효과와 투자자 법적 권리"
                >
                  <div className="pb-6">
                    <RiskManagement chartType="diversification" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="globalOpportunities">
              <div className="grid grid-cols-1 gap-6">
                <CollapsibleCard
                  title="글로벌 투자 지역 및 트렌드"
                  description="글로벌 부동산 투자 지역과 시장 트렌드"
                >
                  <div className="pb-6">
                    <GlobalOpportunities chartType="trendMap" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="국가별 시장 성장률 및 투자 이점"
                  description="다양한 국가의 부동산 시장 성장률과 글로벌 투자의 이점"
                >
                  <div className="pb-6">
                    <GlobalOpportunities chartType="countryComparison" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}