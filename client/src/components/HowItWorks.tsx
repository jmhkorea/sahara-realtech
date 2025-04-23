import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import {
  UserCheck,
  Wallet,
  Building,
  LineChart,
  ChevronDown,
  ChevronUp,
  Search,
  BarChart
} from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [walletOpen, setWalletOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);
  const [returnsOpen, setReturnsOpen] = useState(true);

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-neutral-400">
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        {/* 블록체인 부동산 투자 방법 카드 */}
        <div className="mb-12">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="border-2 border-primary/30 rounded-lg bg-white shadow-sm"
          >
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
              <div className="flex items-center">
                <Building className="text-primary mr-3 h-6 w-6" />
                <h3 className="text-xl font-bold">블록체인 부동산 투자 방법</h3>
              </div>
              <div>
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t">
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">1. 계정 등록 및 인증</h4>
                  <p className="text-sm text-neutral-600">SaharaRealTech 플랫폼에 가입하고 신원 인증을 완료하세요.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">2. 지갑 연결하기</h4>
                  <p className="text-sm text-neutral-600">Avalanche 지원 암호화폐 지갑을 연결하여 부동산 토큰 거래를 준비하세요.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">3. 토큰 구매하기</h4>
                  <p className="text-sm text-neutral-600">원하는 부동산의 토큰을 구매하고 소유권을 획득하세요.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">4. 수익 관리하기</h4>
                  <p className="text-sm text-neutral-600">임대 수익 배당금을 받고 토큰 가치 상승의 혜택을 누리세요.</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-12">
          {/* 회원가입 및 인증 */}
          <div className="border-2 border-primary/30 rounded-lg bg-white shadow-sm">
            <Collapsible
              open={registrationOpen}
              onOpenChange={setRegistrationOpen}
            >
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">1</div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold">{t('howItWorks.steps.step1.title')}</h3>
                    <span className="text-sm text-neutral-500">회원가입 및 인증</span>
                  </div>
                </div>
                <div>
                  {registrationOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-4">{t('howItWorks.steps.step1.description')}</p>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <UserCheck className="text-primary mr-2 h-5 w-5" />
                        <span className="text-sm font-medium">{t('howItWorks.steps.step1.highlight')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* 지갑 연결 */}
          <div className="border-2 border-primary/30 rounded-lg bg-white shadow-sm">
            <Collapsible
              open={walletOpen}
              onOpenChange={setWalletOpen}
            >
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">2</div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold">{t('howItWorks.steps.step2.title')}</h3>
                    <span className="text-sm text-neutral-500">지갑 연결</span>
                  </div>
                </div>
                <div>
                  {walletOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-4">{t('howItWorks.steps.step2.description')}</p>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Wallet className="text-primary mr-2 h-5 w-5" />
                        <span className="text-sm font-medium">{t('howItWorks.steps.step2.highlight')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* 투자 자산 검색 및 투자 */}
          <div className="border-2 border-primary/30 rounded-lg bg-white shadow-sm">
            <Collapsible
              open={searchOpen}
              onOpenChange={setSearchOpen}
            >
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">3</div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold">투자 자산 검색 및 투자</h3>
                    <span className="text-sm text-neutral-500">{t('howItWorks.steps.step3.title')}</span>
                  </div>
                </div>
                <div>
                  {searchOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-4">{t('howItWorks.steps.step3.description')}</p>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Search className="text-primary mr-2 h-5 w-5" />
                        <span className="text-sm font-medium">{t('howItWorks.steps.step3.highlight')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* 수익 관리 */}
          <div className="border-2 border-primary/30 rounded-lg bg-white shadow-sm">
            <Collapsible
              open={returnsOpen}
              onOpenChange={setReturnsOpen}
            >
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-neutral-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3 text-lg font-bold">4</div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold">{t('howItWorks.steps.step4.title')}</h3>
                    <span className="text-sm text-neutral-500">수익 관리</span>
                  </div>
                </div>
                <div>
                  {returnsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-4">{t('howItWorks.steps.step4.description')}</p>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <BarChart className="text-primary mr-2 h-5 w-5" />
                        <span className="text-sm font-medium">{t('howItWorks.steps.step4.highlight')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link href="/properties">
            <Button className="inline-flex justify-center items-center px-8 py-4 text-lg w-auto">
              {t('howItWorks.startNowButton')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
