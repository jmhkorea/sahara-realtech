import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Property } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
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
  Area
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
  Globe,
  TrendingUp,
  Building,
  Map,
  Landmark,
  Home,
  AlertCircle
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface MarketAnalysisProps {
  property: Property;
}

export default function MarketAnalysis({ property }: MarketAnalysisProps) {
  const { t } = useTranslation();
  const [marketType, setMarketType] = useState("price");
  
  // Fetch market indicators data
  const { data: marketData, isLoading: isMarketLoading } = useQuery({
    queryKey: ['/api/financial/market-indicators'],
  });

  // Location score data (simulated)
  const locationScores = {
    accessibility: 85, // 교통 접근성
    environment: 78,   // 주변 환경
    infrastructure: 92, // 인프라
    growth: 88,        // 성장 가능성
    safety: 90         // 안전성
  };

  // Comparable properties data (simulated)
  const comparableProperties = [
    {
      name: "유사 부동산 A",
      price: Number(property.totalValue) * 0.95,
      return: Number(property.expectedReturn) - 0.8,
      risk: "중간",
      type: property.type
    },
    {
      name: "유사 부동산 B",
      price: Number(property.totalValue) * 1.05,
      return: Number(property.expectedReturn) - 0.2,
      risk: "중간",
      type: property.type
    },
    {
      name: "유사 부동산 C",
      price: Number(property.totalValue) * 0.92,
      return: Number(property.expectedReturn) - 1.2,
      risk: "낮음",
      type: property.type
    },
    {
      name: property.name,
      price: Number(property.totalValue),
      return: Number(property.expectedReturn),
      risk: "중간",
      type: property.type,
      current: true
    }
  ];

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage for display
  const formatPercent = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            {t('marketAnalysis.marketTrends')}
          </CardTitle>
          <CardDescription>{t('marketAnalysis.marketTrendsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select
              value={marketType}
              onValueChange={setMarketType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('marketAnalysis.selectMarketTrend')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">{t('marketAnalysis.priceIndex')}</SelectItem>
                <SelectItem value="transactions">{t('marketAnalysis.transactionVolume')}</SelectItem>
                <SelectItem value="comparison">{t('marketAnalysis.marketComparison')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-80">
            {isMarketLoading ? (
              <Skeleton className="h-full w-full" />
            ) : marketData ? (
              <ResponsiveContainer width="100%" height="100%">
                {marketType === "price" && (
                  <LineChart
                    data={marketData.priceIndices}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, '']} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="residentialIndex"
                      name={t('marketAnalysis.residential')}
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="commercialIndex"
                      name={t('marketAnalysis.commercial')}
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="regionalIndex"
                      name={`${property.region} ${t('marketAnalysis.index')}`}
                      stroke="#f59e0b"
                      strokeWidth={3}
                    />
                  </LineChart>
                )}

                {marketType === "transactions" && (
                  <BarChart
                    data={marketData.transactionVolume}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, '']} />
                    <Legend />
                    <Bar
                      dataKey="totalTransactions"
                      name={t('marketAnalysis.totalTransactions')}
                      fill="#3b82f6"
                    />
                    <Bar
                      dataKey="similarPropertyTransactions"
                      name={t('marketAnalysis.similarProperties')}
                      fill="#10b981"
                    />
                  </BarChart>
                )}

                {marketType === "comparison" && (
                  <ComposedChart
                    data={marketData.marketComparison}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="stockMarket"
                      name={t('marketAnalysis.stockMarket')}
                      fill="#3b82f6"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="bondMarket"
                      name={t('marketAnalysis.bondMarket')}
                      fill="#f59e0b"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="realEstate"
                      name={t('marketAnalysis.realEstate')}
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="propertyType"
                      name={t('marketAnalysis.propertyTypeReturn')}
                      fill="#d1fae5"
                      stroke="#059669"
                    />
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
                <span>{t('marketAnalysis.noDataAvailable')}</span>
              </div>
            )}
          </div>

          <div className="mt-4 bg-neutral-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">{t('marketAnalysis.marketInsights')}</h4>
            <p className="text-sm text-neutral-600">{t('marketAnalysis.marketInsightsDesc')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="h-5 w-5 mr-2 text-primary" />
            {t('marketAnalysis.locationAnalysis')}
          </CardTitle>
          <CardDescription>{t('marketAnalysis.locationAnalysisDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('marketAnalysis.locationScores')}</h3>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('marketAnalysis.accessibility')}</span>
                  <span>{locationScores.accessibility}/100</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${locationScores.accessibility}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('marketAnalysis.environment')}</span>
                  <span>{locationScores.environment}/100</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${locationScores.environment}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('marketAnalysis.infrastructure')}</span>
                  <span>{locationScores.infrastructure}/100</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${locationScores.infrastructure}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('marketAnalysis.growth')}</span>
                  <span>{locationScores.growth}/100</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${locationScores.growth}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('marketAnalysis.safety')}</span>
                  <span>{locationScores.safety}/100</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${locationScores.safety}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">{t('marketAnalysis.overallScore')}</h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary mr-2">
                    {Math.round(
                      (locationScores.accessibility +
                        locationScores.environment +
                        locationScores.infrastructure +
                        locationScores.growth +
                        locationScores.safety) / 5
                    )}
                  </span>
                  <span className="text-neutral-500">/100</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t('marketAnalysis.nearbyFacilities')}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start bg-neutral-50 p-3 rounded-lg">
                  <Building className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{t('marketAnalysis.shoppingMalls')}</h4>
                    <p className="text-xs text-neutral-500">500m - 1.5km</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-neutral-50 p-3 rounded-lg">
                  <Landmark className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{t('marketAnalysis.publicTransport')}</h4>
                    <p className="text-xs text-neutral-500">200m - 800m</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-neutral-50 p-3 rounded-lg">
                  <Home className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{t('marketAnalysis.schools')}</h4>
                    <p className="text-xs text-neutral-500">1km - 2km</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-neutral-50 p-3 rounded-lg">
                  <Map className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{t('marketAnalysis.parks')}</h4>
                    <p className="text-xs text-neutral-500">500m - 1km</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">{t('marketAnalysis.developmentPlans')}</h4>
                <div className="text-sm text-neutral-600">
                  <p className="mb-2">{t('marketAnalysis.developmentPlansDesc')}</p>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>{t('marketAnalysis.planItem1')}</li>
                    <li>{t('marketAnalysis.planItem2')}</li>
                    <li>{t('marketAnalysis.planItem3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-primary" />
            {t('marketAnalysis.comparableProperties')}
          </CardTitle>
          <CardDescription>{t('marketAnalysis.comparablePropertiesDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-neutral-500">{t('marketAnalysis.property')}</th>
                  <th className="pb-2 text-left font-medium text-neutral-500">{t('marketAnalysis.type')}</th>
                  <th className="pb-2 text-left font-medium text-neutral-500">{t('marketAnalysis.price')}</th>
                  <th className="pb-2 text-left font-medium text-neutral-500">{t('marketAnalysis.expectedReturn')}</th>
                  <th className="pb-2 text-left font-medium text-neutral-500">{t('marketAnalysis.riskLevel')}</th>
                </tr>
              </thead>
              <tbody>
                {comparableProperties.map((prop, index) => (
                  <tr 
                    key={index} 
                    className={`border-b ${prop.current ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-3">
                      <div className="flex items-center">
                        {prop.current && (
                          <Badge className="mr-2 bg-blue-500">{t('marketAnalysis.current')}</Badge>
                        )}
                        <span>{prop.name}</span>
                      </div>
                    </td>
                    <td className="py-3">{t(`propertyTypes.${prop.type}`)}</td>
                    <td className="py-3">{formatCurrency(prop.price)}</td>
                    <td className="py-3">{prop.return}%</td>
                    <td className="py-3">
                      <Badge 
                        variant="outline" 
                        className={
                          prop.risk === "낮음" ? "bg-green-50 text-green-600" :
                          prop.risk === "중간" ? "bg-amber-50 text-amber-600" :
                          "bg-red-50 text-red-600"
                        }
                      >
                        {prop.risk}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-neutral-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">{t('marketAnalysis.comparativeAnalysis')}</h4>
            <p className="text-sm text-neutral-600">{t('marketAnalysis.comparativeAnalysisDesc')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}