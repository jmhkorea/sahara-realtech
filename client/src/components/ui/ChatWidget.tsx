import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 메시지 타입 정의
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  sourceUrl?: string;
  sourceTitle?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // 메시지 목록 최하단으로 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, typingMessage]);

  // 채팅창 처음 열릴 때 웰컴 메시지 표시
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now(),
        text: '안녕하세요! SaharaRealTech 채팅 도우미입니다. 어떻게 도와드릴까요?',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // 음성 인식 초기화
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ko-KR'; // 한국어 설정

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // 최종 결과가 있으면 입력 필드에 설정
        if (finalTranscript !== '') {
          setInputMessage(finalTranscript);
          setTranscript('');
        } else {
          setTranscript(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current && isSpeaking) {
        synthRef.current.cancel();
      }
    };
  }, [isListening, isSpeaking]);

  // 음성 인식 시작/중지 토글
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  // 메시지를 음성으로 읽기
  const speakMessage = (text: string) => {
    if (synthRef.current) {
      // 현재 말하고 있는 내용 정지
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR'; // 한국어
      utterance.rate = 1.0; // 속도
      utterance.pitch = 1.0; // 음높이
      
      // 목소리 선택 (한국어 목소리가 있는 경우)
      const voices = synthRef.current.getVoices();
      const koreanVoice = voices.find(voice => voice.lang.includes('ko'));
      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  // 타이핑 효과 함수
  const simulateTyping = (text: string, sourceUrl?: string, sourceTitle?: string) => {
    setIsTyping(true);
    setTypingMessage('');
    
    let i = 0;
    const speed = 30; // 타이핑 속도 (ms)
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setTypingMessage(prev => prev + text.charAt(i));
        i++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        
        // 타이핑 완료 후 메시지 목록에 추가
        const fullMessage: Message = {
          id: Date.now(),
          text: text,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          sourceUrl,
          sourceTitle
        };
        setMessages(prev => [...prev, fullMessage]);
      }
    }, speed);
  };

  // 봇 응답 처리
  const handleBotResponse = (botReply: any) => {
    // 타이핑 효과로 메시지 표시
    simulateTyping(botReply.text, botReply.sourceUrl, botReply.sourceTitle);
    
    // 음성으로 읽기 (선택적)
    if (botReply.text && synthRef.current) {
      speakMessage(botReply.text);
    }
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // API 호출
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputMessage })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const botReply = await response.json();
      handleBotResponse(botReply);
    } catch (error) {
      console.error('Error sending message:', error);
      // 오류 메시지 추가
      const errorMessage: Message = {
        id: Date.now(),
        text: '죄송합니다. 메시지를 처리하는 중 오류가 발생했습니다.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 엔터 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 메시지 아이템 렌더링
  const renderMessage = (msg: Message) => (
    <div
      key={msg.id}
      className={`mb-3 max-w-[80%] ${
        msg.sender === 'user' 
          ? 'ml-auto bg-primary text-white' 
          : 'mr-auto bg-neutral-200 text-neutral-800'
      } rounded-lg p-2 px-3`}
    >
      <div>{msg.text}</div>
      
      {/* 소스 출처 표시 */}
      {msg.sender === 'bot' && msg.sourceUrl && (
        <div className="mt-1 text-xs text-blue-600">
          <a 
            href={msg.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            출처: {msg.sourceTitle || msg.sourceUrl}
          </a>
        </div>
      )}
      
      <div className={`text-xs mt-1 ${
        msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-neutral-500'
      }`}>
        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        
        {msg.sender === 'bot' && (
          <Button
            onClick={() => speakMessage(msg.text)}
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-neutral-300/50 ml-1"
            title="음성으로 듣기"
          >
            <Mic className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 채팅 버튼 */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}
      
      {/* 채팅창 */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden border border-neutral-200">
          {/* 채팅창 헤더 */}
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <div className="font-medium">SaharaRealTech 도우미</div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-primary-foreground/10 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* 메시지 목록 */}
          <div className="flex-1 p-3 overflow-y-auto max-h-96 bg-neutral-50">
            {messages.map(renderMessage)}
            
            {/* 타이핑 중인 메시지 표시 */}
            {isTyping && (
              <div className="mb-3 max-w-[80%] mr-auto bg-neutral-200 text-neutral-800 rounded-lg p-2 px-3">
                {typingMessage}
                <span className="typing-cursor">|</span>
              </div>
            )}
            
            {/* 로딩 인디케이터 */}
            {isLoading && !isTyping && (
              <div className="flex items-center text-sm text-neutral-500 mb-3">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                답변 작성 중...
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* 음성 인식 중 표시 */}
          {transcript && (
            <div className="text-xs italic text-neutral-500 mx-3 -mb-1 mt-1">
              음성 인식 중: {transcript}
            </div>
          )}
          
          {/* 메시지 입력 */}
          <div className="border-t border-neutral-200 p-3 flex items-center">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 resize-none outline-none border border-neutral-300 rounded-md p-2 h-10 max-h-32 min-h-[40px]"
              rows={1}
              aria-label="메시지 입력"
            />
            
            <Button
              onClick={toggleListening}
              className={`ml-2 h-10 w-10 rounded-full p-0 flex items-center justify-center ${
                isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-neutral-200 hover:bg-neutral-300'
              }`}
              variant={isListening ? "destructive" : "secondary"}
              title={isListening ? '음성 인식 중지' : '음성 인식 시작'}
              aria-label={isListening ? '음성 인식 중지' : '음성 인식 시작'}
              aria-pressed={isListening}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              onClick={handleSendMessage}
              className="ml-2 h-10 w-10 rounded-full p-0 flex items-center justify-center"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="메시지 보내기"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}