import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Info, Shield, Coins, Key, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function InvestmentGuide() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="w-full border-2 border-blue-300 shadow-lg mb-8 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 cursor-pointer hover:from-blue-200 hover:to-blue-300 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl text-blue-800 flex items-center gap-2 font-bold">
            <Info className="h-6 w-6 text-blue-600" /> 
            {t('investmentGuide.title')}
          </CardTitle>
          <Button variant="ghost" size="sm" className="p-1 text-blue-700 hover:text-blue-900 hover:bg-blue-100">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-4 bg-blue-50 bg-opacity-70">
          <p className="text-sm text-blue-700 mb-2 font-medium">{t('investmentGuide.subtitle')}</p>
          <div className="p-3 bg-white bg-opacity-80 border-l-4 border-blue-500 rounded-md text-blue-900 font-semibold mb-4 shadow-sm">
            <p className="text-sm">
              사하라 리얼테크는 철저한 법 규제를 준수하고 보안 감사를 통해 신뢰를 우선으로 한다
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="security-audit" className="border-emerald-200 rounded-md my-3 shadow-sm">
              <AccordionTrigger className="text-sm md:text-base font-medium bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 px-3 py-2 rounded-t-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-800 font-semibold">{t('investmentGuide.securityAudit.title')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-emerald-50 bg-opacity-50 px-3 pb-4 pt-2 rounded-b-md">
                <div className="space-y-3 text-sm">
                  <p className="text-emerald-800 font-medium">{t('investmentGuide.securityAudit.description')}</p>
                  
                  <div className="p-4 bg-white border border-emerald-200 rounded-md shadow-sm">
                    <h4 className="font-semibold text-emerald-800 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-emerald-600" />
                      {t('investmentGuide.securityAudit.certik.title')}
                    </h4>
                    <p className="text-emerald-700 mt-1">{t('investmentGuide.securityAudit.certik.description')}</p>
                  </div>
                  
                  <div className="mt-3 p-4 bg-white border border-emerald-200 rounded-md shadow-sm">
                    <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {t('investmentGuide.securityAudit.auditProcess.title')}
                    </h4>
                    <ol className="list-decimal pl-5 space-y-2 text-emerald-700">
                      <li>{t('investmentGuide.securityAudit.auditProcess.step1')}</li>
                      <li>{t('investmentGuide.securityAudit.auditProcess.step2')}</li>
                      <li>{t('investmentGuide.securityAudit.auditProcess.step3')}</li>
                      <li>{t('investmentGuide.securityAudit.auditProcess.step4')}</li>
                    </ol>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
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
          
          <div className="mt-6 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-md text-amber-800 font-medium text-sm flex items-start gap-2">
            <div className="shrink-0 mt-0.5">
              <Info className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              {t('investmentGuide.disclaimer')}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}