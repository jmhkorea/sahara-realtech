import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { connectWallet, getAVAXBalance, addAvalancheNetworkToMetamask } from '@/lib/blockchain';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Wallet, 
  ChevronDown, 
  Copy, 
  LogOut,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

export default function WalletConnect() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('0');
  const [isConnecting, setIsConnecting] = useState(false);

  // 지갑 연결 확인 및 리스너 등록
  useEffect(() => {
    // 초기 연결 확인
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

    // 계정 변경 이벤트 리스너
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // 연결 해제됨
        setWalletAddress(null);
        setWalletBalance('0');
      } else {
        // 계정 변경됨
        setWalletAddress(accounts[0]);
        updateBalance(accounts[0]);
      }
    };

    // 체인 변경 이벤트 리스너
    const handleChainChanged = (chainId: string) => {
      // 체인이 변경되면 페이지 새로고침 (MetaMask 권장사항)
      window.location.reload();
    };

    // 이벤트 리스너 등록
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // 잔액 업데이트
  const updateBalance = async (address: string) => {
    try {
      const balance = await getAVAXBalance(address);
      setWalletBalance(balance);
    } catch (error) {
      console.error('잔액 조회 실패:', error);
    }
  };

  // 지갑 연결
  const handleConnectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      // 아발란체 네트워크가 없으면 추가 시도
      await addAvalancheNetworkToMetamask();
      
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
        description: typeof error === 'string' ? error : t('wallet.connectErrorDesc'),
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // 지갑 연결 해제
  const handleDisconnectWallet = () => {
    // MetaMask는 프로그래매틱 연결 해제를 지원하지 않음
    // 대신 상태만 초기화
    setWalletAddress(null);
    setWalletBalance('0');
    toast({
      title: t('wallet.disconnected'),
      description: t('wallet.disconnectedDesc'),
    });
  };

  // 주소 복사
  const copyAddressToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: t('wallet.addressCopied'),
        description: t('wallet.addressCopiedDesc'),
      });
    }
  };

  // 주소 단축 표시
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // 익스플로러에서 주소 보기
  const viewAddressInExplorer = () => {
    if (walletAddress) {
      // AVALANCHE_TESTNET에서 blockExplorerUrls를 가져옴
      import { AVALANCHE_TESTNET } from '@/lib/blockchain';
      const explorerUrl = `${AVALANCHE_TESTNET.blockExplorerUrls[0]}/address/${walletAddress}`;
      window.open(explorerUrl, '_blank');
    }
  };

  if (!walletAddress) {
    return (
      <Button
        onClick={handleConnectWallet}
        variant="outline"
        size="sm"
        disabled={isConnecting}
        className="flex items-center"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? t('wallet.connecting') : t('wallet.connect')}
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <div className="flex items-center">
            <span className="inline-block bg-green-500 rounded-full w-2 h-2 mr-2"></span>
            <span>{shortenAddress(walletAddress)}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">{t('wallet.walletAddress')}</h4>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={copyAddressToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground break-all mb-4">{walletAddress}</p>
          
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm">{t('wallet.balance')}</h4>
              <div className="flex items-center">
                <p className="text-lg font-bold">{parseFloat(walletBalance).toFixed(4)}</p>
                <span className="ml-1 text-sm">AVAX</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-1"
                  onClick={() => updateBalance(walletAddress)}
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm" 
            onClick={viewAddressInExplorer}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {t('wallet.viewInExplorer')}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50" 
            onClick={handleDisconnectWallet}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('wallet.disconnect')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}