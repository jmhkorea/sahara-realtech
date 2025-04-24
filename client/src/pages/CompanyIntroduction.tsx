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
import kimiyiAi from "@/assets/kimiyi-ai.jpg";
import seniorAiKiosk from "@/assets/senior-ai-kiosk.png";
import esportMeeting from "@/assets/esport-meeting.jpg";
import globalEvent1 from "@/assets/global-event-1.jpg";
import globalEvent2 from "@/assets/global-event-2.jpg";
import globalEvent3 from "@/assets/global-event-3.jpg";
import globalEvent4 from "@/assets/global-event-4.jpg";
import globalEvent5 from "@/assets/global-event-5.jpg";
import globalEvent6 from "@/assets/global-event-6.jpg";
import globalEvent7 from "@/assets/global-event-7.jpg";
import globalEventAfrica from "@/assets/global-event-africa.png";
import awardInnovation from "@/assets/award-innovation.jpg";
import awardPatent from "@/assets/award-patent.jpg";
import awardCto from "@/assets/award-cto.jpg";

export default function CompanyIntroduction() {
  const [isCtgInfoOpen, setIsCtgInfoOpen] = useState(false);
  const [isKoreaOfficeOpen, setIsKoreaOfficeOpen] = useState(false);
  const [isAiPartnerOpen, setIsAiPartnerOpen] = useState(false);
  const [isSeniorProjectOpen, setIsSeniorProjectOpen] = useState(false);
  const [isEsportProjectOpen, setIsEsportProjectOpen] = useState(false);
  const [isGlobalEventOpen, setIsGlobalEventOpen] = useState(false);
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
                <p className="font-bold text-xl mb-3">사하라 리얼테크: 실물자산 디지털화의 개척자</p>
                <p>
                  사하라 리얼테크는 2017년 국내 최초로 실물자산 디지털화 사업을 시작한 블록체인 전문 기업입니다. 서울 종로구에 성균관대학교 블록체인 연구센터를 설립하여 30여 명의 전문 개발진과 함께 혁신적인 기술 개발에 매진해왔습니다.
                </p>
                <p className="mt-2">
                  당시 실물 부동산의 디지털화는 불모지와 같았습니다. 아무도 관심을 기울이지 않던 시절, 사하라 리얼테크는 두바이 쿠리그룹 및 한국 정부의 '민원24'와 같은 사업 주관 그룹사들과 MOA를 체결하며 실물 부동산 산업의 디지털 혁신을 선도하기 위한 도전을 시작했습니다.
                </p>
                <p className="mt-2">
                  마치 디지털 세계의 사막과도 같았던 실물 부동산 분야에서, 사하라 리얼테크는 블록체인 기술을 활용한 자산 디지털화의 새로운 길을 개척하고 있습니다.
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
                  <Card className="overflow-hidden">
                    <Collapsible open={isKoreaOfficeOpen} onOpenChange={setIsKoreaOfficeOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">한국 지사</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isKoreaOfficeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <p className="text-sm text-gray-600">경기도 판교</p>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-xs text-gray-600">
                              한국 지사에서는 강원도 '평창 반얀트리 레지던트'를 성사시켜 현재 프로젝트 진행 중에 있습니다.
                              '한글과 컴퓨터' 코스닥 상장사 보안 디지털 기업 '한컴위드'와 '블록체인 디지털 부동산, 금' 메인넷 구축을 위한 
                              계약을 완료하고 메인넷 개발 참여를 진행한 바 있습니다.
                            </p>
                            <div className="mt-2 rounded overflow-hidden border border-gray-200">
                              <img 
                                src={hancomAgreement} 
                                alt="한글과 컴퓨터 한컴위드와 디지털 부동산을 위한 협약식" 
                                className="w-full h-auto"
                              />
                              <p className="text-xs text-center py-1 bg-gray-100">한글과 컴퓨터 한컴위드와 디지털 부동산을 위한 협약식</p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                  <Card className="bg-blue-50 overflow-hidden">
                    <Collapsible open={isCtgInfoOpen} onOpenChange={setIsCtgInfoOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">디지털 자산 유동화 기업 - CTG 그룹</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isCtgInfoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              호주에 본사를 둔 시총 약 3조 규모의 기업으로, 태국에서 CTG PRIME를 통해 디지털 Bond를 운영하는 디지털 자산 유동화 기업입니다. 
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
                
                <div className="mt-5">
                  <Card className="bg-purple-50 overflow-hidden">
                    <Collapsible open={isAiPartnerOpen} onOpenChange={setIsAiPartnerOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">메이저 생성형 AI 기업과 한국 판매권 계약</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isAiPartnerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              싱가폴, 홍콩 생성형 AI 기업과 한국 판매권을 확보하는 계약을 완료하고, 대한노인회 경로당, 
                              리조트 호텔 팬션 대학 병원 등에 키오스크 판매 및 개인형 생성형 AI 명함 비지니스, 미래형 음성 서비스 
                              홈페이지 AI, 수익 다각화 계약을 완료하였습니다.
                            </p>
                            <div className="mt-2 flex justify-center">
                              <div className="rounded overflow-hidden border border-gray-200 max-w-sm">
                                <img 
                                  src={kimiyiAi} 
                                  alt="Kimiyi AI - 생성형 AI 기업" 
                                  className="w-full h-auto"
                                />
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                </div>
                
                <div className="mt-5">
                  <Card className="bg-green-50 overflow-hidden">
                    <Collapsible open={isSeniorProjectOpen} onOpenChange={setIsSeniorProjectOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">대한노인회 경로당 프로젝트 진행</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isSeniorProjectOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              대한노인회 회원 약 1000만명을 대상으로 경로당 약 55,000개 경로당 리뉴얼 프로젝트로 
                              '건강 AI 키오스크 시범 서비스'를 위한 프로젝트입니다. 데일리뉴스와 사하라 리얼테크의 
                              기술력을 통해 진행 중입니다.
                            </p>
                            <div className="mt-2 flex justify-center">
                              <div className="rounded overflow-hidden border border-gray-200 max-w-sm">
                                <img 
                                  src={seniorAiKiosk} 
                                  alt="대한노인회 경로당 건강 AI 키오스크" 
                                  className="w-full h-auto"
                                />
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                </div>
                
                <div className="mt-5">
                  <Card className="bg-amber-50 overflow-hidden">
                    <Collapsible open={isEsportProjectOpen} onOpenChange={setIsEsportProjectOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">국제 e-Sport 진흥원 프로젝트</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isEsportProjectOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              e-Sport는 각 국제 스포츠 공인 메달 종목으로 승인되어 북경 아시안 게임부터 올림픽 종목까지 진행되고 있습니다. 
                              사하라 리얼테크는 국내 국제 e-Sport 진흥원과 프로 선수 및 각종 사업의 NFT 및 토큰 개발 기업으로 선정되어 준비 중에 있습니다.
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              선수단들의 아카데미 및 구단 등과 지역 청소년들을 위한 사회 고용창출 등, 전국 이스포츠 전용 부동산을 활용한 
                              실물 자산 디지털 사업에 사하라 리얼테크가 선정되어 진행 중에 있습니다.
                            </p>
                            <div className="mt-2 flex justify-center">
                              <div className="rounded overflow-hidden border border-gray-200 max-w-sm">
                                <img 
                                  src={esportMeeting} 
                                  alt="국제 e-Sport 진흥원 전옥이 이사장과 정민호 대표" 
                                  className="w-full h-auto"
                                />
                                <p className="text-xs text-center py-1 bg-gray-100">국제 e-Sport 진흥원 전옥이 이사장과 정민호 대표</p>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                </div>
                
                <div className="mt-5">
                  <Card className="bg-indigo-50 overflow-hidden">
                    <Collapsible open={isGlobalEventOpen} onOpenChange={setIsGlobalEventOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">국제 행사 참여 및 프로젝트 소개</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isGlobalEventOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                              사하라 리얼테크 정민호 대표가 두바이, 인도, 태국, 말레이시아, 일본 등에서 실물 부동산 및 RWA 미래 전망과 
                              사하라 리얼테크 사업을 소개하는 패널 및 강사로 참여하였습니다.
                            </p>
                            <div className="mt-3 grid grid-cols-3 md:grid-cols-4 gap-2">
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent1} 
                                  alt="싱가포르 마리나베이 블랙록 사업 설명회" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent2} 
                                  alt="두바이 국제 컨퍼런스" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent3} 
                                  alt="인도 부동산 토큰화 컨퍼런스" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent4} 
                                  alt="말레이시아 RWA 컨퍼런스" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent5} 
                                  alt="일본 블록체인 부동산 포럼" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent6} 
                                  alt="국제 RWA 컨퍼런스" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src={globalEvent7} 
                                  alt="글로벌 블록체인 이벤트" 
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                            </div>
                            <p className="text-xs text-center mt-2 bg-gray-100 py-1 rounded">
                              싱가포르 마리나베이 블랙록 사업 설명 및 두바이, 인도, 말레이시아 등 국제 행사 참여
                            </p>
                            
                            <div className="mt-5 border-t pt-4">
                              <h5 className="text-sm font-semibold mb-2">아프리카 현지 청년 교육 프로그램</h5>
                              <img 
                                src={globalEventAfrica} 
                                alt="아프리카 현지 청년 교육 프로그램" 
                                className="w-full h-auto rounded border border-gray-200"
                              />
                              <p className="text-xs text-center mt-2 bg-gray-100 py-1 rounded">
                                아프리카 현지 청년들을 대상으로 블록체인 기술 및 디지털 자산 교육 프로그램 진행
                              </p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                </div>
                
                <p className="mt-4">
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">사회적 책임과 수상 성과</h2>
                <p>
                  2024년 사하라 리얼테크는 대한변리사협회가 인정한 특허 대상을 수상하였으며, 
                  강원도 오지 마을을 대상으로 약 5개월 간 연세가 높으신 어르신들을 위한 챗GPT 디지털 
                  무료 강의를 진행한 바 있습니다. 이러한 사회공헌 활동으로 창조경영혁신 대상을 
                  수상하게 되었습니다. 또한 정민호 대표는 인도 언론에서 '올해의 CTO'로 선정되는 영예를 안았습니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="rounded overflow-hidden border border-gray-200 bg-white">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={awardInnovation} 
                        alt="2024년 경영혁신 대상 수상" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-lg">경영혁신 대상 수상</h4>
                      <p className="text-sm text-gray-600">
                        2024년 혁신적인
                        경영 방식과 사회 공헌 활동으로 경영혁신 대상 수상
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded overflow-hidden border border-gray-200 bg-white">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={awardPatent} 
                        alt="2024년 대한변리사협회 특허 대상 수상" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-lg">특허 대상 수상</h4>
                      <p className="text-sm text-gray-600">
                        2024년 대한변리사협회 주관 특허 대상 수상으로 기술력 인정 받음
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded overflow-hidden border border-gray-200 bg-white">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={awardCto} 
                        alt="2024년 인도 언론에서 선정한 올해의 CTO" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-lg">올해의 CTO 선정</h4>
                      <p className="text-sm text-gray-600">
                        2024년 인도 언론에서 정민호 대표를 올해의 CTO로 선정
                      </p>
                    </div>
                  </div>
                </div>
                
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