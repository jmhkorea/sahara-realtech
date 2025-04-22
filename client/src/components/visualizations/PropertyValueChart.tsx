import React, { useState } from 'react';
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
  Cell
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PropertyValueChartProps {
  chartType?: 'radar' | 'factors';
}

// 부동산 가치 평가 요소 데이터 (샘플)
const valueFactorsData = [
  { name: '강남 프리미엄 오피스', 입지: 90, 시설: 85, 임차인: 80, 수익성: 85, 개발계획: 75 },
  { name: '부산 해운대 레지던스', 입지: 85, 시설: 80, 임차인: 75, 수익성: 70, 개발계획: 85 },
  { name: '판교 테크노밸리 오피스', 입지: 85, 시설: 90, 임차인: 85, 수익성: 80, 개발계획: 90 },
  { name: '라오스 골프텔', 입지: 75, 시설: 90, 임차인: 70, 수익성: 85, 개발계획: 95 },
  { name: '발리 세미냑 리조트', 입지: 95, 시설: 95, 임차인: 80, 수익성: 90, 개발계획: 80 },
];

// 감정가 형성 요소 데이터 (샘플)
const appraisalFactorsData = [
  { name: '입지조건', value: 30 },
  { name: '건물상태', value: 20 },
  { name: '임대수익', value: 25 },
  { name: '시장동향', value: 15 },
  { name: '주변개발', value: 10 },
];

// 부동산별 감정가와 실거래가 비교 (샘플)
const priceComparisonData = [
  { name: '강남 오피스', 감정가: 195, 실거래가: 180 },
  { name: '해운대 레지던스', 감정가: 130, 실거래가: 126 },
  { name: '판교 오피스', 감정가: 225, 실거래가: 215 },
  { name: '라오스 골프텔', 감정가: 260, 실거래가: 250 },
  { name: '발리 리조트', 감정가: 335, 실거래가: 320 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function PropertyValueChart({ chartType = 'radar' }: PropertyValueChartProps) {
  const [selectedProperty, setSelectedProperty] = useState('강남 프리미엄 오피스');
  
  // 선택한 부동산의 가치 요소 데이터 가져오기
  const getPropertyFactors = () => {
    return valueFactorsData.find(item => item.name === selectedProperty) || valueFactorsData[0];
  };
  
  // 레이더 차트용 데이터 변환
  const getRadarData = () => {
    const propertyData = getPropertyFactors();
    return [
      { subject: '입지', value: propertyData.입지, fullMark: 100 },
      { subject: '시설', value: propertyData.시설, fullMark: 100 },
      { subject: '임차인', value: propertyData.임차인, fullMark: 100 },
      { subject: '수익성', value: propertyData.수익성, fullMark: 100 },
      { subject: '개발계획', value: propertyData.개발계획, fullMark: 100 },
    ];
  };

  // 부동산 선택 핸들러
  const handlePropertyChange = (value: string) => {
    setSelectedProperty(value);
  };
  
  // 레이더 차트 렌더링
  const renderRadarChart = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="property-select">부동산 선택</Label>
          <Select 
            value={selectedProperty} 
            onValueChange={handlePropertyChange}
          >
            <SelectTrigger id="property-select" className="w-full">
              <SelectValue placeholder="부동산을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {valueFactorsData.map((property) => (
                <SelectItem key={property.name} value={property.name}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getRadarData()}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="가치 평가 요소"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">
            가치 평가 요약
          </h3>
          <p className="text-neutral-600">
            {selectedProperty}는 <span className="font-medium text-primary">
              {getPropertyFactors().입지}점
            </span>의 우수한 입지와 
            <span className="font-medium text-primary">
              {getPropertyFactors().시설}점
            </span>의 시설 수준을 갖추고 있으며, 개발 계획 측면에서는 
            <span className="font-medium text-primary">
              {getPropertyFactors().개발계획}점
            </span>으로 평가됩니다.
          </p>
        </div>
      </div>
    );
  };
  
  // 가치 요소 차트 렌더링
  const renderFactorsChart = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              감정가 형성 요인 분석
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={appraisalFactorsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value}%`, '비중']} />
                <Legend />
                <Bar dataKey="value" name="요소별 비중" fill="#8884d8">
                  {appraisalFactorsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              감정가 vs 실거래가 비교
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={priceComparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `${value}억`}
                  label={{ value: '가격(억원)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip formatter={(value) => [`${value}억원`, '']} />
                <Legend />
                <Bar dataKey="감정가" fill="#8884d8" />
                <Bar dataKey="실거래가" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {chartType === 'radar' ? renderRadarChart() : renderFactorsChart()}
    </div>
  );
}