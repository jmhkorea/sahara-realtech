import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface RiskManagementProps {
  chartType?: 'radar' | 'diversification';
}

// 리스크 요소 데이터 (샘플)
const riskFactorsData = [
  { subject: '시장 리스크', '토큰화 부동산': 40, '전통적 부동산': 60, fullMark: 100 },
  { subject: '유동성 리스크', '토큰화 부동산': 30, '전통적 부동산': 80, fullMark: 100 },
  { subject: '규제 리스크', '토큰화 부동산': 65, '전통적 부동산': 45, fullMark: 100 },
  { subject: '운영 리스크', '토큰화 부동산': 45, '전통적 부동산': 55, fullMark: 100 },
  { subject: '기술 리스크', '토큰화 부동산': 70, '전통적 부동산': 20, fullMark: 100 },
];

// 투자자 보호 장치 데이터 (샘플)
const investorProtectionData = [
  { name: '법적 계약', value: 90 },
  { name: '자산 심사', value: 85 },
  { name: '블록체인 감사', value: 95 },
  { name: '보험 가입', value: 75 },
  { name: '수익 예치금', value: 80 },
];

// 분산 투자 효과 데이터 (샘플)
const diversificationData = [
  { name: '1개 자산', 리스크: 85, 수익률: 7.5 },
  { name: '2개 자산', 리스크: 70, 수익률: 7.8 },
  { name: '3개 자산', 리스크: 60, 수익률: 8.0 },
  { name: '5개 자산', 리스크: 50, 수익률: 8.2 },
  { name: '10개 자산', 리스크: 42, 수익률: 8.5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function RiskManagement({ chartType = 'radar' }: RiskManagementProps) {
  // 레이더 차트 렌더링
  const renderRadarChart = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              투자 리스크 요소 분석
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={riskFactorsData}>
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
                <Tooltip formatter={(value) => [`${value}/100`, '리스크 수준']} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 text-sm text-neutral-600">
              <p>* 수치가 낮을수록 리스크가 적음을 의미합니다.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              투자자 보호 장치
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={investorProtectionData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value}/100`, '안전성 점수']} />
                <Legend />
                <Bar dataKey="value" name="보호 장치 수준" fill="#82ca9d">
                  {investorProtectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // 분산 투자 효과 차트 렌더링
  const renderDiversificationChart = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              분산 투자 효과
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={diversificationData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[7, 9]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === '리스크') return [`${value}/100`, name];
                    if (name === '수익률') return [`${value}%`, name];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="리스크"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="수익률"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-6 bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">
                분산 투자의 효과
              </h4>
              <p className="text-neutral-600 text-sm">
                다양한 부동산에 분산 투자할수록 전체 투자 포트폴리오의 리스크는 감소하고 
                안정적인 수익률을 기대할 수 있습니다. 위 그래프는 투자 부동산 수에 따른 
                리스크 감소와 수익률 변화를 보여줍니다.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-sm font-medium text-neutral-600">
                    단일 자산 투자 대비 10개 자산 분산 투자 시
                  </p>
                  <p className="text-xl font-bold text-primary mt-1">
                    리스크 50.6% 감소
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-sm font-medium text-neutral-600">
                    단일 자산 투자 대비 10개 자산 분산 투자 시
                  </p>
                  <p className="text-xl font-bold text-primary mt-1">
                    수익률 13.3% 증가
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              권리 관계 및 법적 보호
            </h3>
            <div className="space-y-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium text-primary">
                  투자자 법적 권리
                </h4>
                <p className="text-neutral-600 mt-1">
                  SaharaRealTech 플랫폼을 통해 구매한 부동산 토큰은 해당 부동산의 
                  지분을 나타내며, 수익 분배 권리와 함께 법적으로 보장됩니다.
                </p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium text-primary">
                  스마트 계약 감사
                </h4>
                <p className="text-neutral-600 mt-1">
                  모든 토큰화 부동산의 스마트 계약은 전문 보안 감사 기관의 검증을 
                  거쳐 안전성을 보장합니다.
                </p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium text-primary">
                  자산 보험
                </h4>
                <p className="text-neutral-600 mt-1">
                  토큰화된 모든 부동산은 종합적인 보험에 가입되어 있어 화재, 자연재해 등의 
                  위험으로부터 투자 자산을 보호합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {chartType === 'radar' ? renderRadarChart() : renderDiversificationChart()}
    </div>
  );
}