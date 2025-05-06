import { createContext, ReactNode, useContext, useState, useCallback } from 'react';
import { sendMessageToKimiyi, openKimiyiChat, closeKimiyiChat } from '@/lib/kimiyiAI';

// 컨텍스트 인터페이스 정의
interface KimiyiAIContextType {
  sendMessage: (message: string) => void;
  openChat: () => void;
  closeChat: () => void;
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
}

// 기본값으로 컨텍스트 생성
const KimiyiAIContext = createContext<KimiyiAIContextType>({
  sendMessage: () => {},
  openChat: () => {},
  closeChat: () => {},
  isReady: false,
  setIsReady: () => {},
});

// 컨텍스트 프로바이더 프롭스 정의
interface KimiyiAIProviderProps {
  children: ReactNode;
}

// 컨텍스트 프로바이더 컴포넌트
export function KimiyiAIProvider({ children }: KimiyiAIProviderProps) {
  const [isReady, setIsReady] = useState(false);

  // 챗봇에 메시지 전송
  const sendMessage = useCallback((message: string) => {
    sendMessageToKimiyi(message);
  }, []);

  // 챗봇 열기
  const openChat = useCallback(() => {
    openKimiyiChat();
  }, []);

  // 챗봇 닫기
  const closeChat = useCallback(() => {
    closeKimiyiChat();
  }, []);

  return (
    <KimiyiAIContext.Provider value={{ 
      sendMessage, 
      openChat, 
      closeChat, 
      isReady, 
      setIsReady 
    }}>
      {children}
    </KimiyiAIContext.Provider>
  );
}

// 커스텀 훅: 컨텍스트 사용을 위한 훅
export function useKimiyiAI() {
  const context = useContext(KimiyiAIContext);
  if (context === undefined) {
    throw new Error('useKimiyiAI must be used within a KimiyiAIProvider');
  }
  return context;
}