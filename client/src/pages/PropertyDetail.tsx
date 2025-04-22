import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property, TokenizationStatus } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle,
  Building,
  MapPin,
  TrendingUp,
  BarChart3,
  Coins,
  Clock,
  Users,
  CreditCard,
  Shield,
  CheckCircle
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });
  
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
  
  // Get the status label and color based on tokenization status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case TokenizationStatus.IN_PROGRESS:
        return {
          label: t('property.tokenizationStatus.inProgress'),
          colorClass: 'bg-primary text-white'
        };
      case TokenizationStatus.COMPLETED:
        return {
          label: t('property.tokenizationStatus.completed'),
          colorClass: 'bg-secondary text-white'
        };
      case TokenizationStatus.UPCOMING:
        return {
          label: t('property.tokenizationStatus.upcoming'),
          colorClass: 'bg-accent text-black'
        };
      default:
        return {
          label: t('property.tokenizationStatus.unknown'),
          colorClass: 'bg-neutral-400 text-white'
        };
    }
  };
  
  // Handler for token count input
  const handleTokenCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    
    const count = parseInt(e.target.value) || 0;
    setTokenCount(count);
    setInvestmentAmount(count * parseFloat(property.tokenPrice as string));
  };
  
  // Handler for investment amount input
  const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    
    const amount = parseInt(e.target.value) || 0;
    setInvestmentAmount(amount);
    setTokenCount(Math.floor(amount / parseFloat(property.tokenPrice as string)));
  };
  
  // Simulated investment handler
  const handleInvest = () => {
    if (!property) return;
    
    // In a real app, this would call the API to create an investment
    console.log("Investing:", {
      propertyId: property.id,
      tokenCount,
      amount: investmentAmount
    });
    
    // Show a success message
    alert(t('propertyDetail.investmentSuccess'));
  };
  
  if (isLoading) {
    return (
      <div className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-72 w-full rounded-xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-6" />
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-60 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-full w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center text-red-500 mb-2">
                  <AlertCircle className="mr-2" />
                  <CardTitle>{t('errors.propertyNotFound')}</CardTitle>
                </div>
                <CardDescription>
                  {t('errors.propertyNotFoundDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => window.history.back()}>
                  {t('common.goBack')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  const statusInfo = getStatusInfo(property.tokenizationStatus);
  const propertyName = currentLang === 'ko' ? property.name : property.nameEn;
  const propertyAddress = currentLang === 'ko' ? property.address : property.addressEn;
  const propertyDescription = currentLang === 'ko' ? property.description : property.descriptionEn;

  return (
    <div className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="relative">
              <img 
                src={property.imageUrl} 
                alt={propertyName} 
                className="w-full h-72 object-cover"
              />
              <div className={`absolute top-4 left-4 ${statusInfo.colorClass} px-3 py-1 rounded-full text-sm font-medium`}>
                {statusInfo.label}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                <TrendingUp className="inline-block mr-2 h-4 w-4" />
                <span className="font-inter">{t('property.expectedReturn', { value: property.expectedReturn })}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-md mb-6">
                <h1 className="text-2xl font-bold mb-2">{propertyName}</h1>
                <div className="flex items-center text-neutral-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{propertyAddress}</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-neutral-500">{t('property.totalValue')}</span>
                    <div className="text-xl font-bold font-inter">
                      {formatCurrency(property.totalValue)}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-neutral-500">{t('property.tokenPrice')}</span>
                    <div className="text-xl font-bold font-inter">
                      {formatCurrency(property.tokenPrice)}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-neutral-500">{t('property.investorsCount')}</span>
                    <div className="text-xl font-bold font-inter">
                      {property.numInvestors}명
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t('property.tokenizationProgress')}</span>
                    <span className="font-inter font-medium">{property.tokenizationProgress}%</span>
                  </div>
                  <Progress 
                    value={parseFloat(property.tokenizationProgress as string)} 
                    className="h-2"
                  />
                </div>
                
                <Tabs defaultValue="details">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="details" className="flex-1">{t('propertyDetail.tabs.details')}</TabsTrigger>
                    <TabsTrigger value="investment" className="flex-1">{t('propertyDetail.tabs.investment')}</TabsTrigger>
                    <TabsTrigger value="blockchain" className="flex-1">{t('propertyDetail.tabs.blockchain')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <div className="space-y-4">
                      <p className="text-neutral-500">{propertyDescription}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start">
                          <Building className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{t('propertyDetail.propertyType')}</h4>
                            <p className="text-neutral-500 text-sm">{t(`propertyTypes.${property.type}`)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{t('propertyDetail.location')}</h4>
                            <p className="text-neutral-500 text-sm">{property.region}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="investment">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <BarChart3 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.expectedReturn')}</h4>
                          <p className="text-neutral-500 text-sm">
                            {t('propertyDetail.annualReturn', { value: property.expectedReturn })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Coins className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.minInvestment')}</h4>
                          <p className="text-neutral-500 text-sm">
                            {formatCurrency(property.minInvestment)} ({Math.ceil(Number(property.minInvestment) / Number(property.tokenPrice))} {t('propertyDetail.tokens')})
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.distribution')}</h4>
                          <p className="text-neutral-500 text-sm">{t('propertyDetail.quarterlyDividends')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.investorsCount')}</h4>
                          <p className="text-neutral-500 text-sm">{property.numInvestors} {t('propertyDetail.people')}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="blockchain">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.blockchain')}</h4>
                          <p className="text-neutral-500 text-sm">{t('propertyDetail.avalancheBlockchain')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CreditCard className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.smartContract')}</h4>
                          <p className="text-neutral-500 text-sm font-mono text-xs">0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{t('propertyDetail.verification')}</h4>
                          <p className="text-neutral-500 text-sm">{t('propertyDetail.verifiedBy')}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('propertyDetail.investmentCard.title')}</CardTitle>
                  <CardDescription>
                    {t('propertyDetail.investmentCard.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">
                        {t('propertyDetail.investmentCard.tokenCount')}
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          min="0"
                          value={tokenCount || ''}
                          onChange={handleTokenCountChange}
                          className="w-full p-3 border rounded-md"
                          disabled={property.tokenizationStatus !== TokenizationStatus.IN_PROGRESS}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-500 mb-1">
                        {t('propertyDetail.investmentCard.amount')}
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          min="0"
                          value={investmentAmount || ''}
                          onChange={handleInvestmentAmountChange}
                          className="w-full p-3 border rounded-md"
                          disabled={property.tokenizationStatus !== TokenizationStatus.IN_PROGRESS}
                        />
                        <span className="absolute right-3 top-3 text-neutral-500">₩</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-neutral-500">{t('propertyDetail.investmentCard.tokenPrice')}:</span>
                        <span className="font-medium">{formatCurrency(property.tokenPrice)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-neutral-500">{t('propertyDetail.investmentCard.expectedAnnualReturn')}:</span>
                        <span className="font-medium text-secondary">{property.expectedReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">{t('propertyDetail.investmentCard.estimatedYearlyIncome')}:</span>
                        <span className="font-medium">
                          {formatCurrency(investmentAmount * parseFloat(property.expectedReturn as string) / 100)}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      disabled={property.tokenizationStatus !== TokenizationStatus.IN_PROGRESS || 
                              investmentAmount < parseFloat(property.minInvestment as string) ||
                              tokenCount <= 0}
                      onClick={handleInvest}
                    >
                      {property.tokenizationStatus === TokenizationStatus.IN_PROGRESS 
                        ? t('propertyDetail.investmentCard.investButton') 
                        : property.tokenizationStatus === TokenizationStatus.COMPLETED
                          ? t('propertyDetail.investmentCard.soldOut')
                          : t('propertyDetail.investmentCard.comingSoon')
                      }
                    </Button>
                    
                    <p className="text-xs text-neutral-500 text-center">
                      {t('propertyDetail.investmentCard.disclaimer')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
