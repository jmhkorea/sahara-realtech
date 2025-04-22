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
  Bar
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ROICalculatorProps {
  chartType?: 'timeSeries' | 'comparison';
}

export default function ROICalculator({ chartType = 'timeSeries' }: ROICalculatorProps) {
  // 투자 시뮬레이션을 위한 상태값
  const [investmentAmount, setInvestmentAmount] = useState(10000000); // 1,000만원
  const [investmentPeriod, setInvestmentPeriod] = useState(5); // 5년
  const [returnRate, setReturnRate] = useState(8); // 8%
  
  // 투자 금액 변경 핸들러
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, ''));
    if (!isNaN(value)) {
      setInvestmentAmount(value);
    }
  };
  
  // 기간 변경 핸들러
  const handlePeriodChange = (value: number[]) => {
    setInvestmentPeriod(value[0]);
  };
  
  // 수익률 변경 핸들러
  const handleReturnChange = (value: number[]) => {
    setReturnRate(value[0]);
  };
  
  // 복리 계산 함수
  const calculateCompoundInterest = (principal: number, rate: number, time: number) => {
    return principal * Math.pow(1 + rate / 100, time);
  };
  
  // 시계열 데이터 생성
  const generateTimeSeriesData = () => {
    const data = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const value = calculateCompoundInterest(investmentAmount, returnRate, year);
      data.push({
        year,
        value: Math.round(value)
      });
    }
    return data;
  };
  
  // 비교 데이터 생성
  const generateComparisonData = () => {
    const results = [
      {
        name: '초기 투자금',
        value: investmentAmount
      },
      {
        name: '단리 수익',
        value: investmentAmount + (investmentAmount * returnRate / 100 * investmentPeriod)
      },
      {
        name: '복리 수익',
        value: calculateCompoundInterest(investmentAmount, returnRate, investmentPeriod)
      }
    ];
    return results;
  };
  
  // 시계열 차트 렌더링
  const renderTimeSeriesChart = () => {
    const data = generateTimeSeriesData();
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: '투자 기간 (년)', position: 'insideBottomRight', offset: 0 }} />
          <YAxis 
            tickFormatter={(value) => `${Math.round(value / 10000)}만원`}
            label={{ value: '투자 가치', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value) => {
              const valueInWon = parseInt(value.toString());
              return [`${(valueInWon / 10000).toLocaleString()}만원`, '투자 가치'];
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            name="복리 적용 투자 가치" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  // 비교 차트 렌더링
  const renderComparisonChart = () => {
    const data = generateComparisonData();
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `${Math.round(value / 10000)}만원`}
          />
          <Tooltip 
            formatter={(value) => {
              const valueInWon = parseInt(value.toString());
              return [`${(valueInWon / 10000).toLocaleString()}만원`, '금액'];
            }}
          />
          <Legend />
          <Bar dataKey="value" name="투자 가치" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
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
                value={investmentAmount.toLocaleString()}
                onChange={handleAmountChange}
              />
              <div className="text-xs text-neutral-500">
                초기 투자하실 금액을 입력하세요
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>투자 기간 (년)</Label>
              <Slider
                defaultValue={[investmentPeriod]}
                max={20}
                min={1}
                step={1}
                onValueChange={handlePeriodChange}
              />
              <div className="text-center font-medium">{investmentPeriod}년</div>
            </div>
            
            <div className="space-y-4">
              <Label>예상 연간 수익률 (%)</Label>
              <Slider
                defaultValue={[returnRate]}
                max={15}
                min={1}
                step={0.1}
                onValueChange={handleReturnChange}
              />
              <div className="text-center font-medium">{returnRate.toFixed(1)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              연도별 복리 수익 추이
            </h3>
            {renderTimeSeriesChart()}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              투자 방식별 최종 수익 비교
            </h3>
            {renderComparisonChart()}
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-neutral-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">
          투자 요약
        </h3>
        <p className="text-neutral-600">
          {investmentAmount.toLocaleString()}원을 연 {returnRate}%의 수익률로 {investmentPeriod}년간 복리 운용 시
          최종 투자 가치는 <span className="font-bold text-primary">
            {Math.round(calculateCompoundInterest(investmentAmount, returnRate, investmentPeriod)).toLocaleString()}원
          </span>으로 예상됩니다.
        </p>
        <p className="text-neutral-600 mt-2">
          이는 초기 투자금 대비 <span className="font-bold text-primary">
            {Math.round((calculateCompoundInterest(investmentAmount, returnRate, investmentPeriod) / investmentAmount - 1) * 100)}%
          </span>의 수익률을 의미합니다.
        </p>
      </div>
    </div>
  );
}