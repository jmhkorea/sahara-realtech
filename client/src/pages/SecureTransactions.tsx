import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  LockKeyhole, 
  FileCheck, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Fingerprint,
  Server,
  History,
  Eye
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SecureTransactions() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-5">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>이전 페이지로 돌아가기</span>
          </Button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto mb-16">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            안전한 거래
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            스마트 컨트랙트와 CertiK 보안 감사를 통해 투명하고 안전한 블록체인 부동산 거래 시스템을 제공합니다.
          </p>

          <div className="p-3 mt-5 bg-blue-50 border-l-4 border-blue-500 rounded-md text-blue-900 font-semibold text-left">
            <p className="text-sm md:text-base">
              사하라 리얼테크는 철저한 법 규제를 준수하고 보안 감사를 통해 신뢰를 우선으로 한다
            </p>
          </div>
        </div>

        {/* 주요 내용 섹션 */}
        <div className="mb-12 space-y-8">
          <Card className="shadow-md border-2 border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span>블록체인 보안 기술</span>
              </CardTitle>
              <CardDescription>사하라 리얼테크가 구현한 다중 보안 시스템</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-emerald max-w-none">
                <p>
                  사하라 리얼테크는 아발란체 블록체인의 모든 보안 이점을 활용하고, 여기에 추가적인 
                  보안 레이어를 구축하여 투자자의 자산을 최대한 보호합니다.
                </p>
                
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      분산 원장 기술
                    </h3>
                    <p className="text-sm">
                      모든 거래 기록이 수천 개의 노드에 분산 저장되어 데이터 변조나 해킹이 사실상 불가능한 
                      구조로 설계되었습니다.
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                      <History className="h-5 w-5" />
                      불변성 보장
                    </h3>
                    <p className="text-sm">
                      한번 블록체인에 기록된 거래 내역은 변경이 불가능하여 부동산 소유권 이전 및 투자 내역의 
                      완전한 추적성을 제공합니다.
                    </p>
                  </div>
                </div>
                
                <p className="font-medium">
                  아발란체 프로토콜은 초당 4,500개 이상의 트랜잭션을 처리할 수 있으며, 
                  특히 부동산과 같은 실물 자산 토큰화에 최적화된 보안 구조를 갖추고 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CertiK 보안 감사 */}
          <Card className="shadow-md border-2 border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>CertiK 보안 감사</span>
              </CardTitle>
              <CardDescription>블록체인 산업 최고의 보안 감사 기관과의 협력</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-emerald max-w-none">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm border border-emerald-100">
                    <img 
                      src="https://certik.com/static/img/logo-light-mode.svg" 
                      alt="CertiK Logo" 
                      className="h-12"
                    />
                  </div>
                </div>
                
                <p>
                  사하라 리얼테크는 모든 스마트 컨트랙트와 토큰화 프로세스에 대해 CertiK의 
                  엄격한 보안 감사를 받습니다. CertiK는 블록체인 보안 분야에서 세계적으로 
                  인정받는 기업으로, 이들의 인증은 최고 수준의 보안 신뢰성을 보장합니다.
                </p>
                
                <div className="my-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">CertiK 감사 프로세스</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li className="text-emerald-900">
                      <span className="font-medium">정적 분석 및 형식 검증</span>
                      <p className="text-sm mt-1">
                        자동화된 도구를 사용하여 코드의 취약점, 오버플로우, 재진입 공격 가능성 등을 
                        체계적으로 검사합니다.
                      </p>
                    </li>
                    <li className="text-emerald-900">
                      <span className="font-medium">수동 코드 리뷰</span>
                      <p className="text-sm mt-1">
                        보안 전문가가 직접 코드를 분석하여 자동화된 도구로 발견하기 어려운 
                        복잡한 취약점을 식별합니다.
                      </p>
                    </li>
                    <li className="text-emerald-900">
                      <span className="font-medium">경제적 공격 시뮬레이션</span>
                      <p className="text-sm mt-1">
                        토큰 이코노믹스의 안정성을 테스트하기 위해 다양한 시장 조건에서의 
                        공격 시나리오를 시뮬레이션합니다.
                      </p>
                    </li>
                    <li className="text-emerald-900">
                      <span className="font-medium">감사 보고서 발행</span>
                      <p className="text-sm mt-1">
                        모든 발견된 문제와 해결 방법이 상세히 기록된 공식 감사 보고서를 
                        발행하고 이를 공개합니다.
                      </p>
                    </li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">알림:</span> 모든 부동산 프로젝트의 CertiK 보안 감사 보고서는 
                    프로젝트 페이지에서 확인할 수 있으며, 해당 보고서 링크는 영구적으로 블록체인에 저장됩니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 스마트 컨트랙트 안전성 */}
          <Card className="shadow-md border-2 border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-emerald-600" />
                <span>스마트 컨트랙트 안전성</span>
              </CardTitle>
              <CardDescription>자동화된 계약 실행을 통한 신뢰 구축</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-emerald max-w-none">
                <p>
                  사하라 리얼테크의 모든 부동산 거래와 투자는 스마트 컨트랙트를 통해 이루어집니다. 
                  스마트 컨트랙트는 미리 정의된 조건이 충족되면 자동으로 실행되는 코드로, 
                  중개자 없이도 안전한 거래를 보장합니다.
                </p>
                
                <Accordion type="single" collapsible className="w-full mt-4">
                  <AccordionItem value="item-1" className="border-emerald-200">
                    <AccordionTrigger className="hover:bg-emerald-50 px-2 py-3 rounded-t font-medium">
                      자동화된 실행
                    </AccordionTrigger>
                    <AccordionContent className="bg-emerald-50 px-4 py-3 rounded-b mb-2">
                      <p className="text-sm">
                        일단 블록체인에 배포된 스마트 컨트랙트는 정해진 조건이 충족되면 
                        자동으로 실행되어 인간의 개입 없이도 정확하게 계약이 이행됩니다. 
                        예를 들어, 임대 수익이 발생하면 자동으로 토큰 보유자에게 배당금이 분배됩니다.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-emerald-200">
                    <AccordionTrigger className="hover:bg-emerald-50 px-2 py-3 rounded-t font-medium">
                      코드로서의 법률
                    </AccordionTrigger>
                    <AccordionContent className="bg-emerald-50 px-4 py-3 rounded-b mb-2">
                      <p className="text-sm">
                        스마트 컨트랙트는 "코드로서의 법률"이라는 개념을 실현합니다. 
                        모든 계약 조건이 코드로 작성되어 투명하게 블록체인에 공개되고, 
                        이 코드는 변경이 불가능하기 때문에 계약 조건을 임의로 수정할 수 없습니다.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-emerald-200">
                    <AccordionTrigger className="hover:bg-emerald-50 px-2 py-3 rounded-t font-medium">
                      자금 에스크로 자동화
                    </AccordionTrigger>
                    <AccordionContent className="bg-emerald-50 px-4 py-3 rounded-b mb-2">
                      <p className="text-sm">
                        투자금은 스마트 컨트랙트에 의해 안전하게 에스크로되어 관리되며, 
                        명확히 정의된 조건(예: 모금 목표 달성, 특정 개발 단계 완료)이 충족될 때만 
                        자금이 프로젝트 개발자에게 이체됩니다.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border-emerald-200">
                    <AccordionTrigger className="hover:bg-emerald-50 px-2 py-3 rounded-t font-medium">
                      투명한 거버넌스
                    </AccordionTrigger>
                    <AccordionContent className="bg-emerald-50 px-4 py-3 rounded-b">
                      <p className="text-sm">
                        거버넌스 관련 결정(예: 부동산 매각, 주요 리모델링)은 스마트 컨트랙트를 통해 
                        투표로 진행되며, 투표 과정과 결과가 모두 블록체인에 투명하게 기록됩니다. 
                        일반 결의는 50% 이상, 특별 결의는 75% 이상의 승인이 필요합니다.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>

          {/* 투자자 보호 시스템 */}
          <Card className="shadow-md border-2 border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100">
              <CardTitle className="flex items-center gap-2">
                <LockKeyhole className="h-5 w-5 text-emerald-600" />
                <span>투자자 보호 시스템</span>
              </CardTitle>
              <CardDescription>다층적 보호 메커니즘으로 안전한 투자 환경 조성</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-emerald max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Fingerprint className="h-5 w-5 text-emerald-600" />
                      <h3 className="text-md font-semibold text-emerald-800">신원 확인(KYC/AML)</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      모든 투자자는 강력한 신원 확인(KYC) 및 자금세탁방지(AML) 절차를 통과해야 하며, 
                      이는 법적 요구사항 준수와 함께 사기 방지를 위한 필수 단계입니다.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-emerald-600" />
                      <h3 className="text-md font-semibold text-emerald-800">투명한 정보 공개</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      모든 부동산 프로젝트의 재무 정보, 법적 문서, 평가 보고서 등이 투명하게 공개되며, 
                      이러한 정보는 블록체인에 해시값으로 저장되어 위변조를 방지합니다.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">위험 완화 메커니즘</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1" />
                      <span className="text-sm text-blue-900">
                        <strong>분산 보관:</strong> 프로젝트 자금은 다중 서명(Multi-sig) 지갑에 보관되어 
                        단일 주체가 자금을 통제할 수 없는 구조입니다.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1" />
                      <span className="text-sm text-blue-900">
                        <strong>단계적 자금 해제:</strong> 프로젝트 개발 단계에 따라 자금이 점진적으로 
                        해제되어 부적절한 자금 사용을 방지합니다.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1" />
                      <span className="text-sm text-blue-900">
                        <strong>거버넌스 참여:</strong> 중요한 결정은 토큰 보유자의 투표를 통해 이루어지며, 
                        클래스별 투표 시스템으로 소수 투자자의 권리도 보호됩니다.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1" />
                      <span className="text-sm text-blue-900">
                        <strong>비상 중단 메커니즘:</strong> 보안 취약점이 발견될 경우, 프라임 마스터 NFT 
                        보유자가 일시적으로 거래를 중단시키고 문제를 해결할 수 있습니다.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50">
                  <p className="text-sm text-emerald-900 font-medium">
                    "사하라 리얼테크의 모든 보안 시스템은 투자자의 자산을 최우선으로 보호하도록 설계되었으며, 
                    블록체인의 투명성과 불변성을 통해 전통적인 부동산 투자보다 더 높은 수준의 
                    안전성을 제공합니다."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-emerald-50 to-emerald-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">안전한 블록체인 투자 시작하기</h2>
          <p className="mb-6">CertiK 보안 감사를 통과한 검증된 스마트 컨트랙트로 투자하세요.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/how-to-invest">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3">
                보안 정보 더 알아보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3">
                안전한 투자 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}