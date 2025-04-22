import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Brush,
  ReferenceLine
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReturnAnalysisProps {
  analysisType: 'irr' | 'coc' | 'comparison';
}

// IRR 시뮬레이션 데이터 (샘플)
const generateIRRData = (holdingPeriod: number, appreciationRate: number, initialInvestment: number) => {
  const scenarios = [
    { scenario: '비관적', modifier: 0.7 },
    { scenario: '중립적', modifier: 1.0 },
    { scenario: '낙관적', modifier: 1.3 }
  ];
  
  const baseIRR = 8.5; // 기본 IRR (%)
  const data = [];
  
  for (let year = 1; year <= holdingPeriod; year++) {
    const yearData: any = { year: `${year}년` };
    
    scenarios.forEach(scen => {
      // 보유 기간과 가치 상승률에 따라 IRR 계산 (간단한 모델)
      const adjustedIRR = baseIRR * scen.modifier * 
                         (1 + (appreciationRate / 100) * 0.5) * 
                         (1 + (year / 10) * 0.2);
      
      yearData[scen.scenario] = parseFloat(adjustedIRR.toFixed(2));
    });
    
    data.push(yearData);
  }
  
  return data;
};

// 현금-현-현금 수익률 데이터 (샘플)
const cocReturnData = [
  { year: '1년차', 수익률: 6.2 },
  { year: '2년차', 수익률: 6.4 },
  { year: '3년차', 수익률: 6.7 },
  { year: '4년차', 수익률: 7.0 },
  { year: '5년차', 수익률: 7.3 },
  { year: '6년차', 수익률: 7.5 },
  { year: '7년차', 수익률: 7.8 },
  { year: '8년차', 수익률: 8.1 },
  { year: '9년차', 수익률: 8.4 },
  { year: '10년차', 수익률: 8.7 },
];

// 총수익률 vs 순수익률 비교 데이터 (샘플)
const returnComparisonData = [
  { category: '임대 수익', 총수익률: 6.5, 순수익률: 4.8 },
  { category: '가치 상승', 총수익률: 3.8, 순수익률: 2.6 },
  { category: '세금 혜택', 총수익률: 1.2, 순수익률: 0.9 },
  { category: '레버리지 효과', 총수익률: 2.5, 순수익률: 2.5 },
  { category: '총합', 총수익률: 14.0, 순수익률: 10.8 },
];

