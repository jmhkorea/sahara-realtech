import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface CashFlowAnalysisProps {
  chartType: 'monthly' | 'trend' | 'composition';
  propertyId?: number;
}

export default function CashFlowAnalysis({ chartType, propertyId }: CashFlowAnalysisProps) {
  const { t } = useTranslation();
  
  // 재무 데이터 API에서 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['cashflow', chartType, propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/financial/cashflow?chartType=${chartType}${propertyId ? `&propertyId=${propertyId}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cash flow data');
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

  // 월별 현금 흐름 차트
  if (chartType === 'monthly') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 55 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
          <YAxis />
          <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="수입" fill="#4D72AA" barSize={20} />
          <Bar dataKey="지출" fill="#FF6B6B" barSize={20} />
          <Bar dataKey="순현금흐름" fill="#82ca9d" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // 현금 흐름 트렌드 차트
  if (chartType === 'trend') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="순현금흐름" 
            stroke="#8884d8" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // 현금 흐름 구성 요소 파이 차트
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}