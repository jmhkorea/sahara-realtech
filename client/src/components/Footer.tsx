import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="text-white font-bold text-xl">SaharaRealTech</span>
            </div>
            <p className="text-neutral-400 mb-6">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.services.invest')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.services.exchange')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.services.portfolio')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.services.returns')}
                </Link>
              </li>
              <li>
                <Link href="/how-to-invest" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.services.education')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.company.about')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.company.team')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.company.blog')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.company.careers')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.company.partners')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.legal.terms')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.legal.cookies')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.legal.trading')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.legal.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} SaharaRealTech. {t('footer.copyright')}
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-neutral-400 text-sm mr-2">{t('footer.supportedBlockchains')}:</span>
            <img 
              src="/assets/AVAX.png" 
              alt="Avalanche" 
              className="h-6 mr-2" 
            />
            <span className="font-inter text-sm text-neutral-400">Avalanche</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
