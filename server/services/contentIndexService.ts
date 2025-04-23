import { Property, BlogPost } from '@shared/schema';
import { storage } from '../storage';

// 검색 가능한 콘텐츠 아이템 인터페이스
export interface ContentItem {
  id: string;
  type: 'property' | 'blog' | 'faq' | 'general';
  title: string;
  content: string;
  url: string;
  keywords?: string[];
  category?: string;
}

// 정적 콘텐츠 (홈페이지의 고정된 섹션들)
const staticContent: ContentItem[] = [
  {
    id: 'about',
    type: 'general',
    title: '회사 소개',
    content: 'SaharaRealTech는 블록체인 기술을 활용하여 부동산 투자를 민주화하는 플랫폼입니다. 저희는 부동산의 토큰화를 통해 전 세계의 부동산에 소액으로 투자할 수 있는 기회를 제공합니다.',
    url: '/',
    keywords: ['회사', '소개', '블록체인', '부동산', '토큰화'],
  },
  {
    id: 'how-it-works',
    type: 'general',
    title: '투자 방법',
    content: 'SaharaRealTech에서는 블록체인 기술을 활용하여 부동산 자산을 토큰화합니다. 이를 통해 투자자들은 적은 금액으로도 고급 부동산에 투자할 수 있으며, 언제든지 토큰을 거래할 수 있습니다.',
    url: '/how-it-works',
    keywords: ['투자', '방법', '토큰', '블록체인'],
  },
  {
    id: 'blockchain',
    type: 'general',
    title: '블록체인 기술',
    content: 'SaharaRealTech는 Avalanche 프로토콜을 기반으로 안전하고 투명한 부동산 토큰화 플랫폼을 운영합니다. 모든 거래는 블록체인에 기록되어 변조가 불가능하며, 스마트 계약을 통해 자동으로 권리가 보장됩니다.',
    url: '/technology',
    keywords: ['블록체인', '아발란체', 'Avalanche', '스마트 계약', '토큰'],
  },
  {
    id: 'tokens',
    type: 'general',
    title: '토큰 시스템',
    content: 'SaharaRealTech의 토큰 시스템은 프라임 마스터 NFT(1개), 거버넌스 마스터 NFT(99개), 프로젝트 토큰으로 구성됩니다. 각 토큰은 다양한 권한과 수익 분배 기회를 제공합니다.',
    url: '/tokens',
    keywords: ['토큰', 'NFT', '거버넌스', '수익', '투자'],
  },
  {
    id: 'security',
    type: 'general',
    title: '보안 및 감사',
    content: 'SaharaRealTech의 모든 스마트 계약은 CertiK에 의해 보안 감사를 받아 안전성이 검증되었습니다. 저희는 최고 수준의 보안 표준을 준수하여 투자자의 자산을 보호합니다.',
    url: '/security',
    keywords: ['보안', '감사', 'CertiK', '스마트 계약', '안전'],
  }
];

// FAQ 콘텐츠
const faqContent: ContentItem[] = [
  {
    id: 'faq-1',
    type: 'faq',
    title: '부동산 토큰화란 무엇인가요?',
    content: '부동산 토큰화는 실물 부동산 자산을 블록체인 기반 토큰으로 변환하는 과정입니다. 이를 통해 하나의 부동산을 여러 조각으로 나누어 다수의 투자자가 소유할 수 있게 됩니다.',
    url: '/faq',
    keywords: ['부동산', '토큰화', '블록체인', '투자'],
  },
  {
    id: 'faq-2',
    type: 'faq',
    title: '최소 투자 금액은 얼마인가요?',
    content: 'SaharaRealTech에서는 부동산을 작은 단위로 토큰화하여 소액으로도 투자가 가능합니다. 최소 투자 금액은 프로젝트마다 다르지만, 일반적으로 10만원부터 시작할 수 있습니다.',
    url: '/faq',
    keywords: ['최소 투자', '금액', '토큰', '소액 투자'],
  },
  {
    id: 'faq-3',
    type: 'faq',
    title: '수익은 어떻게 배분되나요?',
    content: '투자한 부동산에서 발생하는 임대 수익이나 매각 차익은 스마트 계약을 통해 각 투자자의 지분 비율에 따라 자동으로 분배됩니다. 배당금은 분기별 또는 연간 단위로 지급됩니다.',
    url: '/faq',
    keywords: ['수익', '배당', '분배', '임대', '매각'],
  },
  {
    id: 'faq-4',
    type: 'faq',
    title: '토큰은 어디서 거래할 수 있나요?',
    content: '초기에는 SaharaRealTech 플랫폼 내에서만 거래가 가능하지만, 향후 외부 암호화폐 거래소에 상장하여 더 넓은 시장에서 거래될 예정입니다.',
    url: '/faq',
    keywords: ['토큰', '거래', '거래소', '상장'],
  },
  {
    id: 'faq-5',
    type: 'faq',
    title: '법적 안전성은 어떻게 보장되나요?',
    content: 'SaharaRealTech는 한국의 자본시장법과 부동산 관련 법규를 철저히 준수합니다. 모든 프로젝트는 법무법인의 검토를 거쳐 투자자의 권리가 법적으로 보장됩니다.',
    url: '/faq',
    keywords: ['법률', '안전', '규제', '자본시장법', '권리'],
  }
];

