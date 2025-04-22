import React from 'react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Area
} from 'recharts';

interface MarketTrendsMapProps {
  mapType: 'priceGrowth' | 'tokenTrading' | 'marketIndicators';
}

// 시장 동향 데이터 (샘플)
const priceGrowthData = [
  { x: 1, y: 1, z: 8.1, name: '서울 - 강남' },
  { x: 1, y: 2, z: 7.4, name: '서울 - 마포' },
  { x: 2, y: 1, z: 6.8, name: '부산 - 해운대' },
  { x: 2, y: 2, z: 5.9, name: '부산 - 남구' },
  { x: 3, y: 1, z: 7.2, name: '경기 - 판교' },
  { x: 3, y: 2, z: 6.5, name: '경기 - 수원' },
  { x: 4, y: 1, z: 9.2, name: '해외 - 발리' },
  { x: 4, y: 2, z: 8.7, name: '해외 - 라오스' },
  { x: 5, y: 1, z: 7.8, name: '강원 - 평창' },
  { x: 5, y: 2, z: 7.1, name: '강원 - 속초' },
];

const tokenTradingData = [
  { name: '1월', 아파트: 435, 오피스: 520, 리조트: 350, 회원권: 210 },
  { name: '2월', 아파트: 452, 오피스: 540, 리조트: 380, 회원권: 250 },
  { name: '3월', 아파트: 510, 오피스: 580, 리조트: 420, 회원권: 320 },
  { name: '4월', 아파트: 530, 오피스: 620, 리조트: 450, 회원권: 380 },
  { name: '5월', 아파트: 560, 오피스: 650, 리조트: 500, 회원권: 420 },
  { name: '6월', 아파트: 540, 오피스: 630, 리조트: 520, 회원권: 460 },
];

const marketIndicatorsData = [
  { name: '서울', 공실률: 3.2, 임대료변동: 5.4, 가격변동: 7.8 },
  { name: '부산', 공실률: 4.5, 임대료변동: 4.8, 가격변동: 6.5 },
  { name: '경기', 공실률: 3.8, 임대료변동: 5.1, 가격변동: 7.2 },
  { name: '강원', 공실률: 5.2, 임대료변동: 4.3, 가격변동: 6.8 },
  { name: '해외', 공실률: 2.9, 임대료변동: 6.7, 가격변동: 9.0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function MarketTrendsMap({ mapType }: MarketTrendsMapProps) {
  const renderChart = () => {
    switch (mapType) {
      case 'priceGrowth':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart 
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="지역"
                tickFormatter={(value) => {
                  const regions = ['서울', '부산', '경기', '해외', '강원'];
                  return regions[value - 1] || '';
                }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="세부지역"
                tickFormatter={(value) => value === 1 ? '주요지역' : '기타지역'}
              />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[50, 400]} 
                name="가격 상승률"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name, props) => {
                  if (name === 'z') {
                    return [`${props.payload.z}%`, '가격 상승률'];
                  }
                  return [props.payload.name, name];
                }}
              />
              <Legend />
              <Scatter 
                name="지역별 가격 상승률" 
                data={priceGrowthData} 
                fill="#8884d8" 
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      case 'tokenTrading':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={tokenTradingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="아파트" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="오피스" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="리조트" stroke="#ff7300" />
              <Line type="monotone" dataKey="회원권" stroke="#00C49F" />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      case 'marketIndicators':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={marketIndicatorsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="공실률" fill="#8884d8" />
              <Bar dataKey="임대료변동" fill="#82ca9d" />
              <Bar dataKey="가격변동" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Map type not supported</div>;
    }
  };

  return renderChart();
}