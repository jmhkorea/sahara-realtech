import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface SystemAuthCredentials {
  username: string;
  password: string;
}

export interface SystemAuthResponse {
  success: boolean;
  user?: {
    id: number;
    username: string;
    email?: string;
    role: string;
  };
  error?: string;
}

export function useSystemAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 시스템 인증 요청 Mutation
  const authenticateMutation = useMutation({
    mutationFn: async (credentials: SystemAuthCredentials): Promise<SystemAuthResponse> => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return {
            success: false,
            error: data.error || '인증에 실패했습니다.'
          };
        }
        
        return {
          success: true,
          user: data
        };
      } catch (err) {
        console.error('인증 요청 중 오류 발생:', err);
        return {
          success: false,
          error: '인증 과정에서 오류가 발생했습니다.'
        };
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      if (data.success && data.user) {
        queryClient.setQueryData(['auth', 'currentUser'], data.user);
        toast({
          title: '인증 성공',
          description: '시스템 접근이 승인되었습니다.',
          variant: 'default',
        });
      } else if (data.error) {
        setError(data.error);
        toast({
          title: '인증 실패',
          description: data.error,
          variant: 'destructive',
        });
      }
    },
    onError: (err: Error) => {
      const errorMessage = err.message || '인증 요청 중 오류가 발생했습니다.';
      setError(errorMessage);
      toast({
        title: '인증 오류',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  });

  // 시스템별 접근 권한 확인 함수
  const checkSystemAccess = async (systemId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/auth/system-access/${systemId}`);
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('로그인이 필요합니다.');
          return false;
        } else if (response.status === 403) {
          setError('접근 권한이 없습니다.');
          return false;
        }
        
        setError(data.error || '시스템 접근 확인 중 오류가 발생했습니다.');
        return false;
      }
      
      return data.canAccess === true;
    } catch (err) {
      console.error('시스템 접근 확인 중 오류 발생:', err);
      setError('시스템 접근 확인 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 Mutation
  const logoutMutation = useMutation({
    mutationFn: async (): Promise<boolean> => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        });
        
        return response.ok;
      } catch (err) {
        console.error('로그아웃 중 오류 발생:', err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (success) => {
      if (success) {
        queryClient.removeQueries({ queryKey: ['auth'] });
        toast({
          title: '로그아웃 완료',
          description: '성공적으로 로그아웃되었습니다.',
          variant: 'default',
        });
      }
    }
  });

  // 인증 후 지정된 URL로 리디렉션하는 함수
  const authenticateAndRedirect = async (
    credentials: SystemAuthCredentials, 
    redirectUrl: string
  ): Promise<boolean> => {
    const result = await authenticateMutation.mutateAsync(credentials);
    
    if (result.success) {
      window.location.href = redirectUrl;
      return true;
    }
    
    return false;
  };

  return {
    authenticate: authenticateMutation.mutate,
    authenticateAsync: authenticateMutation.mutateAsync,
    authenticateAndRedirect,
    checkSystemAccess,
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}