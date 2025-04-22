import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

interface TokenizationProcessProps {
  processType?: 'timeline' | 'distribution';
}

// 토큰화 단계 데이터
const tokenizationSteps = [
  {
    title: '부동산 실사 및 감정평가',
    description: '물건의 법적 상태 확인, 감정평가를 통한 시장가치 평가',
    status: 'complete'
  },
  {
    title: '자산 토큰화 구조 설계',
    description: '소유권 분할 구조 설계, 수익 분배 메커니즘 설계',
    status: 'complete'
  },
  {
    title: '스마트 계약 개발',
    description: 'Avalanche 블록체인 기반 스마트 계약 개발 및 감사',
    status: 'complete'
  },
  {
    title: '토큰 발행',
    description: '감정가 기준으로 토큰 발행 및 초기 분배',
    status: 'in-progress'
  },
  {
    title: '거래소 상장',
    description: '발행된 토큰의 거래소 상장 및 유통',
    status: 'pending'
  },
  {
    title: '수익 분배',
    description: '임대 수익 및 자산 가치 상승에 따른 수익 분배',
    status: 'pending'
  }
];

// 토큰화 진행 상태 데이터
const tokenizationProgressData = [
  { name: '1월', progress: 10 },
  { name: '2월', progress: 25 },
  { name: '3월', progress: 40 },
  { name: '4월', progress: 55 },
  { name: '5월', progress: 70 },
  { name: '현재', progress: 85 },
  { name: '예상', progress: 100 }
];

// 토큰 분배 데이터
const tokenDistributionData = [
  { name: '일반 투자자', value: 60 },
  { name: '기관 투자자', value: 20 },
  { name: '개발사', value: 15 },
  { name: '플랫폼', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// 커스텀 Steps 컴포넌트
const StepsComponent = () => {
  const [currentStep, setCurrentStep] = useState(3); // 0-indexed

  return (
    <div className="w-full">
      <Steps currentStep={currentStep}>
        {tokenizationSteps.map((step, index) => (
          <Step 
            key={index}
            title={step.title}
            description={step.description}
            icon={index < currentStep ? <Check className="h-4 w-4" /> : undefined}
            onClick={() => setCurrentStep(index)}
            className="cursor-pointer"
          />
        ))}
      </Steps>
      
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          이전 단계
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(tokenizationSteps.length - 1, currentStep + 1))}
          disabled={currentStep === tokenizationSteps.length - 1}
        >
          다음 단계 <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function TokenizationProcess({ processType = 'timeline' }: TokenizationProcessProps) {
  const renderTimelineChart = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              토큰화 진행 상태
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart 
                data={tokenizationProgressData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '진행률']} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  name="토큰화 진행률" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              부동산 토큰화 프로세스
            </h3>
            <StepsComponent />
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderDistributionChart = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              토큰 분배 현황
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tokenDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tokenDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '비율']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              블록체인 통합 구조
            </h3>
            <div className="p-4 border rounded-lg">
              <div className="space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary">
                    1. 자산 디지털화
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    부동산 자산을 디지털 토큰으로 변환, 법적 문서와 연결
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <ChevronRight className="rotate-90 h-6 w-6 text-neutral-400" />
                </div>
                
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary">
                    2. 스마트 계약 구현
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    Avalanche 블록체인에 자동화된 수익 분배 및 거래 스마트 계약 배포
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <ChevronRight className="rotate-90 h-6 w-6 text-neutral-400" />
                </div>
                
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary">
                    3. 투자자 참여
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    투자자들이 플랫폼을 통해 토큰 구매 및 거래
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <ChevronRight className="rotate-90 h-6 w-6 text-neutral-400" />
                </div>
                
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary">
                    4. 수익 분배
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    임대 수익 및 자산 가치 상승분을 스마트 계약을 통해 자동 분배
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {processType === 'timeline' ? renderTimelineChart() : renderDistributionChart()}
    </div>
  );
}