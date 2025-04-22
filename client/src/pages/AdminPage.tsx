import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 토큰 구조 문서 내용을 상수로 정의
const TOKEN_STRUCTURE_DOC = `# SaharaRealTech 토큰 구조 설계 문서

## 개요

이 문서는 SaharaRealTech 플랫폼의 부동산 토큰화 구조와 전략을 정리합니다. 실물 부동산 자산(RWA)의 토큰화와 거래소 상장을 위한 최적의 모델을 제시합니다.

## 토큰 생태계 구조

SaharaRealTech는 3단계 토큰 구조를 채택합니다:

1. **마스터 NFT**: 각 부동산의 디지털 소유권 증서
2. **프로젝트 토큰(RSA)**: 각 부동산의 소유권을 나타내는 분할 가능한 토큰
3. **플랫폼 토큰(SRT)**: 거래소 상장을 위한 거버넌스 토큰

### 1. 마스터 NFT

- **목적**: 각 부동산의 법적 소유권을 디지털로 표현
- **형태**: ERC-721 표준의 NFT
- **발행 주체**: 각 부동산을 보유한 특수목적법인(SPV)
- **포함 정보**:
  - 부동산 법적 소유권 증명
  - 감정평가서, 등기부등본 등 법적 문서
  - 건물 도면, 상태 보고서 등 기술 정보
  - 임대 계약 및 수익 정보
- **특징**:
  - 위변조 불가능한 디지털 증서
  - 스마트 컨트랙트 기반 소유권 관리
  - 블록체인에 영구 기록

### 2. 프로젝트 토큰 (RSA)

- **목적**: 부동산 소유권의 분할 및 투자자 분배
- **형태**: ERC-20 표준의 토큰
- **네이밍 규칙**: RSA-[프로젝트 번호] (예: RSA-020)
- **발행량**: 프로젝트별 설정 (예: 100,000 토큰)
- **가격 결정**: 부동산 평가가치 / 총 발행량
- **특징**:
  - 각 토큰은 해당 부동산의 부분 소유권 증명
  - 임대 수익 분배 권한 포함
  - 자산 관련 거버넌스 참여권 제공
  - 마스터 NFT에 연결되어 법적 권리 보장

### 3. 플랫폼 토큰 (SRT)

- **목적**: 플랫폼 거버넌스 및 거래소 상장
- **형태**: ERC-20 표준의 토큰
- **발행량**: 전체 플랫폼 가치에 기반하여 설정
- **기능**:
  - 플랫폼 수수료 공유
  - 거버넌스 참여권 (플랫폼 전체 의사결정)
  - 새로운 프로젝트 투자 우선권
  - 프로젝트 토큰과 스왑 가능

## 토큰 간 스왑 메커니즘

SaharaRealTech는 프로젝트 토큰(RSA)과 플랫폼 토큰(SRT) 간의 스왑 기능을 제공합니다:

### 스왑 프로세스

1. **비율 설정**:
   - 각 프로젝트 토큰의 가치에 따라 SRT와의 교환 비율 설정
   - 가치 평가는 부동산 평가액, 수익성 등 고려

2. **스마트 컨트랙트**:
   - 자동화된 스왑 풀 운영
   - 유동성 제공자 인센티브 포함

3. **양방향 스왑**:
   - RSA → SRT: 특정 프로젝트 투자에서 플랫폼 전체 투자로 전환
   - SRT → RSA: 플랫폼 투자에서 특정 프로젝트 집중 투자로 전환

## 부동산별 토큰화 프로세스

1. **법적 구조 설정**:
   - 부동산별 특수목적법인(SPV) 설립
   - 법적 소유권 이전 및 관련 계약 체결

2. **디지털화**:
   - 마스터 NFT 발행
   - 관련 정보의 메타데이터 저장

3. **토큰 발행**:
   - 프로젝트 토큰(RSA) 발행
   - 초기 가격 설정 및 판매 시작

4. **스왑 풀 설정**:
   - RSA-SRT 스왑 풀 생성
   - 초기 유동성 제공

## 거래소 상장 전략

1. **단계적 접근**:
   - 1단계: 자체 플랫폼 내 거래
   - 2단계: STO 특화 거래소 상장
   - 3단계: 주요 암호화폐 거래소 상장

2. **상장 대상**:
   - 주요 상장 대상: SRT (플랫폼 토큰)
   - 특화 거래소: 개별 RSA 토큰 상장 가능

3. **유동성 확보**:
   - SRT-RSA 스왑을 통한 유동성 집중
   - 토큰 보상 프로그램으로 초기 유동성 확보

## 기술적 구현

### 스마트 컨트랙트 구조

\`\`\`solidity
// 마스터 NFT 컨트랙트
contract RealEstateNFT is ERC721 {
    // 부동산 고유 정보 저장
    mapping(uint256 => PropertyDetails) public properties;
    
    // NFT 발행 및 관리 로직
}

// 프로젝트 토큰 컨트랙트
contract ProjectToken is ERC20 {
    // 마스터 NFT 참조
    RealEstateNFT public parentNFT;
    uint256 public propertyId;
    
    // 토큰 발행 및 수익 분배 로직
}

// 플랫폼 토큰 컨트랙트
contract PlatformToken is ERC20 {
    // 거버넌스 및 수수료 공유 로직
}

// 토큰 스왑 컨트랙트
contract TokenSwap {
    // 스왑 풀 관리 및 교환 비율 로직
}
\`\`\`

## 이점 및 혁신 포인트

1. **법적 권리의 명확성**:
   - 마스터 NFT를 통한 소유권 명확화
   - 프로젝트별 독립적 관리로 법적 리스크 분산

2. **투자자 유연성**:
   - 특정 부동산 또는 플랫폼 전체에 투자 선택 가능
   - 스왑을 통한 포트폴리오 조정 기능

3. **유동성 최적화**:
   - SRT를 통한 유동성 집중으로 거래소 상장 용이
   - 개별 자산 접근성 유지

4. **확장성**:
   - 새로운 부동산 추가가 용이한 모듈식 구조
   - 다양한 자산 클래스로 확장 가능

## 향후 로드맵

1. **법적 프레임워크 확립**:
   - 다양한 국가의 규제에 맞는 법적 구조 최적화
   - 규제 준수 자동화 시스템 구축

2. **기술 발전**:
   - 자동화된 자산 평가 시스템
   - AI 기반 수익 예측 모델

3. **생태계 확장**:
   - 부동산 관리 서비스 통합
   - 대출 및 파생상품 도입

---

문서 작성일: 2025년 4월 22일
작성자: SaharaRealTech 개발팀`;

