import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { 
  Building,
  ShieldCheck,
  PieChart,
  Zap,
  Wallet,
  Leaf,
  CheckSquare,
  ArrowRightLeft,
  Coins
} from "lucide-react";

interface TransactionDisplay {
  id: number;
  icon: string;
  title: string;
  hash: string;
  amount: string;
  timeAgo: string;
}

export default function BlockchainDetails() {
  const { t } = useTranslation();
  
  const { data: recentTransactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions/recent'],
  });
  
  const [displayTransactions, setDisplayTransactions] = useState<TransactionDisplay[]>([]);
  
  useEffect(() => {
    if (recentTransactions && recentTransactions.length > 0) {
      const formatted = recentTransactions.map(tx => {
        const getIconType = (txType: string) => {
          switch (txType) {
            case 'buy': return 'check';
            case 'sell': return 'swap';
            case 'dividend': return 'coins';
            default: return 'check';
          }
        };
        
        const getTitle = (txType: string, propertyId: number) => {
          switch (txType) {
            case 'buy': return t('transactions.buy', { propertyId });
            case 'sell': return t('transactions.sell', { propertyId });
            case 'dividend': return t('transactions.dividend');
            default: return t('transactions.unknown');
          }
        };
        
        const formatTimeAgo = (timestamp: Date) => {
          const now = new Date();
          const txDate = new Date(timestamp);
          const diffMs = now.getTime() - txDate.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          
          if (diffMins < 60) {
            return t('time.minutesAgo', { count: diffMins });
          } else if (diffMins < 1440) {
            return t('time.hoursAgo', { count: Math.floor(diffMins / 60) });
          } else {
            return t('time.daysAgo', { count: Math.floor(diffMins / 1440) });
          }
        };
        
        return {
          id: tx.id,
          icon: getIconType(tx.transactionType),
          title: getTitle(tx.transactionType, tx.propertyId),
          hash: tx.transactionHash || '0x0000...0000',
          amount: tx.transactionType === 'dividend' 
            ? `+${tx.amount}% ${t('transactions.yield')}` 
            : `${tx.tokenCount} ${t('transactions.tokens')}`,
          timeAgo: formatTimeAgo(tx.timestamp)
        };
      });
      
      setDisplayTransactions(formatted);
    }
  }, [recentTransactions, t]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('blockchain.title')}
          </h2>
          <p className="text-neutral-400">
            {t('blockchain.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl bg-neutral-100 p-8 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('blockchain.features.tokenization.title')}</h3>
            <p className="text-neutral-400">{t('blockchain.features.tokenization.description')}</p>
          </div>
          
          <div className="rounded-xl bg-neutral-100 p-8 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('blockchain.features.security.title')}</h3>
            <p className="text-neutral-400">{t('blockchain.features.security.description')}</p>
          </div>
          
          <div className="rounded-xl bg-neutral-100 p-8 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('blockchain.features.liquidity.title')}</h3>
            <p className="text-neutral-400">{t('blockchain.features.liquidity.description')}</p>
          </div>
        </div>
        
        <div className="mt-16 bg-neutral-900 rounded-xl overflow-hidden shadow-xl">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  {t('blockchain.avalanche.title')}
                </h3>
                <p className="text-neutral-300 mb-6">
                  {t('blockchain.avalanche.description')}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-white">
                    <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Zap className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('blockchain.avalanche.features.speed.title')}</h4>
                      <p className="text-neutral-400 text-sm">{t('blockchain.avalanche.features.speed.description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white">
                    <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Wallet className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('blockchain.avalanche.features.fees.title')}</h4>
                      <p className="text-neutral-400 text-sm">{t('blockchain.avalanche.features.fees.description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white">
                    <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Leaf className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('blockchain.avalanche.features.eco.title')}</h4>
                      <p className="text-neutral-400 text-sm">{t('blockchain.avalanche.features.eco.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-medium">{t('blockchain.recentTransactions')}</h4>
                  <a href="#" className="text-primary text-sm">{t('blockchain.viewAllTransactions')}</a>
                </div>
                
                <div className="space-y-4">
                  {isLoading ? (
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="bg-neutral-700 rounded-lg p-3 flex items-center justify-between animate-pulse">
                        <div className="flex items-center">
                          <div className="bg-neutral-600 w-8 h-8 rounded-full mr-3"></div>
                          <div>
                            <div className="bg-neutral-600 h-4 w-32 rounded"></div>
                            <div className="bg-neutral-600 h-3 w-20 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-neutral-600 h-4 w-16 rounded"></div>
                          <div className="bg-neutral-600 h-3 w-12 rounded mt-1"></div>
                        </div>
                      </div>
                    ))
                  ) : displayTransactions.length > 0 ? (
                    displayTransactions.map((tx) => {
                      let IconComponent;
                      let iconBgClass;
                      
                      switch (tx.icon) {
                        case 'check':
                          IconComponent = CheckSquare;
                          iconBgClass = 'bg-green-500/20 text-green-400';
                          break;
                        case 'swap':
                          IconComponent = ArrowRightLeft;
                          iconBgClass = 'bg-blue-500/20 text-blue-400';
                          break;
                        case 'coins':
                          IconComponent = Coins;
                          iconBgClass = 'bg-purple-500/20 text-purple-400';
                          break;
                        default:
                          IconComponent = CheckSquare;
                          iconBgClass = 'bg-green-500/20 text-green-400';
                      }
                      
                      return (
                        <div key={tx.id} className="bg-neutral-700 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`${iconBgClass} w-8 h-8 rounded-full flex items-center justify-center mr-3`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-white text-sm">{tx.title}</div>
                              <div className="text-neutral-400 text-xs font-inter">{tx.hash}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={tx.icon === 'coins' ? 'text-secondary font-inter' : 'text-white font-inter'}>
                              {tx.amount}
                            </div>
                            <div className="text-neutral-400 text-xs">{tx.timeAgo}</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-neutral-700 rounded-lg p-4 text-center text-neutral-300">
                      {t('blockchain.noTransactions')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
