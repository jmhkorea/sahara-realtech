import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import SEO from "@/components/SEO";
import dubaiSigningCeremony from "@/assets/dubai-signing-ceremony.png";
import hancomAgreement from "@/assets/hancom-agreement.png";
import ctgBusinessCard from "@/assets/ctg-business-card.png";

export default function CompanyIntroduction() {
  const [isCtgInfoOpen, setIsCtgInfoOpen] = useState(false);
  return (
    <>
      <SEO 
        title="회사 소개 | SaharaRealTech" 
        description="SaharaRealTech는 2017년부터 실물자산 디지털화를 선도해온 글로벌 블록체인 전문 기업입니다." 
        keywords="실물자산, 블록체인, 디지털화, 토큰증권, STO, RWA"
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
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-12 px-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">사하라 리얼테크 소개</h1>
            <p className="text-lg opacity-90">실물자산 디지털화를 선도하는 글로벌 블록체인 전문 기업</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">기업 개요</h2>
                <p>
                  사하라 리얼테크는 국내 최초로 2017년부터 실물자산 디지털 사업을 추진한 블록체인 전문 기업입니다. 
                  아무도 관심이 없던 당시 두바이 정부 '민원 24'와 같은 사업 주관 그룹사와 MOA를 통해 
                  디지털 세계의 사막과 같은 실물 부동산 산업을 디지털화 하기 위해 도전을 시작했습니다.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 my-6">
                  <Card className="flex-1 bg-blue-50">
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">비전</h3>
                      <p className="text-gray-700">법을 준수하고 가장 신뢰받는 부동산 디지털화 기업이 되어 모든 사람들이 고품질 부동산 자산에 쉽게 접근할 수 있는 세상을 만듭니다.</p>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 bg-green-50">
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">미션</h3>
                      <p className="text-gray-700">블록체인 기술을 통해 부동산 투자의 장벽을 낮추고, 투명성과 유동성을 높여 실물자산 시장을 혁신합니다.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              <section className="mb-6">
                <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                  <img 
                    src={dubaiSigningCeremony} 
                    alt="두바이 계약 체결식 - 사하라 리얼테크와 KHOORY & PARK LLC" 
                    className="w-full object-cover" 
                  />
                  <div className="p-4 bg-blue-50">
                    <h3 className="font-semibold text-gray-800 mb-1">두바이 계약 체결식</h3>
                    <p className="text-sm text-gray-600">
                      2017년 사하라 리얼테크와 두바이 KHOORY & PARK LLC 간의 블록체인 부동산 골드 플랫폼 서비스 계약 체결식 
                      (쿠리 그룹은 두바이 정부에서 권한을 위임받아 각종 부동산소유권 인증 및 자국민의 민원을 처리하는 기관으로 
                      국내 '민원 24'와 같은 역할을 하는 기업으로 온라인과 오프라인 서비스를 진행 중이다)
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">글로벌 네트워크</h2>
                <p>
                  국내 디지털 금융 산업의 규제로 인해 본사는 미국 미주리주 세인트 루이스에 글로벌 회사를 설립하였으며, 
                  재단은 유럽 몰타공화국, 한국 회사는 대한민국 경기도 판교에 위치하고 있습니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">미국 본사</h4>
                      <p className="text-sm text-gray-600">미주리주 세인트 루이스</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">재단</h4>
                      <p className="text-sm text-gray-600">유럽 몰타공화국</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">한국 지사</h4>
                      <p className="text-sm text-gray-600">경기도 판교</p>
                      <div className="mt-3">
                        <p className="text-xs text-gray-600 mb-2">
                          한국 지사에서는 강원도 '평창 반얀트리 레지던트'를 성사시켜 현재 프로젝트 진행 중에 있습니다.
                          '한글과 컴퓨터' 코스닥 상장사 보안 디지털 기업 '한컴위드'와 '블록체인 디지털 부동산, 금' 메인넷 구축을 위한 
                          계약을 완료하고 메인넷 개발 참여를 진행한 바 있습니다.
                        </p>
                        <div className="mt-2 rounded overflow-hidden">
                          <img 
                            src={hancomAgreement} 
                            alt="한글과 컴퓨터 한컴위드와 디지털 부동산을 위한 협약식" 
                            className="w-full h-auto"
                          />
                          <p className="text-xs text-center py-1 bg-gray-100">한글과 컴퓨터 한컴위드와 디지털 부동산을 위한 협약식</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 overflow-hidden">
                    <Collapsible open={isCtgInfoOpen} onOpenChange={setIsCtgInfoOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">파트너사 - CTG 그룹</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isCtgInfoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              호주에 본사를 두고 태국에서 CTG PRIME를 통해 디지털 Bond를 운영하는 디지털 자산 유동화 기업입니다. 
                              홍콩 나스닥 기업 등이 참여하여 나스닥 디지털 상품을 취급하고 있습니다.
                            </p>
                            <p className="text-sm text-gray-600">
                              태국 대형 정부 프로젝트를 추진 중인 기업으로 한국 디지털 자산 유동화를 위한 파트너 기업입니다. 
                              사하라 리얼테크 정민호 대표는 CTG 그룹의 아시아 CTO로 임명되어 향후 한국의 실물 자산 자금 유동화를 진행 예정입니다.
                            </p>
                            <div className="mt-3 rounded overflow-hidden border border-gray-200">
                              <img 
                                src={ctgBusinessCard} 
                                alt="Capital Trust Group - Min Ho Jung 명함" 
                                className="w-full h-auto"
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                </div>
                
                <p>
                  해외 지사로는 일본 도쿄 및 말레이시아 쿠알라룸푸르, 인도, 태국, 인도네시아 등지에서 
                  파트너사와 노드 파트너로 협력 중입니다. 특히 에스토니아는 전자 시민권을 취득하여 
                  회사를 운영 중에 있습니다.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 프로젝트</h2>
                <p>
                  현재 사하라 리얼테크는 다양한 글로벌 부동산 프로젝트를 추진 중에 있습니다:
                </p>
                
                <ul className="list-disc pl-5 my-4 space-y-2">
                  <li>라오스 비엔티안 탓루앙 경제특구 반얀트리 닉팔도 라구나 골프텔과 멤버십</li>
                  <li>인도네시아 발리 세미냑 리조트</li>
                  <li>대한민국 강원도 평창 반얀트리 레지던트 (약 200실 규모)</li>
                  <li>제주도 외 다양한 프로젝트</li>
                </ul>
                
                <div className="bg-gray-100 p-5 rounded-lg border-l-4 border-blue-500 my-6">
                  <h3 className="text-xl font-semibold mb-2">최근 성과</h3>
                  <p>
                    2024년 서울 역삼동 오렌지 타운에서 개최된 행사에는 실시간 약 1,000명이 참여하여 
                    인도네시아 발리 및 라오스 디지털 상품을 성공적으로 판매했습니다. 이를 통해 다수의 
                    투자팀들이 실사를 진행하며 활발한 투자 활동이 이루어지고 있습니다.
                  </p>
                </div>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">비즈니스 전략</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">국내 토큰증권(STO)</h3>
                    <p>
                      국내 산업은 토큰증권(STO)을 중점적으로 준비 중이며, 다수의 증권사와 오랜 시간 
                      정기적인 협력을 통해 국회의 관련 법안 통과를 기다리고 있습니다. 법적 테두리 내에서 
                      가장 안전하고 신뢰받는 토큰증권 플랫폼을 구축하는 것이 목표입니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">해외 실물자산(RWA)</h3>
                    <p>
                      말레이시아, 인도네시아, 인도 등 글로벌 투자팀들과 긴밀히 협력하여 
                      해외 실물자산의 디지털화와 유동화를 추진하고 있습니다. 국경을 초월한 
                      실물자산 투자의 접근성을 높이는 데 주력하고 있습니다.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">사회적 책임과 인정</h2>
                <p>
                  2024년 사하라 리얼테크는 대한변리사협회가 인정한 특허 대상을 수상하였으며, 
                  강원도 오지 마을을 대상으로 약 5개월 간 연세가 높으신 어르신들을 위한 챗GPT 디지털 
                  무료 강의를 진행한 바 있습니다. 이러한 사회공헌 활동으로 창조경영혁신 대상을 
                  수상하게 되었습니다.
                </p>
                
                <div className="bg-blue-50 p-6 my-6 rounded-lg border border-blue-100">
                  <blockquote className="italic">
                    "사하라 리얼테크는 우선적으로 법을 준수하고, 가장 신뢰 받는 기업이 되기 위해 
                    오랜 시간 준비하며 기술 개발에 최선을 다하고 있습니다."
                  </blockquote>
                </div>
              </section>
              
              <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-center">
                  <Link href="/team">
                    <Button variant="outline" className="mr-4">팀원 소개</Button>
                  </Link>
                  <Link href="/how-to-invest">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">투자 정보 보기</Button>
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