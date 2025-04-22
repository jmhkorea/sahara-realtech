import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts';

interface CashFlowAnalysisProps {
  chartType: 'monthly' | 'trend' | 'composition';
}

// 월별 현금 흐름 데이터 (샘플)
const monthlyCashFlowData = [
  { month: '1월', 임대수입: 8500000, 관리비: -1200000, 세금: -800000, 모기지: -3500000, 기타: -300000 },
  { month: '2월', 임대수입: 8500000, 관리비: -1250000, 세금: -800000, 모기지: -3500000, 기타: -250000 },
  { month: '3월', 임대수입: 8500000, 관리비: -1300000, 세금: -800000, 모기지: -3500000, 기타: -280000 },
  { month: '4월', 임대수입: 8700000, 관리비: -1320000, 세금: -820000, 모기지: -3500000, 기타: -300000 },
  { month: '5월', 임대수입: 8700000, 관리비: -1280000, 세금: -820000, 모기지: -3500000, 기타: -320000 },
  { month: '6월', 임대수입: 8800000, 관리비: -1350000, 세금: -830000, 모기지: -3500000, 기타: -290000 },
];

// 순현금흐름 트렌드 데이터 (샘플)
const netCashFlowTrendData = [
  { year: '2020', 순현금흐름: 28000000, 순수익률: 5.2 },
  { year: '2021', 순현금흐름: 30500000, 순수익률: 5.6 },
  { year: '2022', 순현금흐름: 33200000, 순수익률: 6.1 },
  { year: '2023', 순현금흐름: 36500000, 순수익률: 6.7 },
  { year: '2024', 순현금흐름: 39800000, 순수익률: 7.3 },
  { year: '2025 (예상)', 순현금흐름: 43000000, 순수익률: 7.9 },
];

// 현금 흐름 구성 요소 데이터 (샘플)
const cashFlowCompositionData = {
  income: [
    { name: '주 임대료', value: 92000000 },
    { name: '부대 시설', value: 12000000 },
    { name: '주차장', value: 8500000 },
    { name: '기타 수입', value: 3200000 },
  ],
  expense: [
    { name: '모기지 상환', value: 42000000 },
    { name: '재산세', value: 9600000 },
    { name: '관리비', value: 15600000 },
    { name: '유지보수', value: 5800000 },
    { name: '보험', value: 3200000 },
    { name: '공실 대비금', value: 4800000 },
    { name: '기타 지출', value: 3500000 },
  ]
};

// 계산된 순 현금 흐름
const netCashFlow = cashFlowCompositionData.income.reduce((sum, item) => sum + item.value, 0) - 
                   cashFlowCompositionData.expense.reduce((sum, item) => sum + item.value, 0);

const COLORS_INCOME = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS_EXPENSE = ['#FF6B6B', '#F53B77', '#C23184', '#7F4494', '#4D5198', '#26599F', '#0E66A4'];

// 월별 순현금흐름 계산
const monthlyNetCashFlow = monthlyCashFlowData.map(item => {
  const netFlow = item.임대수입 + item.관리비 + item.세금 + item.모기지 + item.기타;
  return {
    month: item.month,
    순현금흐름: netFlow
  };
});

export default function CashFlowAnalysis({ chartType }: CashFlowAnalysisProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderMonthlyChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={monthlyCashFlowData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatCurrency(value).replace('₩', '')} />
          <Tooltip 
            formatter={(value) => [formatCurrency(Number(value)), '']}
            itemSorter={(item) => {
              const order = { "임대수입": 1, "관리비": 2, "세금": 3, "모기지": 4, "기타": 5 };
              return order[item.dataKey as keyof typeof order] || 999;
            }}
          />
          <Legend />
          <Bar dataKey="임대수입" fill="#4CAF50" name="임대 수입" />
          <Bar dataKey="관리비" fill="#FF9800" stackId="expenses" name="관리비" />
          <Bar dataKey="세금" fill="#F44336" stackId="expenses" name="세금" />
          <Bar dataKey="모기지" fill="#9C27B0" stackId="expenses" name="모기지" />
          <Bar dataKey="기타" fill="#607D8B" stackId="expenses" name="기타 지출" />
          <Line 
            type="monotone" 
            data={monthlyNetCashFlow} 
            dataKey="순현금흐름" 
            stroke="#2196F3" 
            strokeWidth={2} 
            name="순현금흐름"
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderTrendChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={netCashFlowTrendData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis 
            yAxisId="left"
            tickFormatter={(value) => formatCurrency(value).replace('₩', '')}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={[0, 10]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === '순현금흐름') {
                return [formatCurrency(Number(value)), name];
              }
              return [`${value}%`, name];
            }}
          />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="순현금흐름" 
            fill="#4CAF50" 
            name="순현금흐름"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="순수익률" 
            stroke="#FF9800" 
            name="순수익률 (%)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderCompositionChart = () => {
    const totalIncome = cashFlowCompositionData.income.reduce((sum, item) => sum + item.value, 0);
    const totalExpense = cashFlowCompositionData.expense.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-2 text-center">수입 구성 요소</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cashFlowCompositionData.income}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cashFlowCompositionData.income.map((entry, index) => (
                    <Cell key={`cell-income-${index}`} fill={COLORS_INCOME[index % COLORS_INCOME.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), '금액']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-neutral-600">총 수입: {formatCurrency(totalIncome)}</p>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-2 text-center">지출 구성 요소</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cashFlowCompositionData.expense}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cashFlowCompositionData.expense.map((entry, index) => (
                    <Cell key={`cell-expense-${index}`} fill={COLORS_EXPENSE[index % COLORS_EXPENSE.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), '금액']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-neutral-600">총 지출: {formatCurrency(totalExpense)}</p>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-neutral-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">연간 요약</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">총 수입</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">총 지출</p>
              <p className="text-xl font-bold text-red-500">{formatCurrency(totalExpense)}</p>
            </div>
            <div className="bg-white border rounded-lg p-3">
              <p className="text-sm text-neutral-600">순 현금 흐름</p>
              <p className={`text-xl font-bold ${netCashFlow > 0 ? 'text-primary' : 'text-red-500'}`}>
                {formatCurrency(netCashFlow)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (chartType) {
    case 'monthly':
      return renderMonthlyChart();
    case 'trend':
      return renderTrendChart();
    case 'composition':
      return renderCompositionChart();
    default:
      return <div>Chart type not supported</div>;
  }
}