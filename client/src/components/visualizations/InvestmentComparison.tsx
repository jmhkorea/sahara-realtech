import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface InvestmentComparisonProps {
  comparisonType?: 'radar' | 'bar';
}

// 투자 방식 비교 데이터 (샘플)
const investmentComparisonData = [
  { subject: '최소 투자금', '토큰화 부동산': 90, '전통적 부동산': 30, '리츠(REITs)': 70, fullMark: 100 },
  { subject: '유동성', '토큰화 부동산': 85, '전통적 부동산': 20, '리츠(REITs)': 75, fullMark: 100 },
  { subject: '수익률', '토큰화 부동산': 75, '전통적 부동산': 70, '리츠(REITs)': 60, fullMark: 100 },
  { subject: '리스크', '토큰화 부동산': 40, '전통적 부동산': 50, '리츠(REITs)': 45, fullMark: 100 },
  { subject: '운용 용이성', '토큰화 부동산': 80, '전통적 부동산': 30, '리츠(REITs)': 70, fullMark: 100 },
  { subject: '자산 소유권', '토큰화 부동산': 85, '전통적 부동산': 100, '리츠(REITs)': 40, fullMark: 100 },
];

// 최소 투자금액 비교 데이터 (샘플)
const minimumInvestmentData = [
  { name: '토큰화 부동산', value: 5 },
  { name: '전통적 부동산', value: 200 },
  { name: '리츠(REITs)', value: 10 },
];

export default function InvestmentComparison({ comparisonType = 'radar' }: InvestmentComparisonProps) {
  switch (comparisonType) {
    case 'radar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={investmentComparisonData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar 
              name="토큰화 부동산" 
              dataKey="토큰화 부동산" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.6} 
            />
            <Radar 
              name="전통적 부동산" 
              dataKey="전통적 부동산" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
              fillOpacity={0.6} 
            />
            <Radar 
              name="리츠(REITs)" 
              dataKey="리츠(REITs)" 
              stroke="#ffc658" 
              fill="#ffc658" 
              fillOpacity={0.6} 
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      );
    
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={minimumInvestmentData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => `${value}백만원`} 
              domain={[0, 250]}
            />
            <YAxis type="category" dataKey="name" />
            <Tooltip formatter={(value) => [`${value}백만원`, '최소 투자금액']} />
            <Legend />
            <Bar dataKey="value" name="최소 투자금액 (백만원)" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    
    default:
      return <div>Chart type not supported</div>;
  }
}