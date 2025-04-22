import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ReturnAnalysisProps {
  analysisType: 'irr' | 'coc' | 'comparison';
  propertyId?: number;
}

export default function ReturnAnalysis({ analysisType, propertyId }: ReturnAnalysisProps) {
  const { t } = useTranslation();
  
  // 재무 데이터 API에서 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['return-analysis', analysisType, propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/financial/return-analysis?analysisType=${analysisType}${propertyId ? `&propertyId=${propertyId}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch return analysis data');
      }
      return response.json();
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

  // IRR(내부수익률) 차트
  if (analysisType === 'irr') {
    return (
      <div className="h-full">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold">
            {t('financials.returns.irr.title', '예상 내부 수익률 (IRR)')}
          </h3>
          <p className="text-2xl font-bold text-primary">{data.irr}%</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={data.yearlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: '보유 기간 (년)', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'IRR (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="IRR" 
              stroke="#8884d8" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">
            {t('financials.returns.comparison', '투자 수단별 비교')}
          </h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={data.comparison}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 'dataMax']} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar 
                dataKey="value" 
                name="수익률" 
                fill={(entry) => entry.name === '해당 투자' ? '#4D72AA' : '#82ca9d'}
                minPointSize={2}
              >
                <LabelList dataKey="value" position="right" formatter={(value) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // COC(Cash on Cash) 분석 차트
  if (analysisType === 'coc') {
    return (
      <div className="h-full">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold">
            {t('financials.returns.coc.title', '현금 수익률 (CoC)')}
          </h3>
          <p className="text-2xl font-bold text-primary">{data.coc}%</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={data.details}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="CoC 수익률" 
              stroke="#82ca9d" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">
            {t('financials.returns.cocFactors', 'CoC 계산 요소')}
          </h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={data.factors}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
              <Bar 
                dataKey="value" 
                name="금액" 
                fill="#4D72AA"
                minPointSize={2}
              >
                <LabelList dataKey="value" position="right" formatter={(value) => `₩${(value/1000000).toFixed(1)}M`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // 투자 비교 분석 (ROI vs Risk)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis 
          type="number" 
          dataKey="risk" 
          name="투자 위험도" 
          domain={[0, 10]}
          label={{ value: '위험도', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          type="number" 
          dataKey="roi" 
          name="수익률" 
          domain={[0, 15]}
          label={{ value: '수익률 (%)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value) => `${value}${value === Number(value) ? '%' : ''}`} />
        <Legend />
        <Scatter 
          name="부동산 투자 비교" 
          data={data.comparisonData} 
          fill="#8884d8"
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}