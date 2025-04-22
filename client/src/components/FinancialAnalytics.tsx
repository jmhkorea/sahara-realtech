import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CollapsibleCard } from "@/components/ui/collapsible-card";

// 금융 시각화 컴포넌트
import CashFlowAnalysis from './financials/CashFlowAnalysis';
import ReturnAnalysis from './financials/ReturnAnalysis';
import AssetValueAnalysis from './financials/AssetValueAnalysis';
import FinancialProducts from './financials/FinancialProducts';
import TaxAnalysis from './financials/TaxAnalysis';
import PortfolioAnalysis from './financials/PortfolioAnalysis';
import MarketIndicators from './financials/MarketIndicators';

export default function FinancialAnalytics() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('cashFlow');

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            투자 금융 분석
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            SaharaRealTech의 고급 금융 분석 도구를 통해 부동산 투자의 수익성, 현금 흐름, 세금 효과 및 포트폴리오 성과를 분석해보세요.
            전문가 수준의 부동산 금융 분석으로 더 나은 투자 결정을 내리실 수 있습니다.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center gap-2 bg-transparent h-auto p-1">
            <TabsTrigger 
              value="cashFlow" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              현금 흐름 분석
            </TabsTrigger>
            <TabsTrigger 
              value="returnAnalysis" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              수익률 분석
            </TabsTrigger>
            <TabsTrigger 
              value="assetValue" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              자산 가치 분석
            </TabsTrigger>
            <TabsTrigger 
              value="financialProducts" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              금융 상품 비교
            </TabsTrigger>
            <TabsTrigger 
              value="taxAnalysis" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              세금 및 비용 분석
            </TabsTrigger>
            <TabsTrigger 
              value="portfolioAnalysis" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              포트폴리오 분석
            </TabsTrigger>
            <TabsTrigger 
              value="marketIndicators" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2"
            >
              시장 지표 및 예측
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <TabsContent value="cashFlow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollapsibleCard
                  title="월별 현금 흐름"
                  description="투자 부동산의 월별 수입과 지출 흐름"
                >
                  <div className="h-80">
                    <CashFlowAnalysis chartType="monthly" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="순현금흐름 트렌드"
                  description="시간에 따른 순현금흐름 변화 추이"
                >
                  <div className="h-80">
                    <CashFlowAnalysis chartType="trend" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="현금 흐름 구성 요소"
                  description="현금 흐름을 구성하는 수입과 지출 항목의 비율"
                  className="md:col-span-2"
                >
                  <div className="h-80">
                    <CashFlowAnalysis chartType="composition" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="returnAnalysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CollapsibleCard
                  title="내부수익률(IRR) 시뮬레이션"
                  description="다양한 시나리오에 따른 내부수익률 시뮬레이션"
                  className="md:col-span-2"
                >
                  <div className="h-96">
                    <ReturnAnalysis analysisType="irr" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="현금-현-현금 수익률"
                  description="투자 기간에 따른 CoC 수익률 변화"
                >
                  <div className="h-80">
                    <ReturnAnalysis analysisType="coc" />
                  </div>
                </CollapsibleCard>
                <CollapsibleCard
                  title="총수익률 vs 순수익률"
                  description="세금 및 비용 공제 전후 수익률 비교"
                >
                  <div className="h-80">
                    <ReturnAnalysis analysisType="comparison" />
                  </div>
                </CollapsibleCard>
              </div>
            </TabsContent>

            <TabsContent value="assetValue">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">구현 중입니다...</p>
              </div>
            </TabsContent>

            <TabsContent value="financialProducts">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">구현 중입니다...</p>
              </div>
            </TabsContent>

            <TabsContent value="taxAnalysis">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">구현 중입니다...</p>
              </div>
            </TabsContent>

            <TabsContent value="portfolioAnalysis">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">구현 중입니다...</p>
              </div>
            </TabsContent>

            <TabsContent value="marketIndicators">
              <div className="text-center py-16">
                <p className="text-lg text-neutral-500">구현 중입니다...</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}