import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Property, TokenizationStatus } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Format currency with Korean Won symbol
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Format based on the size of the number
    if (numValue >= 100000000) { // If over 1억
      return `₩ ${(numValue / 100000000).toFixed(0)}억`;
    } else if (numValue >= 10000) { // If over 1만
      return `₩ ${(numValue / 10000).toFixed(0)}만`;
    }
    
    return `₩ ${numValue.toLocaleString()}`;
  };
  
  // Get the status label and color based on tokenization status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case TokenizationStatus.IN_PROGRESS:
        return {
          label: t('property.tokenizationStatus.inProgress'),
          colorClass: 'bg-primary'
        };
      case TokenizationStatus.COMPLETED:
        return {
          label: t('property.tokenizationStatus.completed'),
          colorClass: 'bg-secondary'
        };
      case TokenizationStatus.UPCOMING:
        return {
          label: t('property.tokenizationStatus.upcoming'),
          colorClass: 'bg-accent'
        };
      default:
        return {
          label: t('property.tokenizationStatus.unknown'),
          colorClass: 'bg-neutral-400'
        };
    }
  };
  
  const statusInfo = getStatusInfo(property.tokenizationStatus);
  
  // Determine button state based on tokenization status
  const getButtonState = (status: string) => {
    switch (status) {
      case TokenizationStatus.IN_PROGRESS:
        return {
          label: t('property.investButton'),
          disabled: false,
          variant: 'default' as const,
          onClick: () => {}
        };
      case TokenizationStatus.COMPLETED:
        return {
          label: t('property.soldOutButton'),
          disabled: true,
          variant: 'secondary' as const,
          onClick: () => {}
        };
      case TokenizationStatus.UPCOMING:
        return {
          label: t('property.registerInterestButton'),
          disabled: false,
          variant: 'outline' as const,
          onClick: () => {}
        };
      default:
        return {
          label: t('property.viewDetailsButton'),
          disabled: false,
          variant: 'default' as const,
          onClick: () => {}
        };
    }
  };
  
  const buttonState = getButtonState(property.tokenizationStatus);
  
  // Determine which name and address to use based on language
  const propertyName = currentLang === 'ko' ? property.name : property.nameEn;
  const propertyAddress = currentLang === 'ko' ? property.address : property.addressEn;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={property.imageUrl || ''} 
          alt={propertyName} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            // Fallback 이미지 설정
            e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3";
            console.log(`Image load error for: ${property.imageUrl}`);
          }}
        />
        <div className={`absolute top-4 left-4 ${statusInfo.colorClass} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {statusInfo.label}
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
          <TrendingUp className="inline-block mr-1 h-4 w-4" />
          <span className="font-inter">{t('property.expectedReturn', { value: property.expectedReturn })}%</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{propertyName}</h3>
          <div className="flex items-center text-secondary">
            <CheckCircle className="mr-1 h-4 w-4" />
            <span className="text-sm">{t('property.verified')}</span>
          </div>
        </div>
        
        <p className="text-neutral-400 text-sm mb-4">{propertyAddress}</p>
        
        <div className="flex items-center mb-6">
          <div className="text-neutral-500 font-bold text-lg font-inter">
            {formatCurrency(property.totalValue)}
          </div>
          <div className="ml-2 text-sm text-neutral-400">{t('property.totalValue')}</div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{t('property.tokenizationProgress')}</span>
            <span className="font-inter font-medium">{property.tokenizationProgress}%</span>
          </div>
          <Progress 
            value={parseFloat(property.tokenizationProgress as string)} 
            className="h-2"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
          <div className="bg-neutral-100 p-2 rounded-lg">
            <div className="text-neutral-400">{t('property.tokenPrice')}</div>
            <div className="font-medium font-inter">{formatCurrency(property.tokenPrice)}</div>
          </div>
          <div className="bg-neutral-100 p-2 rounded-lg">
            <div className="text-neutral-400">{t('property.minInvestment')}</div>
            <div className="font-medium font-inter">{formatCurrency(property.minInvestment)}</div>
          </div>
          <div className="bg-neutral-100 p-2 rounded-lg">
            <div className="text-neutral-400">
              {property.tokenizationStatus === TokenizationStatus.UPCOMING 
                ? t('property.target') 
                : t('property.investors')}
            </div>
            <div className="font-medium font-inter">{property.numInvestors}명</div>
          </div>
        </div>
        
        {/* 금융 분석 정보 카드 */}
        <div className="mb-4 border border-neutral-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-primary flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              {t('property.financialAnalysis')}
            </h4>
            <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {t('property.keyMetrics')}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">{t('property.cashReturn')}</span>
              <span className="font-semibold text-primary">8.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{t('property.capRate')}</span>
              <span className="font-semibold">5.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{t('property.occupancyRate')}</span>
              <span className="font-semibold">95.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{t('property.annualReturn')}</span>
              <span className="font-semibold text-primary">12.3%</span>
            </div>
          </div>
          
          <div className="w-full h-10 bg-neutral-50 rounded flex items-center justify-between px-2">
            <span className="text-xs text-neutral-500">{t('property.priceHistory')}</span>
            <div className="flex items-center h-full">
              {[100, 105, 112, 118, 125].map((val, i) => (
                <div key={i} className="flex flex-col items-center mx-1">
                  <div 
                    className="bg-primary h-5" 
                    style={{ 
                      width: '4px', 
                      height: `${val * 0.15}px`,
                      opacity: 0.5 + (i * 0.1)
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Link href={`/properties/${property.id}`}>
          <Button 
            className={`w-full py-3 ${
              property.tokenizationStatus === TokenizationStatus.UPCOMING 
                ? 'border-2 border-accent text-accent hover:bg-accent/5' 
                : property.tokenizationStatus === TokenizationStatus.COMPLETED 
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                  : ''
            }`}
            variant={buttonState.variant}
            disabled={buttonState.disabled}
          >
            {buttonState.label}
          </Button>
        </Link>
      </div>
    </div>
  );
}
