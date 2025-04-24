import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

export default function TokenSecuritiesGuide() {
  return (
    <>
      <SEO 
        title="증권형 토큰(STO) 제대로 알기 | SaharaRealTech" 
        description="증권형 토큰(STO)의 개념과 혁신적인 가치에 대한 상세 가이드" 
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
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-10 px-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">증권형 토큰(STO) 제대로 알기</h1>
            <p className="text-lg opacity-90">블록체인 기술을 활용한 증권 혁신의 시작</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">증권형 토큰발행(STO)의 개념과 구성요소</h2>
              
              <p>
                증권형 토큰발행(STO: Security Token Offering)은 분산원장 기술(블록체인)을 기반으로 디지털화된 자본시장법상 증권을 발행하는 것을 의미합니다. 
                STO를 정확히 이해하기 위해서는 다음 세 가지 구성요소를 파악해야 합니다:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-700">S(Security): 증권</h3>
                  <p className="mt-2">
                    자본시장법상 증권을 의미하며, 주로 수익증권이나 투자계약증권 형태가 활용됩니다.
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-cyan-700">T(Token): 토큰</h3>
                  <p className="mt-2">
                    증권이 분산원장(블록체인)에 기재된 형태로, 중앙화된 서버가 아닌 분산원장 기술을 통해 처리됩니다.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-indigo-700">O(Offering): 발행</h3>
                  <p className="mt-2">
                    증권이 거래되거나 판매될 수 있도록 등록하는 과정으로, IPO보다 적은 규제를 받지만 ICO보다는 투자자 보호와 정보공개 의무가 강화되어 있습니다.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">증권형 토큰(STO)이 불러올 3가지 혁신</h2>
              
              <Accordion type="single" collapsible className="w-full my-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-semibold">1. 금융 상품의 혁신</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      STO를 통해 새롭게 포장된 혁신적인 금융 상품들이 등장할 것입니다. 기존의 금융상품들이 현대적 니즈에 맞게 재해석되는 현상이 일어날 것입니다.
                    </p>
                    <p className="mt-2">
                      <strong>예시:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>26주간 적립식으로 투자하는 26주 펀드</li>
                      <li>행운의 숫자 7로 구성된 코스피 상위 77개 기업 분산 투자 상품</li>
                      <li>특정 테마나 트렌드에 맞춘 투자 상품</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl font-semibold">2. 증권 발행의 혁신</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      증권형 토큰은 투자자의 자본효율성을 크게 향상시킬 수 있습니다. 기존의 IPO 방식에서는 투자자가 기업 전체의 지분에 투자해야 했습니다.
                    </p>
                    <p className="mt-2">
                      <strong>STO 방식의 장점:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>하이브의 NewJeans가 향후 5년간 벌어들이는 매출액의 30%에 직접 투자</li>
                      <li>특정 앨범의 판매 수익에 집중 투자</li>
                      <li>횡성 한우 목장의 우선주에 투자</li>
                      <li>매월 배당을 지급하는 주차장 수익권 투자</li>
                    </ul>
                    <p className="mt-2">
                      이처럼 기업은 회사 전체의 지분을 희석시키지 않으면서도 특정 프로젝트나 자산에 대한 권리를 토큰화하여 자금을 조달할 수 있습니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl font-semibold">3. 자산 유동화의 혁신</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      증권형 토큰은 기존에 상장할 방법이 없었던 다양한 자산들을 유동화할 수 있는 기회를 제공합니다.
                    </p>
                    <p className="mt-2">
                      <strong>유동화 가능한 자산 예시:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>주차장, 상업용 부동산</li>
                      <li>지적재산권(IP)</li>
                      <li>예술품, 고가의 사치재</li>
                      <li>인프라 프로젝트</li>
                    </ul>
                    <p className="mt-2">
                      이런 자산들이 토큰화되어 시장에서 거래되면, 참여자 간 거래를 통해 적정 가격이 형성되고, 오랫동안 움직이지 않던 비유동 자산들이 시장에 등장하는 계기가 될 것입니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">투자자 인식 변화와 마케팅 패러다임 전환</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg my-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">증권형 토큰의 등장으로 예상되는 변화:</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>토큰에 대한 인식 개선:</strong> 증권형 토큰이 합법적으로 거래되면서 암호화폐와 같은 토큰에 대한 부정적 인식이 개선될 수 있습니다.
                  </li>
                  <li>
                    <strong>수량에서 가치 개념으로 전환:</strong> 기존의 "테슬라 5주", "삼성전자 10주"와 같은 수량 개념에서 "테슬라 300만원어치", "삼성전자 100만원어치"와 같은 가치 개념으로 투자 접근이 변화할 것입니다.
                  </li>
                  <li>
                    <strong>아이디어 중심 인식:</strong> 회사 이름이나 종목코드보다는 "전기차 1등 회사", "반도체 관련주" 등 투자 아이디어 중심으로 인식이 전환될 수 있습니다.
                  </li>
                </ol>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">미국의 STO 사례</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-bold">BCAP(블록체인 캐피털 펀드 토큰)</h3>
                  <p className="mt-2">
                    미국의 첫 STO 사례로, 2017년 블록체인캐피탈의 펀드 지분과 권리를 나타내는 토큰입니다. 총 1,000만 달러의 자금을 모집했으며, 2023년 기준 NAV(순자산가치)는 초기 모집 금액의 14.1배인 14.1달러로 성장했습니다.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-bold">INX 토큰</h3>
                  <p className="mt-2">
                    주식 형태로 발행된 증권형 토큰의 대표 사례로, SEC의 정식 브로커로 등록된 토큰증권 거래 플랫폼이자 IPO 플랫폼입니다. 회사가 흑자 구간에 진입하면 회사 수익의 40%를 토큰 홀더들에게 배분하도록 설계되었습니다.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">결론</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg my-6 border-l-4 border-blue-500">
                <p className="italic text-lg">
                  "증권형 토큰은 아직 초기 단계이지만, 앞으로 금융 시장에 획기적인 변화를 가져올 것으로 기대됩니다. 이는 블록체인과 금융 기관을 연결하고, 대중에게 토큰에 대한 경험을 제공하는 혁신의 가교 역할을 할 것입니다."
                </p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <Link href="/properties">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 text-lg rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all">
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