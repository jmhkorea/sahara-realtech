import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  Building2, 
  Check, 
  Coins, 
  FileText, 
  Share2,
  Layers, 
  ShieldCheck
} from 'lucide-react';

const LaosProjectDetail = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const handleConnect = () => {
    toast({
      title: "지갑 연결 요청",
      description: "투자하려면 먼저 지갑을 연결해주세요.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 프로젝트 헤더 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">라오스 비엔티안 프로젝트</h1>
          <p className="text-muted-foreground mt-2">Laos Vientiane Premium Office</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              상업용 부동산
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              동남아시아
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 hover:bg-green-100">
              토큰화 진행중
            </Badge>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="sm:px-6">
            <Share2 className="mr-2 h-4 w-4" />
            공유하기
          </Button>
          <Button variant="default" className="sm:px-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
            <Coins className="mr-2 h-4 w-4" />
            투자하기
          </Button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 사이드바 - 프로젝트 정보 */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>프로젝트 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">총 가치 평가액</p>
                  <p className="text-lg font-bold">$12,500,000</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">예상 연간 수익률</p>
                  <p className="text-lg font-bold text-green-600">7.2%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">토큰 총 발행량</p>
                  <p className="text-lg font-bold">1,250,000 RSA-020</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">토큰 당 가격</p>
                  <p className="text-lg font-bold">$10 USD</p>
                </div>
              </div>

              <hr />

              <div>
                <h4 className="font-medium mb-2">토큰 정보</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">티커:</div>
                  <div>RSA-020</div>
                  <div className="font-medium">토큰 표준:</div>
                  <div>ARC-20 (Avalanche)</div>
                  <div className="font-medium">블록체인:</div>
                  <div>Avalanche C-Chain</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>토큰 구조 정보</CardTitle>
              <CardDescription>
                본 프로젝트의 토큰화 구조에 대한 정보입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-slate-50 p-3 border">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Layers className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">3-티어 토큰 구조</h4>
                    <p className="text-sm text-muted-foreground">SaharaRealTech 표준 모델</p>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="master-nft">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-1.5 rounded-full mr-2">
                        <FileText className="h-4 w-4 text-purple-700" />
                      </div>
                      <span>마스터 NFT 구조</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 text-sm space-y-4">
                      <div>
                        <p className="font-medium">프라임 마스터 NFT</p>
                        <p>비엔티안 부동산 전체 소유권을 나타내는 디지털 증서입니다.</p>
                        <p className="text-muted-foreground">표준: ARC-721</p>
                        <p className="text-muted-foreground">발행량: 1 NFT</p>
                        <p className="text-muted-foreground">소유자: 프로젝트 SPV</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">거버넌스 마스터 NFT</p>
                        <p>프로젝트의 주요 의사결정에 참여할 수 있는 권한을 부여하는 NFT입니다.</p>
                        <p className="text-muted-foreground">표준: ARC-721</p>
                        <p className="text-muted-foreground">발행량: 최대 99개 (사모펀드 규제 최적화)</p>
                        <p className="text-muted-foreground">클래스 구분:</p>
                        <ul className="text-muted-foreground list-disc pl-5">
                          <li>A클래스 (10개): 주요 전략적 파트너용, 가중치 높음</li>
                          <li>B클래스 (39개): 기관 투자자용, 중간 가중치</li>
                          <li>C클래스 (50개): 전문 투자자용, 기본 가중치</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">거버넌스 NFT 혜택</p>
                        <ul className="text-muted-foreground list-disc pl-5">
                          <li>자산 매각, 대규모 리노베이션 등 전략적 의사결정 참여</li>
                          <li>RSA-020 토큰 구매 우선권</li>
                          <li>추가 수익 배분 혜택</li>
                          <li>제한적 양도 가능 (이사회 승인 필요)</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="project-tokens">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                        <Building2 className="h-4 w-4 text-blue-700" />
                      </div>
                      <span>프로젝트 토큰 (RSA-020)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 text-sm space-y-4">
                      <div>
                        <p className="font-medium">기본 정보</p>
                        <p>비엔티안 프로젝트의 부분 소유권을 나타내는 토큰입니다.</p>
                        <p className="text-muted-foreground">표준: ARC-20 (Avalanche)</p>
                        <p className="text-muted-foreground">발행량: 1,250,000 RSA-020</p>
                        <p className="text-muted-foreground">초기 가격: $10 USD</p>
                        <p className="text-muted-foreground">총 가치: $12,500,000 USD</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">토큰 분배</p>
                        <ul className="text-muted-foreground list-disc pl-5">
                          <li>투자자 배정: 1,000,000 RSA-020 (80%)</li>
                          <li>프로젝트 준비금: 125,000 RSA-020 (10%)</li>
                          <li>운영 및 관리: 75,000 RSA-020 (6%)</li>
                          <li>팀 및 어드바이저: 50,000 RSA-020 (4%)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">RSA-020 토큰 홀더 권리</p>
                        <ul className="text-muted-foreground list-disc pl-5">
                          <li>분기별 임대 수익 배당 (예상 연 7.2%)</li>
                          <li>자산 가치 상승에 따른 토큰 가치 증가</li>
                          <li>일상적 운영 관련 의사결정 참여</li>
                          <li>자유로운 거래 및 양도 가능</li>
                          <li>SRT 토큰 스왑 자격</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="platform-token">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-1.5 rounded-full mr-2">
                        <Coins className="h-4 w-4 text-green-700" />
                      </div>
                      <span>플랫폼 토큰 (SRT)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 text-sm space-y-4">
                      <div>
                        <p className="font-medium">기본 정보</p>
                        <p>사하라리얼테크 플랫폼 전체 가치를 나타내는 거버넌스 토큰입니다.</p>
                        <p className="text-muted-foreground">표준: ARC-20 (Avalanche)</p>
                        <p className="text-muted-foreground">총 발행량: 100,000,000 SRT</p>
                        <p className="text-muted-foreground">예상 초기 가격: $0.2 ~ $0.5 USD</p>
                        <p className="text-muted-foreground">출시 예정: 2026년 (3-5개 프로젝트 성공 후)</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">SRT 토큰 목적</p>
                        <ul className="text-muted-foreground list-disc pl-5">
                          <li>개별 프로젝트 토큰(RSA)을 통합하는 플랫폼 토큰</li>
                          <li>사하라리얼테크 플랫폼의 거버넌스 토큰</li>
                          <li>암호화폐 거래소 상장을 통한 유동성 제공</li>
                          <li>다양한 프로젝트에 걸친 분산 투자 가능</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium">스왑 메커니즘</p>
                        <ul className="text-muted-foreground list-disc pl-5">
                          <li>각 프로젝트 RSA 토큰을 SRT로 스왑 가능</li>
                          <li>자산 가치 기반의 스왑 비율 설정</li>
                          <li>초기 RSA 토큰 홀더에게 최대 20% 보너스 제공</li>
                          <li>스왑 기능을 통한 투자 포트폴리오 다변화</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 메인 컨텐츠 - 탭 구조 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="overview">개요</TabsTrigger>
                  <TabsTrigger value="tokenization">토큰화 전략</TabsTrigger>
                  <TabsTrigger value="avalanche">아발란체 호환성</TabsTrigger>
                  <TabsTrigger value="audit">컨트랙트 감사</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">라오스 비엔티안 프로젝트 소개</h3>
                    <p className="text-muted-foreground">
                      라오스의 수도 비엔티안 중심부에 위치한 프리미엄 오피스 건물로, 신흥 경제 중심지에 자리한 고수익 상업용 부동산입니다.
                      총 연면적 12,000m²의 A급 오피스 빌딩으로, 현재 91% 임대율을 유지하고 있으며 주요 임차인으로 국제 기업과 금융 기관들이 입주해 있습니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">주요 특징</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>비엔티안 CBD 위치, 우수한 접근성</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>2020년 완공된 최신 설비의 A급 빌딩</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>다국적 기업 장기 임대 계약 체결</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">투자 가치</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>동남아시아 신흥 시장 성장 잠재력</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>라오스 외국인 투자 증가 추세</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>국제 기업 임차인에 의한 안정적 현금흐름</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tokenization" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">비엔티안 프로젝트 토큰화 전략</h3>
                    <p className="text-muted-foreground">
                      라오스 비엔티안 프로젝트는 부동산의 가치를 디지털화하여 더 많은 투자자들에게 접근성을 제공하기 위해 
                      아발란체 블록체인 기반의 토큰화 전략을 채택했습니다.
                    </p>
                  </div>

                  <Alert>
                    <AlertTitle>토큰 발행 계획</AlertTitle>
                    <AlertDescription>
                      라오스 비엔티안 프로젝트는 계층적 토큰 구조로 설계되었습니다. 프라임 마스터 NFT(1개), 거버넌스 마스터 NFT(최대 99개), 그리고 RSA-020 토큰(1,250,000개)으로 구성된 3계층 구조로 다양한 투자자의 요구를 충족합니다.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-blue-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">RSA-020 토큰 세부 정보</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="font-medium">총 발행량:</div>
                          <div>1,250,000 RSA-020</div>
                          <div className="font-medium">초기 가격:</div>
                          <div>$10 USD</div>
                          <div className="font-medium">총 자산 가치:</div>
                          <div>$12,500,000 USD</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">토큰 분배 계획</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="font-medium">투자자 배정:</div>
                          <div>1,000,000 RSA-020 (80%)</div>
                          <div className="font-medium">프로젝트 준비금:</div>
                          <div>125,000 RSA-020 (10%)</div>
                          <div className="font-medium">운영 및 관리:</div>
                          <div>75,000 RSA-020 (6%)</div>
                          <div className="font-medium">팀 및 어드바이저:</div>
                          <div>50,000 RSA-020 (4%)</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">계층적 토큰 구조</h4>
                    <div className="bg-slate-50 p-4 rounded-lg border space-y-4">
                      <div>
                        <p className="font-medium">3-계층 토큰 모델</p>
                        <div className="ml-5 mt-2 border-l-2 border-blue-300 pl-4 space-y-3">
                          <div>
                            <p className="font-medium text-blue-800">프라임 마스터 NFT (1개)</p>
                            <p className="text-sm text-muted-foreground">
                              비엔티안 부동산의 법적 소유권을 블록체인상에 기록한 최상위 디지털 증서로, 
                              SPV가 보유하며 자산의 기본 증서 역할을 합니다.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-purple-800">거버넌스 마스터 NFT (최대 99개)</p>
                            <p className="text-sm text-muted-foreground">
                              한국 사모펀드 규제에 최적화된 구조로, 주요 투자자들에게 전략적 의사결정 권한을 부여합니다.
                              A, B, C 클래스로 구분되며 투자 규모에 따라 다른 투표 가중치를 갖습니다.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-green-800">프로젝트 토큰 - RSA-020 (1,250,000개)</p>
                            <p className="text-sm text-muted-foreground">
                              자유롭게 거래 가능한 유동성 토큰으로, 일반 투자자에게 부동산 수익에 대한 권리와
                              일상적 운영 결정 참여 기회를 제공합니다.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium">SRT 토큰 통합 계획</p>
                        <p className="text-sm">
                          RSA-020 토큰은 향후 출시될 사하라리얼테크의 플랫폼 토큰인 SRT와 스왑이 가능하도록 설계되었습니다.
                          여러 개별 프로젝트 토큰(RSA)을 하나의 플랫폼 토큰(SRT)으로 통합하여 투자 포트폴리오 다변화와
                          거래소 상장을 통한 유동성 확보가 가능합니다.
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <p className="font-medium text-blue-900">법적 안정성</p>
                          <p className="text-xs text-blue-800 mt-1">계층적 구조를 통해 법적 소유권과 거래 유동성을 효과적으로 분리</p>
                        </div>
                        <div className="flex-1 bg-green-50 rounded-lg p-3 border border-green-100">
                          <p className="font-medium text-green-900">투자 접근성</p>
                          <p className="text-xs text-green-800 mt-1">다양한 투자 규모와 목적에 맞는 맞춤형 토큰 옵션 제공</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "avalanche" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">아발란체 프로토콜 호환성</h3>
                    <p className="text-muted-foreground">
                      라오스 비엔티안 프로젝트는 고성능, 낮은 비용, 그리고 지속가능성을 갖춘 아발란체 블록체인을 기반으로 
                      토큰화되어 최적의 호환성과 접근성을 제공합니다.
                    </p>
                  </div>

                  <Alert className="bg-gradient-to-r from-purple-50 to-blue-50 border-blue-200">
                    <ShieldCheck className="h-4 w-4 text-blue-700" />
                    <AlertTitle className="text-blue-900">아발란체 프로토콜 선택 이유</AlertTitle>
                    <AlertDescription className="text-blue-800">
                      높은 처리량, 빠른 완결성, 낮은 거래 수수료, 그리고 EVM 호환성으로 RSA-020 토큰의 안정적인 운영과 
                      유동성을 보장합니다.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3 flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-purple-700" />
                        아발란체 기술 사양
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">블록체인 유형:</span>
                          <span>C-Chain (EVM 호환)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">합의 메커니즘:</span>
                          <span>Proof of Stake (PoS)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">TPS:</span>
                          <span>4,500+ 트랜잭션/초</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3 flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-700" />
                        호환성 및 접근성
                      </h4>
                      <div className="space-y-2">
                        <div className="rounded-md bg-green-50 p-3 border border-green-100">
                          <h5 className="font-medium text-green-900">지갑 호환성</h5>
                          <p className="text-sm text-green-800">MetaMask, Trust Wallet, Ledger 등 주요 이더리움 호환 지갑 사용 가능</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "audit" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">스마트 컨트랙트 감사</h3>
                    <p className="text-muted-foreground">
                      라오스 비엔티안 프로젝트의 토큰화를 위한 스마트 컨트랙트는 최고 수준의 보안 표준을 준수하기 위해
                      엄격한 감사 과정을 거치고 있습니다. 이는 투자자들에게 안전하고 투명한 투자 환경을 제공하기 위함입니다.
                    </p>
                  </div>

                  <Alert className="bg-amber-50 border-amber-200">
                    <ShieldCheck className="h-4 w-4 text-amber-700" />
                    <AlertTitle className="text-amber-900">감사 진행 상태</AlertTitle>
                    <AlertDescription className="text-amber-800">
                      현재 RSA-020 토큰 스마트 컨트랙트는 내부 감사를 완료하고, 독립적인 제3자 보안 감사를 진행 중입니다.
                      최종 감사 보고서는 2025년 6월에 공개될 예정입니다.
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-bold mb-3">핵심 보안 기능</h4>
                    <div className="bg-slate-50 p-4 rounded-lg border space-y-4">
                      <div>
                        <h5 className="font-medium">접근 제어 메커니즘</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          역할 기반 접근 제어(RBAC)를 통해 특정 기능에 대한 접근을 관리하여 
                          권한이 없는 주체의 중요 기능 호출을 방지합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              백서 다운로드
            </Button>
            <Button variant="outline" className="w-full" onClick={handleConnect}>
              <Coins className="mr-2 h-4 w-4" />
              투자하기
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>자주 묻는 질문</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>
                    토큰 홀더는 어떤 권리를 갖게 되나요?
                  </AccordionTrigger>
                  <AccordionContent>
                    RSA-020 토큰 홀더는 비엔티안 오피스 빌딩의 소유권 지분을 갖게 되며, 임대 수익에 대한 
                    배당을 분기별로 받을 권리가 있습니다. 또한 주요 자산 관리 결정에 대한 투표권과 
                    향후 SRT 토큰으로의 스왑 우선권을 가집니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>
                    어떻게 토큰을 구매할 수 있나요?
                  </AccordionTrigger>
                  <AccordionContent>
                    초기 투자 단계에서는 사하라리얼테크 플랫폼을 통해 직접 구매가 가능합니다. 
                    플랫폼에서 지갑을 연결한 후 AVAX, USDC, USDT 등으로 구매할 수 있습니다. 
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-3">
                  <AccordionTrigger>
                    거버넌스 마스터 NFT는 무엇인가요?
                  </AccordionTrigger>
                  <AccordionContent>
                    거버넌스 마스터 NFT는 프로젝트의 전략적 의사결정에 참여할 수 있는 권한을 부여하는 토큰입니다. 
                    최대 99개까지 발행되며, A, B, C 세 가지 클래스로 구분됩니다. 한국 사모펀드 규제에 최적화된 
                    구조로 설계되었으며, 투자 규모와 역할에 따라 다른 투표 가중치를 갖습니다. 거버넌스 NFT 
                    소유자는 RSA-020 토큰 구매 우선권, 추가 수익 배분 혜택 등 특별한 권리를 가집니다.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-4">
                  <AccordionTrigger>
                    거버넌스 NFT와 일반 RSA-020 토큰의 차이점은 무엇인가요?
                  </AccordionTrigger>
                  <AccordionContent>
                    거버넌스 NFT는 프로젝트의 전략적 의사결정 권한을 가진 상위 레벨 토큰으로, 제한된 수량(최대 99개)만 
                    발행됩니다. 양도가 제한적이며 이사회 승인이 필요합니다. 반면, RSA-020 토큰은 125만개가 발행되며 
                    자유롭게 거래 가능한 유동성 토큰입니다. RSA-020은 주로 수익 분배 권리에 초점이 맞춰져 있으며, 
                    일상적인 운영 의사결정에 참여할 수 있습니다. 투자 규모와 전략적 중요도에 따라 두 토큰 중 
                    적합한 것을 선택할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LaosProjectDetail;