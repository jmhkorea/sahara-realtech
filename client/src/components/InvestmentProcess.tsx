import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  UserCheck,
  Wallet,
  LineChart,
  ChevronUp,
  ChevronDown,
  Building, 
  BarChart3
} from "lucide-react";

export default function InvestmentProcess() {
  const { t } = useTranslation();
  const [step1Open, setStep1Open] = useState(true);
  const [step2Open, setStep2Open] = useState(true);
  const [step3Open, setStep3Open] = useState(true);
  const [step4Open, setStep4Open] = useState(true);

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* 회원가입 및 인증 */}
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <Collapsible
            open={step1Open}
            onOpenChange={setStep1Open}
          >
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">회원가입 및 인증</h3>
                  <p className="text-sm text-gray-500">회원가입 및 인증</p>
                </div>
              </div>
              <div>
                {step1Open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 border-t">
              <div className="mt-4">
                <p className="text-gray-700 mb-4">
                  블록체인 기반 부동산 투자를 위해 본인 인증을 완료하고 계정을 생성합니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
                  <UserCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">빠르고 간편한 KYC 인증 절차</p>
                    <p className="text-xs text-blue-700 mt-1">
                      간소화된 KYC 프로세스로 신속하게 가입하고 투자를 시작할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* 지갑 연결 */}
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <Collapsible
            open={step2Open}
            onOpenChange={setStep2Open}
          >
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">지갑 연결</h3>
                  <p className="text-sm text-gray-500">지갑 연결</p>
                </div>
              </div>
              <div>
                {step2Open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 border-t">
              <div className="mt-4">
                <p className="text-gray-700 mb-4">
                  아발란체 프로토콜을 지원하는 디지털 지갑을 연결하여 투자를 준비합니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
                  <Wallet className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">MetaMask, Avalanche Wallet 등 지원</p>
                    <p className="text-xs text-blue-700 mt-1">
                      메타마스크나 아발란체 월렛과 같은 주요 디지털 지갑을 손쉽게 연결할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* 투자 자산 검색 및 투자 */}
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <Collapsible
            open={step3Open}
            onOpenChange={setStep3Open}
          >
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">투자 자산 검색 및 투자</h3>
                  <p className="text-sm text-gray-500">투자자산 선택 및 투자</p>
                </div>
              </div>
              <div>
                {step3Open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 border-t">
              <div className="mt-4">
                <p className="text-gray-700 mb-4">
                  다양한 부동산 자산 중에서 투자하고 싶은 자산을 선택하고 원하는 금액만큼 투자합니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
                  <Building className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">부동산 정보 및 투자 분석</p>
                    <p className="text-xs text-blue-700 mt-1">
                      각 부동산 자산의 상세 정보, 예상 수익률, 위험 등급 등을 확인하고 정보에 기반한 투자 결정을 내릴 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* 수익 관리 */}
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <Collapsible
            open={step4Open}
            onOpenChange={setStep4Open}
          >
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">수익 관리</h3>
                  <p className="text-sm text-gray-500">수익 확인 및 관리</p>
                </div>
              </div>
              <div>
                {step4Open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 border-t">
              <div className="mt-4">
                <p className="text-gray-700 mb-4">
                  투자한 자산의 수익률을 실시간으로 모니터링하고 배당금을 관리할 수 있습니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">다양한 수익 분석 도구</p>
                    <p className="text-xs text-blue-700 mt-1">
                      수익 그래프, 배당금 내역, 자산 가치 변동 등 다양한 분석 도구를 통해 투자 성과를 확인할 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-blue-50 p-4 rounded-md flex items-start space-x-3">
                  <LineChart className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">자동화된 배당금 지급</p>
                    <p className="text-xs text-blue-700 mt-1">
                      스마트 컨트랙트를 통해 자동으로 배당금이 지급되며, 모든 거래 내역은 블록체인에 투명하게 기록됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}