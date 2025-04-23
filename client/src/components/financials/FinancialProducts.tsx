import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

// 금융 상품 비교 데이터 인터페이스
interface FinancialProductComparison {
  name: string;
  returns: number;
  risk: number;
  liquidity: number;
  taxEfficiency: number;
  minInvestment: number;
  investmentHorizon: number;
  managementFee: number;
}

export default function FinancialProducts() {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState<string>('returns');
  
  // 샘플 데이터 - 실제 구현에서는 API에서 가져와야 함
  const financialProducts: FinancialProductComparison[] = [
    {
      name: '부동산 토큰화',
      returns: 10.5,
      risk: 6.8,
      liquidity: 8.5,
      taxEfficiency: 8.2,
      minInvestment: 500000,
      investmentHorizon: 3,
      managementFee: 1.2
    },
    {
      name: '부동산 펀드',
      returns: 8.2,
      risk: 5.5,
      liquidity: 6.0,
      taxEfficiency: 7.0,
      minInvestment: 10000000,
      investmentHorizon: 5,
      managementFee: 1.8
    },
    {
      name: '리츠(REITs)',
      returns: 7.5,
      risk: 7.2,
      liquidity: 9.0,
      taxEfficiency: 6.5,
      minInvestment: 1000000,
      investmentHorizon: 1,
      managementFee: 1.5
    },
    {
      name: '부동산 크라우드펀딩',
      returns: 9.0,
      risk: 8.0,
      liquidity: 4.5,
      taxEfficiency: 7.0,
      minInvestment: 500000,
      investmentHorizon: 2,
      managementFee: 2.0
    },
    {
      name: '직접 부동산 투자',
      returns: 11.0,
      risk: 9.5,
      liquidity: 3.0,
      taxEfficiency: 5.5,
      minInvestment: 500000000,
      investmentHorizon: 10,
      managementFee: 0.5
    }
  ];

  // 레이더 차트에 사용할 시각화 데이터 생성
  const radarData = financialProducts.map(product => {
    return {
      product: product.name,
      '수익률': product.returns,
      '위험도': 10 - product.risk, // 위험도는 반대 방향(낮을수록 좋음)
      '유동성': product.liquidity,
      '세금효율': product.taxEfficiency,
      '관리 용이성': 10 - product.managementFee * 2 // managementFee가 낮을수록 관리 용이성이 높음
    };
  });

  // 산점도 차트를 위한 데이터 생성
  const scatterData = financialProducts.map(product => ({
    name: product.name,
    수익률: product.returns,
    위험도: product.risk,
    최소투자금액: product.minInvestment
  }));

  // 바 차트를 위한 데이터 생성
  const barChartData = financialProducts.map(product => ({
    name: product.name,
    value: product[selectedMetric as keyof FinancialProductComparison] as number,
    color: product.name === '부동산 토큰화' ? '#4D72AA' : '#82ca9d'
  }));

  const formatValue = (value: number) => {
    if (selectedMetric === 'minInvestment') {
      return `${(value / 10000).toLocaleString()}만원`;
    } else if (selectedMetric === 'investmentHorizon') {
      return `${value}년`;
    } else if (selectedMetric === 'managementFee') {
      return `${value}%`;
    } else {
      return value.toFixed(1);
    }
  };

  const getBarChartYAxisLabel = () => {
    switch (selectedMetric) {
      case 'returns': return '연평균 수익률 (%)';
      case 'risk': return '위험도 (낮을수록 좋음)';
      case 'liquidity': return '유동성 (높을수록 좋음)';
      case 'taxEfficiency': return '세금 효율성 (높을수록 좋음)';
      case 'minInvestment': return '최소 투자금액 (원)';
      case 'investmentHorizon': return '권장 투자기간 (년)';
      case 'managementFee': return '관리 수수료 (%)';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CollapsibleCard
        title="투자 상품별 성과 비교"
        description="선택한 지표에 따른 다양한 부동산 투자 상품 비교"
      >
        <div className="mb-4">
          <Label htmlFor="metric-select">비교 지표 선택</Label>
          <Select
            defaultValue="returns"
            onValueChange={setSelectedMetric}
            value={selectedMetric}
          >
            <SelectTrigger id="metric-select" className="w-full max-w-xs">
              <SelectValue placeholder="비교 지표 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="returns">수익률</SelectItem>
              <SelectItem value="risk">위험도</SelectItem>
              <SelectItem value="liquidity">유동성</SelectItem>
              <SelectItem value="taxEfficiency">세금 효율성</SelectItem>
              <SelectItem value="minInvestment">최소 투자금액</SelectItem>
              <SelectItem value="investmentHorizon">권장 투자기간</SelectItem>
              <SelectItem value="managementFee">관리 수수료</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{ value: getBarChartYAxisLabel(), angle: -90, position: 'insideLeft', offset: 15 }}
              />
              <Tooltip formatter={(value) => formatValue(value as number)} />
              <Bar
                dataKey="value"
                fill={(entry: any) => entry.color}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>

      <CollapsibleCard
        title="수익 vs 위험 분석"
        description="다양한 투자 유형별 수익률과 위험도 비교"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="위험도"
                name="위험도"
                label={{ value: '위험도 (높을수록 위험)', position: 'bottom', offset: 5 }}
                domain={[0, 10]}
              />
              <YAxis
                type="number"
                dataKey="수익률"
                name="수익률"
                label={{ value: '수익률 (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 15]}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name, props) => {
                  if (name === '최소투자금액') {
                    return [`${(value as number / 10000).toLocaleString()}만원`, '최소투자금액'];
                  }
                  return [`${value}`, name];
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow-sm">
                        <p className="font-bold">{payload[0].payload.name}</p>
                        <p>수익률: {payload[0].value}%</p>
                        <p>위험도: {payload[1].value}/10</p>
                        <p>최소투자금액: {(payload[0].payload.최소투자금액 / 10000).toLocaleString()}만원</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter
                name="투자 상품"
                data={scatterData}
                fill="#4D72AA"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>

      <CollapsibleCard
        title="종합 투자 상품 분석"
        description="다양한 요소를 고려한 투자 상품별 종합 성과"
        className="md:col-span-2"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={150} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="product"
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={18}
                domain={[0, 10]}
                tick={{ fill: '#999' }}
              />
              <Radar
                name="부동산 토큰화"
                dataKey="수익률"
                stroke="#FF6B6B"
                fill="#FF6B6B"
                fillOpacity={0.5}
              />
              <Radar
                name="유동성"
                dataKey="유동성"
                stroke="#4D72AA"
                fill="#4D72AA"
                fillOpacity={0.5}
              />
              <Radar
                name="세금효율"
                dataKey="세금효율"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.5}
              />
              <Radar
                name="관리 용이성"
                dataKey="관리 용이성"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.5}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>
    </div>
  );
}