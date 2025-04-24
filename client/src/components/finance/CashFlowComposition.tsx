import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronDown, ChevronUp, RefreshCw, Award, ExternalLink, FileCheck, Upload, X, Plus, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CashFlowCompositionProps {
  className?: string;
}

// 인증서 정보 인터페이스
interface Certificate {
  id: string;
  name: string;
  filePath: string | null;
  isUploading: boolean;
}

// 관리자 권한 확인을 위한 상수 (실제 로그인 시스템과 연동 필요)
const ADMIN_ENABLED = process.env.NODE_ENV === 'development'; // 개발 환경에서만 관리자 기능 활성화

interface CashFlowData {
  name: string;
  수입?: number;
  지출?: number;
  순현금흐름?: number;
  value?: number;
}

export default function CashFlowComposition({ className }: CashFlowCompositionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isTechCertExpanded, setIsTechCertExpanded] = useState(false);
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[] | null>(null);
  const [cashFlowError, setCashFlowError] = useState<boolean>(false);
  
  // 인증서 목록 상태 (서버 API에서 불러오거나 초기화)
  const [certificates, setCertificates] = useState<Certificate[]>(
    Array.from({ length: 28 }, (_, index) => ({
      id: `cert-${index + 1}`,
      name: `인증서 ${index + 1}`,
      filePath: null,
      isUploading: false
    }))
  );
  
  // 현금 흐름 데이터 가져오기
  const fetchCashFlowData = async () => {
    setIsRetrying(true);
    setCashFlowError(false);
    
    try {
      // 캐시 방지를 위한 타임스탬프 추가
      const timestamp = new Date().getTime();
      const response = await axios.get(`/api/financial/cashflow?type=composition&_=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        console.log('현금 흐름 데이터 응답:', response.data);
        setCashFlowData(response.data);
      } else {
        console.error('현금 흐름 데이터 형식 오류:', response.data);
        setCashFlowError(true);
      }
    } catch (error) {
      console.error('현금 흐름 데이터 불러오기 오류:', error);
      setCashFlowError(true);
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };
  
  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    if (isExpanded && !cashFlowData && !isRetrying) {
      fetchCashFlowData();
    }
  }, [isExpanded, cashFlowData, isRetrying]);
  
  // 컴포넌트 마운트 시 API에서 인증서 목록 불러오기
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('/api/certificates?category=tech');
        
        if (response.data && response.data.length > 0) {
          // API 응답 데이터를 인증서 상태 형식에 맞게 변환
          const apiCertificates = response.data.map((cert: any) => ({
            id: cert.id.toString(),
            name: cert.name,
            filePath: cert.filePath,
            isUploading: false
          }));
          
          // 기존 28개 슬롯에 API 데이터 매핑
          const updatedCertificates = [...certificates];
          apiCertificates.forEach((cert: Certificate) => {
            const index = parseInt(cert.id.toString().replace('cert-', '')) - 1;
            if (index >= 0 && index < 28) {
              updatedCertificates[index] = cert;
            }
          });
          
          setCertificates(updatedCertificates);
        }
      } catch (error) {
        console.error('인증서 목록 불러오기 오류:', error);
      }
    };
    
    fetchCertificates();
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    
    // 확장될 때 데이터가 없으면 불러오기
    if (!isExpanded && !cashFlowData && !isRetrying) {
      fetchCashFlowData();
    }
  };

  const toggleTechCertExpanded = () => {
    setIsTechCertExpanded(!isTechCertExpanded);
  };

  const handleRetry = () => {
    fetchCashFlowData();
  };
  
  // 인증서 이미지 업로드 핸들러
  const handleCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>, certId: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const formData = new FormData();
    formData.append('certificateImage', file);
    
    // 현재 인증서의 상태를 업로딩 중으로 업데이트
    const updatedCerts = certificates.map(cert => 
      cert.id === certId 
        ? { ...cert, isUploading: true } 
        : cert
    );
    setCertificates(updatedCerts);
    
    try {
      // 1. 이미지 파일 업로드
      const uploadResponse = await axios.post('/api/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (uploadResponse.data.filePath) {
        // 2. 인증서 메타데이터 저장
        const certificateData = {
          name: `인증서 ${certId.replace('cert-', '')}`,
          category: 'tech',
          filePath: uploadResponse.data.filePath,
          position: parseInt(certId.replace('cert-', '')) - 1,
          description: '기술 인증서'
        };
        
        // 기존 인증서가 있는지 확인하기 위해 현재 인증서 찾기
        const currentCert = certificates.find(c => c.id === certId);
        
        let apiResponse;
        if (currentCert && currentCert.filePath !== null) {
          // 기존 인증서 업데이트
          apiResponse = await axios.patch(`/api/certificates/${certId}`, certificateData);
        } else {
          // 새 인증서 생성
          apiResponse = await axios.post('/api/certificates', certificateData);
        }
        
        // 3. 응답 처리
        const newCerts = certificates.map(cert => 
          cert.id === certId 
            ? { 
                ...cert, 
                filePath: uploadResponse.data.filePath,
                isUploading: false 
              } 
            : cert
        );
        setCertificates(newCerts);
      }
    } catch (error) {
      console.error('인증서 이미지 업로드 오류:', error);
      // 업로드 실패 시 상태 원복
      setCertificates(prevCerts => 
        prevCerts.map(cert => 
          cert.id === certId 
            ? { ...cert, isUploading: false } 
            : cert
        )
      );
      alert('인증서 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 특허 등록증 상태 관리
  const [isPatentExpanded, setIsPatentExpanded] = useState(false);
  const [patentImage, setPatentImage] = useState<string | null>(null);
  const [isPatentUploading, setIsPatentUploading] = useState(false);
  
  // 특허 인증서 불러오기
  useEffect(() => {
    const fetchPatentCertificate = async () => {
      try {
        const response = await axios.get('/api/certificates?category=patent');
        
        if (response.data && response.data.length > 0) {
          // 특허 인증서 중 첫 번째 항목 사용
          setPatentImage(response.data[0].filePath);
        }
      } catch (error) {
        console.error('특허 인증서 불러오기 오류:', error);
      }
    };
    
    fetchPatentCertificate();
  }, []);
  
  // 특허 등록증 업로드 핸들러
  const handlePatentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const formData = new FormData();
    formData.append('certificateImage', file);
    
    setIsPatentUploading(true);
    
    try {
      // 1. 이미지 파일 업로드
      const uploadResponse = await axios.post('/api/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (uploadResponse.data.filePath) {
        // 2. 인증서 메타데이터 저장
        const certificateData = {
          name: '특허 등록증',
          category: 'patent',
          filePath: uploadResponse.data.filePath,
          position: 0,
          description: '블록체인 기술 특허 등록증'
        };
        
        // 기존 특허 인증서가 있는지 확인
        let apiResponse;
        if (patentImage) {
          // 기존 특허 인증서가 있으면 업데이트
          // 실제 ID를 모르므로 특별한 엔드포인트가 필요할 수 있음
          apiResponse = await axios.post('/api/certificates', certificateData);
        } else {
          // 새 특허 인증서 생성
          apiResponse = await axios.post('/api/certificates', certificateData);
        }
        
        // 3. 화면에 표시할 이미지 경로 업데이트
        setPatentImage(uploadResponse.data.filePath);
      }
    } catch (error) {
      console.error('특허 등록증 업로드 오류:', error);
      alert('특허 등록증 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsPatentUploading(false);
    }
  };
  
  const togglePatentExpanded = () => {
    setIsPatentExpanded(!isPatentExpanded);
  };
  
  return (
    <div className="space-y-4">
      <Card className={cn("overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm", className)}>
        <CardHeader 
          className="bg-gray-50 py-4 cursor-pointer"
          onClick={toggleExpanded}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md">현금 흐름 구성 요소</CardTitle>
              <p className="text-sm text-gray-500 mt-1">현금 흐름을 구성하는 수입과 지출 항목의 비율</p>
            </div>
            <div className="rounded-full p-1 hover:bg-gray-200 transition-colors">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </CardHeader>
        
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <CardContent className="pt-4 pb-5">
            {isRetrying ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin mb-4">
                  <RefreshCw className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-gray-500">데이터를 불러오는 중...</p>
              </div>
            ) : cashFlowError ? (
              <div className="text-center">
                <p className="text-red-500 text-sm">데이터를 불러올 수 없습니다.</p>
                <div className="mt-4 mb-6">
                  <div className="mx-auto max-w-full rounded-md border border-gray-200 bg-gray-50 p-8 flex items-center justify-center" style={{ height: "200px" }}>
                    <p className="text-gray-500">현금 흐름 데이터 로드 오류</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-3 flex items-center mx-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRetry();
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> 다시 시도
                </Button>
              </div>
            ) : cashFlowData && cashFlowData.length > 0 ? (
              <div className="space-y-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={cashFlowData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {cashFlowData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'][index % 6]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, '비율']}
                      />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {cashFlowData.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-2 rounded-md border" 
                      style={{ borderColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'][index % 6] }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'][index % 6] }}
                      ></div>
                      <div>
                        <p className="text-xs font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-amber-500 text-sm">데이터를 불러올 수 없습니다.</p>
                <div className="mt-4 mb-6">
                  <div className="mx-auto max-w-full rounded-md border border-gray-200 bg-gray-50 p-8 flex items-center justify-center" style={{ height: "200px" }}>
                    <p className="text-gray-500">현금 흐름 데이터 없음</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-3 flex items-center mx-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRetry();
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> 다시 시도
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* 회사 보유 기술 인증서 카드 */}
      <Card className="overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm">
        <CardHeader 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 cursor-pointer"
          onClick={toggleTechCertExpanded}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md flex items-center">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                회사 보유 기술 인증서
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                사하라 리얼테크의 기술 역량을 인증하는 공식 인증서
              </CardDescription>
            </div>
            <div className="rounded-full p-1 hover:bg-blue-100 transition-colors">
              {isTechCertExpanded ? (
                <ChevronUp className="h-5 w-5 text-blue-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </div>
        </CardHeader>
        
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isTechCertExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <CardContent className="pt-4 pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <FileCheck className="h-6 w-6 text-blue-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900">블록체인 기술 특허</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      부동산 자산 토큰화 및 분산 거래 시스템 관련 특허 기술
                    </p>
                    <div className="mt-2 flex">
                      <a href="#" className="text-xs text-blue-600 flex items-center hover:underline">
                        특허 인증서 보기
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <FileCheck className="h-6 w-6 text-indigo-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-indigo-900">금융 보안 인증</h3>
                    <p className="text-sm text-indigo-800 mt-1">
                      디지털 자산 보안 및 금융 거래 시스템 인증
                    </p>
                    <div className="mt-2 flex">
                      <a href="#" className="text-xs text-indigo-600 flex items-center hover:underline">
                        보안 인증서 보기
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                사하라 리얼테크는 블록체인 기술 및 금융 보안 분야에서 다수의 인증을 획득하여 기술적 신뢰성을 확보하고 있습니다.
                모든 인증서는 정부 기관 및 공인된 인증 기관을 통해 검증되었습니다.
              </p>
            </div>
            
            {/* 인증서 업로드 섹션 - 가로 4개씩, 7줄 그리드 (총 28개) */}
            <div className="mt-6">
              <h3 className="text-base font-semibold mb-2 text-gray-800 flex items-center">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                회사 인증서 업로드 (총 28개)
              </h3>
              
              {ADMIN_ENABLED && (
                <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-center text-amber-700">
                  <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs">
                    <span className="font-medium">관리자 모드</span>: 배포 환경에서는 인증서 업로드 및 삭제 기능이 비활성화됩니다.
                  </p>
                </div>
              )}
              
              {/* 인증서 그리드 - 7줄, 각 줄에 4개씩 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* 28개의 인증서 슬롯 렌더링 */}
                {certificates.map((cert, index) => (
                  <div 
                    key={cert.id}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">인증서 {index + 1}</span>
                      {cert.filePath && ADMIN_ENABLED && (
                        <button 
                          onClick={() => {
                            // 인증서 제거 로직
                            const updatedCerts = certificates.map(c => 
                              c.id === cert.id 
                                ? { ...c, filePath: null } 
                                : c
                            );
                            setCertificates(updatedCerts);
                            
                            // 인증서 DB에서 삭제 요청
                            axios.delete(`/api/certificates/${cert.id}`)
                          }}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                          title="관리자 전용: 인증서 제거"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="h-32 flex items-center justify-center overflow-hidden bg-gray-100 relative">
                      {cert.filePath ? (
                        // 업로드된 인증서 이미지 표시
                        <img 
                          src={cert.filePath} 
                          alt={`인증서 ${index + 1}`} 
                          className="w-full h-full object-contain"
                        />
                      ) : ADMIN_ENABLED ? (
                        // 인증서 업로드 UI (관리자 모드)
                        <div className="text-center p-4">
                          {cert.isUploading ? (
                            <div className="flex flex-col items-center">
                              <RefreshCw className="h-6 w-6 text-blue-500 animate-spin mb-2" />
                              <p className="text-xs text-blue-500">업로드 중...</p>
                            </div>
                          ) : (
                            <div>
                              <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                <Upload className="h-5 w-5 text-blue-600" />
                              </div>
                              <p className="text-gray-500 text-xs mb-2">인증서 이미지 업로드</p>
                              <label className="cursor-pointer px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                                파일 선택
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={(e) => handleCertificateUpload(e, cert.id)}
                                  disabled={cert.isUploading}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      ) : (
                        // 일반 사용자에게 표시되는 빈 슬롯 UI
                        <div className="text-center p-4">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <p className="text-gray-500 text-xs">사용 가능한 인증서 슬롯</p>
                        </div>
                      )}
                    </div>
                    
                    {cert.filePath && (
                      <div className="p-2 bg-white border-t">
                        <a 
                          href={cert.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center justify-center hover:underline"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" /> 
                          크게 보기
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                {ADMIN_ENABLED ? (
                  <p className="text-sm text-gray-500">
                    다양한 기관에서 획득한 인증서를 업로드하여 회사의 신뢰성을 증명해보세요.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    사하라 리얼테크가 획득한 다양한 기관의 인증서를 열람할 수 있습니다.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      
      {/* 특허 등록증 카드 */}
      <Card className="overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm">
        <CardHeader 
          className="bg-gradient-to-r from-green-50 to-teal-50 py-4 cursor-pointer"
          onClick={togglePatentExpanded}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md flex items-center">
                <FileCheck className="h-5 w-5 text-green-600 mr-2" />
                특허 등록증
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                사하라 리얼테크의 블록체인 기술 특허 등록증
              </CardDescription>
            </div>
            <div className="rounded-full p-1 hover:bg-green-100 transition-colors">
              {isPatentExpanded ? (
                <ChevronUp className="h-5 w-5 text-green-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-green-500" />
              )}
            </div>
          </div>
        </CardHeader>
        
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isPatentExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <CardContent className="pt-4 pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 특허 등록증 이미지 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="p-3 bg-green-50 border-b">
                  <h3 className="font-medium text-sm text-green-800">특허 등록증 원본</h3>
                </div>
                <div className="h-[400px] flex items-center justify-center overflow-hidden bg-gray-50 relative">
                  {patentImage ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={patentImage} 
                        alt="특허 등록증" 
                        className="w-full h-full object-contain"
                      />
                      {ADMIN_ENABLED && (
                        <button 
                          onClick={async () => {
                            // 카테고리가 'patent'인 인증서 찾아서 삭제
                            try {
                              const response = await axios.get('/api/certificates?category=patent');
                              if (response.data && response.data.length > 0) {
                                const patentCert = response.data[0];
                                await axios.delete(`/api/certificates/${patentCert.id}`);
                              }
                              setPatentImage(null);
                            } catch (error) {
                              console.error('특허 인증서 삭제 오류:', error);
                              alert('특허 인증서 삭제에 실패했습니다.');
                            }
                          }}
                          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-red-500 hover:text-red-700 focus:outline-none"
                          title="관리자 전용: 특허 등록증 제거"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ) : ADMIN_ENABLED ? (
                    // 특허 등록증 업로드 UI (관리자 모드)
                    <div className="text-center p-4">
                      {isPatentUploading ? (
                        <div className="flex flex-col items-center">
                          <RefreshCw className="h-8 w-8 text-green-500 animate-spin mb-3" />
                          <p className="text-sm text-green-600">업로드 중...</p>
                        </div>
                      ) : (
                        <div>
                          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-green-600" />
                          </div>
                          <p className="text-gray-600 mb-3">특허 등록증을 업로드하세요</p>
                          <label className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm">
                            파일 선택
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handlePatentUpload}
                              disabled={isPatentUploading}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-3">이미지 파일만 업로드 가능합니다 (JPG, PNG)</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // 일반 사용자에게 표시되는 빈 슬롯 UI
                    <div className="text-center p-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <Lock className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">특허 등록증 이미지가 준비 중입니다</p>
                    </div>
                  )}
                </div>
                {patentImage && (
                  <div className="p-2 bg-white border-t flex justify-center">
                    <a 
                      href={patentImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 flex items-center hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> 
                      특허 등록증 크게 보기
                    </a>
                  </div>
                )}
              </div>
              
              {/* 특허 설명 부분 */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">블록체인 기반 부동산 자산 토큰화 시스템</h3>
                  
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>
                      본 특허는 실물 부동산 자산을 디지털 토큰으로 변환하여 소유권을 
                      효율적으로 분할, 거래할 수 있는 블록체인 기반 시스템에 관한 것입니다.
                    </p>
                    
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="font-medium text-green-700 mb-1">주요 기술 요소:</p>
                      <ul className="list-disc list-inside space-y-1 text-green-800">
                        <li>분산 원장 기술을 활용한 소유권 증명 시스템</li>
                        <li>스마트 계약 기반의 자동화된 권리 이전 메커니즘</li>
                        <li>실물 자산과 디지털 토큰 간의 법적 연계성 보장</li>
                        <li>다중 서명 방식의 거래 검증 알고리즘</li>
                        <li>하이브리드 합의 알고리즘을 통한 트랜잭션 검증</li>
                      </ul>
                    </div>
                    
                    <p>
                      이 특허 기술은 사하라 리얼테크의 핵심 서비스인 부동산 토큰화 플랫폼의 
                      기술적 기반을 제공하며, 국내 특허청에 등록되었습니다. 2024년 12월 대한변리사협회 특허 대상 선정 된 바 있습니다.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-gray-500">특허 등록 번호</p>
                      <p className="font-medium text-gray-800">제10-2068689호</p>
                    </div>
                    <div>
                      <p className="text-gray-500">등록일</p>
                      <p className="font-medium text-gray-800">2020년 01월 17일</p>
                    </div>
                    <div>
                      <p className="text-gray-500">출원인</p>
                      <p className="font-medium text-gray-800">정민호, 정채리</p>
                    </div>
                    <div>
                      <p className="text-gray-500">주관회사</p>
                      <p className="font-medium text-gray-800">주식회사 사하라 리얼테크</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}