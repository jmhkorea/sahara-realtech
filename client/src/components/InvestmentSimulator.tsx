import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Property } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  RefreshCw,
  TrendingUp,
  CreditCard,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface InvestmentSimulatorProps {
  property: Property;
}

export default function InvestmentSimulator({ property }: InvestmentSimulatorProps) {
  const { t } = useTranslation();
  const [initialInvestment, setInitialInvestment] = useState(Number(property.minInvestment));
  const [investmentPeriod, setInvestmentPeriod] = useState(5); // 5 years
  const [expectedReturn, setExpectedReturn] = useState(Number(property.expectedReturn));
  const [reinvestDividends, setReinvestDividends] = useState(false);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [totalReturn, setTotalReturn] = useState(0);
  const [annualizedReturn, setAnnualizedReturn] = useState(0);

  // Calculate projected returns when inputs change
  useEffect(() => {
    calculateProjection();
  }, [initialInvestment, investmentPeriod, expectedReturn, reinvestDividends]);

  // Calculate investment projection
  const calculateProjection = () => {
    const data = [];
    let currentValue = initialInvestment;
    let totalValue = initialInvestment;
    
    for (let year = 0; year <= investmentPeriod; year++) {
      // Initial investment year
      if (year === 0) {
        data.push({
          year: `${t('simulator.year')} 0`,
          value: initialInvestment,
          capital: initialInvestment,
          income: 0,
        });
        continue;
      }
      
      // Calculate annual return
      const annualReturn = currentValue * (expectedReturn / 100);
      
      // If reinvesting dividends
      if (reinvestDividends) {
        currentValue += annualReturn;
        data.push({
          year: `${t('simulator.year')} ${year}`,
          value: currentValue,
          capital: initialInvestment,
          income: currentValue - initialInvestment,
        });
      } 
      // If not reinvesting (taking dividends as cash)
      else {
        totalValue += annualReturn;
        data.push({
          year: `${t('simulator.year')} ${year}`,
          value: totalValue,
          capital: initialInvestment,
          income: totalValue - initialInvestment,
        });
      }
    }
    
    setProjectionData(data);
    
    // Calculate total and annualized returns
    const finalValue = data[data.length - 1].value;
    const totalReturnPct = ((finalValue - initialInvestment) / initialInvestment) * 100;
    const annualizedReturnPct = Math.pow((1 + totalReturnPct / 100), 1 / investmentPeriod) - 1;
    
    setTotalReturn(totalReturnPct);
    setAnnualizedReturn(annualizedReturnPct * 100);
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Reset simulation to defaults
  const resetSimulation = () => {
    setInitialInvestment(Number(property.minInvestment));
    setInvestmentPeriod(5);
    setExpectedReturn(Number(property.expectedReturn));
    setReinvestDividends(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-primary" />
          {t('simulator.title')}
        </CardTitle>
        <CardDescription>{t('simulator.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('simulator.initialInvestment')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="number"
                  min={Number(property.minInvestment)}
                  step={Number(property.tokenPrice)}
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="pl-10"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {t('simulator.minInvestment')}: {formatCurrency(Number(property.minInvestment))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('simulator.investmentPeriod')}: {investmentPeriod} {t('simulator.years')}
              </label>
              <Slider
                value={[investmentPeriod]}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setInvestmentPeriod(value[0])}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('simulator.expectedReturn')}: {expectedReturn.toFixed(1)}%
              </label>
              <Slider
                value={[expectedReturn]}
                min={1}
                max={20}
                step={0.1}
                onValueChange={(value) => setExpectedReturn(value[0])}
              />
              <div className="text-xs text-gray-500 mt-1">
                {t('simulator.baseOnPropertyReturn')}: {property.expectedReturn}%
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reinvest"
                checked={reinvestDividends}
                onChange={(e) => setReinvestDividends(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="reinvest" className="text-sm font-medium text-gray-700">
                {t('simulator.reinvestDividends')}
              </label>
            </div>
            
            <Button 
              variant="outline" 
              onClick={resetSimulation}
              className="flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('simulator.reset')}
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">{t('simulator.totalReturn')}</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{totalReturn.toFixed(1)}%</span>
                  <ArrowUp className="h-4 w-4 text-green-500 ml-1" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatCurrency(initialInvestment * (1 + totalReturn / 100))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">{t('simulator.annualizedReturn')}</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{annualizedReturn.toFixed(1)}%</span>
                  <ArrowUp className="h-4 w-4 text-green-500 ml-1" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {t('simulator.annualAverage')}
                </div>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), '']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name={t('simulator.projectedValue')}
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="capital"
                    name={t('simulator.initialCapital')}
                    stroke="#9ca3af"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-700 mb-1">{t('simulator.disclaimer')}</div>
          <p className="text-xs text-blue-600">
            {t('simulator.disclaimerText')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}