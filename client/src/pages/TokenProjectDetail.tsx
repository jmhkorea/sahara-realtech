import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleCheck, Wallet, Info, AlertTriangle, Download, Share2, Globe, ArrowRight, FileText, PieChart, BarChart4, CalendarClock, Building, Users, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TokenPurchaseModal from '@/components/TokenPurchaseModal';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

// 이 컴포넌트는 SRA 토큰 상세 페이지를 위한 것입니다
export default function TokenProjectDetail() {
  const { t } = useTranslation();
  // 현재 페이지에서는 파라미터를 사용하지 않아 제거
  // const params = useParams();
  
  // 프로젝트 정보 - 실제로는 API에서 가져올 것입니다
  const projectInfo = {
    id: 1,
    name: "강남 프리미엄 오피스 단지",
    nameEn: "Gangnam Premium Office Complex",
    address: "서울특별시 강남구 테헤란로 152",
    addressEn: "152 Teheran-ro, Gangnam-gu, Seoul",
    description: "서울 강남의 중심부에 위치한 프리미엄 오피스 단지로, 최고급 시설과 접근성을 자랑합니다. 안정적인 임대 수익과 자산 가치 상승이 예상됩니다.",
    descriptionEn: "A premium office complex located in the heart of Gangnam, Seoul, featuring top-tier facilities and accessibility. Stable rental income and asset value appreciation are expected.",
    imageUrl: "/assets/property-1.jpg",
    totalValue: "100000000000", // 1,000억원
    expectedReturn: "7.2",
    tokenizationStatus: "진행 중",
    tokenizationProgress: "65",
    tokenSymbol: "SRA-020",
    tokenName: "SaharaRealTech Asset - 강남 프리미엄 오피스",
    tokenSupply: "100000", // 총 10만개
    tokenPrice: "10000", // 1만원
    tokenSold: "65000", // 6만 5천개 판매됨
    minInvestment: "100000", // 최소 투자 금액 10만원
    region: "서울",
    type: "오피스",
    constructionYear: "2015",
    size: "12500", // 제곱미터
    floors: "25",
    amenities: "24시간 보안, 주차장, 컨퍼런스룸, 옥상 정원, 구내식당",
    occupancyRate: "95", // 95% 입주율
    numInvestors: 342, // 투자자 수
    contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // 아발란체 컨트랙트 주소
    blockchain: "Avalanche", // 블록체인 플랫폼
    blockExplorerUrl: "https://snowtrace.io/address/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    whitepaper: "/assets/SRA-whitepaper.pdf",
    tokenomics: {
      distribution: [
        { name: "투자자 배정", value: 70 },
        { name: "개발사 보유", value: 15 },
        { name: "운영 및 마케팅", value: 10 },
        { name: "파트너십 및 생태계", value: 5 }
      ],
      vesting: "개발사 보유 물량은 1년 락업 후 3년간 선형 베스팅",
      governance: "토큰 보유자는 자산 운영 관련 주요 의사 결정에 투표 가능"
    },
    roadmap: [
      { phase: "1단계", period: "2025년 2분기", title: "토큰화 완료", description: "프로젝트 토큰화 완료 및 투자자 모집", status: "진행중" },
      { phase: "2단계", period: "2025년 3분기", title: "리노베이션", description: "공용 공간 리노베이션 및 설비 업그레이드", status: "예정" },
      { phase: "3단계", period: "2025년 4분기", title: "임대 최적화", description: "임대 계약 최적화 및 임대료 인상", status: "예정" },
      { phase: "4단계", period: "2026년 1분기", title: "배당 시작", description: "최초 분기 배당 실행", status: "예정" }
    ],
    team: [
      { name: "한 대표", position: "CEO", photo: "/assets/team-1.jpg", description: "부동산 투자 및 개발 15년 경력" },
      { name: "김 이사", position: "CTO", photo: "/assets/team-2.jpg", description: "블록체인 및 금융 기술 전문가" },
      { name: "이 이사", position: "CFO", photo: "/assets/team-3.jpg", description: "자산 관리 및 부동산 금융 전문가" }
    ],
    partners: ["삼성물산", "신한은행", "한국투자증권", "법무법인 율촌"],
    faq: [
      { question: "SRA 토큰은 어떤 법적 지위를 가지나요?", answer: "SRA 토큰은 해당 부동산의 수익권을 디지털화한 자산으로, 증권형 토큰(Security Token)에 해당합니다. 관련 법규에 따라 발행 및 유통되며, 투자자는 실물 자산에 기반한 수익권을 보유하게 됩니다." },
      { question: "토큰 소유자는 어떤 권리를 갖게 되나요?", answer: "토큰 소유자는 보유 토큰 비율에 따라 임대 수익 배당을 받을 권리, 자산 운영에 관한 주요 의사결정에 참여할 권리, 그리고 자산 매각 시 수익을 분배받을 권리를 갖습니다." },
      { question: "배당은 어떻게 이루어지나요?", answer: "배당은 분기별로 이루어지며, 운영 비용과 유지 관리 비용을 제외한 순수익을 토큰 보유 비율에 따라 배분합니다. 배당금은 투자자의 등록된 지갑 주소로 스테이블코인(USDC)으로 지급됩니다." },
      { question: "토큰은 어디서 거래할 수 있나요?", answer: "SRA 토큰은 SaharaRealTech 플랫폼 내에서 직접 거래가 가능하며, 추후 라이선스를 보유한 디지털 자산 거래소에 상장될 예정입니다." },
      { question: "외국인도 투자할 수 있나요?", answer: "네, 외국인도 투자가 가능합니다. 다만 각 국가의 증권법 및 규제에 따라 투자 가능 여부가 달라질 수 있으므로, 해당 국가의 법규를 확인하시기 바랍니다." }
    ],
    financials: {
      rentalIncome: [
        { year: "2025", quarter: "Q3", amount: 950000000 },
        { year: "2025", quarter: "Q4", amount: 960000000 },
        { year: "2026", quarter: "Q1", amount: 970000000 },
        { year: "2026", quarter: "Q2", amount: 980000000 },
        { year: "2026", quarter: "Q3", amount: 990000000 },
        { year: "2026", quarter: "Q4", amount: 1000000000 }
      ],
      expenses: [
        { year: "2025", quarter: "Q3", amount: 285000000 },
        { year: "2025", quarter: "Q4", amount: 288000000 },
        { year: "2026", quarter: "Q1", amount: 291000000 },
        { year: "2026", quarter: "Q2", amount: 294000000 },
        { year: "2026", quarter: "Q3", amount: 297000000 },
        { year: "2026", quarter: "Q4", amount: 300000000 }
      ],
      netIncome: [
        { year: "2025", quarter: "Q3", amount: 665000000 },
        { year: "2025", quarter: "Q4", amount: 672000000 },
        { year: "2026", quarter: "Q1", amount: 679000000 },
        { year: "2026", quarter: "Q2", amount: 686000000 },
        { year: "2026", quarter: "Q3", amount: 693000000 },
        { year: "2026", quarter: "Q4", amount: 700000000 }
      ],
      dividendPerToken: [
        { year: "2025", quarter: "Q3", amount: 166 },
        { year: "2025", quarter: "Q4", amount: 168 },
        { year: "2026", quarter: "Q1", amount: 170 },
        { year: "2026", quarter: "Q2", amount: 172 },
        { year: "2026", quarter: "Q3", amount: 173 },
        { year: "2026", quarter: "Q4", amount: 175 }
      ],
      roi: {
        annualRental: 7.2,
        expectedAppreciation: 4.5,
        totalExpected: 11.7
      },
      assetValueTrend: [
        { year: "2025", value: 101800000000 },
        { year: "2026", value: 103600000000 },
        { year: "2027", value: 105700000000 },
        { year: "2028", value: 108100000000 },
        { year: "2029", value: 110800000000 }
      ]
    },
    documents: [
      { title: "법적 구조 설명서", url: "/assets/legal-structure.pdf" },
      { title: "감정평가 보고서", url: "/assets/appraisal-report.pdf" },
      { title: "건물 상태 점검 보고서", url: "/assets/building-inspection.pdf" },
      { title: "임대 계약 요약", url: "/assets/lease-summary.pdf" },
      { title: "토큰 약관", url: "/assets/token-terms.pdf" }
    ]
  };

  // 차트 데이터 준비
  const cashFlowData = projectInfo.financials.rentalIncome.map((item, index) => ({
    period: `${item.year} ${item.quarter}`,
    "임대 수입": item.amount / 1000000,
    "운영 비용": projectInfo.financials.expenses[index].amount / 1000000,
    "순수익": projectInfo.financials.netIncome[index].amount / 1000000
  }));
  
  const tokenDistributionData = projectInfo.tokenomics.distribution;
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const assetValueData = projectInfo.financials.assetValueTrend.map(item => ({
    year: item.year,
    "자산 가치": item.value / 1000000000
  }));

  // 토큰 구매 성공 후 업데이트
  const handlePurchaseSuccess = () => {
    // 실제로는 상태 업데이트 로직 필요
    console.log("토큰 구매 성공");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 프로젝트 정보 */}
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500">{projectInfo.type}</Badge>
                <Badge variant="outline">{projectInfo.region}</Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {projectInfo.name}
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                {projectInfo.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={projectInfo.imageUrl} 
                  alt={projectInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-700 mb-4">
                {projectInfo.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{t('property.totalValue')}</p>
                  <p className="font-medium">{(parseInt(projectInfo.totalValue) / 1000000000).toFixed(1)}억원</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{t('property.expectedReturn')}</p>
                  <p className="font-medium">{projectInfo.expectedReturn}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{t('property.occupancyRate')}</p>
                  <p className="font-medium">{projectInfo.occupancyRate}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{t('property.constructionYear')}</p>
                  <p className="font-medium">{projectInfo.constructionYear}년</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">부동산 상세 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">건물 면적</span>
                    <span className="font-medium">{parseInt(projectInfo.size).toLocaleString()} m²</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">층수</span>
                    <span className="font-medium">{projectInfo.floors}층</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">준공년도</span>
                    <span className="font-medium">{projectInfo.constructionYear}년</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">용도</span>
                    <span className="font-medium">{projectInfo.type}</span>
                  </div>
                </div>
                
                <div className="py-2">
                  <h4 className="text-gray-600 mb-2">부대시설</h4>
                  <p>{projectInfo.amenities}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 탭 컨텐츠 */}
          <Tabs defaultValue="financial" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="financial">재무 정보</TabsTrigger>
              <TabsTrigger value="tokenomics">토큰 정보</TabsTrigger>
              <TabsTrigger value="roadmap">로드맵</TabsTrigger>
              <TabsTrigger value="documents">문서</TabsTrigger>
            </TabsList>
            
            {/* 재무 정보 */}
            <TabsContent value="financial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">수익 분석</CardTitle>
                  <CardDescription>
                    연간 임대 수익, 운영 비용 및 순이익 예상치
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cashFlowData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <RechartsTooltip formatter={(value: number) => [`${value}백만원`, '']} />
                        <Legend />
                        <Bar dataKey="임대 수입" fill="#8884d8" />
                        <Bar dataKey="운영 비용" fill="#82ca9d" />
                        <Bar dataKey="순수익" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-500 mb-1">예상 연간 임대 수익률</h3>
                      <p className="text-2xl font-bold text-blue-600">{projectInfo.financials.roi.annualRental}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-500 mb-1">예상 연간 자산가치 상승률</h3>
                      <p className="text-2xl font-bold text-green-600">{projectInfo.financials.roi.expectedAppreciation}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm text-gray-500 mb-1">예상 총 수익률 (연간)</h3>
                      <p className="text-2xl font-bold text-purple-600">{projectInfo.financials.roi.totalExpected}%</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-medium mb-4">자산 가치 전망</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={assetValueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <RechartsTooltip formatter={(value: number) => [`${value}억원`, '자산 가치']} />
                        <Line
                          type="monotone"
                          dataKey="자산 가치"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* 토큰 정보 */}
            <TabsContent value="tokenomics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">토큰 분배</CardTitle>
                  <CardDescription>
                    SRA 토큰 분배 및 거버넌스 구조
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={tokenDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {tokenDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip formatter={(value: number) => [`${value}%`, ``]} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm text-gray-500">토큰 심볼</h3>
                          <p className="font-bold">{projectInfo.tokenSymbol}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">토큰 이름</h3>
                          <p className="font-medium">{projectInfo.tokenName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">총 발행량</h3>
                          <p className="font-medium">{parseInt(projectInfo.tokenSupply).toLocaleString()} 토큰</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">토큰 가격</h3>
                          <p className="font-medium">{parseInt(projectInfo.tokenPrice).toLocaleString()} 원</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">블록체인</h3>
                          <p className="font-medium">{projectInfo.blockchain}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">컨트랙트 주소</h3>
                          <div className="flex items-center">
                            <a href={projectInfo.blockExplorerUrl} target="_blank" rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline truncate">
                              {`${projectInfo.contractAddress.substring(0, 6)}...${projectInfo.contractAddress.substring(projectInfo.contractAddress.length - 4)}`}
                            </a>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div>
                        <h3 className="font-medium mb-2">베스팅 스케줄</h3>
                        <p className="text-gray-700 text-sm">{projectInfo.tokenomics.vesting}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">거버넌스</h3>
                        <p className="text-gray-700 text-sm">{projectInfo.tokenomics.governance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* 로드맵 */}
            <TabsContent value="roadmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">프로젝트 로드맵</CardTitle>
                  <CardDescription>
                    프로젝트 진행 계획 및 주요 일정
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {projectInfo.roadmap.map((item, index) => (
                      <div key={index} className="mb-8 flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white z-10">
                          {index + 1}
                        </div>
                        <div className="ml-6">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <Badge variant={item.status === "완료" ? "default" : 
                                         item.status === "진행중" ? "secondary" : "outline"}
                                  className="ml-2">
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-gray-500 text-sm">{item.period}</p>
                          <p className="mt-2">{item.description}</p>
                        </div>
                        {index < projectInfo.roadmap.length - 1 && (
                          <div className="absolute top-10 left-5 h-full w-px bg-gray-300 -z-10"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">팀 및 파트너</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-4">핵심 팀</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {projectInfo.team.map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-gray-500 text-sm">{member.position}</p>
                        <p className="text-xs mt-2">{member.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">파트너사</h3>
                  <div className="flex flex-wrap gap-4">
                    {projectInfo.partners.map((partner, index) => (
                      <Badge key={index} variant="outline" className="px-4 py-2 text-base">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* 문서 */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">관련 문서</CardTitle>
                  <CardDescription>
                    프로젝트 관련 문서 및 법적 자료
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectInfo.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-3" />
                          <span>{doc.title}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" /> 다운로드
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">화이트페이퍼</h3>
                    <Button className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" /> 화이트페이퍼 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">자주 묻는 질문</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {projectInfo.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* 토큰 투자 정보 */}
        <div className="space-y-6">
          <Card className="shadow-md sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">토큰 투자 정보</CardTitle>
              <CardDescription>
                프로젝트 토큰화 진행 상황
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">모집 진행률</span>
                    <span className="text-sm">{projectInfo.tokenizationProgress}%</span>
                  </div>
                  <Progress value={parseInt(projectInfo.tokenizationProgress)} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">토큰 가격</p>
                    <p className="font-medium">{parseInt(projectInfo.tokenPrice).toLocaleString()}원</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">총 발행량</p>
                    <p className="font-medium">{parseInt(projectInfo.tokenSupply).toLocaleString()} SRA</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">판매된 토큰</p>
                    <p className="font-medium">{parseInt(projectInfo.tokenSold).toLocaleString()} SRA</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">투자자 수</p>
                    <p className="font-medium">{projectInfo.numInvestors.toLocaleString()}명</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium flex items-center text-blue-700 mb-1">
                    <Info className="h-4 w-4 mr-1" /> 토큰 정보
                  </h3>
                  <p className="text-sm text-blue-700 mb-2">
                    1 SRA 토큰 당 {(parseInt(projectInfo.totalValue) / parseInt(projectInfo.tokenSupply)).toLocaleString()}원 가치의 부동산 지분을 나타냅니다.
                  </p>
                  <p className="text-sm text-blue-700">
                    최소 {(parseInt(projectInfo.minInvestment) / parseInt(projectInfo.tokenPrice))} 토큰 ({parseInt(projectInfo.minInvestment).toLocaleString()}원)부터 투자 가능합니다.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-1">예상 배당 수익</h3>
                  <p className="text-xl font-bold text-green-600 mb-2">
                    토큰 당 연간 약 {Math.round(parseInt(projectInfo.tokenPrice) * parseFloat(projectInfo.expectedReturn) / 100).toLocaleString()}원
                  </p>
                  <p className="text-xs text-gray-600">
                    (연 {projectInfo.expectedReturn}% 수익률 기준, 시장 상황에 따라 변동 가능)
                  </p>
                </div>
                
                <div className="space-y-4">
                  <TokenPurchaseModal property={projectInfo} onPurchaseSuccess={handlePurchaseSuccess} />
                  
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" /> 투자설명서 다운로드
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">투자 혜택</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">분기별 임대 수익 배당</p>
                    </div>
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">자산 가치 상승에 따른 토큰 가치 증가</p>
                    </div>
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">투자자 커뮤니티 및 의사결정 참여 권한</p>
                    </div>
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">SaharaRealTech 추가 프로젝트 우선 투자권</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">알림 신청</h3>
                  <Button variant="outline" className="w-full">프로젝트 업데이트 알림 받기</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md">투자자 보호</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">실물 자산 기반 토큰화로 가치 안정성 보장</p>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">신탁 계약을 통한 법적 안정성 확보</p>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">블록체인 기반 투명한 수익 분배 시스템</p>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">스마트 컨트랙트를 통한 자동화된 배당 지급</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}