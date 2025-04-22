import * as ethers from 'ethers';

// 아발란체 네트워크 설정
export const AVALANCHE_MAINNET = {
  chainId: '0xa86a',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/']
};

export const AVALANCHE_TESTNET = {
  chainId: '0xa869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/']
};

// 현재 네트워크 환경 (개발 중에는 테스트넷 사용)
export const CURRENT_NETWORK = AVALANCHE_TESTNET;

/**
 * 메타마스크에 아발란체 네트워크 추가
 */
export async function addAvalancheNetworkToMetamask(): Promise<boolean> {
  if (!window.ethereum) {
    console.error('MetaMask가 설치되어 있지 않습니다.');
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [CURRENT_NETWORK]
    });
    return true;
  } catch (error) {
    console.error('아발란체 네트워크 추가 실패:', error);
    return false;
  }
}

/**
 * 지갑 연결
 */
export async function connectWallet(): Promise<string | null> {
  if (!window.ethereum) {
    console.error('MetaMask가 설치되어 있지 않습니다.');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (error) {
    console.error('지갑 연결 실패:', error);
    return null;
  }
}

/**
 * 지갑 주소로 AVAX 잔액 조회
 */
export async function getAVAXBalance(address: string): Promise<string> {
  if (!window.ethereum) {
    console.error('MetaMask가 설치되어 있지 않습니다.');
    return '0';
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('잔액 조회 실패:', error);
    return '0';
  }
}

// 부동산 토큰화 스마트 컨트랙트 ABI (예시)
export const PROPERTY_TOKEN_ABI = [
  // 표준 ERC-20 함수
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  
  // 부동산 토큰 고유 함수
  'function propertyId() view returns (uint256)',
  'function propertyValue() view returns (uint256)',
  'function tokenPrice() view returns (uint256)',
  'function purchaseTokens(uint256 amount) payable',
  'function withdrawDividends() returns (bool)',
  
  // 이벤트
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event PropertyValueUpdate(uint256 oldValue, uint256 newValue)',
  'event DividendDistributed(uint256 amount, uint256 timestamp)'
];

/**
 * 부동산 토큰 컨트랙트 인스턴스 생성
 */
export function getPropertyTokenContract(contractAddress: string) {
  if (!window.ethereum) {
    console.error('MetaMask가 설치되어 있지 않습니다.');
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, PROPERTY_TOKEN_ABI, signer);
  } catch (error) {
    console.error('컨트랙트 인스턴스 생성 실패:', error);
    return null;
  }
}

/**
 * 토큰 구매
 */
export async function purchasePropertyTokens(
  contractAddress: string, 
  tokenAmount: number, 
  avaxAmount: string
): Promise<boolean> {
  try {
    const contract = getPropertyTokenContract(contractAddress);
    if (!contract) return false;

    const tx = await contract.purchaseTokens(
      ethers.utils.parseUnits(tokenAmount.toString(), 18), 
      { value: ethers.utils.parseEther(avaxAmount) }
    );
    
    await tx.wait();
    return true;
  } catch (error) {
    console.error('토큰 구매 실패:', error);
    return false;
  }
}

/**
 * 토큰 잔액 조회
 */
export async function getTokenBalance(contractAddress: string, userAddress: string): Promise<string> {
  try {
    const contract = getPropertyTokenContract(contractAddress);
    if (!contract) return '0';

    const balance = await contract.balanceOf(userAddress);
    return ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.error('토큰 잔액 조회 실패:', error);
    return '0';
  }
}

/**
 * 토큰 전송
 */
export async function transferTokens(
  contractAddress: string, 
  toAddress: string, 
  amount: string
): Promise<boolean> {
  try {
    const contract = getPropertyTokenContract(contractAddress);
    if (!contract) return false;

    const tx = await contract.transfer(
      toAddress, 
      ethers.utils.parseUnits(amount, 18)
    );
    
    await tx.wait();
    return true;
  } catch (error) {
    console.error('토큰 전송 실패:', error);
    return false;
  }
}

/**
 * 배당금 인출
 */
export async function withdrawDividends(contractAddress: string): Promise<boolean> {
  try {
    const contract = getPropertyTokenContract(contractAddress);
    if (!contract) return false;

    const tx = await contract.withdrawDividends();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('배당금 인출 실패:', error);
    return false;
  }
}

// MetaMask 인터페이스 타입 정의
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}