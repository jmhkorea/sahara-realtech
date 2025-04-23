import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogCategory, type BlogCategoryValue, insertBlogPostSchema } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileImage, Upload } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

// 폼 스키마 확장
const blogPostFormSchema = insertBlogPostSchema.extend({
  titleKo: z.string().min(1, "한국어 제목을 입력해주세요"),
  contentKo: z.string().min(1, "한국어 내용을 입력해주세요"),
  titleJa: z.string().optional(),
  contentJa: z.string().optional(),
  tags: z.string().optional(),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

export default function BlogPostForm() {
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // 기본값으로 폼 초기화
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      titleKo: "",
      titleJa: "",
      content: "",
      contentKo: "",
      contentJa: "",
      category: BlogCategory.COMPANY_NEWS,
      featured: false,
      imageUrl: "",
      tags: "",
      author: "관리자", // 기본 저자 추가
    },
  });
  
  // 블로그 포스트 생성 뮤테이션
  const createBlogMutation = useMutation({
    mutationFn: async (data: BlogPostFormValues) => {
      // 태그를 문자열에서 배열로 변환
      const parsedTags = data.tags
        ? data.tags.split(",").map(tag => tag.trim()).filter(Boolean)
        : [];
      
      // API에 전송할 데이터 구성
      const postData = {
        ...data,
        tags: parsedTags,
      };
      
      const response = await apiRequest("POST", "/api/blog/posts", postData);
      return await response.json();
    },
    onSuccess: async (data) => {
      // 이미지가 있으면 업로드
      if (imageFile && data.id) {
        await uploadImage(data.id, imageFile);
      }
      
      // 캐시 무효화 및 성공 메시지
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/featured'] });
      
      toast({
        title: "게시물 생성 성공",
        description: "블로그 게시물이 성공적으로 작성되었습니다",
      });
      
      // 블로그 목록 페이지로 이동
      setLocation("/blog");
    },
    onError: (error: any) => {
      toast({
        title: "게시물 생성 실패",
        description: error.message || "게시물을 생성하는 중 오류가 발생했습니다",
        variant: "destructive",
      });
    }
  });
  
  // 이미지 업로드 함수
  const uploadImage = async (postId: number, file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch(`/api/blog/posts/${postId}/image/upload`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다");
      }
      
      return await response.json();
    } catch (error: any) {
      console.error("이미지 업로드 오류:", error);
      toast({
        title: "이미지 업로드 실패",
        description: error.message || "이미지를 업로드하는 중 오류가 발생했습니다",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // 이미지 미리보기 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 이미지 파일만 허용
    if (!file.type.startsWith("image/")) {
      toast({
        title: "유효하지 않은 파일",
        description: "이미지 파일만 업로드할 수 있습니다",
        variant: "destructive",
      });
      return;
    }
    
    // 파일 크기 제한
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "파일 크기 초과",
        description: "이미지 크기는 5MB를 초과할 수 없습니다",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // 폼 제출 처리
  const onSubmit = (values: BlogPostFormValues) => {
    createBlogMutation.mutate(values);
  };
  
  return (
    <div className="container py-12">
      <SEO
        title="블로그 게시물 작성 | SaharaRealTech"
        description="새로운 블로그 게시물을 작성합니다"
      />
      
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => setLocation("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그로 돌아가기
          </Button>
          <h1 className="text-3xl font-bold mt-4">블로그 게시물 작성</h1>
        </div>
      </div>
      
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>게시물 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 카테고리 */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(BlogCategory).map((category) => (
                          <SelectItem key={category} value={category}>
                            {(() => {
                              switch(category) {
                                case BlogCategory.COMPANY_NEWS: return '회사 소식';
                                case BlogCategory.INVESTMENT_GUIDE: return '투자 가이드';
                                case BlogCategory.MARKET_ANALYSIS: return '시장 분석';
                                case BlogCategory.EVENT: return '이벤트';
                                case BlogCategory.CRYPTO_NEWS: return '암호화폐 뉴스';
                                case BlogCategory.AVALANCHE_UPDATE: return '아발란체 업데이트';
                                case BlogCategory.PROPERTY_SHOWCASE: return '추천 매물 소개';
                                default: return category;
                              }
                            })()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 제목 (영어) */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목 (영어)</FormLabel>
                    <FormControl>
                      <Input placeholder="영어 제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 제목 (한국어) */}
              <FormField
                control={form.control}
                name="titleKo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목 (한국어)</FormLabel>
                    <FormControl>
                      <Input placeholder="한국어 제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 제목 (일본어) */}
              <FormField
                control={form.control}
                name="titleJa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목 (일본어) - 선택사항</FormLabel>
                    <FormControl>
                      <Input placeholder="일본어 제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 내용 (영어) */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용 (영어)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="영어 내용을 입력하세요" 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 내용 (한국어) */}
              <FormField
                control={form.control}
                name="contentKo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용 (한국어)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="한국어 내용을 입력하세요" 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 내용 (일본어) */}
              <FormField
                control={form.control}
                name="contentJa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용 (일본어) - 선택사항</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="일본어 내용을 입력하세요" 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 태그 */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>태그 (쉼표로 구분)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="예: 블록체인, 부동산, 투자" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 이미지 업로드 */}
              <div className="space-y-2">
                <FormLabel>이미지 업로드</FormLabel>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image-upload"
                      className="flex h-10 cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <FileImage className="mr-2 h-4 w-4" />
                      이미지 선택
                    </label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {imageFile && (
                      <span className="text-sm text-muted-foreground">
                        {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
                      </span>
                    )}
                  </div>
                  
                  {/* 이미지 미리보기 */}
                  {imagePreview && (
                    <div className="relative mt-2 rounded-md border border-border overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="미리보기"
                        className="max-h-64 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* 추천 게시물 여부 */}
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>추천 게시물로 지정</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        메인 블로그 페이지에 추천 게시물로 표시됩니다.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              {/* 제출 버튼 */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/blog")}
                >
                  취소
                </Button>
                <Button 
                  type="submit" 
                  disabled={createBlogMutation.isPending || isUploading}
                >
                  {(createBlogMutation.isPending || isUploading) ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      게시물 저장 중...
                    </>
                  ) : (
                    <>게시물 작성</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}