import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Building, 
  Landmark, 
  FileCheck, 
  Key, 
  Lock, 
  ArrowRightCircle,
  Shield,
  BarChart4,
  Wallet,
  ArrowRight
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function RealEstateTokenization() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-16">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            부동산 토큰화
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            사하라 리얼테크의 블록체인 기술을 활용하여 실물 부동산을 디지털 토큰으로 변환하는 혁신적인 방법을 알아보세요.
          </p>

          <div className="p-3 mt-5 bg-blue-50 border-l-4 border-blue-500 rounded-md text-blue-900 font-semibold text-left">
            <p className="text-sm md:text-base">
              사하라 리얼테크는 철저한 법 규제를 준수하고 보안 감사를 통해 신뢰를 우선으로 한다
            </p>
          </div>
        </div>

        {/* 주요 내용 섹션 */}
        <div className="mb-12 space-y-8">
          <Card className="shadow-md border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <span>부동산 토큰화란?</span>
              </CardTitle>
              <CardDescription>실물 자산을 블록체인에 기록된 디지털 토큰으로 변환하는 과정</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <p>
                  부동산 토큰화는 실물 부동산 자산을 블록체인 기술을 이용하여 디지털화된 토큰으로 변환하는 프로세스입니다. 
                  이 토큰들은 부동산의 소유권이나 이용권을 대표하며, 분할하여 여러 투자자들에게 배분될 수 있습니다.
                </p>
                
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                      <Landmark className="h-5 w-5" />
                      자산 가치 표현
                    </h3>
                    <p className="text-sm">
                      각 토큰은 실제 부동산 자산의 가치 일부를 표현하며, 법적으로 인정되는 소유권 또는 이용권을 나타냅니다.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                      <BarChart4 className="h-5 w-5" />
                      소액 투자 가능
                    </h3>
                    <p className="text-sm">
                      소액으로도 고가의 부동산에 투자가 가능해지며, 다양한 지역과 유형의 부동산에 분산 투자할 수 있습니다.
                    </p>
                  </div>
                </div>
                
                <p className="font-medium">
                  사하라 리얼테크의 부동산 토큰화는 아발란체 프로토콜을 기반으로 하며, 스마트 컨트랙트를 통해 자동화된 배당과 
                  소유권 이전을 가능하게 합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 토큰화 과정 */}
          <Card className="shadow-md border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                <span>토큰화 프로세스</span>
              </CardTitle>
              <CardDescription>부동산이 디지털 토큰으로 변환되는 단계적 과정</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <ol className="space-y-6 list-none pl-0">
                  <li className="border-l-4 border-blue-500 pl-4 py-1">
                    <h3 className="text-lg font-semibold text-primary mb-2">1. 자산 선정 및 실사</h3>
                    <p className="text-sm">
                      투자 가치가 있는 부동산을 선정하고 법적, 재무적, 구조적 실사를 진행합니다. 
                      독립적인 평가사에 의한 자산 가치 평가가 이루어집니다.
                    </p>
                  </li>
                  
                  <li className="border-l-4 border-green-500 pl-4 py-1">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">2. 법적 구조화</h3>
                    <p className="text-sm">
                      토큰 보유자의 권리와 의무를 정의하는 법적 구조를 설계합니다. 
                      규제 준수를 위한 법률 검토와 필요한 라이센스 및 승인을 취득합니다.
                    </p>
                  </li>
                  
                  <li className="border-l-4 border-indigo-500 pl-4 py-1">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2">3. 스마트 컨트랙트 개발</h3>
                    <p className="text-sm">
                      아발란체 프로토콜 위에 토큰 발행, 소유권 이전, 배당 지급 등의 기능을 포함한 
                      스마트 컨트랙트를 개발하고 테스트합니다.
                    </p>
                  </li>
                  
                  <li className="border-l-4 border-purple-500 pl-4 py-1">
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">4. 보안 감사</h3>
                    <p className="text-sm">
                      CertiK와 같은 전문 보안 감사 기관에서 스마트 컨트랙트 코드의 
                      취약점과 잠재적 위험을 검사하고 인증합니다.
                    </p>
                  </li>
                  
                  <li className="border-l-4 border-amber-500 pl-4 py-1">
                    <h3 className="text-lg font-semibold text-amber-600 mb-2">5. 토큰 발행</h3>
                    <p className="text-sm">
                      검증된 스마트 컨트랙트를 통해 부동산 가치를 대표하는 토큰을 발행합니다. 
                      이 과정에서 토큰의 총 공급량, 가격, 거버넌스 구조가 결정됩니다.
                    </p>
                  </li>
                  
                  <li className="border-l-4 border-orange-500 pl-4 py-1">
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">6. 투자자 참여</h3>
                    <p className="text-sm">
                      KYC/AML 절차를 통과한 투자자들이 토큰을 구매하고 해당 부동산의 일부 소유권을 
                      취득합니다.
                    </p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* 토큰 구조 */}
          <Card className="shadow-md border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <span>토큰 구조</span>
              </CardTitle>
              <CardDescription>사하라 리얼테크의 계층적 토큰 구조 이해하기</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <Tabs defaultValue="prime" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="prime">프라임 마스터 NFT</TabsTrigger>
                    <TabsTrigger value="governance">거버넌스 마스터 NFT</TabsTrigger>
                    <TabsTrigger value="project">프로젝트 토큰</TabsTrigger>
                    <TabsTrigger value="company">회사 토큰</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="prime" className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-700 mb-2">프라임 마스터 NFT</h3>
                    <p className="text-sm text-amber-900">
                      총 1개만 발행되며, 프로젝트의 최종 의사 결정권과 특별 거부권을 보유합니다. 
                      회사 창립자나 주요 이해관계자가 보유하며 전체 생태계의 안정성을 보장합니다.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-amber-700 text-sm">
                      <Shield className="h-4 w-4" />
                      <span>특별 거부권 및 최종 의사결정권 보유</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="governance" className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">거버넌스 마스터 NFT</h3>
                    <p className="text-sm text-blue-900">
                      총 99개가 발행되며, 한국 사모펀드 규제에 맞게 설계되었습니다. A, B, C 클래스로 구분되어 
                      각기 다른 의결권 가중치를 가집니다.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="p-2 bg-blue-100 rounded border border-blue-200">
                        <h4 className="font-medium text-blue-800">A 클래스</h4>
                        <p className="text-xs text-blue-700">10개 발행 / 높은 의결권</p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded border border-blue-200">
                        <h4 className="font-medium text-blue-800">B 클래스</h4>
                        <p className="text-xs text-blue-700">39개 발행 / 중간 의결권</p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded border border-blue-200">
                        <h4 className="font-medium text-blue-800">C 클래스</h4>
                        <p className="text-xs text-blue-700">50개 발행 / 기본 의결권</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="project" className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">프로젝트 토큰 (RSA-020)</h3>
                    <p className="text-sm text-green-900">
                      각 부동산 프로젝트마다 발행되는 토큰으로, 특정 부동산의 소유권 지분을 나타냅니다. 
                      임대 수익이나 자본 이득의 분배 권한을 가지며, 투자자들은 이 토큰을 통해 부동산에 투자합니다.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-green-700 text-sm">
                      <BarChart4 className="h-4 w-4" />
                      <span>임대 수익 분배 및 자본 이득 참여 권한</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="company" className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-700 mb-2">회사 토큰 (SRT)</h3>
                    <p className="text-sm text-purple-900">
                      3-5개 이상의 성공적인 부동산 토큰화 프로젝트 후에 발행 예정인 회사 유틸리티 토큰입니다. 
                      플랫폼 내 수수료 할인, 스테이킹 보상, 거버넌스 참여 등의 혜택을 제공하며, 
                      향후 거래소 상장을 목표로 합니다.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-purple-700 text-sm">
                      <Wallet className="h-4 w-4" />
                      <span>거래소 상장 및 글로벌 유동성 확보 목표</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* 법적 프레임워크 */}
          <Card className="shadow-md border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>법적 프레임워크</span>
              </CardTitle>
              <CardDescription>규제 준수 및 투자자 보호를 위한 법적 구조</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-blue-50 p-5 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">한국 법률 준수</h3>
                <p className="text-sm text-blue-900">
                  사하라 리얼테크의 모든 프로젝트는 한국의 자본시장법, 부동산투자회사법, 
                  전자금융거래법 등 관련 법규를 철저히 준수하며 설계됩니다.
                </p>
                <div className="mt-3 text-blue-700 text-sm flex items-start gap-2">
                  <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>
                    특히 사모펀드 규제에 따른 최대 99명의 투자자 제한을 반영하여 
                    거버넌스 마스터 NFT는 99개로 제한됩니다.
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    투자자 KYC/AML
                  </h3>
                  <p className="text-sm text-gray-600">
                    모든 투자자는 신원 확인(KYC)과 자금세탁방지(AML) 절차를 
                    의무적으로 통과해야 토큰 구매가 가능합니다.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    스마트 컨트랙트 법적 검토
                  </h3>
                  <p className="text-sm text-gray-600">
                    발행되는 모든 스마트 컨트랙트는 법률 전문가의 검토를 받아 
                    법적 효력과 규제 준수를 보장합니다.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    투자자 권리 보호
                  </h3>
                  <p className="text-sm text-gray-600">
                    토큰 보유자의 권리와 이익 분배 방식이 명확하게 정의되어 있으며, 
                    이는 스마트 컨트랙트에 코드화되어 있습니다.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    정보 공시
                  </h3>
                  <p className="text-sm text-gray-600">
                    모든 투자 대상 부동산의 가치 평가, 수익률, 위험 요소 등이 
                    투명하게 공개되어 투자자의 정보 접근성을 보장합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">토큰화된 부동산에 투자할 준비가 되셨나요?</h2>
          <p className="mb-6">블록체인으로 실물자산에 투자하는 새로운 방법을 경험해보세요.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3">
                투자 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-to-invest">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-6 py-3">
                투자 가이드 보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}