import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Property, Investment, Transaction } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Wallet,
  Building,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  Clock,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  PieChart,
  BarChart3,
} from "lucide-react";
import { PieChart as RechartPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Temporary mock user ID until authentication is implemented
const MOCK_USER_ID = 1;

export default function Portfolio() {
  const { t } = useTranslation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Fetch user's investments
  const { data: investments, isLoading: investmentsLoading } = useQuery<Investment[]>({
    queryKey: [`/api/users/${MOCK_USER_ID}/investments`],
    enabled: isWalletConnected,
  });

  // Fetch user's transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: [`/api/users/${MOCK_USER_ID}/transactions`],
    enabled: isWalletConnected,
  });

  // Fetch all properties to cross-reference with investments
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
    enabled: isWalletConnected,
  });

  // Handler for wallet connection
  const connectWallet = () => {
    setIsWalletConnected(true);
  };

  // Format currency with Korean Won symbol
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Format based on the size of the number
    if (numValue >= 100000000) { // If over 1억
      return `₩ ${(numValue / 100000000).toFixed(0)}억`;
    } else if (numValue >= 10000) { // If over 1만
      return `₩ ${(numValue / 10000).toFixed(0)}만`;
    }
    
    return `₩ ${numValue.toLocaleString()}`;
  };

  // Calculate portfolio stats
  const calculatePortfolioStats = () => {
    if (!investments || !properties) return null;

    let totalInvested = 0;
    let totalTokens = 0;
    let expectedAnnualReturn = 0;

    const investmentsByProperty: Record<number, { 
      amount: number; 
      tokens: number; 
      propertyName: string;
      expectedReturn: number;
      tokenPrice: number;
    }> = {};

    investments.forEach(investment => {
      const property = properties.find(p => p.id === investment.propertyId);
      if (!property) return;

      const investmentAmount = Number(investment.amount);
      const tokenCount = Number(investment.tokenCount);
      
      totalInvested += investmentAmount;
      totalTokens += tokenCount;
      
      // Calculate expected return based on property's rate
      const returnAmount = investmentAmount * (Number(property.expectedReturn) / 100);
      expectedAnnualReturn += returnAmount;

      // Group by property
      if (investmentsByProperty[property.id]) {
        investmentsByProperty[property.id].amount += investmentAmount;
        investmentsByProperty[property.id].tokens += tokenCount;
      } else {
        investmentsByProperty[property.id] = {
          amount: investmentAmount,
          tokens: tokenCount,
          propertyName: property.name,
          expectedReturn: Number(property.expectedReturn),
          tokenPrice: Number(property.tokenPrice)
        };
      }
    });

    // Create data for pie chart
    const portfolioDistribution = Object.entries(investmentsByProperty).map(([propId, data]) => ({
      name: data.propertyName,
      value: data.amount,
      tokens: data.tokens,
      expectedReturn: data.expectedReturn
    }));

    // Create data for bar chart - monthly returns (estimated)
    const monthlyReturns = [
      { name: '1월', return: expectedAnnualReturn / 12 },
      { name: '2월', return: expectedAnnualReturn / 12 },
      { name: '3월', return: expectedAnnualReturn / 12 },
      { name: '4월', return: expectedAnnualReturn / 12 },
      { name: '5월', return: expectedAnnualReturn / 12 },
      { name: '6월', return: expectedAnnualReturn / 12 },
      { name: '7월', return: expectedAnnualReturn / 12 },
      { name: '8월', return: expectedAnnualReturn / 12 },
      { name: '9월', return: expectedAnnualReturn / 12 },
      { name: '10월', return: expectedAnnualReturn / 12 },
      { name: '11월', return: expectedAnnualReturn / 12 },
      { name: '12월', return: expectedAnnualReturn / 12 }
    ];

    return {
      totalInvested,
      totalTokens,
      expectedAnnualReturn,
      averageExpectedReturn: totalInvested > 0 ? (expectedAnnualReturn / totalInvested) * 100 : 0,
      portfolioDistribution,
      investmentsByProperty,
      monthlyReturns
    };
  };

  const portfolioStats = calculatePortfolioStats();

  // Colors for the pie chart
  const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  // Render loading state
  if (isWalletConnected && (investmentsLoading || transactionsLoading || propertiesLoading)) {
    return (
      <div className="bg-neutral-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t('portfolio.title')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-96 w-full rounded-xl mb-8" />
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // If wallet is not connected, show connection prompt
  if (!isWalletConnected) {
    return (
      <div className="bg-neutral-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">{t('portfolio.connectWallet.title')}</h1>
            <p className="text-neutral-500 text-center mb-8">
              {t('portfolio.connectWallet.description')}
            </p>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center py-8">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Wallet className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{t('portfolio.connectWallet.cardTitle')}</h2>
                  <p className="text-neutral-500 mb-6 max-w-md">
                    {t('portfolio.connectWallet.cardDescription')}
                  </p>
                  <Button size="lg" onClick={connectWallet}>
                    {t('portfolio.connectWallet.button')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5 text-primary" />
                    {t('portfolio.connectWallet.benefits.track.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-500">
                    {t('portfolio.connectWallet.benefits.track.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    {t('portfolio.connectWallet.benefits.returns.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-500">
                    {t('portfolio.connectWallet.benefits.returns.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t('portfolio.title')}</h1>
          <p className="text-neutral-500 mb-8">{t('portfolio.subtitle')}</p>

          {/* Portfolio Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{t('portfolio.stats.totalInvested')}</p>
                    <h3 className="text-2xl font-bold font-inter">
                      {portfolioStats ? formatCurrency(portfolioStats.totalInvested) : '₩ 0'}
                    </h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center text-xs text-secondary mt-2">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{t('portfolio.stats.activeInvestments', { count: investments?.length || 0 })}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{t('portfolio.stats.expectedAnnualReturn')}</p>
                    <h3 className="text-2xl font-bold font-inter">
                      {portfolioStats ? formatCurrency(portfolioStats.expectedAnnualReturn) : '₩ 0'}
                    </h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center text-xs text-secondary mt-2">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>
                    {portfolioStats 
                      ? t('portfolio.stats.returnRate', { value: portfolioStats.averageExpectedReturn.toFixed(2) }) 
                      : '0.00%'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{t('portfolio.stats.totalTokens')}</p>
                    <h3 className="text-2xl font-bold font-inter">
                      {portfolioStats ? portfolioStats.totalTokens : '0'}
                    </h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center text-xs text-neutral-500 mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{t('portfolio.stats.lastUpdated')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Analysis */}
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">{t('portfolio.tabs.overview')}</TabsTrigger>
              <TabsTrigger value="investments">{t('portfolio.tabs.investments')}</TabsTrigger>
              <TabsTrigger value="transactions">{t('portfolio.tabs.transactions')}</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="col-span-full md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5 text-primary" />
                      {t('portfolio.overview.distribution.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('portfolio.overview.distribution.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {portfolioStats && portfolioStats.portfolioDistribution.length > 0 ? (
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartPieChart>
                            <Pie
                              data={portfolioStats.portfolioDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {portfolioStats.portfolioDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Legend />
                          </RechartPieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <AlertTriangle className="h-12 w-12 text-neutral-300 mb-4" />
                        <p className="text-neutral-500">{t('portfolio.overview.noInvestments')}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="col-span-full md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                      {t('portfolio.overview.returns.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('portfolio.overview.returns.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {portfolioStats && portfolioStats.monthlyReturns.length > 0 ? (
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={portfolioStats.monthlyReturns}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `₩${value / 10000}만`} />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Bar dataKey="return" fill="hsl(var(--primary))" name={t('portfolio.overview.returns.monthlyReturn')} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <AlertTriangle className="h-12 w-12 text-neutral-300 mb-4" />
                        <p className="text-neutral-500">{t('portfolio.overview.noReturns')}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t('portfolio.overview.summary.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolioStats && Object.keys(portfolioStats.investmentsByProperty).length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(portfolioStats.investmentsByProperty).map(([propId, data]) => (
                        <div key={propId} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{data.propertyName}</h4>
                            <span className="text-sm font-inter font-medium">
                              {formatCurrency(data.amount)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-neutral-500">{t('portfolio.overview.summary.tokens')}:</span>
                              <span className="font-inter">{data.tokens}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">{t('portfolio.overview.summary.tokenPrice')}:</span>
                              <span className="font-inter">{formatCurrency(data.tokenPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">{t('portfolio.overview.summary.expectedReturn')}:</span>
                              <span className="font-inter text-secondary">{data.expectedReturn}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">{t('portfolio.overview.summary.annualIncome')}:</span>
                              <span className="font-inter">
                                {formatCurrency(data.amount * (data.expectedReturn / 100))}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">{t('portfolio.overview.noInvestments')}</p>
                      <Button variant="outline" className="mt-4">
                        <Building className="mr-2 h-4 w-4" />
                        {t('portfolio.overview.exploreProperties')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Investments Tab */}
            <TabsContent value="investments">
              <Card>
                <CardHeader>
                  <CardTitle>{t('portfolio.investments.title')}</CardTitle>
                  <CardDescription>{t('portfolio.investments.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  {investments && investments.length > 0 ? (
                    <div className="space-y-6">
                      {investments.map((investment) => {
                        const property = properties?.find(p => p.id === investment.propertyId);
                        if (!property) return null;

                        return (
                          <div key={investment.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <div className="bg-neutral-100 w-12 h-12 rounded-lg mr-4 overflow-hidden">
                                  <img 
                                    src={property.imageUrl} 
                                    alt={property.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{property.name}</h4>
                                  <p className="text-sm text-neutral-500">{property.address}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium font-inter">{formatCurrency(investment.amount)}</div>
                                <div className="text-sm text-neutral-500">
                                  {investment.tokenCount} {t('portfolio.investments.tokens')}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div className="bg-neutral-100 p-3 rounded-lg">
                                <div className="text-sm text-neutral-500">{t('portfolio.investments.tokenPrice')}</div>
                                <div className="font-medium font-inter">{formatCurrency(property.tokenPrice)}</div>
                              </div>
                              <div className="bg-neutral-100 p-3 rounded-lg">
                                <div className="text-sm text-neutral-500">{t('portfolio.investments.expectedReturn')}</div>
                                <div className="font-medium font-inter">{property.expectedReturn}%</div>
                              </div>
                              <div className="bg-neutral-100 p-3 rounded-lg">
                                <div className="text-sm text-neutral-500">{t('portfolio.investments.investmentDate')}</div>
                                <div className="font-medium font-inter">
                                  {new Date(investment.timestamp).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="bg-neutral-100 p-3 rounded-lg">
                                <div className="text-sm text-neutral-500">{t('portfolio.investments.currentStatus')}</div>
                                <div className="font-medium text-secondary flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {t('portfolio.investments.active')}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{t('portfolio.investments.tokenizationProgress')}</span>
                                <span className="font-inter font-medium">{property.tokenizationProgress}%</span>
                              </div>
                              <Progress value={parseFloat(property.tokenizationProgress as string)} className="h-2" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">{t('portfolio.investments.noInvestments')}</h3>
                      <p className="text-neutral-500 mb-6">{t('portfolio.investments.startInvesting')}</p>
                      <Button>
                        {t('portfolio.investments.exploreProperties')}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>{t('portfolio.transactions.title')}</CardTitle>
                  <CardDescription>{t('portfolio.transactions.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  {transactions && transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((transaction) => {
                        const property = properties?.find(p => p.id === transaction.propertyId);
                        if (!property) return null;

                        // Determine transaction icon and class based on type
                        let IconComponent;
                        let iconClass;
                        let typeLabel;
                        
                        switch (transaction.transactionType) {
                          case 'buy':
                            IconComponent = ArrowUpRight;
                            iconClass = 'bg-green-500/20 text-green-400';
                            typeLabel = t('portfolio.transactions.types.buy');
                            break;
                          case 'sell':
                            IconComponent = ArrowDownRight;
                            iconClass = 'bg-red-500/20 text-red-400';
                            typeLabel = t('portfolio.transactions.types.sell');
                            break;
                          case 'dividend':
                            IconComponent = RefreshCcw;
                            iconClass = 'bg-purple-500/20 text-purple-400';
                            typeLabel = t('portfolio.transactions.types.dividend');
                            break;
                          default:
                            IconComponent = RefreshCcw;
                            iconClass = 'bg-neutral-500/20 text-neutral-400';
                            typeLabel = t('portfolio.transactions.types.unknown');
                        }

                        return (
                          <div key={transaction.id} className="bg-neutral-50 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`${iconClass} w-10 h-10 rounded-full flex items-center justify-center mr-3`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-medium">{property.name}</div>
                                <div className="text-sm text-neutral-500 flex items-center">
                                  <span>{typeLabel}</span>
                                  {transaction.transactionHash && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <span className="font-inter">{transaction.transactionHash}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium font-inter">
                                {transaction.transactionType === 'sell' ? '-' : '+'}{formatCurrency(transaction.amount)}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {new Date(transaction.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">{t('portfolio.transactions.noTransactions')}</h3>
                      <p className="text-neutral-500">{t('portfolio.transactions.transactionsAppear')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
