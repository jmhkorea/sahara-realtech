import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Korean translations
const koTranslations = {
  nav: {
    home: '홈',
    properties: '프로젝트 보기',
    howToInvest: '투자 방법',
    portfolio: '마이 포트폴리오',
    team: '팀 소개'
  },
  auth: {
    loginRegister: '로그인 / 회원가입'
  },
  wallet: {
    connect: '지갑 연결',
    connected: 'Avalanche 연결됨'
  },
  hero: {
    title: '실제 세계 자산을 디지털화 하세요',
    subtitle: '아발란체 프로토콜 기반의 블록체인 기술로 부동산 투자의 진입장벽을 낮추고, 소액으로도 프리미엄 부동산에 투자할 수 있습니다.',
    startInvesting: '투자 시작하기',
    learnMore: '서비스 알아보기',
    avalancheBased: '기술 기반',
    avalancheDescription: '빠른 거래 처리 속도와 낮은 수수료의 아발란체 프로토콜을 사용합니다',
    completedTransactions: '현재 진행 중인 거래'
  },
  search: {
    region: '지역',
    selectRegion: '지역 선택',
    propertyType: '부동산 유형',
    selectType: '유형 선택',
    investmentAmount: '투자 금액',
    selectAmount: '금액 선택',
    searchButton: '투자 자산 검색',
    amountRanges: {
      under1m: '100만원 이하',
      '1mTo5m': '100만원 - 500만원',
      '5mTo10m': '500만원 - 1,000만원',
      over10m: '1,000만원 이상',
      all: '전체'
    }
  },
  propertyTypes: {
    apartment: '아파트',
    officetel: '오피스텔',
    commercial: '상가',
    land: '토지',
    resort: '리조트',
    membership: '회원권',
    other: '기타'
  },
  property: {
    tokenizationStatus: {
      inProgress: '토큰화 진행중',
      completed: '토큰화 완료',
      upcoming: '곧 오픈 예정',
      unknown: '상태 미정'
    },
    expectedReturn: '예상 수익률 {{value}}',
    verified: '검증됨',
    totalValue: '총 자산가치',
    tokenizationProgress: '토큰화 진행률',
    tokenPrice: '토큰 가격',
    minInvestment: '최소 투자',
    investors: '투자자',
    target: '목표',
    investButton: '투자하기',
    soldOutButton: '판매 완료',
    registerInterestButton: '관심 등록하기',
    viewDetailsButton: '상세 보기'
  },
  featuredProperties: {
    title: '주목할 만한 투자자산',
    viewAll: '모든 투자자산 보기'
  },
  blockchain: {
    title: '블록체인 기술로 부동산 투자의 혁신',
    subtitle: '아발란체 프로토콜 기반의 블록체인 기술을 통해 부동산 투자의 진입장벽을 낮추고, 투명한 거래를 실현합니다.',
    features: {
      tokenization: {
        title: '부동산 토큰화',
        description: '실물 부동산을 블록체인 상의 디지털 토큰으로 변환하여 소액으로도 투자할 수 있습니다.'
      },
      security: {
        title: '안전한 거래',
        description: '스마트 컨트랙트를 통해 안전하고 투명한 거래가 보장되며, 모든 기록은 블록체인에 영구 저장됩니다.'
      },
      liquidity: {
        title: '유동성 확보',
        description: '부동산 투자의 가장 큰 단점인 유동성 부족 문제를 해결하여 언제든지 토큰 거래가 가능합니다.'
      }
    },
    avalanche: {
      title: '아발란체 블록체인 네트워크',
      description: '빠른 처리 속도와 낮은 수수료의 아발란체 프로토콜을 기반으로, 안정적이고 효율적인 부동산 토큰화 서비스를 제공합니다.',
      features: {
        speed: {
          title: '빠른 거래 처리 속도',
          description: '초당 4,500+ 트랜잭션 처리 능력'
        },
        fees: {
          title: '낮은 거래 수수료',
          description: '이더리움 대비 최대 95% 저렴한 수수료'
        },
        eco: {
          title: '친환경 프로토콜',
          description: '지분 증명(PoS) 방식으로 에너지 효율적'
        }
      }
    },
    recentTransactions: '최근 블록체인 거래',
    viewAllTransactions: '모든 거래 보기',
    noTransactions: '최근 거래가 없습니다.'
  },
  transactions: {
    buy: '{{propertyId}}번 매물 토큰 구매',
    sell: '{{propertyId}}번 매물 토큰 거래',
    dividend: '부동산 수익금 분배',
    unknown: '알 수 없는 거래',
    tokens: '토큰',
    yield: '수익률'
  },
  howItWorks: {
    title: '블록체인 부동산 투자 방법',
    subtitle: 'SaharaRealTech에서 블록체인 기술을 활용한 부동산 투자는 간단합니다. 아래 단계를 따라 시작해보세요.',
    steps: {
      step1: {
        title: '회원가입 및 인증',
        description: '블록체인 기반 부동산 투자를 위해 본인 인증을 완료하고 계정을 생성합니다.',
        highlight: '빠르고 간편한 KYC 인증 절차'
      },
      step2: {
        title: '지갑 연결',
        description: '아발란체 프로토콜을 지원하는 디지털 지갑을 연결하여 투자를 준비합니다.',
        highlight: 'MetaMask, Avalanche Wallet 등 지원'
      },
      step3: {
        title: '투자자산 선택 및 투자',
        description: '다양한 투자자산 중 원하는 부동산을 선택하고 토큰을 구매하여 투자합니다.',
        highlight: '부동산별 상세 투자 정보 확인 가능'
      },
      step4: {
        title: '수익 관리',
        description: '투자한 부동산의 임대 수익과 가치 상승에 따른 수익을 실시간으로 확인하고 관리합니다.',
        highlight: '블록체인 기반 투명한 수익 분배'
      }
    },
    startNowButton: '지금 바로 투자 시작하기'
  },
  faq: {
    title: '자주 묻는 질문',
    subtitle: '블록체인 부동산 투자에 대한 궁금증을 해결해 드립니다.',
    items: {
      howItWorks: {
        question: '블록체인 기반 부동산 투자는 어떻게 작동하나요?',
        answer: '블록체인 기반 부동산 투자는 실물 부동산을 디지털 토큰으로 변환하여 분할 소유가 가능하게 하는 방식입니다. 이를 통해 소액으로도 프리미엄 부동산에 투자할 수 있으며, 스마트 컨트랙트를 통해 임대 수익 분배와 자산 가치 상승에 따른 이익을 투명하게 받을 수 있습니다.'
      },
      whereToTrade: {
        question: '부동산 토큰은 어디에서 거래할 수 있나요?',
        answer: 'SaharaRealTech에서 직접 토큰 거래가 가능하며, 추가적으로 아발란체 프로토콜 기반의 디지털 자산 거래소에서도 거래할 수 있습니다. 이를 통해 높은 유동성을 확보하고 언제든지 투자금을 회수할 수 있는 환경을 제공합니다.'
      },
      howToReceiveReturns: {
        question: '투자 수익은 어떻게 받나요?',
        answer: '투자한 부동산에서 발생하는 임대 수익은 스마트 컨트랙트를 통해 투자 비율에 따라 자동으로 분배됩니다. 월별 또는 분기별로 디지털 지갑으로 수익금이 입금되며, 블록체인에 모든 거래 내역이 투명하게 기록됩니다.'
      },
      minInvestment: {
        question: '최소 투자 금액은 얼마인가요?',
        answer: '각 부동산 프로젝트마다 최소 투자 금액이 다르지만, 일반적으로 5만원부터 투자가 가능합니다. 이를 통해 누구나 쉽게 부동산 투자를 시작할 수 있도록 진입장벽을 낮추었습니다.'
      },
      legalSafety: {
        question: '법적으로 안전한가요?',
        answer: 'SaharaRealTech는 한국의 부동산 및 금융 관련 법규를 준수하며 운영됩니다. 모든 부동산은 법적 검토를 거쳐 등록되며, 투자자 보호를 위한 다양한 안전장치를 마련하고 있습니다. 또한 블록체인 기술을 통해 모든 거래 내역이 투명하게 기록되어 안전성을 높였습니다.'
      },
      securityAudits: {
        question: '스마트 컨트랙트는 얼마나 안전한가요?',
        answer: '당사의 모든 스마트 컨트랙트는 블록체인 보안 분야의 선두기업인 CertiK(서틱)의 철저한 감사를 거칩니다. CertiK은 형식 검증(Formal Verification) 기술을 사용하여 수학적으로 스마트 컨트랙트의 취약점을 확인하고, 코드 분석, 취약점 식별 및 수정, 최종 인증의 프로세스를 거칩니다. 이러한 감사 결과는 공개되며, 정기적인 보안 업데이트를 통해 최신 보안 표준을 유지합니다.'
      }
    }
  },
  newsletter: {
    title: '최신 부동산 투자 정보를 받아보세요',
    description: '새로운 투자 기회와 블록체인 부동산 시장 동향에 대한 정보를 정기적으로 받아보세요.',
    emailPlaceholder: '이메일 주소를 입력하세요',
    subscribe: '구독하기',
    subscribing: '구독 중...',
    privacyNotice: '개인정보 처리방침에 동의하고 구독합니다. 언제든지 구독을 취소할 수 있습니다.',
    validationError: '이메일 오류',
    validEmailRequired: '유효한 이메일 주소를 입력해주세요',
    success: '구독 성공',
    subscriptionConfirmed: '뉴스레터 구독이 완료되었습니다.'
  },
  footer: {
    companyDescription: '블록체인 기술을 활용한 부동산 투자 플랫폼으로, 누구나 쉽게 부동산에 투자할 수 있는 기회를 제공합니다.',
    services: {
      title: '서비스',
      invest: '부동산 투자',
      exchange: '토큰 거래소',
      portfolio: '투자 포트폴리오',
      returns: '수익 관리',
      education: '투자 교육'
    },
    company: {
      title: '회사 정보',
      about: '회사 소개',
      team: '팀',
      blog: '블로그',
      careers: '채용',
      partners: '파트너십'
    },
    legal: {
      title: '법적 정보',
      terms: '이용약관',
      privacy: '개인정보처리방침',
      cookies: '쿠키 정책',
      trading: '안전거래 가이드',
      contact: '문의하기'
    },
    copyright: 'All rights reserved.',
    supportedBlockchains: '지원되는 블록체인'
  },
  propertyList: {
    regionTitle: '{{region}} 지역 투자자산',
    typeTitle: {
      apartment: '아파트 투자자산',
      officetel: '오피스텔 투자자산',
      commercial: '상가 투자자산',
      land: '토지 투자자산',
      resort: '리조트 투자자산',
      membership: '회원권 투자자산',
      other: '기타 투자자산',
      all: '모든 투자자산'
    },
    allProperties: '모든 투자자산',
    sortBy: '정렬',
    sortOptions: {
      newest: '최신순',
      priceHigh: '가격 높은순',
      priceLow: '가격 낮은순',
      returns: '수익률순'
    },
    showing: '총 {{count}}개 투자자산',
    noProperties: '조건에 맞는 투자자산이 없습니다',
    tryDifferentFilters: '다른 검색 조건을 시도해보세요'
  },
  propertyDetail: {
    tabs: {
      details: '투자자산 정보',
      investment: '투자 정보',
      blockchain: '블록체인 정보'
    },
    propertyType: '부동산 유형',
    location: '위치',
    expectedReturn: '예상 수익률',
    annualReturn: '연간 {{value}}% 예상',
    minInvestment: '최소 투자 금액',
    tokens: '토큰',
    distribution: '수익 분배',
    quarterlyDividends: '분기별 배당',
    investorsCount: '투자자 수',
    people: '명',
    blockchain: '블록체인 네트워크',
    avalancheBlockchain: 'Avalanche C-Chain',
    smartContract: '스마트 컨트랙트',
    verification: '검증 상태',
    verifiedBy: '법무법인 및 감사법인 검증 완료',
    investmentCard: {
      title: '투자하기',
      description: '이 부동산에 투자하여 안정적인 수익을 얻으세요',
      tokenCount: '토큰 수량',
      amount: '투자 금액',
      tokenPrice: '토큰 가격',
      expectedAnnualReturn: '예상 연간 수익률',
      estimatedYearlyIncome: '예상 연간 수익',
      investButton: '지금 투자하기',
      soldOut: '판매 완료',
      comingSoon: '곧 오픈 예정',
      disclaimer: '투자는 원금 손실의 위험이 있습니다. 투자 전 충분한 검토를 부탁드립니다.'
    },
    investmentSuccess: '투자가 성공적으로 완료되었습니다.'
  },
  howToInvest: {
    title: '블록체인 부동산 투자 방법',
    subtitle: '아발란체 블록체인을 활용한 부동산 투자의 모든 것',
    tabs: {
      guide: '투자 가이드',
      blockchain: '블록체인 기술',
      risks: '투자 위험성'
    },
    guide: {
      title: '토큰 증권(STO) 투자 단계',
      description: '토큰증권(STO)는 정부 가이드 및 증권사 가이드에 따라 진행 됩니다. (현재 국회 협의 중)',
      steps: {
        registration: {
          title: '회원가입 및 본인 인증',
          step1: '이메일과 비밀번호로 계정을 생성합니다.',
          step2: '휴대폰 인증 또는 신분증을 통한 KYC 인증을 완료합니다.',
          step3: '계정 보안을 위해 2단계 인증을 설정합니다.'
        },
        wallet: {
          title: '실물 부동산 토큰증권(STO) 의뢰',
          step1: '사하라 리얼테크 플랫폼 자산 등록',
          step2: '실물 자산 디지털화 진행',
          step3: '증권사 상장 협의',
          step4: '증권사 상장 - 자금 유동화 진행'
        },
        investment: {
          title: '부동산 투자자산 선택 및 투자',
          step1: '다양한 부동산 투자자산을 검토하고 투자할 자산을 선택합니다.',
          step2: '투자하고자 하는 토큰 수량을 결정합니다.',
          step3: '디지털 지갑을 통해 결제를 완료합니다.',
          step4: '스마트 컨트랙트를 통해 토큰이 즉시 발행됩니다.'
        },
        returns: {
          title: '수익 관리',
          step1: '투자한 부동산의 임대 수익은 분기별로 지급됩니다.',
          step2: '마이 포트폴리오 페이지에서 투자 현황과 수익을 확인할 수 있습니다.',
          step3: '필요시 2차 시장에서 토큰을 거래할 수 있습니다.'
        }
      },
      startButton: '투자 시작하기'
    },
    blockchain: {
      title: '블록체인 부동산 투자 기술',
      description: '블록체인 기술이 어떻게 부동산 투자에 혁신을 가져오는지 알아보세요.',
      whatIsBlockchain: {
        title: '블록체인이란?',
        description: '블록체인은 정보를 투명하게 기록하고 보관하는 분산형 디지털 장부 기술입니다. 이 기술을 통해 중개자 없이 안전하고 투명한 거래가 가능해집니다.',
        advantages: {
          title1: '투명성',
          description1: '모든 거래 내역이 공개되어 누구나 확인할 수 있어 사기나 조작 위험이 낮습니다.',
          title2: '보안성',
          description2: '분산형 구조와 암호화 기술로 데이터의 안전한 저장 및 관리가 가능합니다.'
        }
      },
      avalancheProtocol: {
        title: '아발란체 프로토콜',
        description: '아발란체는 고성능 블록체인 플랫폼으로, 빠른 거래 속도와 낮은 수수료가 특징입니다. 이를 통해 부동산 토큰화에 적합한 환경을 제공합니다.',
        features: {
          title1: '빠른 속도',
          description1: '초당 4,500개 이상의 트랜잭션 처리 능력으로 실시간 거래가 가능합니다.',
          title2: '저렴한 수수료',
          description2: '이더리움 대비 최대 95% 저렴한 수수료로 투자 비용을 절감합니다.',
          title3: '친환경 설계',
          description3: '에너지 효율적인 지분 증명(PoS) 방식의 컨센서스 메커니즘을 사용합니다.'
        }
      },
      tokenization: {
        title: '부동산 토큰화 방식',
        description: '부동산 토큰화는 실물 자산을 디지털 토큰으로 변환하는 과정으로, 이를 통해 부동산 투자의 진입장벽을 낮추고 유동성을 높입니다.',
        process: {
          title: '토큰화 프로세스',
          step1: '법적 실사 및 부동산 가치 평가',
          step2: '특수목적법인(SPC) 설립 및 부동산 매입',
          step3: '스마트 컨트랙트 생성 및 토큰 발행',
          step4: '투자자에게 토큰 분배 및 수익 관리'
        }
      }
    },
    risks: {
      title: '투자 위험성 안내',
      description: '블록체인 부동산 투자는 다양한 이점을 제공하지만, 투자자들은 아래와 같은 위험을 인지해야 합니다.',
      marketRisks: {
        title: '시장 위험',
        description: '부동산 시장과 관련된 위험 요소입니다.',
        point1: '부동산 가격 변동에 따른 자산 가치 하락 가능성이 있습니다.',
        point2: '임대 수요 감소로 인한 임대 수익 감소 위험이 있습니다.',
        point3: '경기 침체 등의 거시경제적 요인으로 인한 전반적인 시장 하락 가능성이 있습니다.'
      },
      regulatoryRisks: {
        title: '규제 위험',
        description: '법규 및 정책 변화와 관련된 위험 요소입니다.',
        point1: '블록체인 및 디지털 자산에 대한 규제 변화로 인한 투자 환경 변화 가능성이 있습니다.',
        point2: '부동산 관련 세제 변화로 인한 수익성 감소 가능성이 있습니다.'
      },
      technicalRisks: {
        title: '기술적 위험',
        description: '블록체인 기술과 관련된 위험 요소입니다.',
        point1: '스마트 컨트랙트의 코드 오류 또는 보안 취약점 발생 가능성이 있습니다.',
        point2: '디지털 지갑 관리 부주의로 인한 자산 손실 위험이 있습니다.',
        point3: '블록체인 네트워크의 기술적 문제로 인한 거래 지연 가능성이 있습니다.'
      },
      education: {
        title: '투자 교육 중요성',
        description: '블록체인 부동산 투자를 시작하기 전에 충분한 정보와 교육을 통해 리스크를 이해하는 것이 중요합니다. SaharaRealTech는 투자자 교육을 위한 다양한 자료를 제공하고 있습니다.',
        button: '투자 교육 자료 보기'
      }
    }
  },
  portfolio: {
    title: '마이 포트폴리오',
    subtitle: '내 부동산 투자 현황과 수익을 한눈에 확인하세요',
    connectWallet: {
      title: '지갑 연결이 필요합니다',
      description: '포트폴리오를 확인하기 위해 디지털 지갑을 연결해주세요.',
      cardTitle: '디지털 지갑 연결하기',
      cardDescription: '지갑을 연결하여 보유한 부동산 토큰과 투자 현황을 확인하세요. 모든 데이터는 블록체인에서 직접 가져옵니다.',
      button: '지갑 연결하기',
      benefits: {
        track: {
          title: '투자 현황 추적',
          description: '보유한 모든 부동산 토큰과 투자 현황을 한눈에 확인할 수 있습니다.'
        },
        returns: {
          title: '수익 확인',
          description: '각 부동산별 예상 수익과 실제 받은 배당을 추적할 수 있습니다.'
        }
      }
    },
    tabs: {
      overview: '개요',
      investments: '투자 내역',
      transactions: '거래 내역'
    },
    stats: {
      totalInvested: '총 투자 금액',
      expectedAnnualReturn: '예상 연간 수익',
      totalTokens: '보유 토큰 수',
      activeInvestments: '{{count}}개 활성 투자',
      returnRate: '연간 {{value}}% 수익률',
      lastUpdated: '방금 업데이트됨'
    },
    overview: {
      distribution: {
        title: '포트폴리오 분포',
        description: '투자 금액 기준 부동산별 분포'
      },
      returns: {
        title: '월별 예상 수익',
        description: '각 월별 예상되는 부동산 수익',
        monthlyReturn: '월별 수익'
      },
      summary: {
        title: '투자 요약',
        tokens: '토큰 수',
        tokenPrice: '토큰 가격',
        expectedReturn: '예상 수익률',
        annualIncome: '연간 예상 수익'
      },
      noInvestments: '아직 투자 내역이 없습니다',
      noReturns: '수익 데이터가 없습니다',
      exploreProperties: '투자자산 둘러보기'
    },
    investments: {
      title: '투자 내역',
      description: '내가 투자한 모든 부동산 목록입니다',
      tokens: '토큰',
      tokenPrice: '토큰 가격',
      expectedReturn: '예상 수익률',
      investmentDate: '투자 일자',
      currentStatus: '현재 상태',
      active: '활성',
      tokenizationProgress: '토큰화 진행 상황',
      noInvestments: '투자 내역이 없습니다',
      startInvesting: '부동산 투자를 시작해보세요',
      exploreProperties: '투자 가능한 자산 둘러보기'
    },
    transactions: {
      title: '거래 내역',
      description: '모든 블록체인 거래 기록입니다',
      types: {
        buy: '토큰 구매',
        sell: '토큰 판매',
        dividend: '배당금 수령',
        unknown: '기타 거래'
      },
      noTransactions: '거래 내역이 없습니다',
      transactionsAppear: '투자를 시작하면 거래 내역이 이곳에 표시됩니다'
    }
  },
  time: {
    minutesAgo: '{{count}}분 전',
    hoursAgo: '{{count}}시간 전',
    daysAgo: '{{count}}일 전'
  },
  common: {
    goBack: '뒤로 가기'
  },
  errors: {
    failedToLoad: '데이터를 불러오는데 실패했습니다',
    tryAgainLater: '잠시 후 다시 시도해주세요',
    propertyNotFound: '투자자산을 찾을 수 없습니다',
    propertyNotFoundDesc: '요청하신 투자자산을 찾을 수 없습니다. 다른 투자자산을 확인해보세요.'
  },
  team: {
    title: '팀 소개',
    subtitle: '우리의 전문가 팀은 블록체인 기술과 부동산 업계에서 풍부한 경험을 가지고 있습니다',
    filters: {
      all: '전체',
      executive: '경영진',
      technical: '기술 리더십',
      directors: '이사진',
      advisors: '자문위원'
    },
    joinUs: {
      title: '함께 일해요',
      description: '혁신적인 블록체인 기반 부동산 투자 플랫폼을 함께 만들어갈 열정적인 인재를 찾고 있습니다',
      button: '채용 정보 보기'
    }
  },
  investmentGuide: {
    title: '투자 전 보세요',
    subtitle: 'SaharaRealTech의 토큰 구조와 아발란체 블록체인 기반 투자에 대한 중요 정보를 확인하세요.',
    securityAudit: {
      title: '철저한 보안 감사',
      description: '스마트컨트랙트는 최고의 감사 기관인 CertiK(서틱)의 철저한 감사를 통해 토큰 생태계의 검증을 시행합니다.',
      certik: {
        title: 'CertiK(서틱) 감사',
        description: 'CertiK은 블록체인 보안 분야의 선두 기업으로, 형식 검증(Formal Verification) 기술을 활용하여 스마트컨트랙트의 취약점을 찾아내는 데 특화되어 있습니다.'
      },
      auditProcess: {
        title: '감사 프로세스',
        step1: '철저한 코드 분석 및 검토',
        step2: '보안 취약점 식별 및 수정',
        step3: '수정 사항 재검토 및 최종 인증',
        step4: '정기적인 보안 업데이트 및 모니터링'
      }
    },
    tokenStructure: {
      title: '토큰 구조',
      primeMasterNFT: {
        title: '프라임 마스터 NFT (1개)',
        description: '최고 거버넌스 권한을 가진 단일 NFT로, 특별 결의안 거부권 및 최종 의사 결정권을 보유합니다.'
      },
      governanceNFT: {
        title: '거버넌스 마스터 NFT (99개)',
        description: '프로젝트 거버넌스에 참여할 수 있는 등급별 NFT입니다. 한국 사모펀드 규정(최대 99명의 투자자)을 준수합니다.',
        classA: '클래스 A: 10개 (투표 가중치 10배)',
        classB: '클래스 B: 39개 (투표 가중치 5배)',
        classC: '클래스 C: 50개 (투표 가중치 1배)'
      },
      projectTokens: {
        title: '프로젝트 토큰 (RSA-020)',
        description: '개별 부동산 프로젝트의 소유권을 나타내는 토큰으로, 수익 분배 권한이 포함되어 있습니다.'
      },
      companyToken: {
        title: '회사 토큰 (SRT)',
        description: '향후 거래소 상장을 위한 토큰으로, 성공적인 3-5개의 토큰화 프로젝트 이후 생성됩니다.'
      }
    },
    avalancheProtocol: {
      title: '아발란체 프로토콜',
      description: '아발란체는 고성능 블록체인 플랫폼으로, 빠른 거래 속도와 낮은 수수료가 특징입니다. C-Chain에 스마트 컨트랙트가 배포됩니다.',
      features: {
        speed: {
          title: '빠른 거래 속도',
          description: '초당 4,500개 이상의 트랜잭션 처리 능력'
        },
        fees: {
          title: '낮은 거래 수수료',
          description: '이더리움 대비 최대 95% 저렴한 수수료'
        },
        eco: {
          title: '친환경 설계',
          description: '에너지 효율적인 지분 증명(PoS) 방식 사용'
        }
      }
    },
    investmentProcess: {
      title: '투자 프로세스',
      step1: {
        title: '계정 생성 및 KYC 인증',
        description: '플랫폼에 가입하고 신원 확인을 완료합니다.'
      },
      step2: {
        title: '아발란체 지갑 연결',
        description: 'MetaMask 또는 다른 호환 지갑을 연결하고 AVAX를 준비합니다.'
      },
      step3: {
        title: '투자자산 선택 및 토큰 구매',
        description: '원하는 부동산 프로젝트를 선택하고 해당 프로젝트의 토큰을 구매합니다.'
      },
      step4: {
        title: '수익 분배 및 관리',
        description: '투자한 프로젝트에서 발생하는 임대 수익 및 가치 상승에 따른 이익을 받습니다.'
      }
    },
    disclaimer: '투자에는 원금 손실의 위험이 있습니다. 투자 결정 전에 충분한 검토를 부탁드립니다.'
  }
};

