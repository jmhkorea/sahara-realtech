import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Property } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, ArrowRight } from 'lucide-react';

interface InvestmentCardProps {
  property: Property;
  onInvest: () => void;
}

export default function InvestmentCard({ property, onInvest }: InvestmentCardProps) {
  const { t } = useTranslation();
  const [tokenAmount, setTokenAmount] = useState<number>(1);
  const [investmentAmount, setInvestmentAmount] = useState<number>(parseInt(property.tokenPrice));

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

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    if (!isNaN(amount) && amount > 0) {
      setTokenAmount(amount);
      setInvestmentAmount(amount * parseInt(property.tokenPrice));
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-md h-full">
      <CardHeader className="bg-blue-500 text-white rounded-t-xl">
        <CardTitle className="text-2xl font-bold text-center">
          {t('property.investNow')}
        </CardTitle>
        <p className="text-sm text-center text-blue-100 mt-2">
          {t('property.investDesc', {
            propertyName: property.name
          })}
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-blue-600 mb-3 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              {t('property.tokenSupply')}
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{t('property.tokenPrice')}:</span>
              <span className="font-medium">₩ {parseInt(property.tokenPrice).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{t('property.expectedAnnualReturn')}:</span>
              <span className="font-medium text-green-600">{property.expectedReturn}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{t('property.expectedYearlyReturn')}:</span>
              <span className="font-medium text-green-600">₩ {Math.round(parseInt(property.tokenPrice) * (parseFloat(property.expectedReturn) / 100)).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('property.tokenAmount')}:
              </label>
              <Input
                type="number"
                min="1"
                value={tokenAmount}
                onChange={handleTokenAmountChange}
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">{t('property.investmentAmount')}:</h4>
              <div className="text-xl font-bold text-blue-700">
                {formatCurrency(investmentAmount)}
              </div>
            </div>
            
            <Button 
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              onClick={onInvest}
            >
              {t('property.investNow')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            {t('property.investmentDisclaimer')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}