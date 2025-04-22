import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  Wallet, 
  Building, 
  UserCheck, 
  LineChart, 
  CheckCircle, 
  ChevronRight, 
  Key, 
  Shield, 
  BarChart3, 
  BookOpen 
} from "lucide-react";

export default function HowToInvest() {
  const { t } = useTranslation();

  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t('howToInvest.title')}
            </h1>
            <p className="text-lg text-white/90 mb-4">
              {t('howToInvest.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="guide" className="mb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="guide">{t('howToInvest.tabs.guide')}</TabsTrigger>
                <TabsTrigger value="blockchain">{t('howToInvest.tabs.blockchain')}</TabsTrigger>
                <TabsTrigger value="risks">{t('howToInvest.tabs.risks')}</TabsTrigger>
              </TabsList>

              {/* Investment Guide Tab */}
              <TabsContent value="guide">
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-4">{t('howToInvest.guide.title')}</h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                      {t('howToInvest.guide.description')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <UserCheck className="text-primary" />
                          </div>
                          <CardTitle>{t('howToInvest.guide.steps.registration.title')}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ol className="list-decimal list-inside text-neutral-600 space-y-2 pl-2">
                          <li>{t('howToInvest.guide.steps.registration.step1')}</li>
                          <li>{t('howToInvest.guide.steps.registration.step2')}</li>
                          <li>{t('howToInvest.guide.steps.registration.step3')}</li>
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <Wallet className="text-primary" />
                          </div>
                          <CardTitle>{t('howToInvest.guide.steps.wallet.title')}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ol className="list-decimal list-inside text-neutral-600 space-y-2 pl-2">
                          <li>{t('howToInvest.guide.steps.wallet.step1')}</li>
                          <li>{t('howToInvest.guide.steps.wallet.step2')}</li>
                          <li>{t('howToInvest.guide.steps.wallet.step3')}</li>
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <Building className="text-primary" />
                          </div>
                          <CardTitle>{t('howToInvest.guide.steps.investment.title')}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ol className="list-decimal list-inside text-neutral-600 space-y-2 pl-2">
                          <li>{t('howToInvest.guide.steps.investment.step1')}</li>
                          <li>{t('howToInvest.guide.steps.investment.step2')}</li>
                          <li>{t('howToInvest.guide.steps.investment.step3')}</li>
                          <li>{t('howToInvest.guide.steps.investment.step4')}</li>
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <LineChart className="text-primary" />
                          </div>
                          <CardTitle>{t('howToInvest.guide.steps.returns.title')}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ol className="list-decimal list-inside text-neutral-600 space-y-2 pl-2">
                          <li>{t('howToInvest.guide.steps.returns.step1')}</li>
                          <li>{t('howToInvest.guide.steps.returns.step2')}</li>
                          <li>{t('howToInvest.guide.steps.returns.step3')}</li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Link href="/properties">
                      <Button className="px-8 py-6 text-lg">
                        {t('howToInvest.guide.startButton')}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* Blockchain Tab */}
              <TabsContent value="blockchain">
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">{t('howToInvest.blockchain.title')}</h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                      {t('howToInvest.blockchain.description')}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      {t('howToInvest.blockchain.whatIsBlockchain.title')}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {t('howToInvest.blockchain.whatIsBlockchain.description')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t('howToInvest.blockchain.whatIsBlockchain.advantages.title1')}</h4>
                        <p className="text-sm text-neutral-500">
                          {t('howToInvest.blockchain.whatIsBlockchain.advantages.description1')}
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t('howToInvest.blockchain.whatIsBlockchain.advantages.title2')}</h4>
                        <p className="text-sm text-neutral-500">
                          {t('howToInvest.blockchain.whatIsBlockchain.advantages.description2')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Key className="mr-2 h-5 w-5 text-primary" />
                      {t('howToInvest.blockchain.avalancheProtocol.title')}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {t('howToInvest.blockchain.avalancheProtocol.description')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t('howToInvest.blockchain.avalancheProtocol.features.title1')}</h4>
                        <p className="text-sm text-neutral-500">
                          {t('howToInvest.blockchain.avalancheProtocol.features.description1')}
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t('howToInvest.blockchain.avalancheProtocol.features.title2')}</h4>
                        <p className="text-sm text-neutral-500">
                          {t('howToInvest.blockchain.avalancheProtocol.features.description2')}
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{t('howToInvest.blockchain.avalancheProtocol.features.title3')}</h4>
                        <p className="text-sm text-neutral-500">
                          {t('howToInvest.blockchain.avalancheProtocol.features.description3')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Building className="mr-2 h-5 w-5 text-primary" />
                      {t('howToInvest.blockchain.tokenization.title')}
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      {t('howToInvest.blockchain.tokenization.description')}
                    </p>
                    <div className="flex items-center justify-center p-4 bg-neutral-50 rounded-lg">
                      <div className="flex flex-col items-center text-center max-w-md">
                        <div className="bg-primary/10 p-3 rounded-full mb-3">
                          <Building className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                          {t('howToInvest.blockchain.tokenization.process.title')}
                        </h4>
                        <ol className="text-sm text-neutral-600 space-y-2 mt-2 text-left">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('howToInvest.blockchain.tokenization.process.step1')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('howToInvest.blockchain.tokenization.process.step2')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('howToInvest.blockchain.tokenization.process.step3')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('howToInvest.blockchain.tokenization.process.step4')}</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Risks Tab */}
              <TabsContent value="risks">
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">{t('howToInvest.risks.title')}</h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                      {t('howToInvest.risks.description')}
                    </p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                        {t('howToInvest.risks.marketRisks.title')}
                      </CardTitle>
                      <CardDescription>
                        {t('howToInvest.risks.marketRisks.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.marketRisks.point1')}</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.marketRisks.point2')}</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.marketRisks.point3')}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-primary" />
                        {t('howToInvest.risks.regulatoryRisks.title')}
                      </CardTitle>
                      <CardDescription>
                        {t('howToInvest.risks.regulatoryRisks.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.regulatoryRisks.point1')}</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.regulatoryRisks.point2')}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Key className="mr-2 h-5 w-5 text-primary" />
                        {t('howToInvest.risks.technicalRisks.title')}
                      </CardTitle>
                      <CardDescription>
                        {t('howToInvest.risks.technicalRisks.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.technicalRisks.point1')}</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.technicalRisks.point2')}</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{t('howToInvest.risks.technicalRisks.point3')}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{t('howToInvest.risks.education.title')}</h3>
                        <p className="text-neutral-600 mb-4">
                          {t('howToInvest.risks.education.description')}
                        </p>
                        <Link href="/properties">
                          <Button variant="outline">
                            {t('howToInvest.risks.education.button')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
