import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReturnAnalysisProps {
  analysisType: 'irr' | 'coc' | 'comparison';
}

// 내부수익률(IRR) 시뮬레이션 데이터
const irrData = [
  { 시나리오: '보수적', '5년': 8.2, '10년': 9.5, '15년': 10.8, '20년': 12.1 },
  { 시나리오: '중립적', '5년': 10.5, '10년': 12.3, '15년': 13.7, '20년': 15.2 },
  { 시나리오: '낙관적', '5년': 12.8, '10년': 15.2, '15년': 17.1, '20년': 18.9 },
];

// 현금-현-현금 수익률 데이터
const cocData = [
  { 년도: '1년차', 수익률: 4.2 },
  { 년도: '2년차', 수익률: 5.1 },
  { 년도: '3년차', 수익률: 5.6 },
  { 년도: '4년차', 수익률: 6.2 },
  { 년도: '5년차', 수익률: 6.7 },
  { 년도: '6년차', 수익률: 7.1 },
  { 년도: '7년차', 수익률: 7.4 },
  { 년도: '8년차', 수익률: 7.8 },
  { 년도: '9년차', 수익률: 8.1 },
  { 년도: '10년차', 수익률: 8.5 },
];

// 총수익률 vs 순수익률 비교 데이터
const comparisonData = [
  { 년도: '2020년', 총수익률: 7.5, 순수익률: 5.8 },
  { 년도: '2021년', 총수익률: 8.2, 순수익률: 6.3 },
  { 년도: '2022년', 총수익률: 9.1, 순수익률: 7.0 },
  { 년도: '2023년', 총수익률: 9.8, 순수익률: 7.5 },
  { 년도: '2024년', 총수익률: 10.3, 순수익률: 7.9 },
  { 년도: '2025년(예상)', 총수익률: 11.2, 순수익률: 8.6 },
];

export default function ReturnAnalysis({ analysisType }: ReturnAnalysisProps) {
  const { t } = useTranslation();

  // 내부수익률(IRR) 시뮬레이션 차트
  if (analysisType === 'irr') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={irrData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="시나리오" />
          <YAxis domain={[0, 20]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="5년" name="5년 IRR" fill="#8884d8" />
          <Bar dataKey="10년" name="10년 IRR" fill="#82ca9d" />
          <Bar dataKey="15년" name="15년 IRR" fill="#ffc658" />
          <Bar dataKey="20년" name="20년 IRR" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // 현금-현-현금 수익률 차트
  if (analysisType === 'coc') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={cocData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="년도" />
          <YAxis domain={[0, 10]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Area type="monotone" dataKey="수익률" name="CoC 수익률" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // 총수익률 vs 순수익률 비교 차트
  if (analysisType === 'comparison') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={comparisonData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="년도" />
          <YAxis domain={[0, 15]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line type="monotone" dataKey="총수익률" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="순수익률" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return null;
}