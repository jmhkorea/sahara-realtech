import { useState } from "react";
import { useParams } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Property, PropertyType, TokenizationStatus } from "@shared/schema";
import TokenPurchaseModal from "@/components/TokenPurchaseModal";
import InvestmentCard from "@/components/InvestmentCard";
import PropertyAnalytics from "@/components/PropertyAnalytics";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import MarketAnalysis from "@/components/MarketAnalysis";
import CashFlowAnalysis from "@/components/financials/CashFlowAnalysis";
import ReturnAnalysis from "@/components/financials/ReturnAnalysis";
import AssetValueAnalysis from "@/components/financials/AssetValueAnalysis";
import SEO from "@/components/SEO";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  CheckCircle,
  Palmtree,
  ChartLine,
  Calculator,
  BarChart2,
  Hotel,
  Calendar,
  Sparkles,
  Trophy,
  Wallet
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const [membershipTier, setMembershipTier] = useState("standard");
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  
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
    setInvestmentAmount(count * parseFloat(property.tokenPrice));
  };
  
  // Handler for investment amount input
  const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    
    const amount = parseInt(e.target.value) || 0;
    setInvestmentAmount(amount);
    setTokenCount(Math.floor(amount / parseFloat(property.tokenPrice)));
  };
  
  // Handle additional options selection
  const handleAdditionalOptionChange = (option: string) => {
    setAdditionalOptions((current) => {
      if (current.includes(option)) {
        return current.filter(item => item !== option);
      } else {
        return [...current, option];
      }
    });
  };
  
  // Simulated investment handler
  const handleInvest = () => {
    if (!property) return;
    
    // In a real app, this would call the API to create an investment
    console.log("Investing:", {
      propertyId: property.id,
      tokenCount,
      amount: investmentAmount,
      isResortMembership: property.type === PropertyType.OTHER,
      membershipTier: property.type === PropertyType.OTHER ? membershipTier : undefined,
      additionalOptions: property.type === PropertyType.OTHER ? additionalOptions : undefined
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

  const isResortOrMembership = property.type === PropertyType.OTHER;
  const isGolfCourse = isResortOrMembership && property.name.includes("골프");
  const isInternational = property.region === "해외";

  return (
    <div className="py-12 bg-neutral-100">
      <SEO 
        title={propertyName}
        description={`${propertyName}에 블록체인으로 투자하세요. ${propertyDescription?.substring(0, 120) || ''}...`}
        keywords={`${propertyName}, 부동산 투자, 토큰화, ${property.type}, ${property.region}, 블록체인 투자`}
        ogImage={property.imageUrl || "https://saharatech.com/og-property.jpg"}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
            <div className="relative">
              <img 
                src={property.imageUrl || '/assets/property-placeholder.jpg'} 
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
                    value={parseFloat(property.tokenizationProgress)} 
                    className="h-2"
                  />
                </div>
                
                <Tabs defaultValue="details">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="details" className="flex-1">자산 상세정보</TabsTrigger>
                    <TabsTrigger value="investment" className="flex-1">투자 정보</TabsTrigger>
                    <TabsTrigger value="blockchain" className="flex-1">블록체인 정보</TabsTrigger>
                    <TabsTrigger value="propertyInfo" className="flex-1">투자자산 정보</TabsTrigger>
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
                  
  
                  
                  <TabsContent value="propertyInfo">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 bg-neutral-50">
                          <h3 className="text-lg font-medium mb-2">감정가</h3>
                          <div className="flex justify-between items-center">
                            <p className="text-neutral-600">{property.appraisalValue ? formatCurrency(property.appraisalValue) : "정보 없음"}</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-neutral-50">
                          <h3 className="text-lg font-medium mb-2">권리관계</h3>
                          <p className="text-neutral-600">{property.legalRights || "정보 없음"}</p>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-neutral-50">
                          <h3 className="text-lg font-medium mb-2">대출금</h3>
                          <p className="text-neutral-600">{property.mortgageAmount ? formatCurrency(property.mortgageAmount) : "정보 없음"}</p>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-neutral-50">
                          <h3 className="text-lg font-medium mb-2">기타 정보</h3>
                          <p className="text-neutral-600">{property.otherNotes || "정보 없음"}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border p-4 mt-4">
                        <h3 className="text-lg font-medium mb-4">투자 의견 및 정보 공유</h3>
                        <form className="space-y-4">
                          <div>
                            <label htmlFor="comment-type" className="block text-sm font-medium text-neutral-700 mb-1">의견 유형</label>
                            <Select>
                              <SelectTrigger id="comment-type">
                                <SelectValue placeholder="의견 유형 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="investment-opinion">투자 의견</SelectItem>
                                <SelectItem value="property-info">부동산 정보</SelectItem>
                                <SelectItem value="market-analysis">시장 분석</SelectItem>
                                <SelectItem value="question">질문</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="comment-title" className="block text-sm font-medium text-neutral-700 mb-1">제목</label>
                            <input 
                              type="text" 
                              id="comment-title" 
                              className="w-full border rounded-md p-2" 
                              placeholder="제목을 입력하세요"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="comment-content" className="block text-sm font-medium text-neutral-700 mb-1">내용</label>
                            <textarea 
                              id="comment-content" 
                              rows={4} 
                              className="w-full border rounded-md p-2" 
                              placeholder="의견이나 정보를 공유해주세요"
                            ></textarea>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox id="anonymous" />
                            <label htmlFor="anonymous" className="text-sm text-neutral-600">익명으로 작성</label>
                          </div>
                          
                          <Button className="w-full">의견 제출하기</Button>
                        </form>
                        
                        <div className="mt-8">
                          <h4 className="text-md font-medium mb-4">다른 사용자 의견 (3)</h4>
                          <div className="space-y-4">
                            <div className="border-b pb-4">
                              <div className="flex justify-between mb-1">
                                <h5 className="font-medium">투자 수익률 검토</h5>
                                <span className="text-sm text-neutral-500">3일 전</span>
                              </div>
                              <p className="text-sm text-neutral-600 mb-2">주변 시세를 고려했을 때 예상 수익률은 적절하다고 판단됩니다. 다만 주변 개발 계획에 따라 변동 가능성이 있습니다.</p>
                              <div className="flex items-center text-sm text-neutral-500">
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">투자 의견</span>
                                <span className="mx-2">·</span>
                                <span>김투자</span>
                              </div>
                            </div>
                            
                            <div className="border-b pb-4">
                              <div className="flex justify-between mb-1">
                                <h5 className="font-medium">주변 개발 계획 정보</h5>
                                <span className="text-sm text-neutral-500">1주일 전</span>
                              </div>
                              <p className="text-sm text-neutral-600 mb-2">해당 지역 인근에 새로운 지하철 노선이 2026년까지 개통될 예정이며, 이로 인한 지가 상승이 예상됩니다.</p>
                              <div className="flex items-center text-sm text-neutral-500">
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">부동산 정보</span>
                                <span className="mx-2">·</span>
                                <span>익명</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <h5 className="font-medium">권리관계 질문</h5>
                                <span className="text-sm text-neutral-500">2주일 전</span>
                              </div>
                              <p className="text-sm text-neutral-600 mb-2">현재 권리관계에 대한 자세한 정보를 추가로 공유해주실 수 있을까요?</p>
                              <div className="flex items-center text-sm text-neutral-500">
                                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">질문</span>
                                <span className="mx-2">·</span>
                                <span>이상담</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* 투자하기 카드 - 라오스 비엔티안 탓루앙 경제특구 속성일 때만 표시 */}
            {property.id === 4 && (
              <div className="md:col-span-1">
                <InvestmentCard 
                  property={property} 
                  onInvest={handleInvest} 
                />
              </div>
            )}
            
            {/* 금융 분석 섹션 */}
            <div className="md:col-span-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-t-xl">
                <h2 className="text-xl font-bold flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2" />
                  금융 분석
                </h2>
                <p className="text-sm opacity-90">투자 결정에 도움이 되는 상세 금융 분석 데이터</p>
              </div>
              
              <div className="bg-white shadow-md rounded-b-xl p-5">
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <div className="w-full md:w-[320px]">
                    <Card className="overflow-hidden shadow-sm border border-blue-100 flex flex-col h-[350px]">
                      <CardHeader className="bg-blue-50 pb-2">
                        <CardTitle className="text-lg flex items-center text-blue-700">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          현금 흐름 분석
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-5 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <CashFlowAnalysis chartType="monthly" propertyId={Number(id)} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-full md:w-[320px]">
                    <Card className="overflow-hidden shadow-sm border border-emerald-100 flex flex-col h-[350px]">
                      <CardHeader className="bg-emerald-50 pb-2">
                        <CardTitle className="text-lg flex items-center text-emerald-700">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          수익률 분석
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-5 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <ReturnAnalysis analysisType="coc" propertyId={Number(id)} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-full md:w-[320px]">
                    <Card className="overflow-hidden shadow-sm border border-purple-100 flex flex-col h-[350px]">
                      <CardHeader className="bg-purple-50 pb-2">
                        <CardTitle className="text-lg flex items-center text-purple-700">
                          <Coins className="h-5 w-5 mr-2" />
                          자산 가치 분석
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-5 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <AssetValueAnalysis propertyId={Number(id)} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-gradient-to-b from-white to-blue-50 shadow-lg border-blue-100">
                <CardHeader className="pb-3 border-b border-blue-100">
                  {isResortOrMembership ? (
                    <>
                      <CardTitle className="flex items-center text-2xl font-bold text-blue-700">
                        {isInternational ? (
                          <Palmtree className="h-6 w-6 mr-2 text-primary" />
                        ) : (
                          <Hotel className="h-6 w-6 mr-2 text-primary" />
                        )}
                        {isGolfCourse ? "골프 멤버십 투자하기" : "리조트 멤버십 투자하기"}
                      </CardTitle>
                      <CardDescription className="text-blue-600">
                        {isGolfCourse 
                          ? "골프 회원권과 리조트 시설 이용 혜택을 포함한 투자 상품입니다." 
                          : "리조트 시설 이용 혜택을 포함한 멤버십 투자 상품입니다."}
                      </CardDescription>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-2xl font-bold text-blue-700">
                        {t('propertyDetail.investmentCard.title')}
                      </CardTitle>
                      <CardDescription className="text-blue-600">
                        {t('propertyDetail.investmentCard.description')}
                      </CardDescription>
                    </>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-5">
                    {isResortOrMembership && (
                      <div className="mb-6">
                        <h4 className="text-base font-medium mb-3">멤버십 등급 선택</h4>
                        <RadioGroup 
                          value={membershipTier} 
                          onValueChange={setMembershipTier}
                          className="grid grid-cols-1 gap-3"
                        >
                          <div className="flex items-center space-x-3 border border-blue-200 rounded-md p-4 cursor-pointer hover:bg-blue-50">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="flex flex-col cursor-pointer">
                              <span className="font-medium">스탠다드</span>
                              <span className="text-sm text-neutral-500">기본 멤버십 혜택</span>
                            </Label>
                            <div className="ml-auto font-medium">
                              {formatCurrency(property.tokenPrice)}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 border border-blue-200 rounded-md p-4 cursor-pointer hover:bg-blue-50">
                            <RadioGroupItem value="premium" id="premium" />
                            <Label htmlFor="premium" className="flex flex-col cursor-pointer">
                              <span className="font-medium">프리미엄</span>
                              <span className="text-sm text-neutral-500">VIP 혜택 포함</span>
                            </Label>
                            <div className="ml-auto font-medium">
                              {formatCurrency(parseInt(property.tokenPrice) * 2)}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 border border-blue-200 rounded-md p-4 cursor-pointer hover:bg-blue-50">
                            <RadioGroupItem value="platinum" id="platinum" />
                            <Label htmlFor="platinum" className="flex flex-col cursor-pointer">
                              <span className="font-medium">플래티넘</span>
                              <span className="text-sm text-neutral-500">최상위 혜택 + 우선 예약</span>
                            </Label>
                            <div className="ml-auto font-medium">
                              {formatCurrency(parseInt(property.tokenPrice) * 3)}
                            </div>
                          </div>
                        </RadioGroup>

                        <div className="mt-5">
                          <h4 className="text-base font-medium mb-3">추가 옵션</h4>
                          <div className="space-y-3">
                            {isGolfCourse && (
                              <div className="flex items-start space-x-3 border border-blue-200 rounded-md p-4">
                                <Checkbox 
                                  id="golf-lessons" 
                                  checked={additionalOptions.includes("golf-lessons")}
                                  onCheckedChange={() => handleAdditionalOptionChange("golf-lessons")}
                                />
                                <div className="grid gap-1.5 leading-none">
                                  <Label htmlFor="golf-lessons" className="font-medium">골프 레슨 패키지</Label>
                                  <p className="text-sm text-neutral-500">전문 골프 강사의 개인 레슨 10회</p>
                                </div>
                                <div className="ml-auto font-medium">₩ 100만</div>
                              </div>
                            )}
                            
                            <div className="flex items-start space-x-3 border border-blue-200 rounded-md p-4">
                              <Checkbox 
                                id="room-upgrade" 
                                checked={additionalOptions.includes("room-upgrade")}
                                onCheckedChange={() => handleAdditionalOptionChange("room-upgrade")}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="room-upgrade" className="font-medium">객실 업그레이드</Label>
                                <p className="text-sm text-neutral-500">투숙 시 상위 객실로 무료 업그레이드</p>
                              </div>
                              <div className="ml-auto font-medium">₩ 50만</div>
                            </div>
                            
                            <div className="flex items-start space-x-3 border border-blue-200 rounded-md p-4">
                              <Checkbox 
                                id="dining-credit" 
                                checked={additionalOptions.includes("dining-credit")}
                                onCheckedChange={() => handleAdditionalOptionChange("dining-credit")}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="dining-credit" className="font-medium">다이닝 크레딧</Label>
                                <p className="text-sm text-neutral-500">리조트 내 레스토랑 이용 크레딧</p>
                              </div>
                              <div className="ml-auto font-medium">₩ 30만</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-base font-medium text-blue-700 mb-2">
                          {t('propertyDetail.investmentCard.tokenCount')}
                        </label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0"
                            value={tokenCount || ''}
                            onChange={handleTokenCountChange}
                            className="w-full p-4 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={property.tokenizationStatus !== TokenizationStatus.IN_PROGRESS}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-base font-medium text-blue-700 mb-2">
                          {t('propertyDetail.investmentCard.amount')}
                        </label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0"
                            value={investmentAmount || ''}
                            onChange={handleInvestmentAmountChange}
                            className="w-full p-4 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={property.tokenizationStatus !== TokenizationStatus.IN_PROGRESS}
                          />
                          <span className="absolute right-4 top-4 text-blue-500 font-medium">₩</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-5 px-4 mt-2 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-blue-700">{t('propertyDetail.investmentCard.tokenPrice')}:</span>
                        <span className="font-bold">{formatCurrency(property.tokenPrice)}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-blue-700">{t('propertyDetail.investmentCard.expectedAnnualReturn')}:</span>
                        <span className="font-bold text-green-600">{property.expectedReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-blue-700">{t('propertyDetail.investmentCard.estimatedYearlyIncome')}:</span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(investmentAmount * parseFloat(property.expectedReturn) / 100)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-6">
                      {property.tokenizationStatus === TokenizationStatus.IN_PROGRESS ? (
                        <TokenPurchaseModal 
                          property={property}
                          onPurchaseSuccess={() => {
                            // 투자 성공 후 데이터 갱신을 위한 로직을 추가할 수 있습니다.
                            window.location.reload();
                          }}
                        />
                      ) : (
                        <Button 
                          className="w-4/5 text-xl py-8 font-bold bg-gradient-to-r from-gray-500 to-gray-400 shadow-lg rounded-xl"
                          disabled={true}
                        >
                          {property.tokenizationStatus === TokenizationStatus.COMPLETED
                            ? t('propertyDetail.investmentCard.soldOut')
                            : t('propertyDetail.investmentCard.comingSoon')
                          }
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-xs text-neutral-500 text-center mt-3">
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