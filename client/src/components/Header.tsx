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
    <header className="bg-gradient-to-r from-pink-50 via-white to-purple-50 shadow-sm sticky top-0 z-50 border-b border-pink-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">SaharaRealTech</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-12">
            <Link href="/" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/properties" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.properties')}
            </Link>
            <Link href="/how-to-invest" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.howToInvest')}
            </Link>
            <Link href="/investment-process" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              투자 프로세스
            </Link>
            <Link href="/portfolio" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.portfolio')}
            </Link>
            <Link href="/blog" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.blog', '블로그')}
            </Link>
            <Link href="/company-introduction" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.company', '소개')}
            </Link>
            <Link href="/team" className="font-medium text-gray-700 hover:text-pink-600 transition-colors">
              {t('nav.team', '팀')}
            </Link>
            <a 
              href="https://digitalhuman.kimiyi.ai/?id=4Eyoo5HGb3kT2xspOUjfeIP_h8z-nOs0eBplAhWaIEGgXYDE648u8HGF0rCo7_qUHR4x8l3vI0qsMj8KNwxyRw2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-gray-700 hover:text-pink-600 transition-colors flex items-center whitespace-nowrap"
            >
              <Code className="h-4 w-4 mr-1 text-pink-500" />
              AI 어시스턴트
            </a>
            <Link href="/team-workspace" className="font-medium text-gray-700 hover:text-pink-600 transition-colors flex items-center whitespace-nowrap">
              <FolderGit className="h-4 w-4 mr-1 text-rose-500" />
              워크스페이스
            </Link>
            <a href="https://resort-planner-jmhkorea.replit.app/realestate" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-pink-600 transition-colors flex items-center whitespace-nowrap">
              <Terminal className="h-4 w-4 mr-1 text-purple-500" />
              DevOps
            </a>
            <Link href="/admin" className="font-medium text-gray-700 hover:text-pink-600 transition-colors flex items-center">
              <Settings className="h-4 w-4 mr-1 text-pink-500" />
              관리자
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative" ref={languageMenuRef}>
              <button 
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-pink-200 rounded-md hover:bg-pink-50 transition-colors text-pink-700"
              >
                <Globe className="h-4 w-4 mr-1 text-pink-500" />
                <span>{getLanguageCode(i18n.language)}</span>
                <ChevronDown className="h-3 w-3 text-pink-400" />
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-pink-100 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button 
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-pink-50 flex items-center 
                      ${i18n.language === 'ko' ? 'text-pink-600 font-medium' : 'text-gray-700'}`}
                      onClick={() => changeLanguage('ko')}
                    >
                      <span className="mr-1">🇰🇷</span> 한국어
                    </button>
                    <button 
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-pink-50 flex items-center 
                      ${i18n.language === 'en' ? 'text-pink-600 font-medium' : 'text-gray-700'}`}
                      onClick={() => changeLanguage('en')}
                    >
                      <span className="mr-1">🇺🇸</span> English
                    </button>
                    <button 
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-pink-50 flex items-center 
                      ${i18n.language === 'ja' ? 'text-pink-600 font-medium' : 'text-gray-700'}`}
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
              <Button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 font-medium">
                {t('auth.loginRegister')}
              </Button>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-pink-600 hover:bg-pink-50">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-b from-white to-pink-50 border-l border-pink-100">
                <div className="px-4 py-3 flex justify-center mb-4">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">SaharaRealTech</span>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    {t('nav.home')}
                  </Link>
                  <Link href="/properties" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    {t('nav.properties')}
                  </Link>
                  <Link href="/how-to-invest" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    {t('nav.howToInvest')}
                  </Link>
                  <Link href="/investment-process" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    투자 프로세스
                  </Link>
                  <Link href="/portfolio" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    {t('nav.portfolio')}
                  </Link>
                  <Link href="/blog" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    {t('nav.blog', '블로그')}
                  </Link>
                  <Link href="/company-introduction" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    <Building2 className="h-4 w-4 mr-2 text-pink-500" />
                    {t('nav.company', '사하라 리얼테크 소개')}
                  </Link>
                  <Link href="/team" className="px-4 py-2 hover:bg-pink-100/50 rounded-md text-gray-700">
                    {t('nav.team')}
                  </Link>
                  <a 
                    href="https://digitalhuman.kimiyi.ai/?id=4Eyoo5HGb3kT2xspOUjfeIP_h8z-nOs0eBplAhWaIEGgXYDE648u8HGF0rCo7_qUHR4x8l3vI0qsMj8KNwxyRw2" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 hover:bg-pink-100/50 rounded-md flex items-center text-gray-700"
                  >
                    <Code className="h-4 w-4 mr-2 text-pink-500" />
                    AI 어시스턴트
                  </a>
                  <Link href="/team-workspace" className="px-4 py-2 hover:bg-pink-100/50 rounded-md flex items-center text-gray-700">
                    <FolderGit className="h-4 w-4 mr-2 text-rose-500" />
                    팀 워크스페이스
                  </Link>
                  <a href="https://resort-planner-jmhkorea.replit.app/realestate" target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-pink-100/50 rounded-md flex items-center text-gray-700">
                    <Terminal className="h-4 w-4 mr-2 text-purple-500" />
                    DevOps
                  </a>
                  <Link href="/admin" className="px-4 py-2 hover:bg-pink-100/50 rounded-md flex items-center text-gray-700">
                    <Settings className="h-4 w-4 mr-2 text-pink-500" />
                    관리자
                  </Link>
                  <hr className="border-pink-100" />
                  <WalletConnect />
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                    {t('auth.loginRegister')}
                  </Button>
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-sm text-pink-700 font-medium ml-1">언어 선택</p>
                    <Button variant="ghost" onClick={() => changeLanguage('ko')} className={i18n.language === 'ko' ? 'bg-pink-100/50 text-pink-700' : 'text-gray-700 hover:bg-pink-50'}>
                      <span className="mr-2">🇰🇷</span> 한국어
                    </Button>
                    <Button variant="ghost" onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'bg-pink-100/50 text-pink-700' : 'text-gray-700 hover:bg-pink-50'}>
                      <span className="mr-2">🇺🇸</span> English
                    </Button>
                    <Button variant="ghost" onClick={() => changeLanguage('ja')} className={i18n.language === 'ja' ? 'bg-pink-100/50 text-pink-700' : 'text-gray-700 hover:bg-pink-50'}>
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
