import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Info, Shield, Coins, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function InvestmentGuide() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full border-2 border-gray-200 shadow-md mb-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl text-gray-800 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" /> 
            {t('investmentGuide.title')}
          </CardTitle>
          <Button variant="ghost" size="sm" className="p-1">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600 mb-4">{t('investmentGuide.subtitle')}</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="token-structure">
              <AccordionTrigger className="text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-amber-600" />
                  {t('investmentGuide.tokenStructure.title')}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-amber-50 rounded-md">
                    <h4 className="font-semibold text-amber-800">{t('investmentGuide.tokenStructure.primeMasterNFT.title')}</h4>
                    <p className="text-amber-700">{t('investmentGuide.tokenStructure.primeMasterNFT.description')}</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-md">
                    <h4 className="font-semibold text-blue-800">{t('investmentGuide.tokenStructure.governanceNFT.title')}</h4>
                    <p className="text-blue-700">{t('investmentGuide.tokenStructure.governanceNFT.description')}</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-blue-700">
                      <li>{t('investmentGuide.tokenStructure.governanceNFT.classA')}</li>
                      <li>{t('investmentGuide.tokenStructure.governanceNFT.classB')}</li>
                      <li>{t('investmentGuide.tokenStructure.governanceNFT.classC')}</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-md">
                    <h4 className="font-semibold text-green-800">{t('investmentGuide.tokenStructure.projectTokens.title')}</h4>
                    <p className="text-green-700">{t('investmentGuide.tokenStructure.projectTokens.description')}</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-md">
                    <h4 className="font-semibold text-purple-800">{t('investmentGuide.tokenStructure.companyToken.title')}</h4>
                    <p className="text-purple-700">{t('investmentGuide.tokenStructure.companyToken.description')}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="avalanche-protocol">
              <AccordionTrigger className="text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-600" />
                  {t('investmentGuide.avalancheProtocol.title')}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>{t('investmentGuide.avalancheProtocol.description')}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-semibold">{t('investmentGuide.avalancheProtocol.features.speed.title')}</h4>
                      <p className="text-gray-700">{t('investmentGuide.avalancheProtocol.features.speed.description')}</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-semibold">{t('investmentGuide.avalancheProtocol.features.fees.title')}</h4>
                      <p className="text-gray-700">{t('investmentGuide.avalancheProtocol.features.fees.description')}</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-semibold">{t('investmentGuide.avalancheProtocol.features.eco.title')}</h4>
                      <p className="text-gray-700">{t('investmentGuide.avalancheProtocol.features.eco.description')}</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="investment-process">
              <AccordionTrigger className="text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-green-600" />
                  {t('investmentGuide.investmentProcess.title')}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <span className="font-medium">{t('investmentGuide.investmentProcess.step1.title')}</span>
                      <p className="text-gray-700">{t('investmentGuide.investmentProcess.step1.description')}</p>
                    </li>
                    <li>
                      <span className="font-medium">{t('investmentGuide.investmentProcess.step2.title')}</span>
                      <p className="text-gray-700">{t('investmentGuide.investmentProcess.step2.description')}</p>
                    </li>
                    <li>
                      <span className="font-medium">{t('investmentGuide.investmentProcess.step3.title')}</span>
                      <p className="text-gray-700">{t('investmentGuide.investmentProcess.step3.description')}</p>
                    </li>
                    <li>
                      <span className="font-medium">{t('investmentGuide.investmentProcess.step4.title')}</span>
                      <p className="text-gray-700">{t('investmentGuide.investmentProcess.step4.description')}</p>
                    </li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-4 text-xs text-gray-500">
            {t('investmentGuide.disclaimer')}
          </div>
        </CardContent>
      )}
    </Card>
  );
}