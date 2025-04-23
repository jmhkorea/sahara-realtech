import { searchContent, ContentItem } from './contentIndexService';

export interface ChatResponse {
  id: number;
  text: string;
  sender: 'bot';
  timestamp: string;
  sourceUrl?: string;
  sourceTitle?: string;
}

// 질문 유형 분류
enum QuestionType {
  PROPERTY = 'property',
  INVESTMENT = 'investment',
  COMPANY = 'company',
  BLOCKCHAIN = 'blockchain',
  GENERAL = 'general',
  UNKNOWN = 'unknown',
}

// 질문 유형 분류 함수
function classifyQuestion(question: string): QuestionType {
  const lowerQuestion = question.toLowerCase();
  
  // 부동산 관련 키워드
  if (/부동산|매물|자산|물건|건물|아파트|오피스텔|빌딩|집|토지|property/.test(lowerQuestion)) {
    return QuestionType.PROPERTY;
  }
  
  // 투자 관련 키워드
  if (/투자|수익|수익률|배당|토큰|코인|분할|소유권|token|invest|return/.test(lowerQuestion)) {
    return QuestionType.INVESTMENT;
  }
  
  // 회사 관련 키워드
  if (/회사|기업|sahara|사하라|리얼텍|realtech|팀|team|대표|ceo/.test(lowerQuestion)) {
    return QuestionType.COMPANY;
  }
  
  // 블록체인 관련 키워드
  if (/블록체인|blockchain|암호화폐|crypto|스마트계약|smart contract|avalanche|아발란체/.test(lowerQuestion)) {
    return QuestionType.BLOCKCHAIN;
  }
  
  // 일반 질문
  if (/어떻게|무엇|언제|누구|어디|왜|how|what|when|who|where|why/.test(lowerQuestion)) {
    return QuestionType.GENERAL;
  }
  
  return QuestionType.UNKNOWN;
}

// 응답 생성 함수
export async function generateResponse(message: string): Promise<ChatResponse> {
  try {
    // 1. 질문 유형 분류
    const questionType = classifyQuestion(message);
    
    // 2. 관련 콘텐츠 검색
    const searchResults = await searchContent(message);
    
    // 3. 응답 생성
    let responseText = '';
    let sourceUrl = '';
    let sourceTitle = '';
    
    if (searchResults.length > 0) {
      // 가장 관련성 높은 콘텐츠 선택
      const topResult = searchResults[0];
      
      // 콘텐츠 유형에 따라 응답 형식 조정
      switch (topResult.type) {
        case 'property':
          responseText = `"${topResult.title}" 물건에 대해 알려드리겠습니다. ${topResult.content}`;
          break;
        case 'blog':
          responseText = `블로그 글 "${topResult.title}"에서 관련 내용을 찾았습니다. ${topResult.content.substring(0, 150)}...`;
          break;
        case 'faq':
          responseText = topResult.content;
          break;
        default:
          responseText = topResult.content;
      }
      
      sourceUrl = topResult.url;
      sourceTitle = topResult.title;
    } else {
      // 검색 결과가 없는 경우 기본 응답
      switch (questionType) {
        case QuestionType.PROPERTY:
          responseText = '저희 SaharaRealTech는 다양한 부동산 투자 기회를 제공합니다. 관심 있는 특정 지역이나 유형이 있으신가요?';
          break;
        case QuestionType.INVESTMENT:
          responseText = '저희 플랫폼에서는 블록체인 기술을 활용하여 부동산에 소액으로 투자할 수 있습니다. 구체적인 투자 방법이나 수익 구조에 대해 알고 싶으신가요?';
          break;
        case QuestionType.COMPANY:
          responseText = 'SaharaRealTech는 블록체인 기반 부동산 투자 플랫폼으로, 부동산 자산을 토큰화하여 누구나 쉽게 투자할 수 있도록 돕고 있습니다.';
          break;
        case QuestionType.BLOCKCHAIN:
          responseText = '저희는 Avalanche 블록체인을 사용하여 부동산 자산을 토큰화합니다. 이를 통해 안전하고 투명한 거래가 가능합니다.';
          break;
        default:
          responseText = '안녕하세요! SaharaRealTech 채팅 도우미입니다. 부동산 투자나 저희 플랫폼에 대해 어떤 점이 궁금하신가요?';
      }
    }
    
    return {
      id: Date.now(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      sourceUrl: sourceUrl || undefined,
      sourceTitle: sourceTitle || undefined,
    };
  } catch (error) {
    console.error('응답 생성 중 오류 발생:', error);
    return {
      id: Date.now(),
      text: '죄송합니다. 질문을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
  }
}