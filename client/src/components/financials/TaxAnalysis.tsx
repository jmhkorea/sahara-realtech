import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface TaxRateInfo {
  taxType: string;
  description: string;
  rate: number;
  applicableTo: string;
}

const taxRates: TaxRateInfo[] = [
  { taxType: '취득세', description: '부동산 매입 시 납부하는 세금', rate: 4.0, applicableTo: '취득가액' },
  { taxType: '재산세', description: '보유 부동산에 대해 매년 납부하는 세금', rate: 0.4, applicableTo: '공시가격' },
  { taxType: '종합부동산세', description: '고가 부동산 보유자에게 부과되는 추가 세금', rate: 1.2, applicableTo: '공시가격' },
  { taxType: '양도소득세', description: '부동산 매각 시 발생한 이익에 대한 세금', rate: 15.0, applicableTo: '양도차익' },
  { taxType: '임대소득세', description: '임대 수입에 대한 세금', rate: 14.0, applicableTo: '임대수입' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function TaxAnalysis() {
  const { t } = useTranslation();
  
  // 세금 시뮬레이션을 위한 상태
  const [propertyValue, setPropertyValue] = useState(300000000); // 부동산 가치 (3억원)
  const [rentalIncome, setRentalIncome] = useState(12000000); // 연간 임대 수입 (1200만원)
  const [holdingPeriod, setHoldingPeriod] = useState(5); // 보유 기간 (년)
  const [valueAppreciation, setValueAppreciation] = useState(20); // 가치 상승률 (%)
  
  // 세금 계산
  const calculateTaxes = () => {
    // 취득세
    const acquisitionTax = propertyValue * 0.04;
    
    // 보유 기간 동안의 재산세 (단순화된 계산)
    const propertyTax = propertyValue * 0.004 * holdingPeriod;
    
    // 종합부동산세 (단순화: 3억 이상 부동산만 적용)
    const comprehensiveTax = propertyValue > 300000000 
      ? (propertyValue - 300000000) * 0.012 * holdingPeriod
      : 0;
    
    // 임대소득세
    const rentalIncomeTax = rentalIncome * 0.14 * holdingPeriod;
    
    // 양도소득세 (단순화된 계산)
    const futurePropValue = propertyValue * (1 + valueAppreciation / 100);
    const capitalGainsTax = (futurePropValue - propertyValue) * 0.15;
    
    return {
      acquisitionTax,
      propertyTax,
      comprehensiveTax,
      rentalIncomeTax,
      capitalGainsTax,
      totalTax: acquisitionTax + propertyTax + comprehensiveTax + rentalIncomeTax + capitalGainsTax,
    };
  };
  
  // 비용 계산
  const calculateCosts = () => {
    // 관리비
    const managementFee = propertyValue * 0.01 * holdingPeriod;
    
    // 보험료
    const insurance = propertyValue * 0.003 * holdingPeriod;
    
    // 수리비
    const repairs = propertyValue * 0.005 * holdingPeriod;
    
    // 중개 수수료 (구매 및 판매 시)
    const brokerageFee = propertyValue * 0.005;
    
    // 법률 비용
    const legalFees = propertyValue * 0.002;
    
    return {
      managementFee,
      insurance,
      repairs,
      brokerageFee,
      legalFees,
      totalCost: managementFee + insurance + repairs + brokerageFee + legalFees,
    };
  };
  
  const taxes = calculateTaxes();
  const costs = calculateCosts();
  
  // 세금 파이 차트 데이터
  const taxPieData = [
    { name: '취득세', value: taxes.acquisitionTax },
    { name: '재산세', value: taxes.propertyTax },
    { name: '종합부동산세', value: taxes.comprehensiveTax },
    { name: '임대소득세', value: taxes.rentalIncomeTax },
    { name: '양도소득세', value: taxes.capitalGainsTax },
  ];
  
  // 비용 파이 차트 데이터
  const costPieData = [
    { name: '관리비', value: costs.managementFee },
    { name: '보험료', value: costs.insurance },
    { name: '수리비', value: costs.repairs },
    { name: '중개 수수료', value: costs.brokerageFee },
    { name: '법률 비용', value: costs.legalFees },
  ];
  
  // 총 비용 비교 데이터
  const comparisonData = [
    { name: '투자 전', taxes: 0, costs: 0, total: 0 },
    { name: `${holdingPeriod}년 후`, taxes: taxes.totalTax, costs: costs.totalCost, total: taxes.totalTax + costs.totalCost },
  ];
  
  // 수익 대비 세금/비용 비율
  const propertyValueIncrease = propertyValue * (valueAppreciation / 100);
  const totalRentalIncome = rentalIncome * holdingPeriod;
  const totalReturn = propertyValueIncrease + totalRentalIncome;
  const taxRatio = (taxes.totalTax / totalReturn) * 100;
  const costRatio = (costs.totalCost / totalReturn) * 100;
  const netReturnRatio = 100 - taxRatio - costRatio;
  
  const profitDistributionData = [
    { name: '세금', value: taxRatio },
    { name: '비용', value: costRatio },
    { name: '순수익', value: netReturnRatio },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CollapsibleCard
        title="투자 시뮬레이션"
        description="투자 조건 설정 및 세금/비용 예측"
        className="md:col-span-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">부동산 가치</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  min={50000000}
                  max={2000000000}
                  className="w-full"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">원</span>
              </div>
              <Slider
                defaultValue={[propertyValue]}
                min={50000000}
                max={2000000000}
                step={10000000}
                onValueChange={(value) => setPropertyValue(value[0])}
                className="mt-2"
              />
              <div className="text-xs text-gray-500 mt-1">
                {(propertyValue / 100000000).toFixed(1)}억원
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">연간 임대 수입</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={rentalIncome}
                  onChange={(e) => setRentalIncome(Number(e.target.value))}
                  min={0}
                  max={100000000}
                  className="w-full"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">원</span>
              </div>
              <Slider
                defaultValue={[rentalIncome]}
                min={0}
                max={100000000}
                step={1000000}
                onValueChange={(value) => setRentalIncome(value[0])}
                className="mt-2"
              />
              <div className="text-xs text-gray-500 mt-1">
                {(rentalIncome / 10000).toFixed(0)}만원
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">보유 기간</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={holdingPeriod}
                  onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                  min={1}
                  max={30}
                  className="w-full"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">년</span>
              </div>
              <Slider
                defaultValue={[holdingPeriod]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setHoldingPeriod(value[0])}
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">가치 상승률</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={valueAppreciation}
                  onChange={(e) => setValueAppreciation(Number(e.target.value))}
                  min={0}
                  max={100}
                  className="w-full"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">%</span>
              </div>
              <Slider
                defaultValue={[valueAppreciation]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setValueAppreciation(value[0])}
                className="mt-2"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">총 세금</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {(taxes.totalTax / 10000).toFixed(0)}만원
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                부동산 가치의 {((taxes.totalTax / propertyValue) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">총 비용</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {(costs.totalCost / 10000).toFixed(0)}만원
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                부동산 가치의 {((costs.totalCost / propertyValue) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">순수익 비율</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">
                {netReturnRatio.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                총 수익의 {netReturnRatio.toFixed(1)}%가 순수익으로 남음
              </p>
            </CardContent>
          </Card>
        </div>
      </CollapsibleCard>
      
      <CollapsibleCard title="세금 분석" description="종류별 세금 비중 및 영향 분석">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taxPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {taxPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${(value as number / 10000).toFixed(0)}만원`} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>
      
      <CollapsibleCard title="비용 분석" description="종류별 비용 비중 및 영향 분석">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={costPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {costPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${(value as number / 10000).toFixed(0)}만원`} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>
      
      <CollapsibleCard 
        title="세금/비용 vs 수익 분석" 
        description="투자 수익에서 세금과 비용이 차지하는 비율"
        className="md:col-span-2"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={profitDistributionData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis type="category" dataKey="name" />
              <Tooltip formatter={(value) => `${typeof value === 'number' ? value.toFixed(1) : value}%`} />
              <Legend />
              <Bar dataKey="value" name="비율">
                {profitDistributionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#FF6B6B' : index === 1 ? '#FFA500' : '#4D72AA'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>
      
      <CollapsibleCard 
        title="부동산 투자 관련 세율" 
        description="주요 부동산 관련 세금 정보"
        className="md:col-span-2"
      >
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">세금 종류</th>
                <th className="text-left py-3 px-4">설명</th>
                <th className="text-right py-3 px-4">세율</th>
                <th className="text-left py-3 px-4">과세 대상</th>
              </tr>
            </thead>
            <tbody>
              {taxRates.map((tax, index) => (
                <tr 
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="py-3 px-4 font-medium">{tax.taxType}</td>
                  <td className="py-3 px-4">{tax.description}</td>
                  <td className="py-3 px-4 text-right">{tax.rate}%</td>
                  <td className="py-3 px-4">{tax.applicableTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          * 위 세율 정보는 예시이며, 실제 세율은 정부 정책, 부동산 유형, 보유 기간 등에 따라 달라질 수 있습니다.
        </div>
      </CollapsibleCard>
    </div>
  );
}