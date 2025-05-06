import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Globe, ChevronDown, Settings, Building2, FolderGit, Terminal, Code } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";

export default function Header() {
  const [, setLocation] = useLocation();
  const { t, i18n } = useTranslation();

  // 언어 선택 드롭다운 상태
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  
  // 언어 변경 함수
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

  // 언어 드롭다운 참조
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // 언어 드롭다운 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // 현재 언어 표시 이름
  const getLanguageDisplay = (lang: string) => {
    switch(lang) {
      case 'ko': return '한국어';
      case 'en': return 'English';
      case 'ja': return '日本語';
      default: return 'Language';
    }
  };
  
  // 현재 언어 약어
  const getLanguageCode = (lang: string) => {
    switch(lang) {
      case 'ko': return 'KO';
      case 'en': return 'EN';
      case 'ja': return 'JP';
      default: return '';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <img src="/assets/logo-sahararealtech.svg" alt="SaharaRealTech Logo" className="h-8" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-12">
            <Link href="/" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/properties" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.properties')}
            </Link>
            <Link href="/how-to-invest" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.howToInvest')}
            </Link>
            <Link href="/investment-process" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              투자 프로세스
            </Link>
            <Link href="/portfolio" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.portfolio')}
            </Link>
            <Link href="/blog" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.blog', '블로그')}
            </Link>
            <Link href="/company-introduction" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.company', '소개')}
            </Link>
            <Link href="/team" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.team', '팀')}
            </Link>
            <Link href="/feedback" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.feedback', '피드백')}
            </Link>
            <Link href="/team-workspace" className="font-medium text-neutral-500 hover:text-primary transition-colors flex items-center whitespace-nowrap">
              <FolderGit className="h-4 w-4 mr-1" />
              워크스페이스
            </Link>
            <a href="https://resort-planner-jmhkorea.replit.app/realestate" target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-500 hover:text-primary transition-colors flex items-center whitespace-nowrap">
              <Terminal className="h-4 w-4 mr-1" />
              DevOps
            </a>
            <Link href="/admin" className="font-medium text-neutral-500 hover:text-primary transition-colors flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              관리자
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative" ref={languageMenuRef}>
              <button 
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm border rounded-md hover:bg-neutral-50 transition-colors"
              >
                <Globe className="h-4 w-4 mr-1 text-neutral-500" />
                <span>{getLanguageCode(i18n.language)}</span>
                <ChevronDown className="h-3 w-3 text-neutral-400" />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button 
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center 
                      ${i18n.language === 'ko' ? 'text-primary font-medium' : 'text-neutral-700'}`}
                      onClick={() => changeLanguage('ko')}
                    >
                      <span className="mr-1">🇰🇷</span> 한국어
                    </button>
                    <button 
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center 
                      ${i18n.language === 'en' ? 'text-primary font-medium' : 'text-neutral-700'}`}
                      onClick={() => changeLanguage('en')}
                    >
                      <span className="mr-1">🇺🇸</span> English
                    </button>
                    <button 
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center 
                      ${i18n.language === 'ja' ? 'text-primary font-medium' : 'text-neutral-700'}`}
                      onClick={() => changeLanguage('ja')}
                    >
                      <span className="mr-1">🇯🇵</span> 日本語
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
              <WalletConnect />
            </div>
            
            <div className="hidden sm:block">
              <Button className="px-4 py-2">
                {t('auth.loginRegister')}
              </Button>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="px-4 py-2 flex justify-center mb-4">
                  <img src="/assets/logo-sahararealtech.svg" alt="SaharaRealTech Logo" className="h-8" />
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.home')}
                  </Link>
                  <Link href="/properties" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.properties')}
                  </Link>
                  <Link href="/how-to-invest" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.howToInvest')}
                  </Link>
                  <Link href="/investment-process" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    투자 프로세스
                  </Link>
                  <Link href="/portfolio" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.portfolio')}
                  </Link>
                  <Link href="/blog" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.blog', '블로그')}
                  </Link>
                  <Link href="/company-introduction" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    <Building2 className="h-4 w-4 mr-2" />
                    {t('nav.company', '사하라 리얼테크 소개')}
                  </Link>
                  <Link href="/team" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.team')}
                  </Link>
                  <Link href="/feedback" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.feedback', '피드백')}
                  </Link>
                  <Link href="/team-workspace" className="px-4 py-2 hover:bg-neutral-100 rounded-md flex items-center">
                    <FolderGit className="h-4 w-4 mr-2" />
                    팀 워크스페이스
                  </Link>
                  <a href="https://resort-planner-jmhkorea.replit.app/realestate" target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-neutral-100 rounded-md flex items-center">
                    <Terminal className="h-4 w-4 mr-2" />
                    DevOps
                  </a>
                  <Link href="/admin" className="px-4 py-2 hover:bg-neutral-100 rounded-md flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    관리자
                  </Link>
                  <hr />
                  <WalletConnect />
                  <Button variant="outline">
                    {t('auth.loginRegister')}
                  </Button>
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-sm text-neutral-600 font-medium ml-1">언어 선택</p>
                    <Button variant="ghost" onClick={() => changeLanguage('ko')} className={i18n.language === 'ko' ? 'bg-neutral-100' : ''}>
                      <span className="mr-2">🇰🇷</span> 한국어
                    </Button>
                    <Button variant="ghost" onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'bg-neutral-100' : ''}>
                      <span className="mr-2">🇺🇸</span> English
                    </Button>
                    <Button variant="ghost" onClick={() => changeLanguage('ja')} className={i18n.language === 'ja' ? 'bg-neutral-100' : ''}>
                      <span className="mr-2">🇯🇵</span> 日本語
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
