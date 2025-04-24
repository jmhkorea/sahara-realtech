import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  CircleDollarSign, 
  Wallet, 
  CreditCard, 
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import { Property } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { connectWallet, getAVAXBalance, purchasePropertyTokens } from '@/lib/blockchain';
// React 훅 오류를 일으키는 Tooltip 제거

interface TokenPurchaseModalProps {
  property: Property;
  onPurchaseSuccess?: () => void;
}

export default function TokenPurchaseModal({ property, onPurchaseSuccess }: TokenPurchaseModalProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('0');
  const [tokenAmount, setTokenAmount] = useState<number>(property ? parseInt(property.minInvestment) / parseInt(property.tokenPrice) : 0);
  const [investmentAmount, setInvestmentAmount] = useState<string>(property?.minInvestment || '0');
  const [isLoading, setIsLoading] = useState(false);

  // 지갑 연결 확인 및 잔액 업데이트
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            updateBalance(accounts[0]);
          }
        } catch (error) {
          console.error('지갑 연결 확인 실패:', error);
        }
      }
    };

    checkWalletConnection();
  }, [isOpen]);

  // 잔액 업데이트
  const updateBalance = async (address: string) => {
    const balance = await getAVAXBalance(address);
    setWalletBalance(balance);
  };

  // 지갑 연결
  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address);
        updateBalance(address);
        toast({
          title: t('wallet.connectSuccess'),
          description: t('wallet.walletConnected'),
        });
      }
    } catch (error) {
      console.error('지갑 연결 실패:', error);
      toast({
        variant: 'destructive',
        title: t('wallet.connectError'),
        description: t('wallet.connectErrorDesc'),
      });
    }
  };

  // 토큰 금액 변경 시 투자 금액도 업데이트
  const handleTokenAmountChange = (value: number) => {
    setTokenAmount(value);
    setInvestmentAmount((value * parseInt(property.tokenPrice)).toString());
  };

  // 투자 금액 변경 시 토큰 금액도 업데이트
  const handleInvestmentAmountChange = (value: string) => {
    const amount = parseInt(value) || 0;
    setInvestmentAmount(value);
    setTokenAmount(amount / parseInt(property.tokenPrice));
  };

  // 토큰 구매
  const handlePurchaseTokens = async () => {
    if (!walletAddress) {
      toast({
        variant: 'destructive',
        title: t('wallet.notConnected'),
        description: t('wallet.pleaseConnectWallet'),
      });
      return;
    }

    setIsLoading(true);
    try {
      // 실제 프로덕션에서는 실제 컨트랙트 주소를 사용해야 함
      // 현재는 샘플 주소 사용
      const contractAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
      
      // AVAX 금액 계산 (예: 1 AVAX = 30,000원으로 가정)
      const avaxPrice = 30000; // 1 AVAX의 원화 가격
      const avaxAmount = (parseInt(investmentAmount) / avaxPrice).toFixed(6);
      
      toast({
        title: t('transaction.processing'),
        description: t('transaction.pleaseConfirmInWallet'),
      });

      // 토큰 구매는 실제 컨트랙트 함수를 호출해야 하지만, 
      // 여기서는 데모용으로 가상 처리
      // const success = await purchasePropertyTokens(contractAddress, tokenAmount, avaxAmount);
      
      // 데모용으로 성공했다고 가정
      const success = true;
      
      if (success) {
        // API를 통해 투자 기록 저장
        const userId = 1; // 현재는 하드코딩, 실제로는 로그인한 사용자 ID 사용
        const response = await fetch('/api/investments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            propertyId: property.id,
            amount: investmentAmount,
            tokenCount: tokenAmount.toString(),
          }),
        });

        if (response.ok) {
          toast({
            title: t('transaction.success'),
            description: t('transaction.tokenPurchased', { amount: tokenAmount }),
          });
          
          if (onPurchaseSuccess) {
            onPurchaseSuccess();
          }
          
          setIsOpen(false);
        } else {
          throw new Error('서버에 투자 기록 저장 실패');
        }
      } else {
        throw new Error('토큰 구매 실패');
      }
    } catch (error) {
      console.error('토큰 구매 오류:', error);
      toast({
        variant: 'destructive',
        title: t('transaction.failed'),
        description: t('transaction.failedDesc'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const minTokens = property ? Math.ceil(parseInt(property.minInvestment) / parseInt(property.tokenPrice)) : 1;
  const maxTokens = 100; // 최대 구매 가능 토큰 설정 (실제로는 토큰 재고나 사용자 제한에 따라 달라질 수 있음)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center my-4">
          <Button className="w-4/5 text-xl py-8 font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg rounded-xl">
            {t('property.investNow')}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('property.investIn')} {property.name}</DialogTitle>
          <DialogDescription>
            {t('property.tokenizeDesc')}
          </DialogDescription>
        </DialogHeader>
        
        {!walletAddress ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('wallet.connectWalletToContinue')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('wallet.needWalletDesc')}
            </p>
            <Button onClick={handleConnectWallet}>
              <Wallet className="mr-2 h-4 w-4" />
              {t('wallet.connectWallet')}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('wallet.connectedAs')}</p>
                  <p className="text-xs text-muted-foreground">{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{t('wallet.balance')}</p>
                  <p className="text-xs text-muted-foreground">{parseFloat(walletBalance).toFixed(4)} AVAX</p>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="token-amount" className="flex items-center">
                  {t('property.tokenAmount')}
                  <span className="inline-flex ml-1" title={t('property.tokenPriceInfo', { price: property.tokenPrice })}>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[tokenAmount]}
                    min={minTokens}
                    max={maxTokens}
                    step={1}
                    onValueChange={([value]) => handleTokenAmountChange(value)}
                  />
                  <Input
                    id="token-amount"
                    type="number"
                    value={tokenAmount}
                    onChange={(e) => handleTokenAmountChange(Number(e.target.value))}
                    className="w-20"
                    min={minTokens}
                    max={maxTokens}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="investment-amount">{t('property.investmentAmount')}</Label>
                <div className="flex items-center">
                  <Input
                    id="investment-amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => handleInvestmentAmountChange(e.target.value)}
                    min={property.minInvestment}
                    className="rounded-r-none"
                  />
                  <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-sm text-muted-foreground">
                    KRW
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('property.minInvestmentInfo', { min: parseInt(property.minInvestment).toLocaleString() })}
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{t('property.tokenPrice')}:</span>
                  <span className="font-medium">{parseInt(property.tokenPrice).toLocaleString()} KRW</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{t('property.tokenAmount')}:</span>
                  <span className="font-medium">{tokenAmount} 토큰</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('property.totalInvestment')}:</span>
                    <span className="font-bold">{parseInt(investmentAmount).toLocaleString()} KRW</span>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button 
                onClick={handlePurchaseTokens}
                disabled={isLoading || tokenAmount < minTokens}
              >
                {isLoading ? t('common.processing') : t('property.confirmInvestment')}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}