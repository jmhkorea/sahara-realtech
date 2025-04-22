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
                      <span>마스터 NFT</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 text-sm space-y-2">
                      <p>비엔티안 부동산 전체 소유권을 나타내는 디지털 증서입니다.</p>
                      <p className="text-muted-foreground">표준: ARC-721</p>
                      <p className="text-muted-foreground">발행량: 1 NFT</p>
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
                    <div className="pl-9 text-sm space-y-2">
                      <p>비엔티안 프로젝트의 부분 소유권을 나타내는 토큰입니다.</p>
                      <p className="text-muted-foreground">표준: ARC-20</p>
                      <p className="text-muted-foreground">발행량: 1,250,000 RSA-020</p>
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
                    <div className="pl-9 text-sm space-y-2">
                      <p>사하라리얼테크 플랫폼 전체 가치를 나타내는 거버넌스 토큰입니다.</p>
                      <p className="text-muted-foreground">표준: ARC-20</p>
                      <p className="text-muted-foreground">총 발행량: 100,000,000 SRT</p>
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
                      RSA-020 토큰은 프로젝트의 법적 소유권을 가진 SPV에 의해 발행되며, 각 토큰은 비엔티안 오피스 빌딩의 부분 소유권을 나타냅니다.
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
                    <h4 className="font-bold mb-3">SRT 토큰과의 연계</h4>
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <p className="mb-3">
                        RSA-020 토큰은 향후 출시될 사하라리얼테크의 플랫폼 토큰인 SRT와 스왑이 가능하도록 설계되었습니다.
                        이를 통해 투자자는 특정 프로젝트에 집중된 투자에서 플랫폼 전체 가치에 연동된 투자로 전환할 수 있는 
                        유연성을 갖게 됩니다.
                      </p>
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
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LaosProjectDetail;