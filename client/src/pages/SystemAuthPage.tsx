import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  Lock, 
  User, 
  AlertTriangle,
  Shield 
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { useSystemAuth } from "@/hooks/use-system-auth";

// 인증 폼 스키마 정의
const authFormSchema = z.object({
  username: z.string().min(1, "사용자 ID를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요")
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function SystemAuthPage() {
  const [, navigate] = useLocation();
  const { authenticateAndRedirect, isLoading, error: authApiError, clearError } = useSystemAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // URL에서 쿼리 파라미터 파싱
  const params = new URLSearchParams(window.location.search);
  
  // 리디렉션 URL 가져오기
  const redirectUrl = params.get("redirectUrl");
  const systemName = params.get("name") || "시스템";
  
  // API 에러 업데이트
  useEffect(() => {
    if (authApiError) {
      setAuthError(authApiError);
    }
  }, [authApiError]);
  
  // 폼 상태 관리
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  // 인증 처리 함수
  const onSubmit = async (values: AuthFormValues) => {
    try {
      clearError();
      setAuthError(null);
      
      if (!redirectUrl) {
        // 리디렉션 URL이 없는 경우 서버에 인증 요청만 하고 성공 시 팀 워크스페이스로 이동
        const result = await authenticateAndRedirect(
          values, 
          "/team-workspace"
        );
        
        if (!result) {
          // authenticateAndRedirect에서 이미 오류 처리가 되므로 추가 처리 불필요
          // error state는 useSystemAuth 훅에서 자동으로 설정됨
          console.log("인증 실패");
        }
      } else {
        // 리디렉션 URL이 있는 경우 해당 URL로 리디렉션
        const result = await authenticateAndRedirect(
          values, 
          decodeURIComponent(redirectUrl)
        );
        
        if (!result) {
          console.log("인증 실패");
        }
      }
    } catch (error) {
      setAuthError("인증 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-4">
      <SEO 
        title={`${systemName} 접근 인증 - SaharaRealTech`}
        description="시스템 접근을 위한 인증 페이지입니다. 접근 권한이 있는 사용자만 로그인할 수 있습니다."
        keywords="인증, 로그인, 시스템 접근, 보안"
      />
      
      <div className="container mx-auto max-w-md">
        <Link href="/team-workspace" className="flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          팀 워크스페이스로 돌아가기
        </Link>
        
        <Card className="border-2 border-blue-100 shadow-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-center font-bold">시스템 접근 인증</CardTitle>
            <CardDescription className="text-center">
              {systemName}에 접근하기 위해 인증이 필요합니다
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>인증 오류</AlertTitle>
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사용자 ID</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                          <Input 
                            placeholder="사용자 ID를 입력하세요" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                          <Input 
                            type="password" 
                            placeholder="비밀번호를 입력하세요" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isLoading}
                >
                  {isLoading ? "인증 중..." : "접근 요청"}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="border-t pt-4 text-center text-sm text-neutral-500">
            <div className="mx-auto max-w-xs">
              <p>이 시스템은 권한이 있는 사용자만 접근할 수 있습니다. 무단 접근 시도는 기록됩니다.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}