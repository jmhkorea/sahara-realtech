import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
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
import TokenSecuritiesGuide from "@/pages/TokenSecuritiesGuide";
import RealWorldAssetsGuide from "@/pages/RealWorldAssetsGuide";
import ChatWidget from "@/components/ui/ChatWidget";

import "./lib/i18n";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/properties" component={PropertyList} />
          <Route path="/properties/:id" component={PropertyDetail} />
          <Route path="/token-project" component={TokenProjectDetail} />
          <Route path="/how-to-invest" component={HowToInvest} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/new" component={BlogPostForm} />
          <Route path="/blog/:id" component={BlogPostPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/projects/laos-vientiane" component={LaosProjectDetail} />
          <Route path="/real-estate-tokenization" component={RealEstateTokenization} />
          <Route path="/secure-transactions" component={SecureTransactions} />
          <Route path="/liquidity-enhancement" component={LiquidityEnhancement} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/token-securities-guide" component={TokenSecuritiesGuide} />
          <Route path="/real-world-assets-guide" component={RealWorldAssetsGuide} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
