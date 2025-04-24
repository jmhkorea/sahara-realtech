import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our custom finance components
import CashFlowComposition from './CashFlowComposition';
import IRRSimulation from './IRRSimulation';
import AssetValueAnalysis from './AssetValueAnalysis';

interface FinanceAnalysisSectionProps {
  className?: string;
}

export default function FinanceAnalysisSection({ className }: FinanceAnalysisSectionProps) {
  const [activeTab, setActiveTab] = useState("cashflow");

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6 text-center">재무 분석</h2>
      
      <Tabs defaultValue="cashflow" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
          <TabsTrigger value="cashflow">현금 흐름 분석</TabsTrigger>
          <TabsTrigger value="returns">수익률 분석</TabsTrigger>
          <TabsTrigger value="asset">자산 가치 분석</TabsTrigger>
          <TabsTrigger value="comparison">금융 상품 비교</TabsTrigger>
          <TabsTrigger value="tax">세금 및 비용 분석</TabsTrigger>
          <TabsTrigger value="portfolio">포트폴리오 분석</TabsTrigger>
        </TabsList>

        <div className="p-4 border rounded-lg bg-white">
          <h3 className="text-center text-sm text-gray-500 mb-4">시장 지표 및 예측</h3>
          
          <TabsContent value="cashflow" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CashFlowComposition />
              <IRRSimulation />
            </div>
          </TabsContent>
          
          <TabsContent value="returns" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IRRSimulation />
              <CashFlowComposition />
            </div>
          </TabsContent>
          
          <TabsContent value="asset" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AssetValueAnalysis className="md:col-span-2" />
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AssetValueAnalysis />
              <IRRSimulation />
            </div>
          </TabsContent>
          
          <TabsContent value="tax" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CashFlowComposition />
              <AssetValueAnalysis />
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IRRSimulation />
              <AssetValueAnalysis />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}