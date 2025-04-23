import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";

// 피드백 양식 스키마
const feedbackSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요" }),
  feedbackType: z.enum(["general", "usability", "feature", "bug"], {
    required_error: "피드백 유형을 선택해주세요",
  }),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "평점을 선택해주세요",
  }),
  message: z.string().min(5, { message: "메시지를 5자 이상 입력해주세요" }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  title?: string;
  description?: string;
  onSubmitSuccess?: () => void;
}

export default function FeedbackForm({ 
  title, 
  description, 
  onSubmitSuccess 
}: FeedbackFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 폼 설정
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackType: "general",
      rating: "5",
      message: "",
    },
  });
  
  // 폼 제출 핸들러
  const onSubmit = async (values: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      // 실제 프로젝트에서는 API 엔드포인트를 추가하고 사용
      // await apiRequest('/api/feedback', {
      //   method: 'POST',
      //   data: values,
      // });
      
      // 성공 토스트 메시지 표시
      toast({
        title: t("feedback.success.title", "감사합니다!"),
        description: t("feedback.success.description", "소중한 피드백을 보내주셔서 감사합니다."),
      });
      
      // 폼 리셋
      form.reset();
      
      // 성공 콜백 호출
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("피드백 제출 중 오류 발생:", error);
      toast({
        title: t("feedback.error.title", "오류 발생"),
        description: t("feedback.error.description", "피드백을 제출하는 동안 문제가 발생했습니다. 나중에 다시 시도해주세요."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{title || t("feedback.title", "피드백 보내기")}</CardTitle>
        <CardDescription>
          {description || t("feedback.description", "서비스 개선을 위한 여러분의 의견을 들려주세요.")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("feedback.form.name", "이름")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("feedback.form.namePlaceholder", "홍길동") as string} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("feedback.form.email", "이메일")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("feedback.form.emailPlaceholder", "example@email.com") as string} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="feedbackType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.form.type", "피드백 유형")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="general" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {t("feedback.form.typeGeneral", "일반 의견")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="usability" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {t("feedback.form.typeUsability", "사용성")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="feature" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("feedback.form.typeFeature", "기능 요청")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bug" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("feedback.form.typeBug", "버그 신고")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.form.rating", "평점")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FormItem key={rating} className="flex flex-col items-center space-y-1">
                          <FormControl>
                            <RadioGroupItem value={rating.toString()} className="sr-only" />
                          </FormControl>
                          <FormLabel className={`p-2 cursor-pointer rounded-full transition-colors ${
                            parseInt(field.value) >= rating 
                              ? "text-yellow-500" 
                              : "text-neutral-300 hover:text-yellow-200"
                          }`}>
                            <Star className="h-6 w-6 fill-current" />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    {t("feedback.form.ratingDescription", "서비스에 대한 전반적인 만족도를 평가해주세요.")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.form.message", "메시지")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("feedback.form.messagePlaceholder", "피드백을 자세히 작성해주세요...") as string} 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting 
                ? t("feedback.form.submitting", "제출 중...") 
                : t("feedback.form.submit", "피드백 보내기")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}