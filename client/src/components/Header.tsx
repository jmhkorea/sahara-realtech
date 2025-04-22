import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const [, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko');
  };

  const connectWallet = () => {
    // Placeholder for wallet connection logic
    setIsWalletConnected(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/assets/logo-sahararealtech.svg" alt="SaharaRealTech" className="h-10" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/properties" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.properties')}
            </Link>
            <Link href="/how-to-invest" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.howToInvest')}
            </Link>
            <Link href="/portfolio" className="font-medium text-neutral-500 hover:text-primary transition-colors">
              {t('nav.portfolio')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="hidden sm:flex px-2 py-1 text-sm border rounded-md"
            >
              {i18n.language === 'ko' ? 'EN' : 'KO'}
            </button>
            
            {isWalletConnected ? (
              <div className="hidden md:flex items-center space-x-2 border rounded-full py-1 px-3 text-sm">
                <span className="bg-green-500 rounded-full w-2 h-2"></span>
                <span className="font-inter">{t('wallet.connected')}</span>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                {t('wallet.connect')}
              </Button>
            )}
            
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
                <div className="flex flex-col gap-4 pt-10">
                  <Link href="/" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.home')}
                  </Link>
                  <Link href="/properties" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.properties')}
                  </Link>
                  <Link href="/how-to-invest" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.howToInvest')}
                  </Link>
                  <Link href="/portfolio" className="px-4 py-2 hover:bg-neutral-100 rounded-md">
                    {t('nav.portfolio')}
                  </Link>
                  <hr />
                  <Button onClick={connectWallet}>
                    {isWalletConnected ? t('wallet.connected') : t('wallet.connect')}
                  </Button>
                  <Button variant="outline">
                    {t('auth.loginRegister')}
                  </Button>
                  <Button variant="ghost" onClick={toggleLanguage}>
                    {i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