// 동적 콘텐츠를 포함한 전체 콘텐츠 가져오기
export async function getAllContent(): Promise<ContentItem[]> {
  try {
    // 1. 정적 콘텐츠
    let allContent = [...staticContent, ...faqContent];
    
    // 2. 속성 (부동산) 데이터
    const properties = await storage.getProperties();
    const propertyContent = properties.map((property: Property): ContentItem => ({
      id: `property-${property.id}`,
      type: 'property',
      title: property.name,
      content: `${property.description || ''} 위치: ${property.address} 가격: ${property.totalValue} 타입: ${property.type} 지역: ${property.region}`,
      url: `/properties/${property.id}`,
      category: property.region,
      keywords: [property.type, property.region, '부동산', '투자'],
    }));
    
    // 3. 블로그 게시물
    const blogPosts = await storage.getBlogPosts(100); // 최대 100개 포스트 가져오기
    const blogContent = blogPosts.map((post: BlogPost): ContentItem => ({
      id: `blog-${post.id}`,
      type: 'blog',
      title: post.title,
      content: post.content,
      url: `/blog/${post.id}`,
      category: post.category,
      keywords: post.tags ? post.tags : [],
    }));
    
    // 모든 콘텐츠 합치기
    allContent = [...allContent, ...propertyContent, ...blogContent];
    
    return allContent;
  } catch (error) {
    console.error('콘텐츠 인덱싱 중 오류 발생:', error);
    return [...staticContent, ...faqContent]; // 오류 시 최소한 정적 콘텐츠 반환
  }
}

// 검색 함수
export async function searchContent(query: string): Promise<ContentItem[]> {
  const allContent = await getAllContent();
  
  // 검색어 정제 (소문자 변환, 공백 제거)
  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/);
  
  // 검색 점수 계산 함수
  const calculateScore = (item: ContentItem): number => {
    let score = 0;
    
    // 제목에 검색어가 포함되면 높은 점수
    if (item.title.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    // 개별 검색어 단위로 매칭
    queryTerms.forEach(term => {
      // 제목에 검색어 포함
      if (item.title.toLowerCase().includes(term)) {
        score += 5;
      }
      
      // 내용에 검색어 포함
      if (item.content.toLowerCase().includes(term)) {
        score += 3;
      }
      
      // 키워드에 검색어 포함
      if (item.keywords && item.keywords.some(k => k.toLowerCase().includes(term))) {
        score += 4;
      }
    });
    
    return score;
  };
  
  // 검색 결과 필터링 및 정렬
  return allContent
    .map(item => ({ item, score: calculateScore(item) }))
    .filter(({ score }) => score > 0) // 점수가 0보다 큰 항목만 포함
    .sort((a, b) => b.score - a.score) // 점수 높은 순으로 정렬
    .map(({ item }) => item); // 원래 아이템만 반환
}

// 특정 ID의 콘텐츠 가져오기
export async function getContentById(id: string): Promise<ContentItem | null> {
  const allContent = await getAllContent();
  return allContent.find(item => item.id === id) || null;
}