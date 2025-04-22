import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Property } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  DollarSign,
  BarChart2,
  Activity,
  PieChart as PieChartIcon,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyAnalyticsProps {
  property: Property;
}

export default function PropertyAnalytics({ property }: PropertyAnalyticsProps) {
  const { t } = useTranslation();
  const [cashflowPeriod, setCashflowPeriod] = useState("monthly");
  const [investmentScenario, setInvestmentScenario] = useState("base");
  const [chartType, setChartType] = useState("cashflow");

  // Fetch financial analytics data
  const { data: cashflowData, isLoading: isCashflowLoading } = useQuery({
    queryKey: ['/api/financial/cashflow', cashflowPeriod],
  });

  const { data: assetValueData, isLoading: isAssetValueLoading } = useQuery({
    queryKey: ['/api/financial/asset-value'],
  });

  const { data: incomeDistribution, isLoading: isIncomeLoading } = useQuery({
    queryKey: ['/api/financial/cashflow', 'distribution'],
  });

  // Risk analysis data
  const riskAnalysisData = [
    { risk: t('analytics.marketRisk'), value: 65 },
    { risk: t('analytics.liquidityRisk'), value: 35 },
    { risk: t('analytics.regulatoryRisk'), value: 45 },
    { risk: t('analytics.operationalRisk'), value: 30 },
    { risk: t('analytics.tenantRisk'), value: 40 }
  ];

  // Scenario analysis data - simulated based on property data
  const scenarioData = {
    pessimistic: {
      irr: (parseFloat(property.expectedReturn) * 0.5).toFixed(1),
      cashYield: (parseFloat(property.expectedReturn) * 0.6).toFixed(1),
      capGain: (parseFloat(property.expectedReturn) * 0.4).toFixed(1),
      totalReturn: (parseFloat(property.expectedReturn) * 0.7).toFixed(1),
    },
    base: {
      irr: parseFloat(property.expectedReturn).toFixed(1),
      cashYield: (parseFloat(property.expectedReturn) * 0.8).toFixed(1),
      capGain: (parseFloat(property.expectedReturn) * 0.6).toFixed(1),
      totalReturn: parseFloat(property.expectedReturn).toFixed(1),
    },
    optimistic: {
      irr: (parseFloat(property.expectedReturn) * 1.3).toFixed(1),
      cashYield: (parseFloat(property.expectedReturn) * 0.9).toFixed(1),
      capGain: (parseFloat(property.expectedReturn) * 1.1).toFixed(1),
      totalReturn: (parseFloat(property.expectedReturn) * 1.3).toFixed(1),
    }
  };

  // Sensitivity analysis data - simulated
  const sensitivityData = [
    {
      name: t('analytics.occupancyRate'),
      decrease: (parseFloat(property.expectedReturn) * 0.7).toFixed(1),
      base: parseFloat(property.expectedReturn).toFixed(1),
      increase: (parseFloat(property.expectedReturn) * 1.2).toFixed(1),
    },
    {
      name: t('analytics.rentalRate'),
      decrease: (parseFloat(property.expectedReturn) * 0.8).toFixed(1),
      base: parseFloat(property.expectedReturn).toFixed(1),
      increase: (parseFloat(property.expectedReturn) * 1.1).toFixed(1),
    },
    {
      name: t('analytics.operatingExpenses'),
      decrease: (parseFloat(property.expectedReturn) * 1.1).toFixed(1),
      base: parseFloat(property.expectedReturn).toFixed(1),
      increase: (parseFloat(property.expectedReturn) * 0.8).toFixed(1),
    },
    {
      name: t('analytics.propertyValue'),
      decrease: (parseFloat(property.expectedReturn) * 0.75).toFixed(1),
      base: parseFloat(property.expectedReturn).toFixed(1),
      increase: (parseFloat(property.expectedReturn) * 1.25).toFixed(1),
    },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Format currency for tooltip and display
  const formatCurrency = (value: number) => {
    return `₩ ${value.toLocaleString()}`;
  };

  // Format percentage for display
  const formatPercent = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                {t('analytics.financialPerformance')}
              </CardTitle>
              <CardDescription>{t('analytics.financialPerformanceDesc')}</CardDescription>
            </div>
            <Select
              value={chartType}
              onValueChange={setChartType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('analytics.selectChartType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashflow">{t('analytics.cashflowAnalysis')}</SelectItem>
                <SelectItem value="assetValue">{t('analytics.assetValueTrend')}</SelectItem>
                <SelectItem value="incomeDistribution">{t('analytics.incomeDistribution')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {chartType === "cashflow" && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">{t('analytics.cashflowAnalysis')}</h3>
                  <Select
                    value={cashflowPeriod}
                    onValueChange={setCashflowPeriod}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder={t('analytics.period')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">{t('analytics.monthly')}</SelectItem>
                      <SelectItem value="quarterly">{t('analytics.quarterly')}</SelectItem>
                      <SelectItem value="yearly">{t('analytics.yearly')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {isCashflowLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : cashflowData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cashflowData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          formatCurrency(Number(value)), 
                          name === "수입" ? t('analytics.income') : 
                          name === "지출" ? t('analytics.expense') : 
                          t('analytics.netCashflow')
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="수입"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />
                      <Area
                        type="monotone"
                        dataKey="지출"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#colorExpense)"
                      />
                      <Area
                        type="monotone"
                        dataKey="순현금흐름"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorNet)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>{t('analytics.noDataAvailable')}</span>
                  </div>
                )}
              </>
            )}

            {chartType === "assetValue" && (
              <>
                <h3 className="text-lg font-medium mb-4">{t('analytics.assetValueTrend')}</h3>
                {isAssetValueLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : assetValueData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={assetValueData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorProperty" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorToken" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          formatCurrency(Number(value)),
                          name === "propertyValue" ? t('analytics.propertyValue') : t('analytics.tokenValue')
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="propertyValue"
                        name="propertyValue"
                        stroke="#6366f1"
                        fillOpacity={1}
                        fill="url(#colorProperty)"
                      />
                      <Area
                        type="monotone"
                        dataKey="tokenValue"
                        name="tokenValue"
                        stroke="#0ea5e9"
                        fillOpacity={1}
                        fill="url(#colorToken)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>{t('analytics.noDataAvailable')}</span>
                  </div>
                )}
              </>
            )}

            {chartType === "incomeDistribution" && (
              <>
                <h3 className="text-lg font-medium mb-4">{t('analytics.incomeDistribution')}</h3>
                {isIncomeLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : incomeDistribution ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {incomeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                    <span>{t('analytics.noDataAvailable')}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            {t('analytics.investmentScenarios')}
          </CardTitle>
          <CardDescription>{t('analytics.investmentScenariosDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scenarios" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="scenarios">{t('analytics.scenarios')}</TabsTrigger>
              <TabsTrigger value="sensitivity">{t('analytics.sensitivityAnalysis')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scenarios">
              <div className="mb-4">
                <Select
                  value={investmentScenario}
                  onValueChange={setInvestmentScenario}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('analytics.selectScenario')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pessimistic">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-red-50 text-red-500 mr-2">
                          {t('analytics.pessimistic')}
                        </Badge>
                        <span>{t('analytics.pessimisticScenario')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="base">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-500 mr-2">
                          {t('analytics.base')}
                        </Badge>
                        <span>{t('analytics.baseScenario')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="optimistic">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-green-50 text-green-500 mr-2">
                          {t('analytics.optimistic')}
                        </Badge>
                        <span>{t('analytics.optimisticScenario')}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-500 mb-1">{t('analytics.irr')}</div>
                  <div className={`text-xl font-bold ${
                    investmentScenario === 'pessimistic' ? 'text-red-500' :
                    investmentScenario === 'optimistic' ? 'text-green-500' : 'text-blue-500'
                  }`}>
                    {scenarioData[investmentScenario as keyof typeof scenarioData].irr}%
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-500 mb-1">{t('analytics.cashYield')}</div>
                  <div className={`text-xl font-bold ${
                    investmentScenario === 'pessimistic' ? 'text-red-500' :
                    investmentScenario === 'optimistic' ? 'text-green-500' : 'text-blue-500'
                  }`}>
                    {scenarioData[investmentScenario as keyof typeof scenarioData].cashYield}%
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-500 mb-1">{t('analytics.capitalGain')}</div>
                  <div className={`text-xl font-bold ${
                    investmentScenario === 'pessimistic' ? 'text-red-500' :
                    investmentScenario === 'optimistic' ? 'text-green-500' : 'text-blue-500'
                  }`}>
                    {scenarioData[investmentScenario as keyof typeof scenarioData].capGain}%
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-500 mb-1">{t('analytics.totalReturn')}</div>
                  <div className={`text-xl font-bold ${
                    investmentScenario === 'pessimistic' ? 'text-red-500' :
                    investmentScenario === 'optimistic' ? 'text-green-500' : 'text-blue-500'
                  }`}>
                    {scenarioData[investmentScenario as keyof typeof scenarioData].totalReturn}%
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">{t('analytics.scenarioDescription')}</h4>
                <div className="bg-neutral-50 p-4 rounded-lg text-sm text-neutral-600">
                  {investmentScenario === 'pessimistic' && (
                    <p>{t('analytics.pessimisticScenarioDesc')}</p>
                  )}
                  {investmentScenario === 'base' && (
                    <p>{t('analytics.baseScenarioDesc')}</p>
                  )}
                  {investmentScenario === 'optimistic' && (
                    <p>{t('analytics.optimisticScenarioDesc')}</p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sensitivity">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sensitivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar 
                      dataKey="decrease" 
                      name={t('analytics.decrease10Percent')} 
                      fill="#ef4444" 
                    />
                    <Bar 
                      dataKey="base" 
                      name={t('analytics.baseCase')} 
                      fill="#3b82f6" 
                    />
                    <Bar 
                      dataKey="increase" 
                      name={t('analytics.increase10Percent')} 
                      fill="#10b981" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-neutral-500">
                <p>{t('analytics.sensitivityAnalysisDesc')}</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-primary" />
            {t('analytics.riskAnalysis')}
          </CardTitle>
          <CardDescription>{t('analytics.riskAnalysisDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskAnalysisData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="risk" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name={t('analytics.riskScore')}
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
                <Tooltip formatter={(value) => [`${value}/100`, t('analytics.riskScore')]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">{t('analytics.aggregateRiskScore')}</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">
                  {Math.round(riskAnalysisData.reduce((acc, item) => acc + item.value, 0) / riskAnalysisData.length)}
                </div>
                <div className="text-sm text-neutral-500">/100</div>
              </div>
            </div>
            <div className="md:col-span-2 bg-neutral-50 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">{t('analytics.riskAssessment')}</h4>
              <p className="text-sm text-neutral-600">{t('analytics.riskAssessmentDesc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}