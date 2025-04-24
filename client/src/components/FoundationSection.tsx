import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

export default function FoundationSection() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // 각 국가별 인증서 이미지 상태 관리
  const [certificates, setCertificates] = useState({
    malta: null,
    usa: null,
    korea: '/uploads/certificates/korean_business_certificate.jpg', // 한국 사업자등록증 이미지 기본 설정
    china: null
  });
  
  // 업로드 진행 상태
  const [uploading, setUploading] = useState({
    malta: false,
    usa: false,
    korea: false,
    china: false
  });

  // 파일 업로드 핸들러
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, country: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    const formData = new FormData();
    formData.append('certificateImage', file);
    
    try {
      setUploading({...uploading, [country]: true});
      
      const response = await axios.post('/api/certificates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setCertificates({
          ...certificates,
          [country]: response.data.filePath
        });
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading({...uploading, [country]: false});
    }
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border border-gray-200 rounded-lg shadow-sm bg-white mb-8"
        >
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div className="text-left">
                <h2 className="font-bold text-lg text-blue-700">사하라 리얼테크 회사 인증 및 등록증</h2>
                <p className="text-xs text-gray-500">글로벌 부동산 자산 디지털화를 주도하는 사하라 리얼테크의 국가별 공식 법인 등록증</p>
              </div>
            </div>
            <div className="text-gray-400">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="p-4 pt-0 border-t border-gray-100">
              <div className="text-center max-w-3xl mx-auto mb-6">
                <p className="text-gray-600 mb-4">
                  글로벌 부동산 자산 디지털화를 주도하는 사하라 리얼테크의 국가별 공식 법인 등록증입니다.
                  각 국가의 법률 및 규제를 준수하며 토큰증권과 실물자산 디지털화를 위한 안전한 블록체인 기술을 개발합니다.
                </p>
              </div>
              
              {/* 사업자등록증 폼 4개 - 한 줄에 2개 표시 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* 몰타공화국 등록증 폼 */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">몰타공화국 등록증</h3>
                      <p className="text-xs text-gray-500">유럽 지역 본부</p>
                    </div>
                  </div>
                  <div className="rounded-lg h-52 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                    {certificates.malta ? (
                      <img src={certificates.malta} alt="몰타공화국 사업자등록증" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-500 text-sm mb-2">사업자등록증 이미지를 업로드해주세요</p>
                        <label className="cursor-pointer px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                          이미지 업로드
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'malta')}
                            disabled={uploading.malta}
                          />
                        </label>
                        {uploading.malta && <p className="text-xs text-blue-500 mt-2">업로드 중...</p>}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 미국 등록증 폼 */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">미국 등록증</h3>
                      <p className="text-xs text-gray-500">북미 지역 본부</p>
                    </div>
                  </div>
                  <div className="rounded-lg h-52 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                    {certificates.usa ? (
                      <img src={certificates.usa} alt="미국 사업자등록증" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-500 text-sm mb-2">사업자등록증 이미지를 업로드해주세요</p>
                        <label className="cursor-pointer px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                          이미지 업로드
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'usa')}
                            disabled={uploading.usa}
                          />
                        </label>
                        {uploading.usa && <p className="text-xs text-blue-500 mt-2">업로드 중...</p>}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 한국 등록증 폼 */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">한국 등록증</h3>
                      <p className="text-xs text-gray-500">아시아 지역 총괄</p>
                    </div>
                  </div>
                  <div className="rounded-lg h-52 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                    {certificates.korea ? (
                      <img src={certificates.korea} alt="한국 사업자등록증" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-500 text-sm mb-2">사업자등록증 이미지를 업로드해주세요</p>
                        <label className="cursor-pointer px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                          이미지 업로드
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'korea')}
                            disabled={uploading.korea}
                          />
                        </label>
                        {uploading.korea && <p className="text-xs text-blue-500 mt-2">업로드 중...</p>}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 중국 등록증 폼 */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">중국 등록증</h3>
                      <p className="text-xs text-gray-500">중국 시장 진출</p>
                    </div>
                  </div>
                  <div className="rounded-lg h-52 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                    {certificates.china ? (
                      <img src={certificates.china} alt="중국 사업자등록증" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-500 text-sm mb-2">사업자등록증 이미지를 업로드해주세요</p>
                        <label className="cursor-pointer px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                          이미지 업로드
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'china')}
                            disabled={uploading.china}
                          />
                        </label>
                        {uploading.china && <p className="text-xs text-blue-500 mt-2">업로드 중...</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-2">
                <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  사하라 리얼테크는 글로벌 블록체인 기술을 통해 부동산 자산의 토큰화를 추진하는 선도적인 기관으로, 
                  북미, 아시아, 중국에 지사를 두고 글로벌 부동산 시장의 민주화와 접근성 향상을 위해 노력하고 있습니다. 
                  각 국가별 금융 규제 준수와 함께 안정적인 토큰증권(STO) 발행 및 실물자산(RWA) 디지털화를 위한 
                  표준 기술을 개발하고 있습니다.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}