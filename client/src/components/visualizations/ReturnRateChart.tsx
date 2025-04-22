import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

interface ReturnRateChartProps {
  chartType: 'region' | 'propertyType' | 'trend';
}

// 샘플 데이터 (추후 API에서 가져오도록 변경)
const regionData = [
  { name: '서울', value: 7.2 },
  { name: '부산', value: 6.8 },
  { name: '경기', value: 8.1 },
  { name: '강원', value: 7.8 },
  { name: '해외', value: 9.2 },
];

const propertyTypeData = [
  { name: '오피스', value: 7.5 },
  { name: '아파트', value: 6.2 },
  { name: '상업시설', value: 8.0 },
  { name: '리조트', value: 9.0 },
  { name: '회원권', value: 8.7 },
];

const trendData = [
  { name: '2020', 오피스: 6.8, 아파트: 5.9, 상업시설: 7.2, 리조트: 8.1, 회원권: 7.9 },
  { name: '2021', 오피스: 7.0, 아파트: 6.0, 상업시설: 7.5, 리조트: 8.3, 회원권: 8.2 },
  { name: '2022', 오피스: 7.2, 아파트: 6.1, 상업시설: 7.8, 리조트: 8.5, 회원권: 8.4 },
  { name: '2023', 오피스: 7.4, 아파트: 6.2, 상업시설: 7.9, 리조트: 8.7, 회원권: 8.6 },
  { name: '2024', 오피스: 7.5, 아파트: 6.2, 상업시설: 8.0, 리조트: 9.0, 회원권: 8.7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ReturnRateChart({ chartType }: ReturnRateChartProps) {
  const renderChart = () => {
    switch (chartType) {
      case 'region':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 10]} tickFormatter={(value) => `${value}%`} />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => [`${value}%`, '평균 수익률']} />
              <Legend />
              <Bar dataKey="value" name="평균 수익률 (%)" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'propertyType':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={propertyTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, '평균 수익률']} />
              <Legend />
              <Bar dataKey="value" name="평균 수익률 (%)" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'trend':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[5, 10]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, '수익률']} />
              <Legend />
              <Line type="monotone" dataKey="오피스" stroke={COLORS[0]} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="아파트" stroke={COLORS[1]} />
              <Line type="monotone" dataKey="상업시설" stroke={COLORS[2]} />
              <Line type="monotone" dataKey="리조트" stroke={COLORS[3]} />
              <Line type="monotone" dataKey="회원권" stroke={COLORS[4]} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return renderChart();
}