// English translations
const enTranslations = {
  nav: {
    home: 'Home',
    properties: 'View Projects',
    howToInvest: 'How to Invest',
    portfolio: 'My Portfolio',
    team: 'Our Team'
  },
  auth: {
    loginRegister: 'Login / Register'
  },
  wallet: {
    connect: 'Connect Wallet',
    connected: 'Avalanche Connected'
  },
  hero: {
    title: 'Digitize Real-World Assets',
    subtitle: 'Using Avalanche protocol-based blockchain technology to lower the barriers to real estate investment and make premium properties available for small investments.',
    startInvesting: 'Start Investing',
    learnMore: 'Learn More',
    avalancheBased: 'Avalanche Technology Based',
    avalancheDescription: 'We use the Avalanche protocol with fast transaction speeds and low fees',
    completedTransactions: 'Completed Transactions'
  },
  search: {
    region: 'Region',
    selectRegion: 'Select Region',
    propertyType: 'Property Type',
    selectType: 'Select Type',
    investmentAmount: 'Investment Amount',
    selectAmount: 'Select Amount',
    searchButton: 'Search Investment Assets',
    amountRanges: {
      under1m: 'Under 1M Won',
      '1mTo5m': '1M - 5M Won',
      '5mTo10m': '5M - 10M Won',
      over10m: 'Over 10M Won',
      all: 'All'
    }
  },
  propertyTypes: {
    apartment: 'Apartment',
    officetel: 'Officetel',
    commercial: 'Commercial',
    land: 'Land',
    resort: 'Resort',
    membership: 'Membership',
    other: 'Other'
  },
  property: {
    tokenizationStatus: {
      inProgress: 'Tokenizing',
      completed: 'Fully Tokenized',
      upcoming: 'Coming Soon',
      unknown: 'Status Unknown'
    },
    expectedReturn: 'Expected Return {{value}}%',
    verified: 'Verified',
    totalValue: 'Total Asset Value',
    tokenizationProgress: 'Tokenization Progress',
    tokenPrice: 'Token Price',
    minInvestment: 'Min. Investment',
    investors: 'Investors',
    target: 'Target',
    investButton: 'Invest Now',
    soldOutButton: 'Sold Out',
    registerInterestButton: 'Register Interest',
    viewDetailsButton: 'View Details',
    financialAnalysis: 'Financial Analysis',
    keyMetrics: 'Key Metrics',
    cashReturn: 'Cash Return',
    capRate: 'Cap Rate',
    occupancyRate: 'Occupancy Rate',
    annualReturn: 'Annual Return',
    priceHistory: 'Price History'
  },
  featuredProperties: {
    title: 'Featured Investment Assets',
    viewAll: 'View All Investment Assets'
  },
  blockchain: {
    title: 'Revolutionizing Real Estate with Blockchain',
    subtitle: 'Avalanche protocol-based blockchain technology lowers barriers to entry for real estate investment and ensures transparent transactions.',
    features: {
      tokenization: {
        title: 'Real Estate Tokenization',
        description: 'Convert physical real estate into digital tokens on the blockchain, allowing investment with smaller amounts.'
      },
      security: {
        title: 'Secure Transactions',
        description: 'Smart contracts ensure safe and transparent transactions, with all records permanently stored on the blockchain.'
      },
      liquidity: {
        title: 'Enhanced Liquidity',
        description: 'Solving the major drawback of traditional real estate investment by allowing token trading at any time.'
      }
    },
    avalanche: {
      title: 'Avalanche Blockchain Network',
      description: 'Based on the fast and low-fee Avalanche protocol, we provide stable and efficient real estate tokenization services.',
      features: {
        speed: {
          title: 'Fast Transaction Speed',
          description: '4,500+ transactions per second'
        },
        fees: {
          title: 'Low Transaction Fees',
          description: 'Up to 95% cheaper than Ethereum'
        },
        eco: {
          title: 'Eco-Friendly Protocol',
          description: 'Energy-efficient Proof of Stake (PoS)'
        }
      }
    },
    recentTransactions: 'Recent Blockchain Transactions',
    viewAllTransactions: 'View All Transactions',
    noTransactions: 'No recent transactions'
  },
  transactions: {
    buy: 'Property #{{propertyId}} Token Purchase',
    sell: 'Property #{{propertyId}} Token Trade',
    dividend: 'Real Estate Dividend Distribution',
    unknown: 'Unknown Transaction',
    tokens: 'tokens',
    yield: 'yield'
  },
  howItWorks: {
    title: 'How to Invest in Blockchain Real Estate',
    subtitle: 'Blockchain-based real estate investment at SaharaRealTech is simple. Follow the steps below to get started.',
    steps: {
      step1: {
        title: 'Register & Verify',
        description: 'Complete identity verification and create an account for blockchain-based real estate investment.',
        highlight: 'Quick and easy KYC process'
      },
      step2: {
        title: 'Connect Wallet',
        description: 'Connect a digital wallet that supports the Avalanche protocol to prepare for investment.',
        highlight: 'Supports MetaMask, Avalanche Wallet, etc.'
      },
      step3: {
        title: 'Select & Invest',
        description: 'Choose a property from various investment options and purchase tokens to invest.',
        highlight: 'Detailed investment info for each property'
      },
      step4: {
        title: 'Manage Returns',
        description: 'Monitor and manage your rental income and value appreciation in real-time.',
        highlight: 'Transparent blockchain-based profit distribution'
      }
    },
    startNowButton: 'Start Investing Now'
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to questions about blockchain-based real estate investment.',
    items: {
      howItWorks: {
        question: 'How does blockchain-based real estate investment work?',
        answer: 'Blockchain-based real estate investment converts physical properties into digital tokens, enabling fractional ownership. This allows investment with smaller amounts and transparent profit distribution through smart contracts for rental income and asset appreciation.'
      },
      whereToTrade: {
        question: 'Where can I trade real estate tokens?',
        answer: 'You can trade tokens directly on SaharaRealTech, as well as on digital asset exchanges based on the Avalanche protocol. This provides high liquidity and allows you to cash out your investment at any time.'
      },
      howToReceiveReturns: {
        question: 'How do I receive investment returns?',
        answer: 'Rental income from the invested property is automatically distributed according to investment ratio through smart contracts. Returns are deposited to your digital wallet monthly or quarterly, with all transactions transparently recorded on the blockchain.'
      },
      minInvestment: {
        question: 'What is the minimum investment amount?',
        answer: 'The minimum investment amount varies by property, but generally starts from 50,000 won. This lowers the entry barrier, allowing anyone to easily start real estate investment.'
      },
      legalSafety: {
        question: 'Is it legally safe?',
        answer: 'SaharaRealTech operates in compliance with Korean real estate and financial regulations. All properties are registered after legal review, and various safety measures are in place to protect investors. Blockchain technology also enhances safety by transparently recording all transaction details.'
      },
      securityAudits: {
        question: 'How secure are your smart contracts?',
        answer: 'All our smart contracts undergo rigorous auditing by CertiK, a leading blockchain security firm. CertiK uses formal verification technology to mathematically check for vulnerabilities in smart contracts, following a process of code analysis, vulnerability identification and remediation, and final certification. These audit results are publicly available, and we maintain the latest security standards through regular security updates.'
      }
    }
  },
  newsletter: {
    title: 'Get the Latest Real Estate Investment News',
    description: 'Receive regular updates about new investment opportunities and blockchain real estate market trends.',
    emailPlaceholder: 'Enter your email address',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing...',
    privacyNotice: 'By subscribing, you agree to our privacy policy. You can unsubscribe at any time.',
    validationError: 'Email Error',
    validEmailRequired: 'Please enter a valid email address',
    success: 'Subscription Successful',
    subscriptionConfirmed: 'You have successfully subscribed to our newsletter.'
  },
  footer: {
    companyDescription: 'A blockchain-based real estate investment platform providing opportunities for anyone to easily invest in real estate.',
    services: {
      title: 'Services',
      invest: 'Real Estate Investment',
      exchange: 'Token Exchange',
      portfolio: 'Investment Portfolio',
      returns: 'Returns Management',
      education: 'Investment Education'
    },
    company: {
      title: 'Company',
      about: 'About Us',
      team: 'Our Team',
      blog: 'Blog',
      careers: 'Careers',
      partners: 'Partnerships'
    },
    legal: {
      title: 'Legal',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      trading: 'Safe Trading Guide',
      contact: 'Contact Us'
    },
    copyright: 'All rights reserved.',
    supportedBlockchains: 'Supported Blockchains'
  },
  propertyList: {
    regionTitle: '{{region}} Region Properties',
    typeTitle: {
      apartment: 'Apartment Properties',
      officetel: 'Officetel Properties',
      commercial: 'Commercial Properties',
      land: 'Land Properties',
      other: 'Other Properties',
      all: 'All Properties'
    },
    allProperties: 'All Investment Properties',
    sortBy: 'Sort by',
    sortOptions: {
      newest: 'Newest',
      priceHigh: 'Price: High to Low',
      priceLow: 'Price: Low to High',
      returns: 'Return Rate'
    },
    showing: 'Showing {{count}} properties',
    noProperties: 'No properties match your criteria',
    tryDifferentFilters: 'Try different search filters'
  },
  propertyDetail: {
    tabs: {
      details: 'Property Details',
      investment: 'Investment Info',
      blockchain: 'Blockchain Info'
    },
    propertyType: 'Property Type',
    location: 'Location',
    expectedReturn: 'Expected Return',
    annualReturn: 'Expected {{value}}% annually',
    minInvestment: 'Minimum Investment',
    tokens: 'tokens',
    distribution: 'Income Distribution',
    quarterlyDividends: 'Quarterly dividends',
    investorsCount: 'Number of Investors',
    people: 'people',
    blockchain: 'Blockchain Network',
    avalancheBlockchain: 'Avalanche C-Chain',
    smartContract: 'Smart Contract',
    verification: 'Verification Status',
    verifiedBy: 'Verified by legal and audit firms',
    investmentCard: {
      title: 'Invest Now',
      description: 'Invest in this property to earn stable returns',
      tokenCount: 'Number of Tokens',
      amount: 'Investment Amount',
      tokenPrice: 'Token Price',
      expectedAnnualReturn: 'Expected Annual Return',
      estimatedYearlyIncome: 'Estimated Yearly Income',
      investButton: 'Invest Now',
      soldOut: 'Sold Out',
      comingSoon: 'Coming Soon',
      disclaimer: 'Investment involves risk of principal loss. Please review thoroughly before investing.'
    },
    investmentSuccess: 'Your investment was successfully completed.'
  },
  howToInvest: {
    title: 'How to Invest in Blockchain Real Estate',
    subtitle: 'Everything you need to know about real estate investment using Avalanche blockchain',
    tabs: {
      guide: 'Investment Guide',
      blockchain: 'Blockchain Technology',
      risks: 'Investment Risks'
    },
    guide: {
      title: '4 Steps to Blockchain Real Estate Investment',
      description: 'Anyone can easily start investing in real estate through the Avalanche blockchain. Follow these steps to get started.',
      steps: {
        registration: {
          title: 'Registration & Identity Verification',
          step1: 'Create an account with email and password.',
          step2: 'Complete KYC verification via mobile phone or ID card.',
          step3: 'Set up two-factor authentication for account security.'
        },
        wallet: {
          title: 'Connect Digital Wallet',
          step1: 'Install a digital wallet such as MetaMask or Avalanche Wallet.',
          step2: 'Add the Avalanche C-Chain network to your wallet.',
          step3: 'Connect your wallet to the platform.'
        },
        investment: {
          title: 'Select Properties & Invest',
          step1: 'Review various properties and select one to invest in.',
          step2: 'Decide on the number of tokens you want to purchase.',
          step3: 'Complete payment through your digital wallet.',
          step4: 'Tokens are instantly issued via smart contract.'
        },
        returns: {
          title: 'Manage Returns',
          step1: 'Rental income from your investment will be paid quarterly.',
          step2: 'Check your investment status and returns on My Portfolio page.',
          step3: 'You can trade your tokens on the secondary market if needed.'
        }
      },
      startButton: 'Start Investing'
    },
    blockchain: {
      title: 'Blockchain Real Estate Investment Technology',
      description: 'Learn how blockchain technology is revolutionizing real estate investment.',
      whatIsBlockchain: {
        title: 'What is Blockchain?',
        description: 'Blockchain is a distributed digital ledger technology that records information transparently. This technology enables secure and transparent transactions without intermediaries.',
        advantages: {
          title1: 'Transparency',
          description1: 'All transaction records are public and can be verified by anyone, reducing the risk of fraud or manipulation.',
          title2: 'Security',
          description2: 'Distributed structure and encryption technology enable safe storage and management of data.'
        }
      },
      avalancheProtocol: {
        title: 'Avalanche Protocol',
        description: 'Avalanche is a high-performance blockchain platform characterized by fast transaction speeds and low fees. This provides an ideal environment for real estate tokenization.',
        features: {
          title1: 'Fast Speed',
          description1: 'Capable of processing over 4,500 transactions per second, enabling real-time trading.',
          title2: 'Low Fees',
          description2: 'Fees up to 95% cheaper than Ethereum, reducing investment costs.',
          title3: 'Eco-Friendly Design',
          description3: 'Uses an energy-efficient Proof of Stake (PoS) consensus mechanism.'
        }
      },
      tokenization: {
        title: 'Real Estate Tokenization Method',
        description: 'Real estate tokenization is the process of converting physical assets into digital tokens, lowering barriers to real estate investment and increasing liquidity.',
        process: {
          title: 'Tokenization Process',
          step1: 'Legal due diligence and property valuation',
          step2: 'Establishment of Special Purpose Company (SPC) and property acquisition',
          step3: 'Smart contract creation and token issuance',
          step4: 'Token distribution to investors and revenue management'
        }
      }
    },
    risks: {
      title: 'Investment Risk Information',
      description: 'While blockchain real estate investment offers various benefits, investors should be aware of the following risks.',
      marketRisks: {
        title: 'Market Risks',
        description: 'Risks related to the real estate market.',
        point1: 'Possibility of asset value decline due to real estate price fluctuations.',
        point2: 'Risk of reduced rental income due to decreased rental demand.',
        point3: 'Possibility of overall market decline due to macroeconomic factors such as recession.'
      },
      regulatoryRisks: {
        title: 'Regulatory Risks',
        description: 'Risks related to changes in laws and policies.',
        point1: 'Possibility of investment environment changes due to regulatory changes in blockchain and digital assets.',
        point2: 'Possibility of reduced profitability due to changes in real estate-related tax systems.'
      },
      technicalRisks: {
        title: 'Technical Risks',
        description: 'Risks related to blockchain technology.',
        point1: 'Possibility of smart contract code errors or security vulnerabilities.',
        point2: 'Risk of asset loss due to careless management of digital wallets.',
        point3: 'Possibility of transaction delays due to technical issues in the blockchain network.'
      },
      education: {
        title: 'Importance of Investment Education',
        description: 'Before starting blockchain real estate investment, it is important to understand the risks through sufficient information and education. SaharaRealTech provides various materials for investor education.',
        button: 'View Investment Education Materials'
      }
    }
  },
  portfolio: {
    title: 'My Portfolio',
    subtitle: 'View your real estate investments and returns at a glance',
    connectWallet: {
      title: 'Wallet Connection Required',
      description: 'Please connect your digital wallet to view your portfolio.',
      cardTitle: 'Connect Digital Wallet',
      cardDescription: 'Connect your wallet to check your real estate tokens and investment status. All data is retrieved directly from the blockchain.',
      button: 'Connect Wallet',
      benefits: {
        track: {
          title: 'Track Investments',
          description: 'View all your property tokens and investment status at a glance.'
        },
        returns: {
          title: 'Check Returns',
          description: 'Track expected returns and actual dividends received for each property.'
        }
      }
    },
    tabs: {
      overview: 'Overview',
      investments: 'Investments',
      transactions: 'Transactions'
    },
    stats: {
      totalInvested: 'Total Invested',
      expectedAnnualReturn: 'Expected Annual Return',
      totalTokens: 'Total Tokens',
      activeInvestments: '{{count}} active investments',
      returnRate: '{{value}}% annual return',
      lastUpdated: 'Just updated'
    },
    overview: {
      distribution: {
        title: 'Portfolio Distribution',
        description: 'Distribution by property based on investment amount'
      },
      returns: {
        title: 'Monthly Expected Returns',
        description: 'Expected real estate returns for each month',
        monthlyReturn: 'Monthly Return'
      },
      summary: {
        title: 'Investment Summary',
        tokens: 'Tokens',
        tokenPrice: 'Token Price',
        expectedReturn: 'Expected Return',
        annualIncome: 'Annual Expected Income'
      },
      noInvestments: 'No investments yet',
      noReturns: 'No return data available',
      exploreProperties: 'Explore Properties'
    },
    investments: {
      title: 'Investments',
      description: 'A list of all properties I have invested in',
      tokens: 'tokens',
      tokenPrice: 'Token Price',
      expectedReturn: 'Expected Return',
      investmentDate: 'Investment Date',
      currentStatus: 'Current Status',
      active: 'Active',
      tokenizationProgress: 'Tokenization Progress',
      noInvestments: 'No investments found',
      startInvesting: 'Start investing in real estate',
      exploreProperties: 'Explore Available Properties'
    },
    transactions: {
      title: 'Transactions',
      description: 'All blockchain transaction records',
      types: {
        buy: 'Token Purchase',
        sell: 'Token Sale',
        dividend: 'Dividend Received',
        unknown: 'Other Transaction'
      },
      noTransactions: 'No transactions found',
      transactionsAppear: 'Transactions will appear here once you start investing'
    }
  },
  time: {
    minutesAgo: '{{count}} minutes ago',
    hoursAgo: '{{count}} hours ago',
    daysAgo: '{{count}} days ago'
  },
  common: {
    goBack: 'Go Back'
  },
  errors: {
    failedToLoad: 'Failed to load data',
    tryAgainLater: 'Please try again later',
    propertyNotFound: 'Property Not Found',
    propertyNotFoundDesc: 'The property you requested could not be found. Please check other properties.'
  },
  team: {
    title: 'Our Team',
    subtitle: 'Our expert team has rich experience in blockchain technology and real estate industry',
    filters: {
      all: 'All',
      executive: 'Executive Leadership',
      technical: 'Technical Leadership',
      directors: 'Board of Directors',
      advisors: 'Advisory Board'
    },
    joinUs: {
      title: 'Join Our Team',
      description: 'We are looking for passionate talents to build an innovative blockchain-based real estate investment platform together',
      button: 'View Career Opportunities'
    }
  },
  investmentGuide: {
    title: 'Before You Invest',
    subtitle: 'Learn about SaharaRealTech\'s token structure and Avalanche blockchain-based investment information.',
    securityAudit: {
      title: 'Thorough Security Audit',
      description: 'Our smart contracts undergo rigorous auditing by CertiK, one of the leading blockchain security firms, to validate the token ecosystem.',
      certik: {
        title: 'CertiK Audit',
        description: 'CertiK is a leader in blockchain security, specializing in identifying vulnerabilities in smart contracts through formal verification technology.'
      },
      auditProcess: {
        title: 'Audit Process',
        step1: 'Comprehensive code analysis and review',
        step2: 'Security vulnerability identification and remediation',
        step3: 'Review of fixes and final certification',
        step4: 'Regular security updates and monitoring'
      }
    },
    tokenStructure: {
      title: 'Token Structure',
      primeMasterNFT: {
        title: 'Prime Master NFT (1)',
        description: 'A single NFT with highest governance authority, holding veto power for special resolutions and final decision-making rights.'
      },
      governanceNFT: {
        title: 'Governance Master NFTs (99)',
        description: 'Tiered NFTs that can participate in project governance. Complies with Korean private fund regulations (maximum 99 investors).',
        classA: 'Class A: 10 NFTs (10x voting weight)',
        classB: 'Class B: 39 NFTs (5x voting weight)',
        classC: 'Class C: 50 NFTs (1x voting weight)'
      },
      projectTokens: {
        title: 'Project Tokens (RSA-020)',
        description: 'Tokens representing ownership in individual real estate projects, with profit distribution rights.'
      },
      companyToken: {
        title: 'Company Token (SRT)',
        description: 'Token for future exchange listing, to be created after 3-5 successful tokenized projects.'
      }
    },
    avalancheProtocol: {
      title: 'Avalanche Protocol',
      description: 'Avalanche is a high-performance blockchain platform with fast transaction speeds and low fees. Smart contracts are deployed on the C-Chain.',
      features: {
        speed: {
          title: 'Fast Transaction Speed',
          description: 'Over 4,500 transactions per second'
        },
        fees: {
          title: 'Low Transaction Fees',
          description: 'Up to 95% cheaper than Ethereum'
        },
        eco: {
          title: 'Eco-Friendly Design',
          description: 'Uses energy-efficient Proof of Stake (PoS)'
        }
      }
    },
    investmentProcess: {
      title: 'Investment Process',
      step1: {
        title: 'Create Account & Complete KYC',
        description: 'Register on the platform and complete identity verification.'
      },
      step2: {
        title: 'Connect Avalanche Wallet',
        description: 'Connect MetaMask or other compatible wallet and prepare AVAX.'
      },
      step3: {
        title: 'Select Asset & Purchase Tokens',
        description: 'Choose a real estate project and purchase tokens for that project.'
      },
      step4: {
        title: 'Receive & Manage Returns',
        description: 'Receive rental income and profits from value appreciation of your invested projects.'
      }
    },
    disclaimer: 'Investment involves risk of principal loss. Please review thoroughly before making investment decisions.'
  }
};

