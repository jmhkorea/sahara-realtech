import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  BinanceLogo, 
  CoinbaseLogo, 
  UpbitLogo, 
  BithumbLogo, 
  KrakenLogo,
  KoreaInvestmentLogo,
  MiraeAssetLogo,
  SamsungLogo,
  ShinhanLogo,
  KBLogo
} from "../assets/partner-fix";

// 파트너 로고 데이터 (React 컴포넌트를 사용)
const partnerLogos = [
  { 
    id: 1, 
    name: "Binance", 
    LogoComponent: BinanceLogo, 
    category: "crypto" 
  },
  { 
    id: 2, 
    name: "Coinbase", 
    LogoComponent: CoinbaseLogo, 
    category: "crypto" 
  },
  { 
    id: 3, 
    name: "Upbit", 
    LogoComponent: UpbitLogo, 
    category: "crypto" 
  },
  { 
    id: 4, 
    name: "Bithumb", 
    LogoComponent: BithumbLogo, 
    category: "crypto" 
  },
  { 
    id: 5, 
    name: "Kraken", 
    LogoComponent: KrakenLogo, 
    category: "crypto" 
  },
  { 
    id: 6, 
    name: "한국투자증권", 
    LogoComponent: KoreaInvestmentLogo, 
    category: "securities" 
  },
  { 
    id: 7, 
    name: "미래에셋증권", 
    LogoComponent: MiraeAssetLogo, 
    category: "securities" 
  },
  { 
    id: 8, 
    name: "삼성증권", 
    LogoComponent: SamsungLogo, 
    category: "securities" 
  },
  { 
    id: 9, 
    name: "신한투자증권", 
    LogoComponent: ShinhanLogo, 
    category: "securities" 
  },
  { 
    id: 10, 
    name: "KB증권", 
    LogoComponent: KBLogo, 
    category: "securities" 
  },
];

export default function PartnerLogos() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "crypto" | "securities">("all");
  
  // 무한 슬라이드를 위한 상태
  const [position, setPosition] = useState(0);
  
  // 필터링된 로고를 가져오는 함수
  const getFilteredLogos = () => {
    if (activeTab === "all") return partnerLogos;
    return partnerLogos.filter(logo => logo.category === activeTab);
  };
  
  // 화면에 보여질 로고
  const filteredLogos = getFilteredLogos();
  
  // 무한 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => prev - 1);
    }, 50); // 슬라이드 속도 조정
    
    return () => clearInterval(interval);
  }, []);
  
  // 슬라이드가 완전히 왼쪽으로 이동했을 때 다시 처음 위치로 이동
  const containerWidth = filteredLogos.length * 200; // 로고 하나당 200px (더 넓게 설정)
  
  useEffect(() => {
    if (Math.abs(position) >= containerWidth / 2) {
      setPosition(0);
    }
  }, [position, containerWidth]);

  return (
    <div className="w-full overflow-hidden">
      {/* 필터 탭 */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
          }`}
          onClick={() => setActiveTab("all")}
        >
          {t("partners.all", "전체")}
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            activeTab === "crypto"
              ? "bg-blue-500 text-white"
              : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
          }`}
          onClick={() => setActiveTab("crypto")}
        >
          {t("partners.crypto", "암호화폐 거래소")}
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            activeTab === "securities"
              ? "bg-blue-500 text-white"
              : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
          }`}
          onClick={() => setActiveTab("securities")}
        >
          {t("partners.securities", "증권사")}
        </button>
      </div>
      
      {/* 로고 슬라이더 */}
      <div className="relative overflow-hidden">
        <div 
          className="flex items-center whitespace-nowrap transition-transform duration-300"
          style={{ 
            transform: `translateX(${position}px)`,
            width: `${containerWidth * 2}px` // 두 번 반복하여 무한 슬라이드 느낌 주기
          }}
        >
          {/* 첫 번째 로고 세트 */}
          {filteredLogos.map(logo => (
            <div 
              key={logo.id} 
              className="inline-flex items-center justify-center mx-6"
              style={{ minWidth: "180px" }}
            >
              <div className="text-white transition-all opacity-50 hover:opacity-100 hover:scale-110">
                <logo.LogoComponent />
              </div>
            </div>
          ))}
          
          {/* 두 번째 로고 세트 (무한 슬라이드 효과를 위해 동일한 로고 반복) */}
          {filteredLogos.map(logo => (
            <div 
              key={`duplicate-${logo.id}`} 
              className="inline-flex items-center justify-center mx-6"
              style={{ minWidth: "180px" }}
            >
              <div className="text-white transition-all opacity-50 hover:opacity-100 hover:scale-110">
                <logo.LogoComponent />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}