import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FinanceAnalysisCard from './FinanceAnalysisCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// 월별 현금 흐름 데이터
const monthlyData = [
  { name: '1월', 수입: 4000, 지출: 2400, 순현금흐름: 1600 },
  { name: '2월', 수입: 4500, 지출: 2100, 순현금흐름: 2400 },
  { name: '3월', 수입: 5000, 지출: 2500, 순현금흐름: 2500 },
  { name: '4월', 수입: 4700, 지출: 2700, 순현금흐름: 2000 },
  { name: '5월', 수입: 4300, 지출: 2200, 순현금흐름: 2100 },
  { name: '6월', 수입: 4800, 지출: 2400, 순현금흐름: 2400 },
];

// 자산 가치 변화 데이터
const assetValueData = [
  { year: '2020', propertyValue: 800, marketAverage: 700 },
  { year: '2021', propertyValue: 900, marketAverage: 750 },
  { year: '2022', propertyValue: 950, marketAverage: 780 },
  { year: '2023', propertyValue: 1050, marketAverage: 830 },
  { year: '2024', propertyValue: 1150, marketAverage: 850 },
  { year: '2025', propertyValue: 1300, marketAverage: 900 },
];

// 수익률 분석 데이터
const returnAnalysisData = {
  coc: 8.7,
  details: [
    { name: '임대수익', value: 65 },
    { name: '자본이득', value: 25 },
    { name: '세금혜택', value: 10 },
  ],
  COLORS: ['#0088FE', '#00C49F', '#FFBB28'],
};

export default function FinanceAnalysisSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            투자 금융 분석
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            SaharaRealTech의 고급 금융 분석 도구를 통해 투자의 수익성, 현금 흐름, 세금 효과, 포트폴리오 성과를 분석하실 수 있습니다. 
            분석해보세요. 전문가 수준의 부동산 금융 분석을 내려서 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FinanceAnalysisCard
            title="월별 현금 흐름"
            subtitle="투자 부동산 월별 수입과 지출 흐름"
            expandedByDefault={true}
            className="h-full"
          >
            <div className="text-center mb-2">
              <p className="text-sm text-gray-500">투자 부동산의 월별 수입/지출 현황</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="수입" fill="#8884d8" name="월 수입 (만원)" />
                <Bar dataKey="지출" fill="#82ca9d" name="월 지출 (만원)" />
                <Bar dataKey="순현금흐름" fill="#ffc658" name="순현금흐름 (만원)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h4 className="font-medium mb-2">분석 요약</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 평균 월 수입: 4,550만원</li>
                <li>• 평균 월 지출: 2,385만원</li>
                <li>• 평균 순현금흐름: 2,165만원</li>
                <li>• 현금 흐름 성장률: 연 8.5%</li>
              </ul>
            </div>
          </FinanceAnalysisCard>
          
          <FinanceAnalysisCard
            title="순현금흐름 트랜드"
            subtitle="시간에 따른 순현금흐름 추이"
            className="h-full"
          >
            <div className="data-is-loading">
              <p className="text-center text-red-500 text-sm">데이터를 불러올 수 없습니다.</p>
              <div className="flex justify-center mt-2">
                <button className="text-sm px-3 py-1 border rounded-md bg-gray-50">다시 시도</button>
              </div>
            </div>
          </FinanceAnalysisCard>

          <FinanceAnalysisCard
            title="자산 가치 분석"
            subtitle="투자 부동산의 시간에 따른 가치 변화"
            className="h-full"
          >
            <div className="text-center mb-2">
              <p className="text-sm text-gray-500">투자 부동산 가치 변화 (단위: 백만원)</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={assetValueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="propertyValue" stroke="#8884d8" name="부동산 가치" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="marketAverage" stroke="#82ca9d" name="시장 평균" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h4 className="font-medium mb-2">분석 요약</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 5년간 가치 상승률: 62.5%</li>
                <li>• 연평균 상승률: 10.2%</li>
                <li>• 시장 평균 대비: +8.5%</li>
                <li>• 예상 미래 가치(5년 후): 약 1,580백만원</li>
              </ul>
            </div>
          </FinanceAnalysisCard>
          
          <FinanceAnalysisCard
            title="수익률 분석"
            subtitle="현금 수익률(CoC) 및 수익 구성"
            className="h-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 mb-1">현금수익률(CoC)</p>
                <p className="text-3xl font-bold text-blue-600">{returnAnalysisData.coc}%</p>
                <p className="text-xs text-gray-500 mt-1">업계 평균: 5.3%</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2 text-center">수익 구성</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={returnAnalysisData.details}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {returnAnalysisData.details.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={returnAnalysisData.COLORS[index % returnAnalysisData.COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">분석 요약</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 투자금 회수 기간: 약 8.5년</li>
                <li>• 임대수익 비중: 65%</li>
                <li>• 세후 실질 수익률: 약 6.7%</li>
                <li>• 동일 지역 평균 대비: +3.4%</li>
              </ul>
            </div>
          </FinanceAnalysisCard>
        </div>
        
        <div className="mb-8 bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-blue-800">금융 상품 비교</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-3 px-4 text-left text-sm font-medium text-blue-800">투자 유형</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-blue-800">예상 수익률</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-blue-800">위험도</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-blue-800">유동성</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-blue-800">최소 투자금</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-blue-50">
                  <td className="py-3 px-4 text-sm font-medium">SaharaRealTech 부동산 토큰</td>
                  <td className="py-3 px-4 text-center text-sm">7-9%</td>
                  <td className="py-3 px-4 text-center text-sm">중간</td>
                  <td className="py-3 px-4 text-center text-sm">중간-높음</td>
                  <td className="py-3 px-4 text-center text-sm">100만원</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">예금</td>
                  <td className="py-3 px-4 text-center text-sm">2-3%</td>
                  <td className="py-3 px-4 text-center text-sm">매우 낮음</td>
                  <td className="py-3 px-4 text-center text-sm">높음</td>
                  <td className="py-3 px-4 text-center text-sm">제한 없음</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">주식</td>
                  <td className="py-3 px-4 text-center text-sm">5-15%</td>
                  <td className="py-3 px-4 text-center text-sm">높음</td>
                  <td className="py-3 px-4 text-center text-sm">높음</td>
                  <td className="py-3 px-4 text-center text-sm">제한 없음</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">부동산 직접 투자</td>
                  <td className="py-3 px-4 text-center text-sm">4-7%</td>
                  <td className="py-3 px-4 text-center text-sm">중간</td>
                  <td className="py-3 px-4 text-center text-sm">낮음</td>
                  <td className="py-3 px-4 text-center text-sm">수억원</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">REITs</td>
                  <td className="py-3 px-4 text-center text-sm">4-6%</td>
                  <td className="py-3 px-4 text-center text-sm">중간</td>
                  <td className="py-3 px-4 text-center text-sm">높음</td>
                  <td className="py-3 px-4 text-center text-sm">소액 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center">
          <div className="inline-flex mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-2 px-5 rounded-full hover:shadow-lg transition-all flex items-center">
              <span>상세 투자 금융 분석 받기</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}