import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

export default function TokenSecuritiesGuide() {
  return (
    <>
      <SEO 
        title="토큰증권(STO) 제대로 알기 | SaharaRealTech" 
        description="토큰증권(STO)의 개념과 혁신적인 가치에 대한 상세 가이드" 
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">토큰증권(STO) 제대로 알기</h1>
            <p className="text-lg opacity-90">블록체인 기술을 활용한 증권 혁신의 시작</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">토큰증권(STO)의 개념과 구성요소</h2>
              
              <p>
                토큰증권(STO: Security Token Offering)은 블록체인 기술을 활용하여 실물 자산이나 증권을 디지털화하고 증권 규제 범위 내에서 발행하는 새로운 형태의 금융 상품입니다. 
                토큰증권은 암호화폐 시장과 전통 금융 시장의 장점을 통합하여 투자 접근성과 유동성을 향상시키는 혁신적인 접근 방식입니다.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-700">S(Security): 증권</h3>
                  <p className="mt-2">
                    법적으로 인정되는 증권으로, 자본시장법 상 규제를 준수하며 발행되어 법적 투자자 보호 장치가 제공됩니다. 전통적인 증권과 동일한 권리와 의무를 가집니다.
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-cyan-700">T(Token): 토큰</h3>
                  <p className="mt-2">
                    블록체인 기술을 통해 디지털화된 증권으로, 분할 소유, 24/7 거래, 자동화된 규정 준수, 스마트 계약 기능 등 블록체인의 혁신적인 특징을 활용합니다.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-indigo-700">O(Offering): 발행</h3>
                  <p className="mt-2">
                    규제 준수 프레임워크 내에서 이루어지는 토큰 발행 과정으로, KYC/AML 준수, 투자자 자격 인증, 정보공개 요구사항 충족 등을 보장하여 투자자 보호를 강화합니다.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">토큰증권(STO)이 불러올 3가지 혁신</h2>
              
              <Accordion type="single" collapsible className="w-full my-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-semibold">1. 금융 상품의 혁신</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      토큰증권(STO)은 기존 금융 상품의 한계를 넘어서는 혁신적인 상품 구조와 특성을 제공합니다. 이는 전통적인 증권 시장이 충족시키지 못했던 투자자 요구에 대응하는 새로운 패러다임을 창출합니다.
                    </p>
                    <p className="mt-2">
                      <strong>주요 혁신 사례:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li><span className="font-medium">분할 소유권 실현</span>: 최소 투자 금액 감소로 고가 자산에 대한 접근성 향상</li>
                      <li><span className="font-medium">맞춤형 소유권 구조</span>: 수익 분배, 의결권, 자산 소유에 대한 분리된 권리 설계 가능</li>
                      <li><span className="font-medium">글로벌 유동성 시장</span>: 국경을 초월한 24/7 거래 환경으로 자본 효율성 향상</li>
                      <li><span className="font-medium">프로그래머블 증권</span>: 자동화된 배당, 의결권 행사, 규정 준수 기능 내장</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl font-semibold">2. 증권 발행 구조의 혁신</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      토큰증권은 자본 조달 구조에 근본적인 변화를 가져오며, 발행자와 투자자 모두에게 새로운 유형의 증권 발행 방식을 제공합니다. 이를 통해 혁신적인 비즈니스 모델이 구현 가능해집니다.
                    </p>
                    <p className="mt-2">
                      <strong>혁신적 증권 발행 사례:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li><span className="font-medium">수익 기반 토큰</span>: 특정 비즈니스 라인이나 프로젝트의 수익에 대한 권리만 토큰화</li>
                      <li><span className="font-medium">자산 기반 토큰</span>: 부동산, 예술품, 지적재산권 등 특정 자산의 분할 소유권 제공</li>
                      <li><span className="font-medium">하이브리드 증권</span>: 채권과 주식의 특성을 결합한 새로운 형태의 증권 설계</li>
                      <li><span className="font-medium">단계적 권리 구조</span>: 투자 기간이나 보유량에 따라 다양한 권리가 부여되는 동적 증권</li>
                    </ul>
                    <p className="mt-2">
                      발행자는 이러한 혁신적 구조를 통해 기업 전체 지분 희석 없이 특정 자산이나 수익원에 대한 자금 조달이 가능하며, 스마트 계약을 통한 자동화된 규정 준수와 투명한 거버넌스를 구현할 수 있습니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl font-semibold">3. 대체자산 유동화의 혁신</AccordionTrigger>
                  <AccordionContent className="text-base">
                    <p>
                      토큰증권의 가장 혁신적인 측면은 기존 금융 시장에서 유동화하기 어려웠던 대체자산을 효율적으로 유동화할 수 있는 기술적, 법적 프레임워크를 제공한다는 점입니다.
                    </p>
                    <p className="mt-2">
                      <strong>유동화 가능한 대체자산:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                      <li><span className="font-medium">상업용 부동산</span>: 오피스 빌딩, 물류센터, 호텔, 쇼핑몰 등의 부분 소유권</li>
                      <li><span className="font-medium">희소 자산</span>: 미술품, 와인, 클래식카, 럭셔리 시계 등 수집품의 토큰화</li>
                      <li><span className="font-medium">인프라</span>: 도로, 교량, 공항, 항만, 에너지 시설 등의 투자 기회</li>
                      <li><span className="font-medium">자연 자원</span>: 농지, 산림, 광산, 수자원 등 지속가능한 자원에 대한 접근권</li>
                      <li><span className="font-medium">지적재산권</span>: 특허, 저작권, 브랜드, 음악 로열티, 소프트웨어 라이선스 등</li>
                    </ul>
                    <p className="mt-2">
                      토큰증권을 통한 대체자산 유동화는 이전에는 기관투자자나 고액자산가만 접근 가능했던 투자 기회를 일반 투자자에게도 개방하여 금융 민주화에 기여하며, 대체자산 시장에 새로운 자본 유입을 촉진합니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">금융 시장 패러다임의 변화와 투자자 행동 양식 전환</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 rounded-lg my-6 border border-blue-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-blue-800">토큰증권(STO)이 가져올 시장 혁신:</h3>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <strong className="text-blue-700">규제 준수 디지털 자산의 출현:</strong> 
                    <p className="mt-1">토큰증권의 등장으로 규제 프레임워크를 준수하는 디지털 자산 시장이 형성되어, 전통 금융과 디지털 금융의 경계가 점차 희미해지고 기관 투자자들의 참여가 활성화됩니다.</p>
                  </li>
                  <li>
                    <strong className="text-blue-700">가치 중심 투자 접근법 확산:</strong> 
                    <p className="mt-1">투자자들은 더 이상 "삼성전자 10주", "테슬라 5주"와 같은 단위 수량이 아닌 "100만원어치 투자", "1,000달러어치 소유"와 같은 가치 중심 접근법으로 자산을 바라보게 됩니다.</p>
                  </li>
                  <li>
                    <strong className="text-blue-700">직관적 투자 상품 개념화:</strong> 
                    <p className="mt-1">복잡한 종목코드나 기업명이 아닌 "친환경 모빌리티", "미래 의료기술", "스마트 인프라" 등 투자 테마와 아이디어 중심의 상품 이해 방식이 주류화됩니다.</p>
                  </li>
                  <li>
                    <strong className="text-blue-700">보편적 금융 접근성 확대:</strong> 
                    <p className="mt-1">최소 투자 금액 장벽이 낮아지고 글로벌 자산에 대한 투자가 용이해져, 금융 포용성이 크게 향상되고 새로운 투자자 계층의 시장 참여가 가능해집니다.</p>
                  </li>
                </ol>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">글로벌 토큰증권(STO) 성공 사례 분석</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-white rounded-lg shadow-md border border-blue-100 p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3">BC</div>
                    <h3 className="text-xl font-bold text-gray-800">BCAP (블록체인 캐피털 토큰)</h3>
                  </div>
                  <p className="text-gray-700">
                    2017년 출시된 미국 최초의 규제 준수 증권형 토큰으로, 블록체인 캐피털의 벤처 펀드 투자 포트폴리오에 대한 간접 익스포저를 제공합니다. 1,000만 달러를 성공적으로 모집했으며, 2023년 기준 NAV는 초기 투자 대비 14.1배 성장한 14.1달러를 기록했습니다.
                  </p>
                  <div className="mt-3 text-sm font-medium text-blue-600">
                    <span className="mr-3">• 자산 유형: 벤처 펀드</span>
                    <span className="mr-3">• 발행 규모: $10M</span>
                    <span>• 수익률: +1,410% (6년)</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md border border-blue-100 p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">INX</div>
                    <h3 className="text-xl font-bold text-gray-800">INX 토큰</h3>
                  </div>
                  <p className="text-gray-700">
                    SEC 등록을 통해 공개 발행된 최초의 증권형 토큰 중 하나로, 디지털 자산 거래 플랫폼을 위한 혁신적 자금 조달 사례입니다. 회사가 수익성을 달성하면 순이익의 40%를 토큰 홀더에게 배분하는 구조로 설계되었으며, 2.85억 달러 규모의 증권형 토큰 자금을 조달했습니다.
                  </p>
                  <div className="mt-3 text-sm font-medium text-blue-600">
                    <span className="mr-3">• 자산 유형: 수익 분배권</span>
                    <span className="mr-3">• 발행 규모: $285M</span>
                    <span>• 특징: SEC 공식 등록</span>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-600 mb-4">토큰증권(STO)의 미래 전망</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg my-6 border-l-4 border-blue-500 shadow-md">
                <p className="text-lg text-blue-800 font-semibold mb-4">
                  "토큰증권은 현재 금융 혁신의 초기 단계에 있으며, 향후 10년 내 자본 시장의 근본적인 변화를 이끌 핵심 동력이 될 것입니다."
                </p>
                <p className="text-gray-700">
                  토큰증권(STO)은 블록체인 기술과 전통 금융 시장 사이의 가교 역할을 하며, 규제 준수를 기반으로 금융의 접근성, 효율성, 투명성을 혁신적으로 개선할 것입니다. 특히 접근이 제한되었던 대체자산 시장을 일반 투자자에게 개방하고, 국가 간 경계를 넘어선 글로벌 자본 시장 통합을 촉진할 것으로 기대됩니다.
                </p>
                <p className="mt-3 text-gray-700">
                  체인애널리시스(Chainalysis)의 최근 연구에 따르면, 2030년까지 전 세계 토큰증권 시장 규모는 16조 달러에 이를 것으로 전망되며, 이는 전체 글로벌 자산의 약 10%가 토큰화될 것임을 시사합니다.
                </p>
              </div>
              
              <div className="mt-12 mb-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-md bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-xl p-6 shadow-md border border-blue-200 mb-6">
                  <h3 className="text-xl font-bold text-center text-blue-800 mb-3">토큰증권(STO) 상장 의뢰 안내</h3>
                  <p className="text-gray-700 text-center mb-4">
                    귀사의 자산 또는 증권을 토큰화하여 글로벌 투자자들에게 선보일 준비가 되셨나요? 
                    사하라리얼테크의 토큰증권(STO) 상장 서비스를 통해 규제 준수 디지털 자산으로 혁신적인 자금조달이 가능합니다.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Link href="/properties">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-5 text-lg rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-200 font-bold">
                        투자 자산 살펴보기
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mt-2">
                  <Link href="/how-to-invest">
                    <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                      투자 가이드 보기
                    </Button>
                  </Link>
                  <Link href="/rwa-liquidation">
                    <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                      실제세계자산(RWA) 알아보기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}