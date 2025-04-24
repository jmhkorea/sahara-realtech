import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import rwaConceptImg from "../assets/rwa_concept.png";
import tokenizationBridgeImg from "../assets/tokenization_bridge.png";

export default function RealWorldAssetsGuide() {
  return (
    <>
      <SEO 
        title="실제세계자산(RWA) 제대로 알기 | SaharaRealTech" 
        description="실제세계자산(RWA)의 개념과 블록체인 기술을 활용한 토큰화에 대한 상세 가이드" 
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
          <div className="bg-gradient-to-r from-green-600 to-teal-500 py-10 px-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">실제세계자산(RWA) 제대로 알기</h1>
            <p className="text-lg opacity-90">블록체인으로 현실 세계의 자산을 디지털화하는 혁신</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA의 개념과 의의</h2>
              
              <p>
                실제세계자산(RWA, Real World Assets)은 블록체인 기술을 활용하여 현실 세계에 존재하는 유형·무형의 자산을 디지털 토큰으로 변환하여 블록체인 상에서 거래할 수 있게 하는 혁신적인 기술입니다. 
                부동산, 예술품, 채권, 주식 등의 실물 자산을 블록체인상에서 토큰화함으로써 전통적인 금융과 디지털 금융의 경계를 허물고, 실물 자산 시장의 비효율성을 해결하는 솔루션으로 주목받고 있습니다.
              </p>
              
              <div className="my-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={rwaConceptImg} 
                  alt="RWA 개념 설명 - 오프체인에서 온체인으로" 
                  className="w-full h-auto object-contain"
                />
                <div className="p-4 text-sm text-gray-600 text-center">
                  <p>오프체인 실물 자산이 토큰화를 통해 온체인으로 이동하는 과정</p>
                </div>
              </div>
              
              <p>
                기존의 실물 자산 거래는 낮은 유동성, 높은 진입 장벽, 복잡한 절차로 인해 접근성이 제한적이었습니다. RWA는 블록체인의 투명성, 보안성, 분할 가능성을 활용하여 이러한 문제를 해결합니다.
              </p>
              
              <div className="bg-green-50 p-5 rounded-lg border border-green-200 my-4">
                <h3 className="text-lg font-bold text-green-700 mb-2">STO vs RWA: 주요 차이점</h3>
                <p className="text-sm">
                  STO(Security Token Offering)와 유사하지만, RWA는 더 광범위한 자산을 포괄하며 주로 퍼블릭 블록체인에서 탈중앙화된 방식으로 운영됩니다. 반면 STO는 증권성 자산에 한정되어 있고, 주로 프라이빗 블록체인에서 중앙화된 방식으로 운영됩니다.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA 토큰화의 작동 원리</h2>
              
              <div className="my-6 bg-black rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={tokenizationBridgeImg} 
                  alt="토큰화 브릿지 - 오프체인 자산을 온체인으로 연결" 
                  className="w-full h-auto object-contain"
                />
                <div className="p-4 text-sm text-gray-300 text-center">
                  <p>토큰화 브릿지(Tokenization Bridge)를 통한 오프체인-온체인 자산 연결</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg my-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">RWA 토큰화 프로세스</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>자산 선택과 평가:</strong> 토큰화할 자산을 식별하고 가치를 평가</li>
                  <li><strong>법적 규제 확인:</strong> 관련 법적 이슈와 규제 검토</li>
                  <li><strong>토큰 구조 설정:</strong> 토크노믹스, 운영 방식, 네트워크 등 결정</li>
                  <li><strong>발행 및 배포:</strong> 실물 자산에 대응하는 토큰 발행</li>
                  <li><strong>거래:</strong> 온체인 상에서 토큰 거래 진행</li>
                  <li><strong>유통 및 소각:</strong> 토큰의 지속적 유통과 필요시 소각</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  이 과정에서 오라클은 실물 자산의 가치나 상태 변화를 실시간으로 스마트 컨트랙트에 업데이트하여 토큰의 가치가 실제 자산 가치와 연동되도록 합니다.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-green-700">기술적 구현</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>스마트 계약:</strong> 자산의 소유권, 수익 분배, 거래 규칙 등을 자동화</li>
                    <li><strong>토큰 표준:</strong> ERC-20, ERC-721(NFT), ERC-1155 등 활용</li>
                    <li><strong>오라클:</strong> 현실 세계의 정보를 블록체인에 안전하게 전달</li>
                    <li><strong>신원 확인 및 KYC/AML:</strong> 규제 준수를 위한 사용자 검증 시스템</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-teal-700">아발란체 활용 이점</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>빠른 거래 처리 속도와 낮은 수수료</li>
                    <li>강력한 보안성과 탈중앙화</li>
                    <li>높은 확장성과 처리량</li>
                    <li>EVM 호환성으로 다양한 스마트 계약 구현 가능</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA의 주요 장점</h2>
              
              <Accordion type="single" collapsible className="w-full my-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-semibold">자산 소유의 민주화</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      고가의 자산(부동산, 미술품 등)을 소액으로 나누어 더 많은 투자자들이 접근할 수 있게 합니다. 이전에는 자본력이 큰 투자자만 접근 가능했던 자산에 일반 대중도 투자할 수 있는 기회를 제공합니다.
                    </p>
                    <p className="mt-2">
                      <strong>예시:</strong> 10억원 상당의 상업용 부동산을 1만개의 토큰으로 나누어 10만원부터 투자할 수 있도록 하는 방식
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl font-semibold">유동성 향상</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      전통적으로 유동성이 낮은 자산들(부동산, 미술품, 사모펀드 등)을 토큰화하여 24/7 글로벌 시장에서 거래할 수 있게 함으로써 유동성을 크게 향상시킵니다. 투자자는 필요할 때 자신의 지분 일부를 쉽게 매도할 수 있습니다.
                    </p>
                    <p className="mt-2">
                      부동산 투자의 경우, 전통적으로는 매각 과정에 수개월이 걸릴 수 있지만, 토큰화된 부동산은 언제든지 필요한 금액만큼 즉시 매도할 수 있습니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl font-semibold">거래 효율성 증대</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>중개자 감소:</strong> 직접적인 P2P 거래로 중개 비용 절감</li>
                      <li><strong>자동화된 규정 준수:</strong> 스마트 계약을 통한 규제 요구사항 자동 이행</li>
                      <li><strong>결제 시간 단축:</strong> 거래 및 결제 프로세스 시간 단축</li>
                      <li><strong>국경 없는 거래:</strong> 지리적 제약 없는 글로벌 거래 가능</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-xl font-semibold">투명성과 추적성</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      블록체인의 분산 원장 기술은 자산의 소유권 및 거래 이력에 대한 투명한 기록을 제공합니다. 모든 거래는 공개적으로 검증 가능하며, 실시간으로 자산의 성과와 가치를 모니터링할 수 있습니다.
                    </p>
                    <p className="mt-2">
                      기존 금융 시스템에서는 복잡한 소유권 구조와 불투명한 거래 기록으로 인해 정보 비대칭이 발생할 수 있지만, RWA 토큰화는 이러한 문제를 해결하여 투자자 신뢰를 높입니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">주요 RWA 사례 및 프로젝트</h2>
              
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-green-700">부동산 토큰화</h3>
                  <ul className="list-disc pl-6 mt-2">
                    <li>RealT: 미국 주택을 토큰화</li>
                    <li>Propy: 블록체인 기반 부동산 거래</li>
                    <li>Elevated Returns: 고급 리조트 및 상업용 부동산</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-green-700">금융 상품의 토큰화</h3>
                  <ul className="list-disc pl-6 mt-2">
                    <li>MakerDAO: 실물 자산 담보 스테이블코인</li>
                    <li>Centrifuge: 실물 자산 담보 대출</li>
                    <li>Maple Finance: 기관 대출 플랫폼</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-green-700">예술 및 수집품</h3>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Masterworks: 명화 분할 소유</li>
                    <li>Fraction: 고가 NFT 분할 소유</li>
                    <li>Async Art: 디지털 아트 계층화</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA가 직면한 과제</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="border border-red-100 rounded-lg p-5 bg-red-50">
                  <h3 className="text-xl font-bold text-red-700 mb-3">규제 위험</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>법적 지위의 불확실성(증권 vs. 상품)</li>
                    <li>KYC/AML 요구사항 준수 필요성</li>
                    <li>국가별 상이한 규제 체계</li>
                    <li>규제 변경에 따른 리스크</li>
                  </ul>
                </div>
                
                <div className="border border-orange-100 rounded-lg p-5 bg-orange-50">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">오프체인 자산 연동과 관리</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>실물 자산의 정확한 가치 반영 문제</li>
                    <li>다양한 자산군의 토큰화 기준 정립 필요</li>
                    <li>실물 자산의 보관 및 관리 문제</li>
                    <li>오라클 신뢰성과 데이터 정확성 보장</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="border border-yellow-100 rounded-lg p-5 bg-yellow-50">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3">유동성 문제</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>초기 시장의 낮은 참여도</li>
                    <li>경기 침체기의 유동성 고갈</li>
                    <li>타 가상자산 대비 낮은 수익률 가능성</li>
                    <li>진입 및 퇴출 경로의 제한</li>
                  </ul>
                </div>
                
                <div className="border border-cyan-100 rounded-lg p-5 bg-cyan-50">
                  <h3 className="text-xl font-bold text-cyan-700 mb-3">기술적 문제</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>블록체인 고유의 보안 및 확장성 문제</li>
                    <li>토큰화 메커니즘의 복잡성</li>
                    <li>중앙화와 탈중앙화 간의 균형 유지</li>
                    <li>스마트 컨트랙트 취약점 및 위험</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA의 미래 전망</h2>
              
              <div className="bg-green-50 p-6 rounded-lg my-6 border border-green-200">
                <h3 className="text-xl font-bold mb-4">향후 발전 방향</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>단계적 시장 확장:</strong> 초기 비유동 자산(예술품, 명품)에서 시작하여 점차 부동산, 증권, 채권 등으로 확대
                  </li>
                  <li>
                    <strong>규제 체계 정립:</strong> 명확한 규제 프레임워크 수립으로 시장 불확실성 감소
                  </li>
                  <li>
                    <strong>기술 인프라 발전:</strong> 영지식증명, DID, 발전된 스마트 컨트랙트 등 기술 혁신
                  </li>
                  <li>
                    <strong>비즈니스 모델 다양화:</strong> RWA 담보 DeFi, 권리 투자, 임대 등 다양한 서비스 등장
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  특히 실물 경제 시장이 블록체인과 접목되면 그 잠재력은 현재의 가상자산 시장보다 훨씬 더 클 것으로 전망됩니다.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">결론</h2>
              
              <div className="bg-green-50 p-6 rounded-lg my-6 border-l-4 border-green-500">
                <p className="text-lg">
                  RWA는 디지털 금융과 전통 금융의 경계를 허물고, 실물 자산의 접근성과 유동성을 혁신적으로 높일 수 있는 잠재력을 가지고 있습니다. 그러나 이러한 잠재력을 최대한 발휘하기 위해서는 규제 정립, 토큰 표준 개발, 오라클 기술 향상, DID 기반 KYC/AML 솔루션 등 다양한 인프라 구축이 선행되어야 합니다.
                </p>
                <p className="text-lg mt-4 italic">
                  "앞으로 RWA 시장이 성숙하고 발전함에 따라, 전통적인 금융과 디지털 금융이 유기적으로 연결되는 새로운 금융 생태계가 구축될 것으로 기대됩니다. 이러한 변화는 금융 시장의 효율성과 접근성을 획기적으로 향상시키며, 블록체인 기술의 실질적인 활용 사례로서 산업 전반에 긍정적인 영향을 미칠 것입니다."
                </p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <Link href="/properties">
                  <Button className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-8 py-3 text-lg rounded-full hover:from-green-700 hover:to-teal-600 transition-all">
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