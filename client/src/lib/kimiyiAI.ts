/**
 * Kimiyi AI 챗봇과 통합하기 위한 유틸리티 함수들
 */

/**
 * 현재 페이지에서 회사 및 웹사이트 정보를 수집하여 반환
 */
export function getCompanyData(): any {
  const companyData: Record<string, any> = {
    company: {
      name: "사하라 리얼테크",
      nameEn: "SaharaRealTech",
      foundedYear: 2017,
      location: "서울특별시 강남구",
      contact: "support@sahararealtechkr.com",
    },
    business: {
      description: "블록체인 기술을 활용한 부동산 투자 플랫폼",
      blockchain: "아발란체 프로토콜",
      services: [
        "부동산 토큰화", 
        "부동산 투자 플랫폼", 
        "안전한 거래", 
        "분산 투자", 
        "실시간 수익 분배", 
        "유동성 확보"
      ],
    },
    faq: [
      {
        question: "사하라 리얼테크는 어떤 회사인가요?",
        answer: "사하라 리얼테크는 2017년 설립된 블록체인 기반 부동산 투자 플랫폼 기업입니다. 서울 강남구에 본사를 두고 있으며, 블록체인 기술을 통해 부동산 자산을 토큰화하여 접근성과 유동성을 높이는 서비스를 제공합니다."
      },
      {
        question: "투자는 어떻게 진행되나요?",
        answer: "회원가입 및 인증 후 지갑을 연결하고 원하는 부동산 자산을 선택하여 투자할 수 있습니다. 투자 과정은 웹사이트에서 안내되는 단계를 따라 쉽게 진행 가능합니다."
      },
      {
        question: "최소 투자 금액은 얼마인가요?",
        answer: "소액으로도 투자가 가능하며, 각 부동산 프로젝트마다 최소 투자 금액이 다를 수 있습니다. 자세한 내용은 각 프로젝트 페이지에서 확인 가능합니다."
      },
      {
        question: "투자 수익은 어떻게 받나요?",
        answer: "스마트 계약을 통해 투자 비율에 따라 자동으로 임대 수익이 분배됩니다. 모든 거래는 블록체인에 기록되어 투명하게 관리됩니다."
      },
      {
        question: "토큰의 판매나 거래는 어떻게 이루어지나요?",
        answer: "투자자는 플랫폼 내에서 토큰을 거래할 수 있으며, 향후 거래소 상장을 통해 더 넓은 시장에서의 거래도 가능합니다. 유동성 확보를 위한 다양한 파트너십을 구축하고 있습니다."
      }
    ],
    features: [
      "블록체인 기반 부동산 소유권 분할",
      "스마트 계약을 통한 자동 수익 분배",
      "투명한 거래 기록",
      "글로벌 투자 기회",
      "낮은 진입 장벽",
      "유동성 확보"
    ],
    pageMetadata: getAllMetaTags()
  };
  
  return companyData;
}

/**
 * 페이지의 모든 메타 태그 정보를 수집하여 반환
 */
function getAllMetaTags(): Record<string, string> {
  const metaTags: Record<string, string> = {};
  const metas = document.getElementsByTagName('meta');
  
  for (let i = 0; i < metas.length; i++) {
    const meta = metas[i];
    const name = meta.getAttribute('name');
    const property = meta.getAttribute('property');
    const content = meta.getAttribute('content');
    
    if (name && content) {
      metaTags[name] = content;
    } else if (property && content) {
      metaTags[property] = content;
    }
  }
  
  return metaTags;
}

/**
 * Kimiyi AI 챗봇에 메시지 전송
 */
export function sendMessageToKimiyi(message: string): void {
  if (window.__KIMIYI_BOT__ && typeof window.__KIMIYI_BOT__.sendMessage === 'function') {
    window.__KIMIYI_BOT__.sendMessage(message);
  } else {
    console.warn('Kimiyi AI 챗봇이 초기화되지 않았거나 아직 로드되지 않았습니다.');
  }
}

/**
 * Kimiyi AI 챗봇 열기
 */
export function openKimiyiChat(): void {
  if (window.__KIMIYI_BOT__ && typeof window.__KIMIYI_BOT__.open === 'function') {
    window.__KIMIYI_BOT__.open();
  } else {
    console.warn('Kimiyi AI 챗봇이 초기화되지 않았거나 아직 로드되지 않았습니다.');
  }
}

/**
 * Kimiyi AI 챗봇 닫기
 */
export function closeKimiyiChat(): void {
  if (window.__KIMIYI_BOT__ && typeof window.__KIMIYI_BOT__.close === 'function') {
    window.__KIMIYI_BOT__.close();
  } else {
    console.warn('Kimiyi AI 챗봇이 초기화되지 않았거나 아직 로드되지 않았습니다.');
  }
}