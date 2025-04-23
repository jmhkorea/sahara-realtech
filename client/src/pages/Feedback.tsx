import { useState } from "react";
import { useTranslation } from "react-i18next";
import FeedbackForm from "@/components/FeedbackForm";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function FeedbackPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmitSuccess = () => {
    setSubmitted(true);
    
    // 3초 후에 제출 상태 초기화
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title={t('feedback.seo.title', '사용자 피드백')}
        description={t('feedback.seo.description', 'SaharaRealTech 서비스를 개선할 수 있도록 여러분의 소중한 의견을 들려주세요.')}
        keywords={t('feedback.seo.keywords', '피드백, 의견, 제안, 평가, 부동산 투자, 블록체인')}
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {t('feedback.headline', '여러분의 의견을 들려주세요')}
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {t('feedback.subheading', '서비스 개선을 위한 여러분의 소중한 피드백을 기다립니다. 작은 의견이라도 큰 변화를 만들 수 있습니다.')}
          </p>
        </div>
        
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t('feedback.thankYou.title', '감사합니다!')}
            </h3>
            <p className="text-neutral-600 mb-6">
              {t('feedback.thankYou.message', '소중한 의견을 보내주셔서 감사합니다. 더 나은 서비스 제공을 위해 노력하겠습니다.')}
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              {t('feedback.sendAnother', '다른 피드백 작성하기')}
            </Button>
          </div>
        ) : (
          <FeedbackForm 
            title={t('feedback.form.title', '서비스 피드백')}
            description={t('feedback.form.description', '서비스 개선을 위한 의견이나 제안을 자유롭게 작성해주세요.')}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
        
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <h2 className="text-xl font-semibold mb-4">
            {t('feedback.contactInfo.title', '다른 문의 방법')}
          </h2>
          <p className="mb-4">
            {t('feedback.contactInfo.description', '긴급한 문의나 자세한 상담이 필요하시면 아래 연락처로 문의해 주세요.')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <h3 className="font-medium mb-2">{t('feedback.contactInfo.email', '이메일')}</h3>
              <p className="text-neutral-600">ceo@sahararealtech.com</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <h3 className="font-medium mb-2">{t('feedback.contactInfo.hours', '운영 시간')}</h3>
              <p className="text-neutral-600">{t('feedback.contactInfo.hoursValue', '평일 오전 9시 - 오후 6시')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}