import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

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
                실제세계자산(RWA, Real World Assets)은 블록체인 기술을 활용하여 현실 세계에 존재하는 유형·무형의 자산을 디지털 토큰으로 표현한 것입니다. 
                부동산, 예술품, 금융상품, 지적재산권 등 다양한 실물 자산을 블록체인상에서 디지털화함으로써 자산의 분할 소유, 거래 효율성 증대, 유동성 향상 등의 이점을 제공합니다.
              </p>
              
              <p>
                RWA는 디지털 자산과 전통적인 금융 시스템을 연결하는 가교 역할을 하며, 분산금융(DeFi)의 혁신을 실물 경제에 접목시키는 중요한 수단으로 주목받고 있습니다.
                실물 경제와 암호화폐 생태계의 통합을 통해 더 포용적이고 효율적인 금융 시스템을 구축하는 데 기여할 수 있습니다.
              </p>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA 토큰화의 작동 원리</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg my-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">기본 프로세스</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>자산 식별 및 평가:</strong> 토큰화할 실물 자산 선정 및 가치 평가</li>
                  <li><strong>법적 구조 설계:</strong> 토큰 소유자의 권리와 의무를 정의하는 법적 프레임워크 구축</li>
                  <li><strong>특수목적법인(SPV) 설립:</strong> 자산을 보유하고 관리하기 위한 법적 실체 설립</li>
                  <li><strong>토큰 발행:</strong> 블록체인에서 자산을 대표하는 디지털 토큰 생성</li>
                  <li><strong>토큰 배포 및 유통:</strong> 토큰 배포 및 2차 시장 거래 활성화</li>
                  <li><strong>자산 관리 및 수익 분배:</strong> 기초 자산 관리 및 수익 분배</li>
                </ol>
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
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA 관련 도전 과제와 해결 방안</h2>
              
              <div className="my-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold mb-2">법적 및 규제적 문제</h3>
                  <p>국가별 상이한 증권법, 부동산법, 금융 규제 등이 글로벌 프로젝트 구현의 장벽이 됩니다.</p>
                  <p className="font-semibold mt-2">해결 방안:</p>
                  <ul className="list-disc pl-6">
                    <li>RegTech 솔루션을 통한 규제 준수 자동화</li>
                    <li>규제 당국과의 협력 및 샌드박스 프로그램 참여</li>
                    <li>관할권별 맞춤형 법적 구조 설계</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold mb-2">오라클 문제와 신뢰성</h3>
                  <p>블록체인과 실물 자산 간 연결 과정에서 데이터의 정확성과 신뢰성 문제가 발생할 수 있습니다.</p>
                  <p className="font-semibold mt-2">해결 방안:</p>
                  <ul className="list-disc pl-6">
                    <li>분산형 오라클 네트워크 활용</li>
                    <li>다중 데이터 소스 및 검증 메커니즘 구현</li>
                    <li>평판 시스템 및 인센티브 모델 구축</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">RWA의 미래 전망</h2>
              
              <div className="bg-green-50 p-6 rounded-lg my-6 border border-green-200">
                <h3 className="text-xl font-bold mb-4">향후 발전 방향</h3>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>기관 투자자의 참여 확대:</strong> 대형 자산 운용사, 연기금, 보험사 등이 RWA를 포트폴리오 다각화 수단으로 채택
                  </li>
                  <li>
                    <strong>하이브리드 금융(HyFi) 생태계의 발전:</strong> 전통 금융(TradFi)과 분산 금융(DeFi)을 연결하는 하이브리드 금융 생태계가 RWA를 중심으로 발전
                  </li>
                  <li>
                    <strong>기술 발전과 표준화:</strong> 레이어 2 솔루션, 크로스체인 호환성, RWA 토큰화를 위한 산업 표준 및 프로토콜 개발
                  </li>
                  <li>
                    <strong>새로운 자산 클래스의 토큰화:</strong> 탄소 크레딧, 지적재산권, 인프라 프로젝트, 무형 자산 등으로 확장
                  </li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-bold text-green-600 mb-4">결론</h2>
              
              <div className="bg-green-50 p-6 rounded-lg my-6 border-l-4 border-green-500">
                <p className="italic text-lg">
                  "실제세계자산(RWA)의 토큰화는 단순한 기술적 혁신을 넘어, 자산 소유, 거래, 관리 방식에 대한 근본적인 변화를 가져올 수 있는 패러다임 전환입니다. 
                  이는 자본 시장의 효율성을 높이고, 더 많은 사람들에게 다양한 자산에 대한 접근성을 제공하며, 자산 가치의 발견과 분배 방식을 재정의할 것입니다."
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