import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import SEO from "@/components/SEO";

export default function CompanyIntroduction() {
  const [isCtgInfoOpen, setIsCtgInfoOpen] = useState(false);
  const [isKoreaOfficeOpen, setIsKoreaOfficeOpen] = useState(false);
  const [isAiPartnerOpen, setIsAiPartnerOpen] = useState(false);
  const [isSeniorProjectOpen, setIsSeniorProjectOpen] = useState(false);
  const [isEsportProjectOpen, setIsEsportProjectOpen] = useState(false);
  const [isGlobalEventOpen, setIsGlobalEventOpen] = useState(false);
  const [isMaltaOpen, setIsMaltaOpen] = useState(false);
  const [isUsaOpen, setIsUsaOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="회사 소개 | 사하라 리얼테크"
        description="사하라 리얼테크는 2017년 국내 최초로 실물자산 디지털화 사업을 시작한 블록체인 전문 기업입니다."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
        
        <div className="mb-8">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <div className="relative bg-gradient-to-r from-blue-100 to-amber-100">
              <img 
                src="attached_assets/5EDA3512-EF11-4F10-B183-0E42E2C0710B.jpeg" 
                alt="사하라 리얼테크 배경" 
                className="w-full max-h-80 object-cover"
              />
            </div>
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
                    src="attached_assets/10A37A4A-F7DB-4A14-A302-C5B1DFAED220.jpeg" 
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
                  <Card className="overflow-hidden">
                    <Collapsible open={isUsaOpen} onOpenChange={setIsUsaOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">미국 본사</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isUsaOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <p className="text-sm text-gray-600">미주리주 세인트 루이스</p>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-xs text-gray-600">
                              미국 미주리주 세인트 루이스에 위치한 글로벌 본사는 자유로운 블록체인 환경에서 
                              디지털 자산 기술 개발 및 글로벌 네트워크 구축에 중점을 두고 있습니다. 
                              미국 내 금융 기관들과 협력하여 혁신적인 부동산 토큰화 솔루션을 개발하고 있습니다.
                            </p>
                            <div className="relative mt-2 rounded overflow-hidden border border-gray-200">
                              <img 
                                src="attached_assets/25C71D95-6A16-4858-9C8C-5C33DC0C1ECD.jpeg" 
                                alt="미국 본사" 
                                className="w-full h-auto"
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
                  </Card>
                  <Card className="overflow-hidden">
                    <Collapsible open={isMaltaOpen} onOpenChange={setIsMaltaOpen}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">재단</h4>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                              {isMaltaOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <p className="text-sm text-gray-600">유럽 몰타공화국</p>
                        
                        <CollapsibleContent>
                          <div className="pt-3 space-y-2">
                            <p className="text-xs text-gray-600">
                              몰타는 유럽 연합(EU) 회원국 중 하나로, 블록체인 및 암호화폐 기업에 우호적인 규제 환경을 
                              제공하여 '블록체인 섬'으로 알려져 있습니다. 사하라 리얼테크는 글로벌 확장과 합법적인 
                              디지털 자산 사업을 위해 몰타에 재단을 설립했습니다.
                            </p>
                            <div className="relative mt-2 rounded overflow-hidden border border-gray-200">
                              <img 
                                src="attached_assets/5EDA3512-EF11-4F10-B183-0E42E2C0710B.jpeg" 
                                alt="몰타 재단" 
                                className="w-full h-auto"
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Collapsible>
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
                                src="attached_assets/2C93E7BE-66D3-476E-8BFA-A9AF387FBEB5.jpeg" 
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
                                src="attached_assets/2E083608-9217-4F54-8101-7C5FF6E0ABCB.jpeg" 
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
                                  src="attached_assets/7F119182-C2BC-4C27-84D4-1B081322F5B1.jpeg" 
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
                                  src="attached_assets/76AD10FC-527E-4929-8EA2-7A475096AA00.jpeg" 
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
                                  src="attached_assets/04441A24-45C7-464C-94E4-00A86992F901_1_105_c.jpeg" 
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
                                  src="attached_assets/333B116C-1C03-41C9-801C-302D2332F97E_1_105_c.jpeg" 
                                  alt="국제 행사 1" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/E2B2C37C-5C2D-4066-ABF7-0FD6F1194FC4.jpeg" 
                                  alt="국제 행사 2" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/10A37A4A-F7DB-4A14-A302-C5B1DFAED220.jpeg" 
                                  alt="국제 행사 3" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/25C71D95-6A16-4858-9C8C-5C33DC0C1ECD.jpeg" 
                                  alt="국제 행사 4" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/5EDA3512-EF11-4F10-B183-0E42E2C0710B.jpeg" 
                                  alt="국제 행사 5" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/7F119182-C2BC-4C27-84D4-1B081322F5B1.jpeg" 
                                  alt="국제 행사 6" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/2C93E7BE-66D3-476E-8BFA-A9AF387FBEB5.jpeg" 
                                  alt="국제 행사 7" 
                                  className="w-full h-auto"
                                />
                              </div>
                              <div className="rounded overflow-hidden border border-gray-200">
                                <img 
                                  src="attached_assets/2E083608-9217-4F54-8101-7C5FF6E0ABCB.jpeg" 
                                  alt="아프리카 행사" 
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
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">수상 및 인정</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="attached_assets/이미지 2025. 5. 6. 오후 5.35.jpeg" 
                        alt="혁신상 수상" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">한국경제TV 2022 핀테크대상</h3>
                    <p className="text-sm text-gray-600 text-center">
                      블록체인 부문 최우수상
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="attached_assets/이미지 2025. 4. 22. 오전 10.48.jpeg" 
                        alt="CTO 아시아 임명" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">CTG 그룹 아시아 CTO 임명</h3>
                    <p className="text-sm text-gray-600 text-center">
                      실물 자산 디지털화 기술 리더십 인정
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="attached_assets/AE88A086-A040-4E48-A4FC-7F23F1135706.jpeg" 
                        alt="특허 등록증" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">블록체인 기술 특허 취득</h3>
                    <p className="text-sm text-gray-600 text-center">
                      특허 제10-1945925호
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}