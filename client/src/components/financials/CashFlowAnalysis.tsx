import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface CashFlowAnalysisProps {
  chartType: 'monthly' | 'trend' | 'composition';
}

// 월별 현금 흐름 데이터
const monthlyData = [
  { name: '1월', 수입: 4000, 지출: 2400, 순현금흐름: 1600 },
  { name: '2월', 수입: 3500, 지출: 2200, 순현금흐름: 1300 },
  { name: '3월', 수입: 4100, 지출: 2500, 순현금흐름: 1600 },
  { name: '4월', 수입: 4500, 지출: 2800, 순현금흐름: 1700 },
  { name: '5월', 수입: 4200, 지출: 2300, 순현금흐름: 1900 },
  { name: '6월', 수입: 3800, 지출: 2400, 순현금흐름: 1400 },
  { name: '7월', 수입: 4300, 지출: 2600, 순현금흐름: 1700 },
  { name: '8월', 수입: 4700, 지출: 2700, 순현금흐름: 2000 },
  { name: '9월', 수입: 4600, 지출: 2500, 순현금흐름: 2100 },
  { name: '10월', 수입: 4900, 지출: 2800, 순현금흐름: 2100 },
  { name: '11월', 수입: 5000, 지출: 2900, 순현금흐름: 2100 },
  { name: '12월', 수입: 5200, 지출: 3000, 순현금흐름: 2200 },
];

// 현금 흐름 트렌드 데이터
const trendData = [
  { name: '2020년', 순현금흐름: 1200 },
  { name: '2021년', 순현금흐름: 1500 },
  { name: '2022년', 순현금흐름: 1700 },
  { name: '2023년', 순현금흐름: 1900 },
  { name: '2024년', 순현금흐름: 2100 },
  { name: '2025년(예상)', 순현금흐름: 2400 },
];

// 현금 흐름 구성 요소 데이터
const compositionData = [
  { name: '임대 수입', value: 55 },
  { name: '기타 수입', value: 10 },
  { name: '관리비', value: 15 },
  { name: '세금', value: 10 },
  { name: '보험료', value: 5 },
  { name: '수리비', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

export default function CashFlowAnalysis({ chartType }: CashFlowAnalysisProps) {
  const { t } = useTranslation();

  // 월별 현금 흐름 차트
  if (chartType === 'monthly') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
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
          data={trendData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="순현금흐름" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // 현금 흐름 구성 요소 차트
  if (chartType === 'composition') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={compositionData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {compositionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return null;
}