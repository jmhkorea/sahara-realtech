import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { KimiyiAIProvider } from "@/contexts/KimiyiAIContext";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import PropertyList from "@/pages/PropertyList";
import PropertyDetail from "@/pages/PropertyDetail";
import TokenProjectDetail from "@/pages/TokenProjectDetail";
import HowToInvest from "@/pages/HowToInvest";
import Portfolio from "@/pages/Portfolio";
import TeamPage from "@/pages/TeamPage";
import BlogPage from "@/pages/blog/BlogPage";
import BlogPostPage from "@/pages/blog/BlogPostPage";
import BlogPostForm from "@/pages/blog/BlogPostForm";
import AdminPage from "@/pages/AdminPage";
import LaosProjectDetail from "@/pages/LaosProjectDetail";
import RealEstateTokenization from "@/pages/RealEstateTokenization";
import SecureTransactions from "@/pages/SecureTransactions";
import LiquidityEnhancement from "@/pages/LiquidityEnhancement";
import Feedback from "@/pages/Feedback";
import DevOpsPage from "@/pages/DevOpsPage";

import RealWorldAssetsGuide from "@/pages/RealWorldAssetsGuide";
import RwaLiquidation from "@/pages/RwaLiquidation";
import GlobalCaseStudies from "@/pages/GlobalCaseStudies";
import TokenSecuritiesGuide from "@/pages/TokenSecuritiesGuide";
import AvalancheTech from "@/pages/AvalancheTech";
import CompanyIntroduction from "@/pages/CompanyIntroduction";
import TeamWorkspace from "@/pages/TeamWorkspace";
import InvestmentProcessPage from "@/pages/InvestmentProcessPage";
import SystemAuthPage from "@/pages/SystemAuthPage";
import ChatWidget from "@/components/ui/ChatWidget";

import "./lib/i18n";

// 클라이언트 사이드 라우팅 시 발생하는 히스토리 관련 이슈 대응을 위한 래퍼 컴포넌트
const RouteWithHeaderAndFooter = ({ component: Component, ...rest }: { component: React.ComponentType<any>, [key: string]: any }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...rest} />
      </main>
      <Footer />
      {/* <ChatWidget /> */}
    </div>
  );
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <RouteWithHeaderAndFooter component={Home} />} />
      <Route path="/properties" component={() => <RouteWithHeaderAndFooter component={PropertyList} />} />
      <Route path="/properties/:id" component={(params) => <RouteWithHeaderAndFooter component={PropertyDetail} params={params} />} />
      <Route path="/token-project" component={() => <RouteWithHeaderAndFooter component={TokenProjectDetail} />} />
      <Route path="/how-to-invest" component={() => <RouteWithHeaderAndFooter component={HowToInvest} />} />
      <Route path="/portfolio" component={() => <RouteWithHeaderAndFooter component={Portfolio} />} />
      <Route path="/blog" component={() => <RouteWithHeaderAndFooter component={BlogPage} />} />
      <Route path="/blog/new" component={() => <RouteWithHeaderAndFooter component={BlogPostForm} />} />
      <Route path="/blog/:id" component={(params) => <RouteWithHeaderAndFooter component={BlogPostPage} params={params} />} />
      <Route path="/team" component={() => <RouteWithHeaderAndFooter component={TeamPage} />} />
      <Route path="/admin" component={() => <RouteWithHeaderAndFooter component={AdminPage} />} />
      <Route path="/projects/laos-vientiane" component={() => <RouteWithHeaderAndFooter component={LaosProjectDetail} />} />
      <Route path="/real-estate-tokenization" component={() => <RouteWithHeaderAndFooter component={RealEstateTokenization} />} />
      <Route path="/secure-transactions" component={() => <RouteWithHeaderAndFooter component={SecureTransactions} />} />
      <Route path="/liquidity-enhancement" component={() => <RouteWithHeaderAndFooter component={LiquidityEnhancement} />} />
      <Route path="/feedback" component={() => <RouteWithHeaderAndFooter component={Feedback} />} />

      <Route path="/real-world-assets-guide" component={() => <RouteWithHeaderAndFooter component={RealWorldAssetsGuide} />} />
      <Route path="/global-case-studies" component={() => <RouteWithHeaderAndFooter component={GlobalCaseStudies} />} />
      <Route path="/rwa-liquidation" component={() => <RouteWithHeaderAndFooter component={RwaLiquidation} />} />
      <Route path="/token-securities-guide" component={() => <RouteWithHeaderAndFooter component={TokenSecuritiesGuide} />} />
      <Route path="/avalanche-tech" component={() => <RouteWithHeaderAndFooter component={AvalancheTech} />} />
      <Route path="/company-introduction" component={() => <RouteWithHeaderAndFooter component={CompanyIntroduction} />} />
      <Route path="/team-workspace" component={() => <RouteWithHeaderAndFooter component={TeamWorkspace} />} />
      <Route path="/investment-process" component={() => <RouteWithHeaderAndFooter component={InvestmentProcessPage} />} />
      <Route path="/system-auth" component={() => <RouteWithHeaderAndFooter component={SystemAuthPage} />} />
      <Route path="/devops" component={() => <RouteWithHeaderAndFooter component={DevOpsPage} />} />
      <Route component={() => <RouteWithHeaderAndFooter component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <KimiyiAIProvider>
          <Toaster />
          <Router />
        </KimiyiAIProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
