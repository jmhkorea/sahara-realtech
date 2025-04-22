import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// 파트너 로고 데이터
const partnerLogos = [
  { 
    id: 1, 
    name: "Binance", 
    imgSrc: "/assets/partners/binance.svg", 
    category: "crypto" 
  },
  { 
    id: 2, 
    name: "Coinbase", 
    imgSrc: "/assets/partners/coinbase.svg", 
    category: "crypto" 
  },
  { 
    id: 3, 
    name: "Upbit", 
    imgSrc: "/assets/partners/upbit.svg", 
    category: "crypto" 
  },
  { 
    id: 4, 
    name: "Bithumb", 
    imgSrc: "/assets/partners/bithumb.svg", 
    category: "crypto" 
  },
  { 
    id: 5, 
    name: "Kraken", 
    imgSrc: "/assets/partners/kraken.svg", 
    category: "crypto" 
  },
  { 
    id: 6, 
    name: "한국투자증권", 
    imgSrc: "/assets/partners/koreainvestment.svg", 
    category: "securities" 
  },
  { 
    id: 7, 
    name: "미래에셋증권", 
    imgSrc: "/assets/partners/mirae.svg", 
    category: "securities" 
  },
  { 
    id: 8, 
    name: "삼성증권", 
    imgSrc: "/assets/partners/samsung.svg", 
    category: "securities" 
  },
  { 
    id: 9, 
    name: "신한투자증권", 
    imgSrc: "/assets/partners/shinhan.svg", 
    category: "securities" 
  },
  { 
    id: 10, 
    name: "KB증권", 
    imgSrc: "/assets/partners/kb.svg", 
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
  const containerWidth = filteredLogos.length * 120; // 로고 하나당 120px
  
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
              style={{ minWidth: "100px" }}
            >
              <img
                src={logo.imgSrc}
                alt={logo.name}
                className="h-12 object-contain transition-all filter grayscale brightness-150 hover:grayscale-0 hover:brightness-110 hover:scale-110"
                title={logo.name}
              />
            </div>
          ))}
          
          {/* 두 번째 로고 세트 (무한 슬라이드 효과를 위해 동일한 로고 반복) */}
          {filteredLogos.map(logo => (
            <div 
              key={`duplicate-${logo.id}`} 
              className="inline-flex items-center justify-center mx-6"
              style={{ minWidth: "100px" }}
            >
              <img
                src={logo.imgSrc}
                alt={logo.name}
                className="h-12 object-contain transition-all filter grayscale brightness-150 hover:grayscale-0 hover:brightness-110 hover:scale-110"
                title={logo.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}