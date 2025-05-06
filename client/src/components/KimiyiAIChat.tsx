import { useEffect, useRef } from 'react';
import { getCompanyData } from '@/lib/kimiyiAI';

interface KimiyiChatProps {
  position?: 'right-bottom' | 'left-bottom';
  botId?: string;
}

export default function KimiyiAIChat({ 
  position = 'right-bottom',
  botId = '4Eyoo5HGb3kT2xspOUjfeIP_h8z-nOs0eBplAhWaIEGgXYDE648u8HGF0rCo7_qUHR4x8l3vI0qsMj8KNwxyRw2'
}: KimiyiChatProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef<boolean>(false);
  
  useEffect(() => {
    if (scriptLoaded.current) return;
    
    // 페이지 데이터 수집 및 전역 변수로 저장
    const companyData = getCompanyData();
    window.__KIMIYI_COMPANY_DATA__ = companyData;
    
    // Kimiyi 챗봇 스크립트 로드
    const script = document.createElement('script');
    script.src = "https://chat.kimiyi.ai/widget.js";
    script.async = true;
    script.defer = true;
    script.setAttribute('bot-id', botId);
    script.setAttribute('data-position', position);
    
    // 스크립트 로드 후 콜백
    script.onload = () => {
      console.log("Kimiyi AI chat widget loaded");
      
      // 이벤트 리스너 설정
      if (window.__KIMIYI_BOT__) {
        window.__KIMIYI_BOT__.on('ready', () => {
          // 챗봇이 준비되면 회사 데이터 전송
          window.__KIMIYI_BOT__.sendCustomEvent('companyData', companyData);
        });
        
        window.__KIMIYI_BOT__.on('message:received', (msg: any) => {
          console.log('Bot received message:', msg);
        });
      }
    };
    
    document.body.appendChild(script);
    scriptLoaded.current = true;
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [botId, position]);
  
  return (
    <div ref={chatContainerRef} id="kimiyi-chat-container" className="fixed bottom-0 right-0 z-50">
      {/* 챗봇 스크립트가 여기에 UI를 자동 렌더링함 */}
    </div>
  );
}

// 전역 타입 정의를 위한 선언
declare global {
  interface Window {
    __KIMIYI_BOT__: any;
    __KIMIYI_COMPANY_DATA__: any;
  }
}