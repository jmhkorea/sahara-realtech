import { ethers } from 'ethers';

// Avalanche Mainnet & Testnet configurations
const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/']
};

const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Fuji Testnet',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/']
};

// Sample smart contract ABI for property tokenization
// In a real implementation, this would be the actual ABI of the deployed contract
const PropertyTokenABI = [
  // Basic ERC20 functions
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  // Property specific functions
  'function propertyDetails() view returns (string name, string location, uint256 totalValue, uint256 tokenPrice, uint256 expectedReturn)',
  'function buyTokens(uint256 amount) payable',
  'function tokenizationProgress() view returns (uint256)',
  'function getInvestors() view returns (address[])',
  'function withdrawDividends() returns (uint256)',
  // Events
  'event TokensPurchased(address indexed buyer, uint256 amount, uint256 value)',
  'event DividendDistributed(address indexed investor, uint256 amount, uint256 timestamp)'
];

// Interface for connecting to the Avalanche blockchain
export interface AvalancheConnector {
  connectWallet(): Promise<string>;
  disconnectWallet(): void;
  getWalletAddress(): string | null;
  isWalletConnected(): boolean;
  isCorrectNetwork(): Promise<boolean>;
  switchToAvalancheNetwork(): Promise<boolean>;
  getPropertyTokenContract(contractAddress: string): ethers.Contract | null;
  getTokenBalance(contractAddress: string): Promise<string>;
  buyPropertyTokens(contractAddress: string, amount: string, value: string): Promise<ethers.TransactionResponse>;
  getPropertyDetails(contractAddress: string): Promise<any>;
}

export class AvalancheService implements AvalancheConnector {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private address: string | null = null;
  private isTestnet: boolean;

  constructor(isTestnet = false) {
    this.isTestnet = isTestnet;
  }

  // Connect wallet and get user's address
  async connectWallet(): Promise<string> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Metamask is not installed. Please install Metamask to use this feature.');
    }

    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request account access
      const accounts = await this.provider.send('eth_requestAccounts', []);
      
      this.signer = this.provider.getSigner();
      this.address = accounts[0];
      
      // Check if connected to the correct network
      const isCorrect = await this.isCorrectNetwork();
      if (!isCorrect) {
        await this.switchToAvalancheNetwork();
      }
      
      return this.address;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  // Disconnect wallet
  disconnectWallet(): void {
    this.provider = null;
    this.signer = null;
    this.address = null;
  }

  // Get connected wallet address
  getWalletAddress(): string | null {
    return this.address;
  }

  // Check if wallet is connected
  isWalletConnected(): boolean {
    return this.provider !== null && this.signer !== null && this.address !== null;
  }

  // Check if connected to Avalanche network
  async isCorrectNetwork(): Promise<boolean> {
    if (!this.provider) return false;
    
    const network = await this.provider.getNetwork();
    const requiredChainId = this.isTestnet ? 
      parseInt(AVALANCHE_TESTNET_PARAMS.chainId, 16) : 
      parseInt(AVALANCHE_MAINNET_PARAMS.chainId, 16);
    
    return network.chainId === requiredChainId;
  }

  // Switch to Avalanche network
  async switchToAvalancheNetwork(): Promise<boolean> {
    if (!this.provider) return false;
    
    const networkParams = this.isTestnet ? AVALANCHE_TESTNET_PARAMS : AVALANCHE_MAINNET_PARAMS;
    
    try {
      // Try to switch to the network
      await this.provider.send(
        'wallet_switchEthereumChain',
        [{ chainId: networkParams.chainId }]
      );
      return true;
    } catch (switchError: any) {
      // If the network is not added to MetaMask, add it
      if (switchError.code === 4902) {
        try {
          await this.provider.send(
            'wallet_addEthereumChain',
            [networkParams]
          );
          return true;
        } catch (addError) {
          console.error('Failed to add Avalanche network:', addError);
          return false;
        }
      }
      console.error('Failed to switch to Avalanche network:', switchError);
      return false;
    }
  }

  // Get a property token contract instance
  getPropertyTokenContract(contractAddress: string): ethers.Contract | null {
    if (!this.signer) return null;
    
    return new ethers.Contract(
      contractAddress,
      PropertyTokenABI,
      this.signer
    );
  }

  // Get token balance for a property
  async getTokenBalance(contractAddress: string): Promise<string> {
    if (!this.address || !this.signer) return '0';
    
    const contract = this.getPropertyTokenContract(contractAddress);
    if (!contract) return '0';
    
    try {
      const balance = await contract.balanceOf(this.address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get token balance:', error);
      return '0';
    }
  }

  // Buy property tokens
  async buyPropertyTokens(
    contractAddress: string, 
    amount: string, 
    value: string
  ): Promise<ethers.TransactionResponse> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }
    
    const contract = this.getPropertyTokenContract(contractAddress);
    if (!contract) {
      throw new Error('Failed to get contract');
    }
    
    const tx = await contract.buyTokens(
      ethers.utils.parseEther(amount),
      { value: ethers.utils.parseEther(value) }
    );
    
    return tx;
  }

  // Get property details from smart contract
  async getPropertyDetails(contractAddress: string): Promise<any> {
    if (!this.provider) {
      throw new Error('Provider not available');
    }
    
    const contract = this.getPropertyTokenContract(contractAddress);
    if (!contract) {
      throw new Error('Failed to get contract');
    }
    
    try {
      const details = await contract.propertyDetails();
      const progress = await contract.tokenizationProgress();
      const supply = await contract.totalSupply();
      
      return {
        name: details.name,
        location: details.location,
        totalValue: ethers.utils.formatEther(details.totalValue),
        tokenPrice: ethers.utils.formatEther(details.tokenPrice),
        expectedReturn: details.expectedReturn.toString(),
        tokenizationProgress: ethers.utils.formatUnits(progress, 2),
        totalSupply: ethers.utils.formatEther(supply)
      };
    } catch (error) {
      console.error('Failed to get property details:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const avalancheService = new AvalancheService();

// Add Ethereum provider type to window object
declare global {
  interface Window {
    ethereum: any;
  }
}
