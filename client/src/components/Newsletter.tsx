import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: t('newsletter.validationError'),
        description: t('newsletter.validEmailRequired'),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: t('newsletter.success'),
        description: t('newsletter.subscriptionConfirmed'),
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-white/80 mb-8">
            {t('newsletter.description')}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button 
              type="submit"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-bold px-6 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('newsletter.subscribing') : t('newsletter.subscribe')}
            </Button>
          </form>
          
          <p className="text-sm text-white/60 mt-4">
            {t('newsletter.privacyNotice')}
          </p>
        </div>
      </div>
    </section>
  );
}
