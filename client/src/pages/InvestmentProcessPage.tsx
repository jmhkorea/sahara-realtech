import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  Wallet, 
  Search, 
  BarChart3, 
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";

interface ProcessStepProps {
  number: number;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: LucideIcon;
  children: React.ReactNode;
}

function ProcessStep({ number, title, subtitle, isOpen, onToggle, icon: Icon, children }: ProcessStepProps) {
  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden mb-4">
      <div 
        className={`p-4 flex items-center justify-between cursor-pointer ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`} 
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${isOpen ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
            <span className="font-bold text-xl">{number}</span>
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isOpen ? 'text-blue-800' : 'text-gray-800'}`}>{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Icon className={`h-5 w-5 mr-2 ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="p-5 border-t">
          {children}
        </div>
      )}
    </div>
  );
}

export default function InvestmentProcessPage() {
  const { t } = useTranslation();
  const [isAllOpen, setIsAllOpen] = useState(false);
  
  // 각 단계별 오픈 상태
  const [stepsOpen, setStepsOpen] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false
  });
  
  // 각 단계 토글 함수
  const toggleStep = (step: keyof typeof stepsOpen) => {
    setStepsOpen(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };
  
  // 모든 단계 토글
  const toggleAllSteps = () => {
    const newState = !isAllOpen;
    setIsAllOpen(newState);
    setStepsOpen({
      step1: newState,
      step2: newState,
      step3: newState,
      step4: newState
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="블록체인 부동산 투자 방법"
        description="사하라 리얼테크의 블록체인 기반 부동산 투자 4단계 과정을 알아보세요. 회원가입부터 수익 관리까지 간편한 프로세스로 부동산 투자를 시작하세요."
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">블록체인 부동산 투자 방법</h1>
          <p className="text-lg text-gray-600">
            사하라 리얼테크의 간편한 4단계 투자 프로세스를 통해 블록체인 부동산 투자를 시작하세요.
          </p>
        </div>
        
        {/* 투자 프로세스 상단 요약 카드 */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-800">블록체인 부동산 투자 방법</h2>
              <Button 
                variant="outline" 
                onClick={toggleAllSteps}
                className="border-blue-300 text-blue-600 hover:bg-blue-100"
              >
                {isAllOpen ? '모두 접기' : '모두 펼치기'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-800 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">계정 등록 및 인증</h3>
                  <p className="text-xs text-gray-500">SaharaRealTech 플랫폼에 가입하고 신원 인증을 완료하세요.</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-800 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">지갑 연결하기</h3>
                  <p className="text-xs text-gray-500">Avalanche 지원 암호화폐 지갑을 연결하여 투자를 준비하세요.</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-800 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">토큰 구매하기</h3>
                  <p className="text-xs text-gray-500">원하는 부동산을 선택하고 투자 금액에 따라 토큰을 구매하세요.</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-800 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold">수익 관리하기</h3>
                  <p className="text-xs text-gray-500">임대 수익 배당금을 받고 포트폴리오를 모니터링하세요.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 투자 프로세스 단계별 아코디언 */}
        <div className="space-y-4">
          {/* 단계 1: 회원가입 및 인증 */}
          <ProcessStep 
            number={1} 
            title="회원가입 및 인증" 
            subtitle="간편한 가입 프로세스"
            isOpen={stepsOpen.step1}
            onToggle={() => toggleStep('step1')}
            icon={User}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                블록체인 기반 부동산 투자를 시작하기 위해 사하라 리얼테크 플랫폼에 회원가입하고 본인 인증을 완료합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    간편 회원가입
                  </h4>
                  <p className="text-sm text-gray-700">
                    이메일 주소와 기본 정보만으로 빠르게 회원가입을 완료할 수 있습니다. 소셜 로그인(Google, 카카오 등)을 통한 간편 가입도 지원합니다.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    KYC 인증 절차
                  </h4>
                  <p className="text-sm text-gray-700">
                    국내 투자자는 휴대폰 본인인증과 간소화된 KYC 절차만으로 투자가 가능합니다. 해외 투자자는 여권이나 신분증 사진을 통해 인증할 수 있습니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                <h4 className="font-semibold text-yellow-800 mb-2">참고사항</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>모든 개인정보는 암호화되어 안전하게 보관됩니다</li>
                  <li>KYC 인증은 통상 24시간 이내에 완료됩니다</li>
                  <li>인증 완료 시 이메일로 알림을 보내드립니다</li>
                </ul>
              </div>
            </div>
          </ProcessStep>
          
          {/* 단계 2: 지갑 연결 */}
          <ProcessStep 
            number={2} 
            title="지갑 연결" 
            subtitle="암호화폐 지갑 설정"
            isOpen={stepsOpen.step2}
            onToggle={() => toggleStep('step2')}
            icon={Wallet}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                아발란체(Avalanche) 프로토콜을 지원하는 디지털 지갑을 연결하여 토큰 거래와 자산 관리를 준비합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    지원되는 지갑
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    다음과 같은 Avalanche C-Chain 호환 지갑을 사용할 수 있습니다:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>MetaMask</li>
                    <li>Avalanche Wallet</li>
                    <li>Trust Wallet</li>
                    <li>Coinbase Wallet</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    연결 방법
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    간단한 단계로 지갑을 연결할 수 있습니다:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                    <li>'지갑 연결' 버튼 클릭</li>
                    <li>선호하는 지갑 유형 선택</li>
                    <li>지갑 애플리케이션에서 연결 승인</li>
                    <li>연결 확인 및 완료</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                <h4 className="font-semibold text-yellow-800 mb-2">참고사항</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>처음 사용하시나요? 지갑 생성 가이드를 제공해 드립니다</li>
                  <li>지갑 연결 시 개인 키나 복구 구문은 절대 요구하지 않습니다</li>
                  <li>지갑 내에 소액의 AVAX가 필요할 수 있습니다(가스비용)</li>
                </ul>
              </div>
            </div>
          </ProcessStep>
          
          {/* 단계 3: 투자 자산 검색 및 투자 */}
          <ProcessStep 
            number={3} 
            title="투자 자산 검색 및 투자" 
            subtitle="부동산 토큰 구매"
            isOpen={stepsOpen.step3}
            onToggle={() => toggleStep('step3')}
            icon={Search}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                다양한 부동산 자산 중에서 투자하고 싶은 프로젝트를 선택하고 원하는 금액만큼 토큰을 구매합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    부동산 프로젝트 탐색
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    각 부동산 프로젝트에 대한 상세 정보를 확인할 수 있습니다:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>위치 및 자산 유형</li>
                    <li>예상 연간 수익률</li>
                    <li>토큰화 진행 상태</li>
                    <li>물리적 자산 가치</li>
                    <li>투자 위험도 평가</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    토큰 구매 프로세스
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    투자는 간단한 절차로 진행됩니다:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                    <li>원하는 부동산 프로젝트 선택</li>
                    <li>투자 금액 또는 토큰 수량 설정</li>
                    <li>투자 확인 및 블록체인 트랜잭션 승인</li>
                    <li>토큰 발행 및 지갑 수령 확인</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                <h4 className="font-semibold text-green-800 mb-2">투자 혜택</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-green-100">
                    <p className="font-medium text-green-700 text-sm">최소 투자금</p>
                    <p className="text-gray-700">10만원부터 시작 가능</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-100">
                    <p className="font-medium text-green-700 text-sm">토큰 분할 단위</p>
                    <p className="text-gray-700">최대 소수점 8자리까지</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-100">
                    <p className="font-medium text-green-700 text-sm">배당금 지급</p>
                    <p className="text-gray-700">분기 또는 월 단위 지급</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-100">
                    <p className="font-medium text-green-700 text-sm">보유 기간</p>
                    <p className="text-gray-700">최소 보유 기간 없음</p>
                  </div>
                </div>
              </div>
            </div>
          </ProcessStep>
          
          {/* 단계 4: 수익 관리 */}
          <ProcessStep 
            number={4} 
            title="수익 관리" 
            subtitle="배당금 수령 및 포트폴리오 관리"
            isOpen={stepsOpen.step4}
            onToggle={() => toggleStep('step4')}
            icon={BarChart3}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                투자한 자산의 수익률을 실시간으로 모니터링하고 배당금을 관리할 수 있습니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    포트폴리오 대시보드
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    직관적인 대시보드에서 투자 성과를 확인할 수 있습니다:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>총 보유 자산 가치</li>
                    <li>자산별 수익률 및 성과</li>
                    <li>누적 배당금 내역</li>
                    <li>자산 가격 변동 추이</li>
                    <li>자산 유형별 포트폴리오 구성</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    배당금 및 수익 관리
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    다양한 방식으로 수익을 관리할 수 있습니다:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>자동화된 배당금 지급 (스마트 컨트랙트)</li>
                    <li>배당금 재투자 옵션</li>
                    <li>출금 및 환전 기능</li>
                    <li>세금 보고서 생성</li>
                    <li>거래 내역 블록체인 조회</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mt-4">
                <h4 className="font-semibold text-indigo-800 mb-3">토큰 거래 옵션</h4>
                <p className="text-sm text-gray-700 mb-3">
                  투자한 부동산 토큰은 다음과 같은 방법으로 거래할 수 있습니다:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-indigo-100">
                    <p className="font-medium text-indigo-700 text-sm">P2P 거래</p>
                    <p className="text-xs text-gray-700">플랫폼 내 다른 투자자와 토큰 거래</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-indigo-100">
                    <p className="font-medium text-indigo-700 text-sm">유동성 풀</p>
                    <p className="text-xs text-gray-700">사하라 리얼테크 제공 유동성 풀 사용</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-indigo-100">
                    <p className="font-medium text-indigo-700 text-sm">바이백 옵션</p>
                    <p className="text-xs text-gray-700">특정 조건에서 회사 측 토큰 재매입</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-indigo-100">
                    <p className="font-medium text-indigo-700 text-sm">거래소 상장</p>
                    <p className="text-xs text-gray-700">일부 토큰은 DEX에서 거래 가능</p>
                  </div>
                </div>
              </div>
            </div>
          </ProcessStep>
        </div>
        
        {/* 투자 시작하기 버튼 */}
        <div className="text-center mt-10">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg font-bold text-lg">
            지금 투자 시작하기 <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}