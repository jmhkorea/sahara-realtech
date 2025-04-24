import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import rwaConceptImg from "../assets/rwa_concept.png";
import tokenizationBridgeImg from "../assets/tokenization_bridge.png";

export default function RwaLiquidation() {
  return (
    <>
      <SEO 
        title="실제세계자산(RWA) 유동화하기 | SaharaRealTech" 
        description="실제세계자산(RWA)의 유동화 프로세스와 토큰화를 통한 가치 창출 가이드" 
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-10 px-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">실제세계자산(RWA) 유동화하기</h1>
            <p className="text-lg opacity-90">블록체인 기술로 실물 자산의 가치와 유동성을 혁신적으로 향상</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">RWA의 개념과 유동화의 필요성</h2>
              
              <p>
                실제세계자산(RWA, Real World Assets)은 블록체인 기술을 활용하여 현실 세계의 유형·무형의 자산을 디지털 토큰으로 변환하여 블록체인 상에서 거래할 수 있게 하는 혁신적인 기술입니다. 
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
              
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 my-4">
                <h3 className="text-lg font-bold text-blue-700 mb-2">RWA 유동화의 핵심 가치</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>접근성 향상:</strong> 고가의 자산에 소액으로 투자 가능</li>
                  <li><strong>유동성 증대:</strong> 24/7 글로벌 거래 가능성으로 자산 유동화</li>
                  <li><strong>효율성 제고:</strong> 중개자 감소 및 거래 비용 절감</li>
                  <li><strong>투명성 확보:</strong> 블록체인 기반 투명한 소유권 및 거래 기록</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">토큰화 브릿지와 자산 연계</h2>
              
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
              
              <p>
                토큰화 브릿지는 실물 세계의 자산(MEAT SPACE)과 디지털 세계(METAVERSE)를 연결하는 중요한 인프라입니다. 
                이 브릿지를 통해 부동산, 주식 등의 실물 자산이 블록체인 상의 토큰으로 변환되어 글로벌 거래가 가능해집니다.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">오프체인 연동 요소</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>소유권 입증 및 법적 구조:</strong> 실물 자산의 법적 소유권 확인 및 구조화</li>
                    <li><strong>부동산 온라인 등록:</strong> 투자자산을 블록체인에 등록하기 위한 법적 절차</li>
                    <li><strong>NFT 발급에 따른 소유권 이전 방식:</strong> 소유권을 디지털 형태로 전환하는 법적 프레임워크</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-indigo-700 mb-3">온체인 구현 요소</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>NFT 발행과 ERC-20 토큰 소각:</strong> 자산을 대표하는 디지털 증명서 발행</li>
                    <li><strong>AMM 거래 지원:</strong> 자동화된 마켓 메이커를 통한 유동성 제공</li>
                    <li><strong>분할 토큰의 소유자 비례 수익 분배:</strong> 스마트 컨트랙트를 통한 자동 수익 분배</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">RWA 토큰화 프로세스</h2>
              
              <div className="my-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">실물 자산 토큰화 5단계</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>자산 실사 및 평가:</strong> 토큰화할 자산의 가치 평가 및 법적 상태 확인
                  </li>
                  <li>
                    <strong>법적 구조화:</strong> 토큰화를 위한 법적 프레임워크 설계 (SPV 설립 등)
                  </li>
                  <li>
                    <strong>스마트 컨트랙트 개발:</strong> 자산 권리, 수익 분배, 거버넌스 규칙 등을 코드화
                  </li>
                  <li>
                    <strong>토큰 발행 및 분배:</strong> 블록체인 상에서 자산을 대표하는 토큰 생성
                  </li>
                  <li>
                    <strong>거래 및 관리:</strong> 2차 시장 거래 지원 및 지속적인 자산 관리
                  </li>
                </ol>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg my-6">
                <h3 className="text-xl font-bold text-blue-700 mb-3">RWA 토큰화의 기술적 요소</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-blue-600 mb-2">토큰 표준</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li><strong>ERC-721/ERC-1155:</strong> 대체 불가능한 자산 증명</li>
                      <li><strong>ERC-20:</strong> 분할 가능한 소유권 표현</li>
                      <li><strong>하이브리드 모델:</strong> NFT와 FT의 결합</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-blue-600 mb-2">오라클 시스템</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li><strong>가격 피드:</strong> 실시간 자산 가치 업데이트</li>
                      <li><strong>법적 상태:</strong> 소유권 변경 및 법적 상태 반영</li>
                      <li><strong>수익 분배:</strong> 자동화된 배당 지급 트리거</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">RWA 유동화의 과제와 대응 방안</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="border border-red-100 rounded-lg p-5 bg-red-50">
                  <h3 className="text-xl font-bold text-red-700 mb-3">규제 위험</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>법적 지위의 불확실성(증권 vs. 상품)</li>
                    <li>KYC/AML 요구사항 준수 필요성</li>
                    <li>국가별 상이한 규제 체계</li>
                    <li>규제 변경에 따른 리스크</li>
                  </ul>
                  <div className="mt-3 p-2 bg-white rounded-md">
                    <p className="text-xs text-gray-600 font-semibold">대응 방안</p>
                    <p className="text-xs">규제 샌드박스 참여, 규제 기관과의 적극적 협력, RegTech 솔루션 도입</p>
                  </div>
                </div>
                
                <div className="border border-orange-100 rounded-lg p-5 bg-orange-50">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">오프체인 자산 연동</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>실물 자산의 정확한 가치 반영 문제</li>
                    <li>다양한 자산군의 토큰화 기준 정립 필요</li>
                    <li>실물 자산의 보관 및 관리 문제</li>
                    <li>오라클 신뢰성과 데이터 정확성 보장</li>
                  </ul>
                  <div className="mt-3 p-2 bg-white rounded-md">
                    <p className="text-xs text-gray-600 font-semibold">대응 방안</p>
                    <p className="text-xs">분산형 오라클 네트워크, 보험 제도 도입, 전문 자산 관리자 참여</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">RWA 유동화의 미래 전망</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg my-6 border border-blue-200">
                <h3 className="text-xl font-bold mb-4">산업 발전 방향</h3>
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
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">결론</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg my-6 border-l-4 border-blue-500">
                <p className="text-lg">
                  RWA는 디지털 금융과 전통 금융의 경계를 허물고, 실물 자산의 접근성과 유동성을 혁신적으로 높일 수 있는 잠재력을 가지고 있습니다. 그러나 이러한 잠재력을 최대한 발휘하기 위해서는 규제 정립, 토큰 표준 개발, 오라클 기술 향상, DID 기반 KYC/AML 솔루션 등 다양한 인프라 구축이 선행되어야 합니다.
                </p>
                <p className="text-lg mt-4 italic">
                  "앞으로 RWA 시장이 성숙하고 발전함에 따라, 전통적인 금융과 디지털 금융이 유기적으로 연결되는 새로운 금융 생태계가 구축될 것으로 기대됩니다. 이러한 변화는 금융 시장의 효율성과 접근성을 획기적으로 향상시키며, 블록체인 기술의 실질적인 활용 사례로서 산업 전반에 긍정적인 영향을 미칠 것입니다."
                </p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <Link href="/properties">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 text-lg rounded-full hover:from-blue-700 hover:to-blue-600 transition-all">
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