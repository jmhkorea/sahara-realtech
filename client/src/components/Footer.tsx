import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Globe
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  // 지사 정보
  const globalOffices = {
    korea: {
      name: "Korea (Headquarters)",
      address: "Orange Planet 1F, PR Center"
    },
    bali: {
      name: "Bali, Indonesia",
      address: "Banjar Pande, Desa/Kelurahan Tulkup, Kec. Giannyar.Ka.Gianyar, Provinsi Bali"
    },
    dubai: {
      name: "Dubai, UAE",
      address: "43-44 Ownned by Dubai Municpality, Al Fahidi, Bur Dubai"
    },
    malaysia: {
      name: "Malaysia",
      address: "Block D, 10-3 Menara Suezcap, KL Gateway, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur"
    },
    china: {
      name: "China",
      address: "中国四川省成都高新技术产业开发区成都环球中心"
    },
    japan: {
      name: "Japan",
      address: "〒105-0011 東京都港区芝公園1-2-17 芝公園ハイツ206号室"
    },
    usa: {
      name: "USA",
      address: "911 Washington Ave Saint Louis, Missouri, U.S.A. / Houston, Texas, U.S.A."
    },
    india: {
      name: "India",
      address: "Singjamei Okram Leikai, Imphal west Manipur 795001, India"
    },
    malta: {
      name: "Malta, Europe",
      address: "152, Naxxar Road, San Gwann SGN 9030, Malta. Europe"
    }
  };

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img src="/assets/logo-sahararealtech.svg" alt="SaharaRealTech" className="h-10" />
            </div>
            <p className="text-neutral-400 mb-6">
              {t('footer.companyDescription')}
            </p>
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <a href="mailto:INFO@SAHARAREALTECH.COM" className="text-neutral-300 hover:text-white transition-colors">
                INFO@SAHARAREALTECH.COM
              </a>
            </div>
            <div className="flex space-x-4 mt-4">
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
            
            <h3 className="font-bold text-lg mt-8 mb-4">{t('footer.legal.title')}</h3>
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
                  {t('footer.legal.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Global Offices
            </h3>
            <div className="grid grid-cols-1 gap-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {Object.values(globalOffices).map((office, index) => (
                <div key={index} className="border-b border-neutral-800 pb-3 last:border-none">
                  <h4 className="text-white font-medium">{office.name}</h4>
                  <p className="text-neutral-400 text-sm flex items-start mt-1">
                    <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                    <span>{office.address}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} SaharaRealTech. {t('footer.copyright')}
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-neutral-400 text-sm mr-2">{t('footer.supportedBlockchains')}:</span>
            <img 
              src="/assets/logo-avalanche.svg" 
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
