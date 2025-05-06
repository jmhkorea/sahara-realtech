import { useEffect, useRef, useState } from 'react';
import { getCompanyData } from '@/lib/kimiyiAI';
import { useKimiyiAI } from '@/contexts/KimiyiAIContext';

interface KimiyiChatProps {
  position?: 'right-bottom' | 'left-bottom';
  botId?: string;
}

// 디지털 휴먼 URL
const DIGITAL_HUMAN_URL = "https://digitalhuman.kimiyi.ai/?id=4Eyoo5HGb3kT2xspOUjfeIP_h8z-nOs0eBplAhWaIEGgXYDE648u8HGF0rCo7_qUHR4x8l3vI0qsMj8KNwxyRw2";

export default function KimiyiAIChat({ 
  position = 'right-bottom',
  botId = '4Eyoo5HGb3kT2xspOUjfeIP_h8z-nOs0eBplAhWaIEGgXYDE648u8HGF0rCo7_qUHR4x8l3vI0qsMj8KNwxyRw2'
}: KimiyiChatProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setIsReady } = useKimiyiAI();
  
  // 디지털 휴먼 채팅창 열기
  const openChat = () => {
    console.log("Opening Kimiyi Digital Human Chat");
    setIsChatOpen(true);
    setIsReady(true);
    
    // 디지털 휴먼 준비 완료 이벤트 트리거
    if (window.__KIMIYI_BOT__) {
      window.__KIMIYI_BOT__ = {
        open: () => {
          setIsChatOpen(true);
        },
        close: () => {
          setIsChatOpen(false);
        },
        sendMessage: (message: string) => {
          if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(
              { action: 'sendMessage', message }, 
              DIGITAL_HUMAN_URL
            );
          }
        }
      };
    } else {
      window.__KIMIYI_BOT__ = {
        open: () => {
          setIsChatOpen(true);
        },
        close: () => {
          setIsChatOpen(false);
        },
        sendMessage: (message: string) => {
          if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(
              { action: 'sendMessage', message }, 
              DIGITAL_HUMAN_URL
            );
          }
        }
      };
    }
  };
  
  // 디지털 휴먼 채팅창 닫기
  const closeChat = () => {
    console.log("Closing Kimiyi Digital Human Chat");
    setIsChatOpen(false);
  };
  
  useEffect(() => {
    // 페이지 데이터 수집 및 전역 변수로 저장
    const companyData = getCompanyData();
    window.__KIMIYI_COMPANY_DATA__ = companyData;
    
    // 전역 객체 초기화
    window.__KIMIYI_BOT__ = {
      open: openChat,
      close: closeChat,
      sendMessage: (message: string) => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            { action: 'sendMessage', message }, 
            DIGITAL_HUMAN_URL
          );
        } else {
          console.warn("iframe 참조가 아직 설정되지 않았습니다.");
        }
      }
    };
    
    // 컴포넌트에서 채팅 API가 준비되었음을 알림
    setIsReady(true);
    
    // 클린업
    return () => {
      window.__KIMIYI_BOT__ = undefined;
      setIsReady(false);
    };
  }, [setIsReady]);
  
  return (
    <>
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75" onClick={closeChat}>
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              ref={iframeRef}
              src={DIGITAL_HUMAN_URL}
              className="w-full h-full border-0"
              allow="microphone; camera; autoplay; clipboard-write"
            />
            <button 
              onClick={closeChat}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// 전역 타입 정의를 위한 선언
declare global {
  interface Window {
    __KIMIYI_BOT__: any;
    __KIMIYI_COMPANY_DATA__: any;
  }
}