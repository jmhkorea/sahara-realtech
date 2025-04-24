import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, CheckCircle, Globe, Award, School, Shield, 
  Zap, Clock, DollarSign, LineChart, Users, Server
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AvalancheTech() {
  return (
    <>
      <Helmet>
        <title>아발란체 프로토콜 | SaharaRealTech</title>
        <meta 
          name="description" 
          content="사하라 리얼테크는 아발란체 프로토콜을 통해 안전하고 빠른 실물 자산 토큰화를 실현합니다. 코넬 대학 연구진이 개발한 이 기술은 뛰어난 확장성과 보안성을 제공합니다." 
        />
      </Helmet>
      
      <div className="bg-gradient-to-b from-blue-900 to-blue-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">아발란체 블록체인 기술</h1>
            <p className="text-xl md:text-2xl max-w-3xl opacity-90 mb-8">
              사하라 리얼테크가 선택한 가장 안전하고 빠른 실물 자산 토큰화 프로토콜
            </p>
            <div className="flex items-center gap-2 bg-blue-800 p-3 rounded-lg">
              <Zap size={24} className="text-blue-200" />
              <span className="text-lg">현재 <span className="font-bold">10+</span>개의 자산이 아발란체 기반으로 토큰화되었습니다</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">왜 사하라 리얼테크는 아발란체를 선택했나요?</h2>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
              <div className="flex items-start mb-5">
                <School className="mr-4 text-blue-600 mt-1 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">코넬 대학교의 학술적 우수성</h3>
                  <p className="text-gray-700">
                    아발란체는 코넬 대학교의 컴퓨터 과학 교수 에민 군 시리어(Emin Gün Sirer)가 주도한 프로젝트로, 
                    분산 시스템 및 블록체인 분야의 학계 최고 전문가들이 개발했습니다. 이러한 학문적 배경은 투자자들에게
                    기술적 신뢰성과 지속 가능한 혁신을 보장합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="mr-4 text-blue-600 mt-1 flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">미국 기반의 글로벌 규제 호환성</h3>
                  <p className="text-gray-700">
                    미국 학계를 기반으로 한 아발란체 프로토콜은 북미 및 글로벌 규제 프레임워크와의 호환성을 
                    고려하여 설계되었습니다. 이는 국제 투자자들에게 중요한 법적 안정성과 규제 준수를 제공합니다.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4">실제 세계 자산을 위한 최적의 인프라</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-semibold text-gray-800">초당 4,500+ 트랜잭션</p>
                    <p className="text-sm text-gray-600">대규모 자산 토큰화에 필수적인 처리 용량</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-semibold text-gray-800">1-2초 거래 확정</p>
                    <p className="text-sm text-gray-600">실시간 자산 관리와 거래를 위한 속도</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-semibold text-gray-800">맞춤형 서브넷 아키텍처</p>
                    <p className="text-sm text-gray-600">각 자산 유형에 최적화된 환경 구성 가능</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-semibold text-gray-800">에너지 효율적 합의</p>
                    <p className="text-sm text-gray-600">친환경 ESG 기준에 부합하는 운영</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="bg-gradient-to-br from-white to-blue-50 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  <div className="flex items-center">
                    <Award className="mr-2 text-blue-600" size={24} />
                    핵심 기술 특징
                  </div>
                </CardTitle>
                <CardDescription>아발란체 프로토콜의 차별화 요소</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Server className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">3중 체인 구조</p>
                      <p className="text-sm text-gray-600">X-Chain(자산), C-Chain(계약), P-Chain(플랫폼)의 전문화된 구조로 최적의 성능 제공</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">혁신적 합의 알고리즘</p>
                      <p className="text-sm text-gray-600">Avalanche 및 Snowman 합의 프로토콜로 고속 처리와 보안성 동시 달성</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">서브넷 기술</p>
                      <p className="text-sm text-gray-600">자산 유형별 맞춤형 블록체인 환경 구성으로 규제 요구사항 충족</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">토큰 경제학</p>
                      <p className="text-sm text-gray-600">디플레이션 모델의 AVAX 토큰으로 장기적 가치 보존</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">지속적 혁신</p>
                      <p className="text-sm text-gray-600">코넬 대학교 연구진의 지속적 기술 개발 및 개선</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-6 text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    기술 백서 다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <LineChart className="mr-2 text-blue-600" size={24} />
                프로젝트 안정성 지표
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">네트워크 보안성</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">확장성</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">탈중앙화 수준</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">개발자 생태계</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="features" className="mb-16">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="features">기술적 특징</TabsTrigger>
            <TabsTrigger value="ecosystem">생태계 및 파트너십</TabsTrigger>
            <TabsTrigger value="comparison">경쟁사 비교</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">아발란체의 기술적 장점</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium text-blue-700">
                    3중 체인 구조의 실제 활용
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p>아발란체의 독특한 3중 체인 구조(X-Chain, C-Chain, P-Chain)는 각각의 기능에 최적화된 성능을 제공합니다:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>X-Chain</strong>: 부동산 토큰화 자산의 생성 및 전송을 담당하며, 빠른 거래와 낮은 수수료를 제공합니다.</li>
                      <li><strong>C-Chain</strong>: 스마트 컨트랙트를 통해 복잡한 투자 조건과 수익 분배 로직을 실행합니다.</li>
                      <li><strong>P-Chain</strong>: 서브넷을 관리하고 네트워크 검증자를 조정하여 전체 시스템의 안정성을 유지합니다.</li>
                    </ul>
                    <p className="mt-3">사하라 리얼테크는 이 구조를 활용하여 각 자산 유형에 맞는 최적화된 환경을 구성합니다.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium text-blue-700">
                    서브넷 기술과 자산별 맞춤 환경
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p>서브넷은 아발란체의 혁신적 기능으로, 특정 자산 유형에 최적화된 독립적 블록체인 환경을 구축할 수 있습니다:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>상업용 부동산 서브넷</strong>: 수익 분배와 임대 관리에 특화된 환경</li>
                      <li><strong>주거용 부동산 서브넷</strong>: 소유권 이전과 분할 소유권에 최적화된 구조</li>
                      <li><strong>리조트 멤버십 서브넷</strong>: 사용권 관리와 예약 시스템 통합</li>
                    </ul>
                    <p className="mt-3">각 서브넷은 해당 자산의 특성과 규제 요구사항에 맞게 파라미터를 조정할 수 있어, 모든 유형의 실물 자산에 최적화된 토큰화가 가능합니다.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium text-blue-700">
                    혁신적 합의 메커니즘의 이점
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p>아발란체의 합의 메커니즘은 코넬 대학 연구진의 학술적 연구를 바탕으로 개발되었으며, 다음과 같은 이점을 제공합니다:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>Avalanche 합의</strong>: 무작위 샘플링과 반복적 투표 방식으로 높은 처리량과 신속한 완결성 제공</li>
                      <li><strong>Snowman 합의</strong>: 트랜잭션의 순서가 중요한 스마트 컨트랙트에 최적화된 선형 구조</li>
                      <li><strong>지분증명(PoS)</strong>: 에너지 효율적이며 친환경적인 검증 방식으로 ESG 기준 충족</li>
                    </ul>
                    <p className="mt-3">이러한 합의 메커니즘은 부동산과 같은 고가치 자산의 안전한 토큰화와 거래를 보장합니다.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium text-blue-700">
                    토큰 경제학과 장기 가치
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p>AVAX 토큰은 아발란체 네트워크의 기본 유틸리티 토큰으로, 다음과 같은 경제적 특성을 가집니다:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>고정 공급량</strong>: 최대 7억 2천만 AVAX로 한정되어 인플레이션 위험 최소화</li>
                      <li><strong>디플레이션 모델</strong>: 거래 수수료의 일부가 영구적으로 소각되어 시간이 지날수록 희소성 증가</li>
                      <li><strong>스테이킹 보상</strong>: 네트워크 보안 참여에 대한 인센티브로 연간 약 7-10% 보상 제공</li>
                    </ul>
                    <p className="mt-3">사하라 리얼테크는 이러한 토큰 경제학을 기반으로 자산 가치의 장기적 보존과 성장을 추구합니다.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="ecosystem">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">생태계 및 전략적 파트너십</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-bold text-blue-700 mb-3">주요 전략적 파트너</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">Ava Labs</p>
                        <p className="text-sm text-gray-600">아발란체 프로토콜 개발사와의 직접 기술 협력</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">코넬 테크(Cornell Tech)</p>
                        <p className="text-sm text-gray-600">블록체인 연구 협력 및 기술 자문</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">국제 부동산 개발사</p>
                        <p className="text-sm text-gray-600">글로벌 부동산 자산 토큰화 파트너십</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">금융 기관</p>
                        <p className="text-sm text-gray-600">규제 준수 및 기관 투자자 접근성 향상을 위한 협력</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="text-xl font-bold text-blue-700 mb-3">생태계 강점</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">개발자 커뮤니티</p>
                        <p className="text-sm text-gray-600">활발한 글로벌 개발자 생태계와 지속적 혁신</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">학계 지원</p>
                        <p className="text-sm text-gray-600">코넬, MIT, 프린스턴 등 학계의 지속적 연구 지원</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">기업 채택</p>
                        <p className="text-sm text-gray-600">JP Morgan, Deloitte 등 글로벌 기업의 활용 사례</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-semibold">기술 지원</p>
                        <p className="text-sm text-gray-600">24/7 기술 지원 및 지속적인 업데이트 제공</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <h4 className="text-xl font-bold text-blue-700 mb-3">코넬 대학교 연구 협력 중점 영역</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2">확장성 연구</h5>
                    <p className="text-sm text-gray-700">대규모 자산 토큰화를 위한 네트워크 확장성 연구 및 최적화</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2">보안성 강화</h5>
                    <p className="text-sm text-gray-700">암호학적 보안 방식과 취약점 분석을 통한 자산 보호 최적화</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2">규제 호환성</h5>
                    <p className="text-sm text-gray-700">글로벌 규제 프레임워크와의 호환성을 위한 기술 개발</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2">토큰 경제학</h5>
                    <p className="text-sm text-gray-700">자산 토큰화의 경제적 모델 및 인센티브 구조 최적화</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2">상호운용성</h5>
                    <p className="text-sm text-gray-700">다양한 블록체인 네트워크 간의 자산 이동성 연구</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2">실물 자산 표준</h5>
                    <p className="text-sm text-gray-700">부동산 및 실물 자산 토큰화를 위한 산업 표준 개발</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">경쟁 블록체인 대비 아발란체의 우위성</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="py-3 px-4 border-b text-left text-blue-800">특성</th>
                      <th className="py-3 px-4 border-b text-center text-blue-800">아발란체</th>
                      <th className="py-3 px-4 border-b text-center text-gray-700">이더리움</th>
                      <th className="py-3 px-4 border-b text-center text-gray-700">솔라나</th>
                      <th className="py-3 px-4 border-b text-center text-gray-700">바이낸스 체인</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">트랜잭션 처리량</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">4,500+ TPS</td>
                      <td className="py-3 px-4 border-b text-center">15-30 TPS</td>
                      <td className="py-3 px-4 border-b text-center">50,000+ TPS</td>
                      <td className="py-3 px-4 border-b text-center">100+ TPS</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">거래 확정 시간</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">1-2초</td>
                      <td className="py-3 px-4 border-b text-center">5-10분</td>
                      <td className="py-3 px-4 border-b text-center">0.4초</td>
                      <td className="py-3 px-4 border-b text-center">3초</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">탈중앙화 수준</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">높음</td>
                      <td className="py-3 px-4 border-b text-center">매우 높음</td>
                      <td className="py-3 px-4 border-b text-center">중간</td>
                      <td className="py-3 px-4 border-b text-center">낮음</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">맞춤형 서브넷</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">지원</td>
                      <td className="py-3 px-4 border-b text-center">미지원</td>
                      <td className="py-3 px-4 border-b text-center">미지원</td>
                      <td className="py-3 px-4 border-b text-center">미지원</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">학술적 기반</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">코넬 대학</td>
                      <td className="py-3 px-4 border-b text-center">커뮤니티</td>
                      <td className="py-3 px-4 border-b text-center">기업</td>
                      <td className="py-3 px-4 border-b text-center">기업</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">실물 자산 토큰화 적합성</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">매우 높음</td>
                      <td className="py-3 px-4 border-b text-center">중간</td>
                      <td className="py-3 px-4 border-b text-center">높음</td>
                      <td className="py-3 px-4 border-b text-center">중간</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b font-medium">에너지 효율성</td>
                      <td className="py-3 px-4 border-b text-center bg-green-50 font-semibold text-green-700">매우 높음</td>
                      <td className="py-3 px-4 border-b text-center">중간</td>
                      <td className="py-3 px-4 border-b text-center">높음</td>
                      <td className="py-3 px-4 border-b text-center">높음</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <h4 className="text-xl font-bold text-blue-700 mb-3">왜 사하라 리얼테크는 아발란체를 선택했는가</h4>
                <p className="text-gray-700 mb-4">
                  사하라 리얼테크는 여러 블록체인 대안을 철저히 평가한 후, 미국 코넬 대학교의 학술적 배경과 기술적 우수성을 갖춘 
                  아발란체를 실물 자산 토큰화 플랫폼의 기반으로 선정했습니다. 아발란체는 다음과 같은 핵심 요소에서 경쟁 우위를 제공합니다:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <BarChart4 className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-semibold">학술적 신뢰성과 기술적 우수성</p>
                      <p className="text-sm text-gray-600">코넬 대학 연구진의 전문성과 학계의 지속적 검증을 통한 기술적 안정성</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BarChart4 className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-semibold">서브넷을 통한 자산별 맞춤화</p>
                      <p className="text-sm text-gray-600">각 부동산 유형과 지역별 규제에 최적화된 환경 구성 가능성</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BarChart4 className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-semibold">속도와 확장성</p>
                      <p className="text-sm text-gray-600">대규모 자산 거래와 토큰화에 필요한 높은 처리량과 즉각적인 확정성</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BarChart4 className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-semibold">미국 기반 규제 호환성</p>
                      <p className="text-sm text-gray-600">미국 학계와 기업 환경에서 발전한 기술로 글로벌 규제 준수에 유리</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">사하라 리얼테크와 함께 시작하세요</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            코넬 대학교의 학술적 기반과 아발란체의 첨단 기술력이 결합된 
            사하라 리얼테크의 부동산 토큰화 플랫폼에서 새로운 투자 기회를 발견하세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/properties">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                토큰화된 자산 둘러보기
              </Button>
            </Link>
            <Link href="/investment-process">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
                투자 프로세스 알아보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}