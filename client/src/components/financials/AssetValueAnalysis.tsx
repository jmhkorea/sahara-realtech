import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CollapsibleCard } from "@/components/ui/collapsible-card";

interface AssetValueAnalysisProps {
  propertyId?: number;
}

export default function AssetValueAnalysis({ propertyId }: AssetValueAnalysisProps) {
  const { t } = useTranslation();
  
  // 자산 가치 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['assetValue', propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/financial/asset-value${propertyId ? `?propertyId=${propertyId}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch asset value data');
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CollapsibleCard
        title="자산 가치 추세"
        description="시간에 따른 부동산 및 토큰 가치 추이"
        className="md:col-span-2"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 40, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="year" angle={-15} textAnchor="end" height={60} />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#4D72AA"
                tickFormatter={(value) => `${value / 1000000}M`}
                label={{ value: '부동산 가치 (백만원)', angle: -90, position: 'insideLeft', offset: 15 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#82ca9d"
                tickFormatter={(value) => `${value / 1000}K`}
                label={{ value: '토큰 가치 (천원)', angle: 90, position: 'insideRight', offset: 15 }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'propertyValue') {
                    return [`${(value as number).toLocaleString()}원`, '부동산 가치'];
                  }
                  return [`${(value as number).toLocaleString()}원`, '토큰 가치'];
                }}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '40px' }}
                formatter={(value) => value === 'propertyValue' ? '부동산 가치' : '토큰 가치'}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="propertyValue"
                stroke="#4D72AA"
                fill="#4D72AA"
                fillOpacity={0.3}
                activeDot={{ r: 8 }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="tokenValue"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>

      <CollapsibleCard
        title="현재 시장 가치 분석"
        description="현재 부동산 시장 가치 및 토큰화 가치 비교"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.slice(-5)} // 최근 5개 데이터만 사용
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip formatter={(value) => `${(value as number).toLocaleString()}원`} />
              <Legend />
              <Bar
                name="부동산 가치"
                dataKey="propertyValue"
                fill="#4D72AA"
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>

      <CollapsibleCard
        title="토큰 가치 성장률"
        description="연도별 토큰 가치 성장률"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.map((item: any, index: number, array: any[]) => {
                if (index === 0) {
                  return { ...item, growthRate: 0 };
                }
                const prevValue = array[index - 1].tokenValue;
                const currentValue = item.tokenValue;
                const growthRate = ((currentValue - prevValue) / prevValue) * 100;
                return { ...item, growthRate: parseFloat(growthRate.toFixed(2)) };
              }).slice(1)} // 첫 번째 항목은 제외 (성장률 0)
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line
                type="monotone"
                name="성장률"
                dataKey="growthRate"
                stroke="#FF6B6B"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleCard>
    </div>
  );
}