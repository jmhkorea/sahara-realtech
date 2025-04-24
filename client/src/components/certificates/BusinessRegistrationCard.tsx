import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { 
  Building, 
  Upload, 
  RefreshCw, 
  X, 
  Download,
  Globe,
  CalendarCheck,
  FileText,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";

// 관리자 모드 활성화 여부 (개발 환경에서만 true)
const ADMIN_ENABLED = process.env.NODE_ENV === 'development';

interface Certificate {
  id: number | string;
  name: string;
  category: string;
  filePath: string | null;
  description?: string;
  countryCode?: string;
  issueDate?: string;
  expiryDate?: string;
  issuer?: string;
  registrationNumber?: string;
  isUploading?: boolean;
}

interface BusinessRegistrationCardProps {
  countryCode: string;
  countryName: string;
}

export default function BusinessRegistrationCard({ countryCode, countryName }: BusinessRegistrationCardProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState({
    name: "",
    description: "",
    issuer: "",
    registrationNumber: "",
    issueDate: "",
    expiryDate: ""
  });

  // 데이터베이스에서 해당 국가의 사업자 등록증 불러오기
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`/api/certificates?category=business&countryCode=${countryCode.toLowerCase()}`);
        
        if (response.data && response.data.length > 0) {
          const cert = response.data[0];
          setCertificate(cert);
          
          setCertificateDetails({
            name: cert.name || "",
            description: cert.description || "",
            issuer: cert.issuer || "",
            registrationNumber: cert.registrationNumber || "",
            issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split('T')[0] : "",
            expiryDate: cert.expiryDate ? new Date(cert.expiryDate).toISOString().split('T')[0] : ""
          });
        }
      } catch (error) {
        console.error(`${countryName} 사업자 등록증 불러오기 오류:`, error);
      }
    };
    
    fetchCertificate();
  }, [countryCode, countryName]);

  // 파일 업로드 핸들러
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // 파일 크기 검증 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "파일 크기 초과",
        description: "파일 크기는 10MB를 초과할 수 없습니다.",
        variant: "destructive"
      });
      return;
    }
    
    // 파일 형식 검증
    if (!['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type)) {
      toast({
        title: "지원되지 않는 파일 형식",
        description: "JPEG, PNG, GIF 또는 PDF 파일만 업로드할 수 있습니다.",
        variant: "destructive"
      });
      return;
    }
    
    // 업로드 시작
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('certificateImage', file);
      
      // 파일 먼저 업로드
      const uploadResponse = await axios.post('/api/certificates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (!uploadResponse.data || !uploadResponse.data.filePath) {
        throw new Error("파일 업로드 실패");
      }
      
      // 기존 인증서가 있는지 확인
      const certificateData = {
        name: `${countryName} 사업자 등록증`,
        category: 'business',
        countryCode: countryCode.toLowerCase(),
        filePath: uploadResponse.data.filePath,
        description: `${countryName} 법인 사업자 등록증`,
      };
      
      let response;
      
      if (certificate) {
        // 기존 인증서 업데이트
        response = await axios.patch(`/api/certificates/${certificate.id}`, certificateData);
      } else {
        // 새 인증서 생성
        response = await axios.post('/api/certificates', certificateData);
      }
      
      // 성공 처리
      setCertificate(response.data);
      
      toast({
        title: "업로드 성공",
        description: `${countryName} 사업자 등록증이 성공적으로 업로드되었습니다.`,
        variant: "default"
      });
      
      // 상세 정보 편집 다이얼로그 열기
      setIsEditDialogOpen(true);
      
    } catch (error) {
      console.error('인증서 업로드 오류:', error);
      toast({
        title: "업로드 실패",
        description: "인증서 업로드 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // 인증서 삭제 핸들러
  const handleDelete = async () => {
    if (!certificate) return;
    
    try {
      await axios.delete(`/api/certificates/${certificate.id}`);
      
      setCertificate(null);
      setCertificateDetails({
        name: "",
        description: "",
        issuer: "",
        registrationNumber: "",
        issueDate: "",
        expiryDate: ""
      });
      
      toast({
        title: "삭제 성공",
        description: `${countryName} 사업자 등록증이 삭제되었습니다.`,
        variant: "default"
      });
    } catch (error) {
      console.error('인증서 삭제 오류:', error);
      toast({
        title: "삭제 실패",
        description: "인증서를 삭제하는 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  // 인증서 상세 정보 업데이트 핸들러
  const handleUpdateDetails = async () => {
    if (!certificate) return;
    
    try {
      const updatedData = {
        ...certificateDetails,
        issueDate: certificateDetails.issueDate ? new Date(certificateDetails.issueDate).toISOString() : undefined,
        expiryDate: certificateDetails.expiryDate ? new Date(certificateDetails.expiryDate).toISOString() : undefined
      };
      
      const response = await axios.patch(`/api/certificates/${certificate.id}`, updatedData);
      
      setCertificate(response.data);
      setIsEditDialogOpen(false);
      
      toast({
        title: "업데이트 성공",
        description: "인증서 정보가 성공적으로 업데이트되었습니다.",
        variant: "default"
      });
    } catch (error) {
      console.error('인증서 정보 업데이트 오류:', error);
      toast({
        title: "업데이트 실패",
        description: "인증서 정보를 업데이트하는 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const getCountryFlag = (code: string) => {
    const flagEmojis: Record<string, string> = {
      malta: "🇲🇹",
      usa: "🇺🇸",
      korea: "🇰🇷",
      china: "🇨🇳",
      brazil: "🇧🇷",
      other: "🌍"
    };
    
    return flagEmojis[code.toLowerCase()] || "🌍";
  };

  return (
    <Card className="overflow-hidden border-2 h-full flex flex-col">
      <CardHeader className="pb-2 bg-gray-50">
        <CardTitle className="text-base flex items-center">
          <span className="mr-2 text-lg">{getCountryFlag(countryCode)}</span>
          {countryName} 사업자 등록증
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        {ADMIN_ENABLED && !certificate && (
          <Alert variant="info" className="mb-3">
            <AlertDescription className="text-xs">
              관리자 모드: 개발 환경에서만 업로드 기능이 활성화됩니다.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="h-52 rounded-md border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center mb-4">
          {certificate?.filePath ? (
            <div className="relative w-full h-full">
              <img 
                src={certificate.filePath} 
                alt={`${countryName} 사업자 등록증`} 
                className="w-full h-full object-contain"
              />
              
              {ADMIN_ENABLED && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="w-6 h-6" 
                    onClick={handleDelete}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="w-6 h-6"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-2" />
              <p className="text-sm text-blue-600">업로드 중...</p>
            </div>
          ) : ADMIN_ENABLED ? (
            <div className="text-center p-4">
              <Building className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-4">
                {countryName} 사업자 등록증을 업로드해주세요
              </p>
              <label className="cursor-pointer inline-flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                파일 선택
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/png,image/gif,application/pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          ) : (
            <div className="text-center p-4">
              <Building className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                {countryName} 사업자 등록증이 없습니다
              </p>
            </div>
          )}
        </div>
        
        {certificate && (
          <div className="space-y-2 text-sm mt-auto">
            {certificate.registrationNumber && (
              <div className="flex items-center text-gray-700">
                <Award className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="font-medium">등록번호:</span>
                <span className="ml-2">{certificate.registrationNumber}</span>
              </div>
            )}
            
            {certificate.issuer && (
              <div className="flex items-center text-gray-700">
                <Building className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="font-medium">발행기관:</span>
                <span className="ml-2">{certificate.issuer}</span>
              </div>
            )}
            
            {certificate.issueDate && (
              <div className="flex items-center text-gray-700">
                <CalendarCheck className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="font-medium">발행일:</span>
                <span className="ml-2">
                  {new Date(certificate.issueDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {certificate.description && (
              <div className="flex items-start text-gray-700 mt-2">
                <Globe className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs">{certificate.description}</p>
              </div>
            )}
          </div>
        )}
        
        {certificate?.filePath && (
          <div className="mt-4 pt-3 border-t">
            <a 
              href={certificate.filePath} 
              download={`${countryName.toLowerCase()}_business_registration.${certificate.filePath.split('.').pop()}`}
              className="flex items-center justify-center w-full px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition-colors text-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              사업자 등록증 다운로드
            </a>
          </div>
        )}
      </CardContent>
      
      {/* 인증서 상세 정보 편집 다이얼로그 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{countryName} 사업자 등록증 정보 편집</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cert-name">인증서 이름</Label>
              <Input 
                id="cert-name" 
                value={certificateDetails.name} 
                onChange={e => setCertificateDetails({...certificateDetails, name: e.target.value})}
                placeholder="인증서 이름 입력"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cert-description">설명</Label>
              <Input 
                id="cert-description" 
                value={certificateDetails.description} 
                onChange={e => setCertificateDetails({...certificateDetails, description: e.target.value})}
                placeholder="인증서 설명 입력"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cert-issuer">발행 기관</Label>
                <Input 
                  id="cert-issuer" 
                  value={certificateDetails.issuer} 
                  onChange={e => setCertificateDetails({...certificateDetails, issuer: e.target.value})}
                  placeholder="발행 기관 입력"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cert-reg-number">등록 번호</Label>
                <Input 
                  id="cert-reg-number" 
                  value={certificateDetails.registrationNumber} 
                  onChange={e => setCertificateDetails({...certificateDetails, registrationNumber: e.target.value})}
                  placeholder="등록 번호 입력"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cert-issue-date">발급일</Label>
                <Input 
                  id="cert-issue-date" 
                  type="date" 
                  value={certificateDetails.issueDate} 
                  onChange={e => setCertificateDetails({...certificateDetails, issueDate: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cert-expiry-date">만료일</Label>
                <Input 
                  id="cert-expiry-date" 
                  type="date" 
                  value={certificateDetails.expiryDate} 
                  onChange={e => setCertificateDetails({...certificateDetails, expiryDate: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button type="button" onClick={handleUpdateDetails}>
              정보 저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}