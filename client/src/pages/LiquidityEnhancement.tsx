import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Droplets, 
  BarChart4, 
  PieChart, 
  Clock, 
  ArrowRightLeft, 
  ArrowRight,
  Users,
  RefreshCw,
  Globe,
  Wallet
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

export default function LiquidityEnhancement() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-16">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            유동성 확보
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            블록체인 기술을 활용하여 전통적인 부동산 투자의 유동성 문제를 해결하고 투자자에게 새로운 가능성을 제공합니다.
          </p>

          <div className="p-3 mt-5 bg-blue-50 border-l-4 border-blue-500 rounded-md text-blue-900 font-semibold text-left">
            <p className="text-sm md:text-base">
              사하라 리얼테크는 철저한 법 규제를 준수하고 보안 감사를 통해 신뢰를 우선으로 한다
            </p>
          </div>
        </div>

        {/* 주요 내용 섹션 */}
        <div className="mb-12 space-y-8">
          <Card className="shadow-md border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span>부동산 유동성 혁신</span>
              </CardTitle>
              <CardDescription>토큰화를 통한 부동산 투자의 유동성 문제 해결</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <p>
                  전통적인 부동산 투자는 높은 진입 장벽, 거래 비용, 긴 매각 기간 등으로 인해 유동성이 제한되어 왔습니다. 
                  사하라 리얼테크의 블록체인 기반 토큰화 시스템은 이러한 문제를 근본적으로 해결하고 
                  투자자에게 전례 없는 유동성과 유연성을 제공합니다.
                </p>
                
                <div className="my-6 bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">기존 부동산 투자의 유동성 문제</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800">긴 매각 기간</h4>
                        <p className="text-sm text-blue-700">
                          부동산을 매각하는 데 수개월에서 수년이 소요될 수 있으며, 그 동안 자본은 묶여 있게 됩니다.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <BarChart4 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800">높은 거래 비용</h4>
                        <p className="text-sm text-blue-700">
                          중개 수수료, 세금, 법적 비용 등 부동산 거래에는 상당한 부대비용이 발생합니다.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800">제한된 구매자 풀</h4>
                        <p className="text-sm text-blue-700">
                          고가의 부동산은 구매 가능한 잠재 투자자의 수가 제한적입니다.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800">지역적 한계</h4>
                        <p className="text-sm text-blue-700">
                          해외 부동산 투자에는 복잡한 법적, 세무적 장벽이 존재합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="font-medium">
                  사하라 리얼테크의 토큰화 시스템은 이러한 전통적인 유동성 장벽을 극복하고, 
                  투자자에게 새로운 차원의 투자 유연성을 제공합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 토큰화를 통한 유동성 솔루션 */}
          <Card className="shadow-md border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                <span>토큰화를 통한 유동성 솔루션</span>
              </CardTitle>
              <CardDescription>부동산 투자의 유동성을 혁신적으로 개선하는 방법</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <Tabs defaultValue="fractional" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="fractional">부분 소유권</TabsTrigger>
                    <TabsTrigger value="trading">거래 용이성</TabsTrigger>
                    <TabsTrigger value="global">글로벌 접근성</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="fractional" className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="md:w-1/3">
                        <PieChart className="h-20 w-20 text-blue-500 mx-auto" />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">부분 소유권 활성화</h3>
                        <p className="text-sm text-blue-900">
                          부동산 자산은 수천 개의 토큰으로 분할되어 소액 투자가 가능해집니다. 
                          최소 투자 금액은 각 프로젝트마다 다르지만, 일반적으로 100만원 이하부터 시작할 수 
                          있어 진입 장벽이 크게 낮아집니다. 투자자는 자신의 예산과 포트폴리오 전략에 
                          맞게 투자 규모를 조절할 수 있습니다.
                        </p>
                        <div className="mt-3 p-2 bg-white rounded-md border border-blue-200">
                          <p className="text-xs text-blue-700">
                            <strong>예시:</strong> 50억원 가치의 부동산이 5만 개의 토큰으로 나뉘면, 
                            각 토큰의 가치는 10만원이 됩니다. 투자자는 원하는 만큼의 토큰을 구매할 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trading" className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="md:w-1/3">
                        <RefreshCw className="h-20 w-20 text-blue-500 mx-auto" />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">24/7 거래 가능한 2차 시장</h3>
                        <p className="text-sm text-blue-900">
                          부동산 토큰은 전용 2차 거래 플랫폼에서 언제든지 거래할 수 있습니다. 
                          전통적인 부동산 매각과 달리, 토큰 거래는 몇 분 내에 완료될 수 있으며, 
                          일부 또는 전체 지분을 쉽게 매각할 수 있습니다. 이는 투자자에게 
                          전례 없는 수준의 유동성과 유연성을 제공합니다.
                        </p>
                        <div className="mt-3 p-2 bg-white rounded-md border border-blue-200">
                          <p className="text-xs text-blue-700">
                            <strong>장점:</strong> 2차 시장의 유동성으로 인해 투자자는 부동산 자산을 
                            매각하기 위해 기다릴 필요 없이 필요할 때 자본을 회수할 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="global" className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="md:w-1/3">
                        <Globe className="h-20 w-20 text-blue-500 mx-auto" />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">글로벌 투자자 접근성</h3>
                        <p className="text-sm text-blue-900">
                          블록체인 기술은 지리적 경계를 허물어 전 세계 투자자들이 한국, 동남아시아, 
                          기타 지역의 프리미엄 부동산에 쉽게 투자할 수 있게 합니다. 이는 투자자 풀을 
                          크게 확장하여 더 많은 유동성을 창출하고, 다양한 통화로 투자가 가능하게 합니다.
                        </p>
                        <div className="mt-3 p-2 bg-white rounded-md border border-blue-200">
                          <p className="text-xs text-blue-700">
                            <strong>글로벌 영향:</strong> 더 많은 잠재 투자자에게 접근함으로써 자산의 가치 평가가 
                            더욱 효율적으로 이루어지고, 유동성 프리미엄이 형성될 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* 유동성 전략 */}
          <Card className="shadow-md border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-blue-600" />
                <span>유동성 확보 전략</span>
              </CardTitle>
              <CardDescription>투자자 유동성을 극대화하기 위한 사하라 리얼테크의 접근법</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      유동성 풀 운영
                    </h3>
                    <p className="text-sm text-blue-800">
                      사하라 리얼테크는 각 부동산 프로젝트마다 별도의 유동성 풀을 운영합니다. 
                      이 풀은 토큰의 초기 판매 수익 중 일부(일반적으로 15-20%)를 보유하여, 
                      2차 시장에서 필요할 때 매수-매도 주문을 지원합니다. 
                      이를 통해 투자자는 언제든지 적정 가격에 토큰을 사고 팔 수 있는 환경이 조성됩니다.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-blue-200 rounded-lg">
                      <h3 className="text-md font-semibold text-blue-700 mb-2">정기적 배당 분배</h3>
                      <p className="text-sm text-gray-700">
                        부동산에서 발생하는 임대 수익은 스마트 컨트랙트를 통해 자동으로 토큰 
                        보유자에게 분배됩니다. 이러한 정기적인 현금 흐름은 투자자에게 
                        유동성의 일부로 작용합니다.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-blue-200 rounded-lg">
                      <h3 className="text-md font-semibold text-blue-700 mb-2">가격 안정화 메커니즘</h3>
                      <p className="text-sm text-gray-700">
                        사하라 리얼테크는 시장 상황에 따라 유동성 풀의 자금을 활용하여 
                        토큰 가격의 과도한 변동성을 완화하고 안정적인 거래 환경을 유지합니다.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-blue-200 rounded-lg">
                      <h3 className="text-md font-semibold text-blue-700 mb-2">정기 평가 업데이트</h3>
                      <p className="text-sm text-gray-700">
                        모든 부동산은 정기적으로(보통 6개월 또는 1년마다) 독립적인 평가사에 의해 
                        재평가되며, 이 정보는 투명하게 공개되어 투자자가 토큰의 내재 가치를 
                        정확히 파악할 수 있게 합니다.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-blue-200 rounded-lg">
                      <h3 className="text-md font-semibold text-blue-700 mb-2">토큰 바이백 프로그램</h3>
                      <p className="text-sm text-gray-700">
                        특정 조건에서 회사는 시장에서 토큰을 매입하여 유동성을 제공하거나, 
                        토큰 가격이 실제 자산 가치보다 크게 낮을 경우 가치 확보를 지원합니다.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                    <h3 className="text-md font-semibold text-yellow-800 mb-2">향후 거래소 상장 계획</h3>
                    <p className="text-sm text-yellow-900">
                      사하라 리얼테크는 3-5개의 성공적인 부동산 토큰화 프로젝트 이후 회사 토큰(SRT)을 
                      출시하고 국내외 암호화폐 거래소 상장을 추진할 계획입니다. 이를 통해 
                      부동산 토큰의 유동성을 더욱 향상시키고 글로벌 투자자 기반을 확대할 것입니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 투자자 혜택 */}
          <Card className="shadow-md border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>유동성의 투자자 혜택</span>
              </CardTitle>
              <CardDescription>향상된 유동성이 투자자에게 제공하는 실질적 가치</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-blue max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-md font-semibold text-blue-700 mb-2">빠른 자본 회수</h3>
                    <p className="text-sm text-gray-700">
                      투자자는 부동산 매각이 아닌 토큰 거래를 통해 빠르게 자본을 회수하거나 
                      포지션을 조정할 수 있습니다.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-md font-semibold text-blue-700 mb-2">포트폴리오 다각화</h3>
                    <p className="text-sm text-gray-700">
                      적은 자본으로도 여러 지역과 유형의 부동산에 분산 투자가 가능해져 
                      위험을 분산시킬 수 있습니다.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-md font-semibold text-blue-700 mb-2">저렴한 거래 비용</h3>
                    <p className="text-sm text-gray-700">
                      블록체인 기반 거래는 전통적인 부동산 거래보다 훨씬 낮은 비용으로 
                      진행될 수 있습니다.
                    </p>
                  </div>
                </div>
                
                <div className="p-5 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">투자 사례 연구</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-blue-800 mb-1">개인 투자자 케이스</h4>
                      <p className="text-sm text-gray-700">
                        김민수 님은 강남 오피스 빌딩 프로젝트에 500만원을 투자했습니다. 6개월 후 
                        갑작스러운 자금 필요로 인해 투자금을 회수해야 했는데, 토큰 거래 플랫폼을 통해 
                        단 하루 만에 540만원(8% 수익)에 자신의 토큰을 매각할 수 있었습니다. 
                        전통적인 부동산 투자였다면 이러한 빠른 자본 회수는 불가능했을 것입니다.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md shadow-sm">
                      <h4 className="font-medium text-blue-800 mb-1">기관 투자자 케이스</h4>
                      <p className="text-sm text-gray-700">
                        ABC 자산운용사는 5개의 다른 부동산 프로젝트(서울, 부산, 베트남, 태국, 말레이시아)에 
                        각각 1억원씩 총 5억원을 분산 투자했습니다. 각 프로젝트의 성과에 따라 
                        운용사는 특정 지역의 토큰 비중을 조정하면서 전체 포트폴리오의 
                        리스크와 수익률을 효과적으로 관리할 수 있었습니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
                  <p className="text-sm text-blue-900 font-medium">
                    "부동산 토큰화의 가장 큰 혁신은 기존에 유동성이 낮았던 자산 클래스에 
                    새로운 유동성을 부여함으로써, 투자자의 유연성과 선택권을 크게 확대했다는 점입니다. 
                    이는 부동산 투자 시장의 근본적인 패러다임 변화를 의미합니다."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">부동산의 유동성 한계를 뛰어넘으세요</h2>
          <p className="mb-6">사하라 리얼테크와 함께 토큰화된 부동산의 새로운 투자 경험을 시작하세요.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                투자 프로젝트 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/token-project">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3">
                토큰 시스템 자세히 알아보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}