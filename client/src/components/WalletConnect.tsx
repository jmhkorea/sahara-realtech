import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, AlertTriangle } from 'lucide-react';
import { addAvalancheNetworkToMetamask, connectWallet, getAVAXBalance } from '@/lib/blockchain';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export default function WalletConnect() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  useEffect(() => {
    checkIfMetaMaskIsInstalled();
    checkIfWalletIsConnected();
  }, []);

  const checkIfMetaMaskIsInstalled = () => {
    const isInstalled = typeof window.ethereum !== 'undefined';
    setIsMetaMaskInstalled(isInstalled);
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        fetchBalance(accounts[0]);
      }
    } catch (error) {
      console.error('지갑 연결 상태 확인 실패:', error);
    }
  };

  const fetchBalance = async (walletAddress: string) => {
    const avaxBalance = await getAVAXBalance(walletAddress);
    setBalance(parseFloat(avaxBalance).toFixed(4));
  };

  const handleConnectWallet = async () => {
    setLoading(true);
    try {
      const connectedAddress = await connectWallet();
      if (connectedAddress) {
        setAddress(connectedAddress);
        fetchBalance(connectedAddress);
        
        // API를 통해 사용자 지갑 주소 업데이트
        updateUserWalletAddress(connectedAddress);
        
        toast({
          title: t('wallet.connectSuccess'),
          description: t('wallet.connectSuccessDesc'),
        });
      }
    } catch (error) {
      console.error('지갑 연결 실패:', error);
      toast({
        variant: 'destructive',
        title: t('wallet.connectError'),
        description: t('wallet.connectErrorDesc'),
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserWalletAddress = async (walletAddress: string) => {
    try {
      // 현재는 userId를 1로 하드코딩했지만, 실제로는 로그인한 사용자의 ID를 사용해야 함
      const userId = 1;
      
      const response = await fetch(`/api/users/${userId}/wallet`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });
      
      if (!response.ok) {
        throw new Error('지갑 주소 업데이트 실패');
      }
    } catch (error) {
      console.error('사용자 지갑 주소 업데이트 실패:', error);
    }
  };

  const handleAddAvalancheNetwork = async () => {
    try {
      const success = await addAvalancheNetworkToMetamask();
      if (success) {
        toast({
          title: t('wallet.networkAddSuccess'),
          description: t('wallet.networkAddSuccessDesc'),
        });
      }
    } catch (error) {
      console.error('아발란체 네트워크 추가 실패:', error);
      toast({
        variant: 'destructive',
        title: t('wallet.networkAddError'),
        description: t('wallet.networkAddErrorDesc'),
      });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t('wallet.metamaskRequired')}</AlertTitle>
        <AlertDescription>
          <p className="mb-2">{t('wallet.metamaskRequiredDesc')}</p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {t('wallet.installMetamask')}
          </a>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      {!address ? (
        <Button 
          variant="outline" 
          size="sm" 
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleConnectWallet}
          disabled={loading}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {loading ? t('wallet.connecting') : t('wallet.connect')}
        </Button>
      ) : (
        <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
          <Wallet className="h-4 w-4" />
          <span className="font-medium">{formatAddress(address)}</span>
          <span className="text-muted-foreground">
            {balance} AVAX
          </span>
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleAddAvalancheNetwork}
        className="text-xs"
      >
        {t('wallet.addAvalancheNetwork')}
      </Button>
    </div>
  );
}