// Japanese translations
const jaTranslations = {
  nav: {
    home: 'ホーム',
    properties: 'プロジェクト閲覧',
    howToInvest: '投資方法',
    portfolio: 'マイポートフォリオ',
    team: 'チーム紹介'
  },
  auth: {
    loginRegister: 'ログイン / 登録'
  },
  wallet: {
    connect: 'ウォレット接続',
    connected: 'Avalanche接続済み'
  },
  hero: {
    title: '実世界の資産をデジタル化',
    subtitle: 'アバランチプロトコルベースのブロックチェーン技術で不動産投資の障壁を下げ、少額でもプレミアム不動産に投資できるようにします。',
    startInvesting: '投資を始める',
    learnMore: 'サービスについて',
    avalancheBased: 'Avalanche技術ベース',
    avalancheDescription: '高速取引処理と低手数料のアバランチプロトコルを使用',
    completedTransactions: '完了した取引'
  },
  search: {
    region: '地域',
    selectRegion: '地域を選択',
    propertyType: '不動産タイプ',
    selectType: 'タイプを選択',
    investmentAmount: '投資金額',
    selectAmount: '金額を選択',
    searchButton: '物件検索',
    amountRanges: {
      under1m: '100万ウォン以下',
      '1mTo5m': '100万〜500万ウォン',
      '5mTo10m': '500万〜1,000万ウォン',
      over10m: '1,000万ウォン以上',
      all: 'すべて'
    }
  },
  propertyTypes: {
    apartment: 'アパート',
    officetel: 'オフィステル',
    commercial: '商業施設',
    land: '土地',
    resort: 'リゾート',
    membership: '会員権',
    other: 'その他'
  },
  property: {
    tokenizationStatus: {
      inProgress: 'トークン化進行中',
      completed: 'トークン化完了',
      upcoming: '近日公開予定',
      unknown: 'ステータス未定'
    },
    expectedReturn: '予想利回り {{value}}%',
    verified: '検証済み',
    totalValue: '総資産価値',
    tokenizationProgress: 'トークン化進捗',
    tokenPrice: 'トークン価格',
    minInvestment: '最低投資額',
    investors: '投資家',
    target: '目標',
    investButton: '投資する',
    soldOutButton: '販売完了',
    registerInterestButton: '関心を登録',
    viewDetailsButton: '詳細を見る'
  },
  featuredProperties: {
    title: '注目の投資物件',
    viewAll: 'すべての物件を見る'
  },
  footer: {
    companyDescription: 'ブロックチェーン技術を活用した不動産投資プラットフォームで、誰もが簡単に不動産に投資できる機会を提供します。',
    services: {
      title: 'サービス',
      invest: '不動産投資',
      exchange: 'トークン取引所',
      portfolio: '投資ポートフォリオ',
      returns: '収益管理',
      education: '投資教育'
    },
    company: {
      title: '会社情報',
      about: '会社概要',
      team: 'チーム',
      blog: 'ブログ',
      careers: '採用情報',
      partners: 'パートナーシップ'
    },
    legal: {
      title: '法的情報',
      terms: '利用規約',
      privacy: 'プライバシーポリシー',
      cookies: 'クッキーポリシー',
      trading: '安全取引ガイド',
      contact: 'お問い合わせ'
    },
    copyright: 'All rights reserved.',
    supportedBlockchains: '対応ブロックチェーン'
  },
  errors: {
    failedToLoad: 'データの読み込みに失敗しました',
    tryAgainLater: '後ほど再試行してください',
    propertyNotFound: '物件が見つかりません',
    propertyNotFoundDesc: 'リクエストされた不動産物件が見つかりません。他の物件をご確認ください。'
  },
  faq: {
    title: 'よくある質問',
    subtitle: 'ブロックチェーン不動産投資に関するよくある質問への回答です。',
    items: {
      howItWorks: {
        question: 'ブロックチェーン不動産投資はどのように機能しますか？',
        answer: 'ブロックチェーン不動産投資は、実物の不動産をデジタルトークンに変換し、分割所有を可能にする方法です。これにより少額からでもプレミアム不動産に投資でき、スマートコントラクトを通じて賃貸収入や資産価値上昇に伴う利益を透明に受け取ることができます。'
      },
      whereToTrade: {
        question: '不動産トークンはどこで取引できますか？',
        answer: 'SaharaRealTechで直接トークン取引が可能であり、さらにアバランチプロトコルベースのデジタル資産取引所でも取引できます。これにより高い流動性を確保し、いつでも投資資金を回収できる環境を提供します。'
      },
      howToReceiveReturns: {
        question: '投資リターンはどのように受け取りますか？',
        answer: '投資した不動産の賃貸収入は、スマートコントラクトを通じて投資比率に応じて自動的に分配されます。月次または四半期ごとにデジタルウォレットに収益が入金され、ブロックチェーン上にすべての取引履歴が透明に記録されます。'
      },
      minInvestment: {
        question: '最低投資額はいくらですか？',
        answer: '各不動産プロジェクトによって最低投資額は異なりますが、一般的に5万ウォンから投資可能です。これにより誰でも簡単に不動産投資を始められるよう参入障壁を下げています。'
      },
      legalSafety: {
        question: '法的に安全ですか？',
        answer: 'SaharaRealTechは韓国の不動産および金融関連法規を遵守して運営しています。すべての不動産は法的レビューを経て登録され、投資家保護のための様々な安全装置を設けています。またブロックチェーン技術により全ての取引履歴が透明に記録され、安全性が高められています。'
      },
      securityAudits: {
        question: 'スマートコントラクトはどれくらい安全ですか？',
        answer: '当社のすべてのスマートコントラクトは、ブロックチェーンセキュリティ分野をリードするCertiKによる厳格な監査を受けています。CertiKは形式検証（Formal Verification）技術を用いて数学的にスマートコントラクトの脆弱性を確認し、コード分析、脆弱性特定と修正、最終認証のプロセスを経ています。これらの監査結果は公開され、定期的なセキュリティ更新を通じて最新のセキュリティ基準を維持しています。'
      }
    }
  },
  team: {
    title: 'チーム紹介',
    subtitle: '当社の専門家チームはブロックチェーン技術と不動産業界で豊富な経験を持っています',
    filters: {
      all: 'すべて',
      executive: '経営陣',
      technical: '技術リーダーシップ',
      directors: '取締役会',
      advisors: 'アドバイザリーボード'
    },
    joinUs: {
      title: '一緒に働きましょう',
      description: '革新的なブロックチェーンベースの不動産投資プラットフォームを一緒に構築する情熱的な人材を探しています',
      button: '採用情報を見る'
    }
  },
  investmentGuide: {
    title: '投資前にご確認ください',
    subtitle: 'SaharaRealTechのトークン構造とアバランチブロックチェーン基盤の投資情報をご確認ください。',
    securityAudit: {
      title: '厳格なセキュリティ監査',
      description: '当社のスマートコントラクトは、ブロックチェーンセキュリティ分野をリードするCertiKによる厳格な監査を受け、トークンエコシステムの検証を行っています。',
      certik: {
        title: 'CertiK監査',
        description: 'CertiKはブロックチェーンセキュリティのリーダーであり、形式検証（Formal Verification）技術を用いてスマートコントラクトの脆弱性を特定することに特化しています。'
      },
      auditProcess: {
        title: '監査プロセス',
        step1: '包括的なコード分析とレビュー',
        step2: 'セキュリティ脆弱性の特定と修正',
        step3: '修正事項の再確認と最終認証',
        step4: '定期的なセキュリティ更新とモニタリング'
      }
    },
    tokenStructure: {
      title: 'トークン構造',
      primeMasterNFT: {
        title: 'プライムマスターNFT (1個)',
        description: '最高のガバナンス権限を持つ単一のNFTで、特別決議に対する拒否権と最終的な意思決定権を保有しています。'
      },
      governanceNFT: {
        title: 'ガバナンスマスターNFT (99個)',
        description: 'プロジェクトのガバナンスに参加できる階級別NFTです。韓国の私募ファンド規制（最大99人の投資家）に準拠しています。',
        classA: 'クラスA: 10個 (投票権重み10倍)',
        classB: 'クラスB: 39個 (投票権重み5倍)',
        classC: 'クラスC: 50個 (投票権重み1倍)'
      },
      projectTokens: {
        title: 'プロジェクトトークン (RSA-020)',
        description: '個々の不動産プロジェクトの所有権を表すトークンで、収益分配権が含まれています。'
      },
      companyToken: {
        title: '会社トークン (SRT)',
        description: '将来の取引所上場のためのトークンで、3〜5つの成功したトークン化プロジェクト後に作成されます。'
      }
    },
    avalancheProtocol: {
      title: 'アバランチプロトコル',
      description: 'アバランチは高性能ブロックチェーンプラットフォームで、高速取引と低手数料が特徴です。スマートコントラクトはC-Chainにデプロイされます。',
      features: {
        speed: {
          title: '高速取引速度',
          description: '秒間4,500以上のトランザクション処理能力'
        },
        fees: {
          title: '低取引手数料',
          description: 'イーサリアムと比較して最大95%安い手数料'
        },
        eco: {
          title: '環境に優しい設計',
          description: 'エネルギー効率の良いプルーフオブステーク(PoS)方式を使用'
        }
      }
    },
    investmentProcess: {
      title: '投資プロセス',
      step1: {
        title: 'アカウント作成とKYC認証',
        description: 'プラットフォームに登録し、本人確認を完了します。'
      },
      step2: {
        title: 'アバランチウォレット接続',
        description: 'MetaMaskなどの互換ウォレットを接続し、AVAXを準備します。'
      },
      step3: {
        title: '資産選択とトークン購入',
        description: '不動産プロジェクトを選択し、そのプロジェクトのトークンを購入します。'
      },
      step4: {
        title: 'リターンの受け取りと管理',
        description: '投資したプロジェクトからの賃貸収入や価値上昇による利益を受け取ります。'
      }
    },
    disclaimer: '投資には元本損失のリスクがあります。投資決定前に十分な検討をお願いします。'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: koTranslations
      },
      en: {
        translation: enTranslations
      },
      ja: {
        translation: jaTranslations
      }
    },
    lng: 'ko', // Set Korean as the default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