export default function ReturnAnalysis({ analysisType }: ReturnAnalysisProps) {
  // IRR 시뮬레이션을 위한 상태값
  const [holdingPeriod, setHoldingPeriod] = useState(10); // 10년
  const [appreciationRate, setAppreciationRate] = useState(3.0); // 3%
  const [initialInvestment, setInitialInvestment] = useState(500000000); // 5억원
  const [selectedProperty, setSelectedProperty] = useState('강남 프리미엄 오피스');
  
  // 보유 기간 변경 핸들러
  const handlePeriodChange = (value: number[]) => {
    setHoldingPeriod(value[0]);
  };
  
  // 가치 상승률 변경 핸들러
  const handleAppreciationChange = (value: number[]) => {
    setAppreciationRate(value[0]);
  };
  
  // 초기 투자금 변경 핸들러
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, ''));
    if (!isNaN(value)) {
      setInitialInvestment(value);
    }
  };
  
  // 부동산 선택 핸들러
  const handlePropertyChange = (value: string) => {
    setSelectedProperty(value);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const renderIRRSimulation = () => {
    const irrData = generateIRRData(holdingPeriod, appreciationRate, initialInvestment);
    
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Label htmlFor="investment-amount">투자 금액</Label>
                <Input 
                  id="investment-amount"
                  type="text"
                  value={initialInvestment.toLocaleString()}
                  onChange={handleInvestmentChange}
                />
                <div className="text-xs text-neutral-500">
                  초기 투자 금액 입력
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>보유 기간 (년)</Label>
                <Slider
                  value={[holdingPeriod]}
                  max={20}
                  min={1}
                  step={1}
                  onValueChange={handlePeriodChange}
                />
                <div className="text-center font-medium">{holdingPeriod}년</div>
              </div>
              
              <div className="space-y-4">
                <Label>연간 가치 상승률 (%)</Label>
                <Slider
                  value={[appreciationRate]}
                  max={10}
                  min={0}
                  step={0.1}
                  onValueChange={handleAppreciationChange}
                />
                <div className="text-center font-medium">{appreciationRate.toFixed(1)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">
                시나리오별 IRR 추이
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={irrData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    domain={[0, 20]}
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '내부수익률(IRR)']}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="낙관적" 
                    stroke="#4CAF50" 
                    fill="#4CAF50" 
                    fillOpacity={0.3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="중립적" 
                    stroke="#2196F3" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="비관적" 
                    stroke="#F44336" 
                    fill="#F44336" 
                    fillOpacity={0.3}
                  />
                  <ReferenceLine
                    y={8}
                    label="목표 IRR"
                    stroke="#FF9800"
                    strokeDasharray="5 5"
                  />
                  <Brush dataKey="year" height={30} stroke="#8884d8" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">IRR 시뮬레이션 요약</h3>
          <p className="text-neutral-600">
            {formatCurrency(initialInvestment)}를 투자하여 {holdingPeriod}년간 보유할 경우, 연간 가치 상승률 {appreciationRate}%를 가정하면:
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">비관적 시나리오</p>
              <p className="text-xl font-bold text-red-500">
                {irrData[irrData.length - 1]?.비관적.toFixed(1)}% IRR
              </p>
            </div>
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">중립적 시나리오</p>
              <p className="text-xl font-bold text-primary">
                {irrData[irrData.length - 1]?.중립적.toFixed(1)}% IRR
              </p>
            </div>
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">낙관적 시나리오</p>
              <p className="text-xl font-bold text-green-600">
                {irrData[irrData.length - 1]?.낙관적.toFixed(1)}% IRR
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCoCReturn = () => {
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
              <SelectItem value="강남 프리미엄 오피스">강남 프리미엄 오피스</SelectItem>
              <SelectItem value="부산 해운대 레지던스">부산 해운대 레지던스</SelectItem>
              <SelectItem value="판교 테크노밸리 오피스">판교 테크노밸리 오피스</SelectItem>
              <SelectItem value="라오스 비엔티안 골프텔">라오스 비엔티안 골프텔</SelectItem>
              <SelectItem value="발리 세미냑 리조트">발리 세미냑 리조트</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              연도별 현금-현-현금(CoC) 수익률 추이 - {selectedProperty}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cocReturnData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  domain={[0, 10]} 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'CoC 수익률']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="수익률"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="CoC 수익률 (%)"
                />
                <ReferenceLine
                  y={7}
                  label="목표 수익률"
                  stroke="#FF9800"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">CoC 수익률 분석</h3>
          <p className="text-neutral-600">
            <span className="font-medium text-primary">{selectedProperty}</span>의 현금-현-현금(CoC) 수익률은
            1년차의 {cocReturnData[0].수익률}%에서 시작하여 10년차에는 {cocReturnData[9].수익률}%까지 
            상승합니다. 이는 연간 {((cocReturnData[9].수익률 - cocReturnData[0].수익률) / 9).toFixed(2)}%의 수익률 
            성장을 의미합니다.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">평균 CoC 수익률</p>
              <p className="text-xl font-bold text-primary">
                {(cocReturnData.reduce((sum, item) => sum + item.수익률, 0) / cocReturnData.length).toFixed(1)}%
              </p>
            </div>
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">수익률 안정화 시점</p>
              <p className="text-xl font-bold text-primary">
                {cocReturnData.findIndex(item => item.수익률 >= 7.0) + 1}년차
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderReturnComparison = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              총수익률 vs 순수익률 비교
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={returnComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Bar 
                  dataKey="총수익률" 
                  fill="#2196F3" 
                  name="세전 총수익률 (%)"
                />
                <Bar 
                  dataKey="순수익률" 
                  fill="#4CAF50" 
                  name="세후 순수익률 (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">세금이 수익률에 미치는 영향</h3>
            <p className="text-neutral-600">
              세금은 부동산 투자 수익률에 상당한 영향을 미칩니다. 위 차트에서 볼 수 있듯이,
              총 수익률 {returnComparisonData[4].총수익률}%에서 세금 및 비용을 공제한 순수익률은 
              {returnComparisonData[4].순수익률}%로, 약 
              {(((returnComparisonData[4].총수익률 - returnComparisonData[4].순수익률) / returnComparisonData[4].총수익률) * 100).toFixed(1)}%의 
              수익률 감소가 발생합니다.
            </p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">수익 요소별 영향</h3>
            <div className="space-y-2">
              {returnComparisonData.slice(0, 4).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-neutral-600">{item.category}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-600">{item.총수익률}%</span>
                    <span className="text-neutral-400">→</span>
                    <span className="text-sm font-medium text-green-600">{item.순수익률}%</span>
                    <span className="text-xs text-neutral-500">
                      ({Math.round((item.순수익률 / item.총수익률) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  switch (analysisType) {
    case 'irr':
      return renderIRRSimulation();
    case 'coc':
      return renderCoCReturn();
    case 'comparison':
      return renderReturnComparison();
    default:
      return <div>Analysis type not supported</div>;
  }
}