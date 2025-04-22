import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface GlobalOpportunitiesProps {
  chartType?: 'trendMap' | 'countryComparison';
}

// 글로벌 위치 데이터
const globalLocationsData = [
  { id: 1, name: '발리', country: '인도네시아', coords: { x: 115, y: 75 }, projects: 2 },
  { id: 2, name: '두바이', country: 'UAE', coords: { x: 55, y: 25 }, projects: 3 },
  { id: 3, name: '쿠알라룸푸르', country: '말레이시아', coords: { x: 102, y: 40 }, projects: 2 },
  { id: 4, name: '베이징', country: '중국', coords: { x: 117, y: 40 }, projects: 2 },
  { id: 5, name: '도쿄', country: '일본', coords: { x: 140, y: 35 }, projects: 1 },
  { id: 6, name: '뉴욕', country: '미국', coords: { x: 285, y: 40 }, projects: 2 },
  { id: 7, name: '델리', country: '인도', coords: { x: 77, y: 28 }, projects: 1 },
  { id: 8, name: '발레타', country: '몰타', coords: { x: 14, y: 35 }, projects: 1 },
  { id: 9, name: '서울', country: '대한민국', coords: { x: 127, y: 37 }, projects: 5 }
];

// 국가별 부동산 시장 성장률 데이터
const marketGrowthData = [
  { country: '대한민국', growth: 5.8, projects: 5 },
  { country: '인도네시아', growth: 8.2, projects: 2 },
  { country: 'UAE', growth: 9.5, projects: 3 },
  { country: '말레이시아', growth: 6.8, projects: 2 },
  { country: '중국', growth: 7.2, projects: 2 },
  { country: '일본', growth: 4.5, projects: 1 },
  { country: '미국', growth: 5.2, projects: 2 },
  { country: '인도', growth: 8.7, projects: 1 },
  { country: '몰타', growth: 7.4, projects: 1 }
];

// 주요 시장 트렌드 데이터
const marketTrendsData = [
  { year: '2020', '대한민국': 3.2, '인도네시아': 5.5, 'UAE': 6.8, '말레이시아': 4.2, '미국': 3.5 },
  { year: '2021', '대한민국': 4.1, '인도네시아': 6.2, 'UAE': 7.5, '말레이시아': 5.1, '미국': 4.0 },
  { year: '2022', '대한민국': 4.8, '인도네시아': 7.1, 'UAE': 8.2, '말레이시아': 5.8, '미국': 4.5 },
  { year: '2023', '대한민국': 5.3, '인도네시아': 7.8, 'UAE': 8.9, '말레이시아': 6.4, '미국': 4.9 },
  { year: '2024', '대한민국': 5.8, '인도네시아': 8.2, 'UAE': 9.5, '말레이시아': 6.8, '미국': 5.2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658', '#d0ed57', '#82ca9d'];

export default function GlobalOpportunities({ chartType = 'trendMap' }: GlobalOpportunitiesProps) {
  const [hoveredLocation, setHoveredLocation] = useState<null | { name: string, country: string, projects: number }>(null);
  
  const handleLocationHover = (location: { name: string, country: string, projects: number } | null) => {
    setHoveredLocation(location);
  };
  
  // 지도 차트 렌더링
  const renderTrendMap = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              글로벌 투자 지역
            </h3>
            
            <div className="relative w-full h-[400px] bg-neutral-100 rounded-lg overflow-hidden">
              {/* 간단한 세계 지도 배경 (실제로는 더 정교한 지도 컴포넌트 사용 필요) */}
              <div className="absolute inset-0 bg-neutral-200">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/World_map_blank_without_borders.svg/1280px-World_map_blank_without_borders.svg.png" 
                  alt="World Map" 
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
              
              {/* 글로벌 위치 마커 */}
              {globalLocationsData.map((location) => (
                <div
                  key={location.id}
                  className="absolute"
                  style={{
                    left: `${(location.coords.x / 360) * 100}%`,
                    top: `${(location.coords.y / 180) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => handleLocationHover(location)}
                  onMouseLeave={() => handleLocationHover(null)}
                >
                  <div className="relative">
                    <MapPin
                      className="h-6 w-6 text-primary"
                      style={{
                        filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))'
                      }}
                    />
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-white px-1 rounded shadow">
                      {location.name}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* 툴팁 */}
              {hoveredLocation && (
                <div
                  className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border z-10"
                >
                  <h4 className="font-medium text-lg">{hoveredLocation.name}</h4>
                  <p className="text-neutral-600 text-sm mb-1">{hoveredLocation.country}</p>
                  <p className="text-neutral-600">진행 중인 프로젝트: <span className="font-medium">{hoveredLocation.projects}개</span></p>
                </div>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {globalLocationsData.map((location) => (
                <div 
                  key={location.id}
                  className="text-center"
                  onMouseEnter={() => handleLocationHover(location)}
                  onMouseLeave={() => handleLocationHover(null)}
                >
                  <div className="text-xs font-medium">{location.name}</div>
                  <div className="text-xs text-neutral-500">{location.country}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              글로벌 부동산 시장 트렌드
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '성장률']} />
                <Legend />
                <Line type="monotone" dataKey="대한민국" stroke={COLORS[0]} />
                <Line type="monotone" dataKey="인도네시아" stroke={COLORS[1]} />
                <Line type="monotone" dataKey="UAE" stroke={COLORS[2]} />
                <Line type="monotone" dataKey="말레이시아" stroke={COLORS[3]} />
                <Line type="monotone" dataKey="미국" stroke={COLORS[4]} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // 국가 비교 차트 렌더링
  const renderCountryComparison = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              국가별 부동산 시장 성장률
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={marketGrowthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '성장률']} />
                <Legend />
                <Bar dataKey="growth" name="연간 부동산 시장 성장률" fill="#8884d8">
                  {marketGrowthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">
                글로벌 투자 이점
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary">
                    지역 다각화
                  </h4>
                  <p className="text-neutral-600 mt-1 text-sm">
                    다양한 국가와 지역에 투자하여 특정 국가의 경제 변동에 따른 리스크를 분산할 수 있습니다.
                  </p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary">
                    신흥 시장 성장
                  </h4>
                  <p className="text-neutral-600 mt-1 text-sm">
                    UAE, 인도네시아와 같은 신흥 시장은 높은 성장률을 보이며 더 큰 투자 수익을 제공할 수 있습니다.
                  </p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary">
                    통화 다각화
                  </h4>
                  <p className="text-neutral-600 mt-1 text-sm">
                    다양한 통화로 이루어진 투자는 환율 변동에 따른 위험을 분산할 수 있습니다.
                  </p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary">
                    관광 시장 접근
                  </h4>
                  <p className="text-neutral-600 mt-1 text-sm">
                    발리, 두바이와 같은 글로벌 관광지의 부동산은 안정적인 관광 수요로 높은 임대 수익을 기대할 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">
                프로젝트 분포
              </h3>
              <div className="flex flex-col h-full justify-center">
                <div className="space-y-2">
                  {marketGrowthData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-sm">{item.country}</div>
                      <div className="flex-1 h-6 bg-neutral-100 rounded overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${(item.projects / 5) * 100}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm text-right">{item.projects}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {chartType === 'trendMap' ? renderTrendMap() : renderCountryComparison()}
    </div>
  );
}