// 프로젝트 개발 가이드 문서
const DEVELOPMENT_GUIDE = `# 프로젝트 개발 가이드

## 아키텍처 개요

SaharaRealTech 플랫폼은 다음과 같은 주요 구성 요소로 이루어져 있습니다:

### 프론트엔드
- React + TypeScript 기반
- Tailwind CSS 및 shadcn/ui 컴포넌트 사용
- 다국어 지원(i18next)
- 상태 관리: React Query

### 백엔드
- Express.js
- 메모리 기반 스토리지(추후 데이터베이스로 전환 가능)
- RESTful API

### 블록체인 통합
- Avalanche C-Chain 연결
- Ethers.js를 통한 스마트 컨트랙트 상호작용

## 주요 기능 목록

1. 부동산 프로젝트 조회 및 상세 정보 확인
2. 토큰화된 부동산 투자
3. 블록체인 지갑 연결
4. 토큰 거래 및 스왑
5. 재무 분석 및 시각화
6. 다국어 지원 인터페이스

## 폴더 구조

- \`/client\`: 프론트엔드 코드
  - \`/src/components\`: 재사용 가능한 UI 컴포넌트
  - \`/src/pages\`: 페이지 컴포넌트
  - \`/src/hooks\`: 커스텀 훅
  - \`/src/lib\`: 유틸리티 함수

- \`/server\`: 백엔드 코드
  - \`/routes.ts\`: API 엔드포인트 정의
  - \`/storage.ts\`: 데이터 저장소 인터페이스

- \`/shared\`: 프론트엔드와 백엔드 간 공유 코드
  - \`/schema.ts\`: 데이터 모델 스키마

- \`/docs\`: 문서 파일

## 개발 가이드라인

### 컴포넌트 작성
- 함수형 컴포넌트와 훅 사용
- Props에 타입 명시
- 재사용 가능한 작은 컴포넌트로 분리

### API 통신
- React Query 사용
- API 경로는 상수로 관리
- 적절한 에러 핸들링

### 다국어 처리
- i18next를 통한 번역 키 관리
- 한국어, 영어, 일본어 지원

### 블록체인 통합
- 지갑 연결 상태 관리
- 트랜잭션 진행 중 UI 피드백 제공
- 에러 메시지 명확하게 표시

## 주요 API 엔드포인트

- \`GET /api/properties\`: 모든 부동산 프로젝트 목록
- \`GET /api/properties/:id\`: 특정 프로젝트 상세 정보
- \`POST /api/investments\`: 새로운 투자 생성
- \`GET /api/users/:userId/investments\`: 사용자 투자 목록
- \`GET /api/transactions/recent\`: 최근 거래 내역
- \`POST /api/transactions\`: 새로운 거래 생성

## 블록체인 통합 가이드

### 지갑 연결
\`\`\`typescript
// client/src/lib/blockchain.ts
export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      return accounts[0];
    } catch (error) {
      console.error("지갑 연결 에러:", error);
      throw error;
    }
  } else {
    throw new Error("이더리움 지갑이 감지되지 않았습니다.");
  }
}
\`\`\`

### 스마트 컨트랙트 상호작용
\`\`\`typescript
// 토큰 구매 함수 예시
export async function purchaseTokens(
  contractAddress: string, 
  amount: string, 
  walletAddress: string
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    TokenABI,
    signer
  );
  
  const tx = await contract.purchase({ 
    value: ethers.utils.parseEther(amount) 
  });
  return await tx.wait();
}
\`\`\`

## 배포 가이드

1. 환경 변수 설정
2. 프론트엔드 빌드: \`npm run build\`
3. 서버 시작: \`npm start\`

## 향후 개발 계획

1. 데이터베이스 통합
2. 사용자 인증 개선
3. 거래소 기능 확장
4. 모바일 앱 개발

---

문서 업데이트: 2025년 4월 22일`;

export default function AdminPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('token-structure');

  // 코드 블록 렌더링을 위한 컴포넌트
  const components = {
    code({node, inline, className, children, ...props}: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle className="text-2xl font-bold">관리자 페이지</CardTitle>
          <CardDescription className="text-blue-100">
            SaharaRealTech 개발 문서 및 관리 도구
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="token-structure">토큰 구조 설계</TabsTrigger>
              <TabsTrigger value="development-guide">개발 가이드</TabsTrigger>
            </TabsList>
            
            <TabsContent value="token-structure" className="mt-4">
              <div className="prose prose-blue max-w-none dark:prose-invert">
                <ReactMarkdown components={components}>
                  {TOKEN_STRUCTURE_DOC}
                </ReactMarkdown>
              </div>
            </TabsContent>
            
            <TabsContent value="development-guide" className="mt-4">
              <div className="prose prose-blue max-w-none dark:prose-invert">
                <ReactMarkdown components={components}>
                  {DEVELOPMENT_GUIDE}
                </ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}