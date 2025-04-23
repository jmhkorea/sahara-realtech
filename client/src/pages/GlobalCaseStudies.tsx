import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";

export default function GlobalCaseStudies() {
  return (
    <>
      <SEO 
        title="해외 사례로 본 전망 | SaharaRealTech" 
        description="글로벌 토큰증권(STO)과 실제세계자산(RWA) 성공 사례 및 미래 전망" 
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 pl-0 hover:pl-2 transition-all">
              <ArrowLeft size={16} />
              <span>메인으로 돌아가기</span>
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-500 py-10 px-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">해외 사례로 본 전망</h1>
            <p className="text-lg opacity-90">글로벌 토큰화 자산 시장의 성공 사례와 미래 발전 방향</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <Tabs defaultValue="sto" className="w-full my-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sto">토큰증권(STO) 해외 사례</TabsTrigger>
                  <TabsTrigger value="rwa">실제세계자산(RWA) 해외 사례</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sto" className="mt-6">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-purple-600">미국의 토큰증권(STO) 성공 사례</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">BCAP(블록체인 캐피털 펀드 토큰)</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">발행연도:</span> 2017년
                          </p>
                          <p>
                            <span className="font-semibold">모집금액:</span> 1,000만 달러
                          </p>
                          <p>
                            <span className="font-semibold">성과:</span> 2023년 기준 NAV(순자산가치)는 초기 모집 금액의 14.1배인 14.1달러로 성장
                          </p>
                          <p className="mt-3">
                            ERC-20 형태로 이더리움 네트워크 위에서 발행되었으며, 블록체인캐피탈의 세 번째 펀드의 지분과 권리를 표현했습니다. 투자 수익을 배분받는 에버그린형 펀드 토큰으로 설계되었습니다.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">INX 토큰</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">발행연도:</span> 2020년
                          </p>
                          <p>
                            <span className="font-semibold">모집금액:</span> 8,500만 달러
                          </p>
                          <p>
                            <span className="font-semibold">특징:</span> SEC 정식 등록을 거친 주식 형태의 증권형 토큰
                          </p>
                          <p className="mt-3">
                            INX는 SEC의 정식 브로커로 등록된 토큰증권 거래 플랫폼이자 IPO 플랫폼입니다. INX 토큰은 회사가 흑자 구간에 진입하면 회사 수익의 40%를 토큰 홀더들에게 배분하도록 설계되었습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500 mt-8">
                      <h3 className="text-xl font-bold mb-3">리퍼블릭 노트(Republic Note)</h3>
                      <p>
                        투자 플랫폼 Republic이 발행한 에버그린형 펀드의 지분과 배당금 권리를 포함한 토큰증권입니다. Republic이 투자한 스타트업이 성공적으로 EXIT할 경우 발생하는 수익을 토큰 홀더들에게 분배하는 구조로 설계되었습니다.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-purple-600 mt-10">유럽의 토큰증권(STO) 현황</h2>
                    
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-xl font-bold mb-3">스위스와 리히텐슈타인의 STO 생태계</h3>
                      <p>
                        유럽에서는 특히 스위스와 리히텐슈타인이 토큰증권 규제와 시장 발전에 앞서 있습니다. 스위스의 '크립토 밸리'로 불리는 주크(Zug) 지역을 중심으로 다양한 블록체인 기업들이 토큰증권 발행 플랫폼을 구축하고 있습니다.
                      </p>
                      <p className="mt-2">
                        SEBA Bank AG와 Sygnum Bank AG는 스위스 금융 감독 당국(FINMA)의 승인을 받은 디지털 자산 은행으로, 토큰증권 발행과 유통에 중요한 역할을 하고 있습니다.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-purple-600 mt-10">STO 시장의 미래 전망</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div className="bg-indigo-50 p-5 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">단기 전망 (1-2년)</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>규제 체계의 명확화로 법적 불확실성 감소</li>
                          <li>주요 증권사와 금융기관의 STO 플랫폼 출시 증가</li>
                          <li>초기 유통 시장 형성 및 유동성 제공자 참여 확대</li>
                          <li>전통 금융과 블록체인 기술의 통합 가속화</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 p-5 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">중장기 전망 (3-5년)</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>글로벌 STO 시장 규모 100억 달러 이상 성장 예상</li>
                          <li>전통 자본시장과 토큰 시장의 경계 희미해짐</li>
                          <li>다양한 자산 클래스의 토큰화 확대</li>
                          <li>대형 기관투자자의 토큰화 자산 할당 비율 증가</li>
                          <li>국경 간 STO 거래를 위한 국제 표준 확립</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rwa" className="mt-6">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-indigo-600">글로벌 RWA 성공 사례</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">RealT (미국)</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">설립연도:</span> 2019년
                          </p>
                          <p>
                            <span className="font-semibold">토큰화 자산:</span> 미국 주택 및 상업용 부동산
                          </p>
                          <p>
                            <span className="font-semibold">최소 투자금:</span> 약 50달러부터
                          </p>
                          <p className="mt-3">
                            RealT는 미국 디트로이트를 중심으로 주택을 토큰화하여 글로벌 투자자들에게 제공합니다. 각 부동산은 독립적인 LLC로 설립되며, 투자자는 해당 LLC의 지분을 표현하는 ERC-20 토큰을 구매합니다. 월 임대 수익이 토큰 홀더들에게 자동 분배됩니다.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Centrifuge (유럽)</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">설립연도:</span> 2017년
                          </p>
                          <p>
                            <span className="font-semibold">토큰화 자산:</span> 무역금융, 인보이스, 부동산 대출
                          </p>
                          <p>
                            <span className="font-semibold">총 대출 규모:</span> 2억 달러 이상
                          </p>
                          <p className="mt-3">
                            Centrifuge는 실물 자산을 담보로 한 대출을 토큰화하는 블록체인 플랫폼입니다. Tinlake라는 풀을 통해 부동산 대출, 인보이스, 무역금융 등 다양한 자산을 토큰화하여 DeFi 생태계에 연결합니다. 2023년 기준 총 2억 달러 이상의 실물 자산이 Centrifuge 플랫폼에서 토큰화되었습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-500 mt-8">
                      <h3 className="text-xl font-bold mb-3">Masterworks (미술품 토큰화)</h3>
                      <p>
                        Masterworks는 Banksy, Basquiat, Picasso 등 유명 예술가들의 작품을 토큰화하여 일반 투자자들에게 제공하는 플랫폼입니다. SEC에 등록된 증권 형태로 제공되며, 최소 500달러부터 투자가 가능합니다. 미술 작품의 평균 수익률은 연 15% 이상으로, 포트폴리오 다각화에 효과적인 대안 자산으로 주목받고 있습니다.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-indigo-600 mt-10">아시아 RWA 시장 현황</h2>
                    
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-xl font-bold mb-3">싱가포르와 홍콩의 RWA 생태계</h3>
                      <p>
                        아시아에서는 싱가포르와 홍콩이 RWA 토큰화의 중심지로 부상하고 있습니다. 싱가포르의 DBS 은행은 디지털 채권 플랫폼을 출시하여 수억 달러 규모의 채권을 토큰화했습니다. 또한 싱가포르 통화청(MAS)의 Project Guardian은 토큰화된 채권 및 예금 상품에 대한 기관 거래를 지원하고 있습니다.
                      </p>
                      <p className="mt-2">
                        홍콩은 2022년 가상자산 정책 방향을 발표하며 RWA 분야에 대한 지원을 확대하고 있으며, 홍콩 증권선물위원회(SFC)는 토큰화 증권 발행 및 거래에 대한 규제 프레임워크를 구축하고 있습니다.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-indigo-600 mt-10">RWA 시장의 성장 잠재력</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div className="bg-blue-50 p-5 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">시장 규모 전망</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>2025년까지 글로벌 RWA 토큰화 시장 규모 160억 달러 예상</li>
                          <li>2030년까지 4조 달러 이상의 실물 자산이 토큰화될 것으로 전망</li>
                          <li>특히 부동산, 예술품, 인프라, 사모펀드 분야에서 높은 성장률 예상</li>
                          <li>기관 투자자들의 참여 확대로 시장 성장 가속화</li>
                        </ul>
                      </div>
                      
                      <div className="bg-indigo-50 p-5 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">주요 성장 요인</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>법적/규제적 확실성 증가</li>
                          <li>금융 기관의 디지털 자산 전략 채택</li>
                          <li>전통적 자산 클래스의 낮은 수익률 환경</li>
                          <li>투자자들의 대체 자산 수요 증가</li>
                          <li>블록체인 인프라 및 스마트 계약 기술 발전</li>
                          <li>디지털 신원 확인 기술 및 KYC/AML 솔루션 향상</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 p-6 rounded-lg my-6 border-l-4 border-indigo-500">
                      <p className="italic text-lg">
                        "실물 자산의 토큰화는 블록체인 기술의 가장 유망한 응용 분야 중 하나입니다. 이는 수조 달러 규모의 유동성이 낮은 자산들을 더 효율적이고 접근성 높은 형태로 전환할 수 있는 잠재력을 가지고 있습니다. 앞으로 5년간 RWA 토큰화는 블록체인의 킬러 애플리케이션으로 자리잡을 것입니다." - 세계경제포럼(WEF) 보고서
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-10 flex justify-center">
                <Link href="/properties">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-3 text-lg rounded-full hover:from-purple-700 hover:to-indigo-600 transition-all">
                    지금 투자하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}