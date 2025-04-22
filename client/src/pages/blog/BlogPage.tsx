import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { BlogCategoryValue, BlogCategory } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<BlogCategoryValue | "ALL">("ALL");
  const { toast } = useToast();
  
  // 모든 게시물 및 추천 게시물 가져오기
  const { data: allPosts, isLoading: isLoadingAll } = useQuery({
    queryKey: ['/api/blog/posts'],
    onError: () => {
      toast({
        title: t('blog.error.title', '오류 발생'),
        description: t('blog.error.fetch', '블로그 게시물을 불러오는데 실패했습니다.'),
        variant: "destructive",
      });
    }
  });
  
  const { data: featuredPosts, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['/api/blog/featured'],
    onError: () => {
      toast({
        title: t('blog.error.title', '오류 발생'),
        description: t('blog.error.fetch', '추천 게시물을 불러오는데 실패했습니다.'),
        variant: "destructive",
      });
    }
  });
  
  // 카테고리별 게시물 필터링
  const filteredPosts = activeCategory === "ALL" 
    ? allPosts 
    : allPosts?.filter(post => post.category === activeCategory);
  
  // 카테고리 이름 번역
  const getCategoryName = (category: string) => {
    switch(i18n.language) {
      case 'ko':
        switch(category) {
          case BlogCategory.COMPANY_NEWS: return '회사 소식';
          case BlogCategory.INVESTMENT_GUIDE: return '투자 가이드';
          case BlogCategory.MARKET_ANALYSIS: return '시장 분석';
          case BlogCategory.EVENT: return '이벤트';
          case BlogCategory.CRYPTO_NEWS: return '암호화폐 뉴스';
          case BlogCategory.AVALANCHE_UPDATE: return '아발란체 업데이트';
          case BlogCategory.PROPERTY_SHOWCASE: return '추천 매물 소개';
          default: return category;
        }
      case 'ja':
        switch(category) {
          case BlogCategory.COMPANY_NEWS: return '会社ニュース';
          case BlogCategory.INVESTMENT_GUIDE: return '投資ガイド';
          case BlogCategory.MARKET_ANALYSIS: return '市場分析';
          case BlogCategory.EVENT: return 'イベント';
          case BlogCategory.CRYPTO_NEWS: return '暗号通貨ニュース';
          case BlogCategory.AVALANCHE_UPDATE: return 'アバランチェアップデート';
          case BlogCategory.PROPERTY_SHOWCASE: return '不動産紹介';
          default: return category;
        }
      default:
        switch(category) {
          case BlogCategory.COMPANY_NEWS: return 'Company News';
          case BlogCategory.INVESTMENT_GUIDE: return 'Investment Guide';
          case BlogCategory.MARKET_ANALYSIS: return 'Market Analysis';
          case BlogCategory.EVENT: return 'Events';
          case BlogCategory.CRYPTO_NEWS: return 'Crypto News';
          case BlogCategory.AVALANCHE_UPDATE: return 'Avalanche Updates';
          case BlogCategory.PROPERTY_SHOWCASE: return 'Property Showcase';
          default: return category;
        }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 블로그 헤더 */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {t('blog.title', 'SaharaRealTech 블로그')}
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          {t('blog.description', '부동산 투자, 블록체인 기술, 암호화폐 시장 및 디지털 자산에 관한 최신 정보와 인사이트를 확인하세요.')}
        </p>
      </div>
      
      {/* 추천 게시물 */}
      {isLoadingFeatured ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row h-full">
              <Skeleton className="h-48 w-full md:w-1/2 rounded-lg" />
              <div className="md:w-1/2 p-4">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-4 w-1/2 mb-1" />
              </div>
            </div>
          ))}
        </div>
      ) : featuredPosts && featuredPosts.length > 0 ? (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {t('blog.featuredPosts', '추천 게시물')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map(post => (
              <BlogPostCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </div>
      ) : null}
      
      {/* 카테고리 탭 */}
      <Tabs 
        defaultValue="ALL" 
        className="mb-8"
        onValueChange={(value) => setActiveCategory(value as BlogCategoryValue | "ALL")}
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="ALL">{t('blog.categories.all', '전체')}</TabsTrigger>
          <TabsTrigger value={BlogCategory.COMPANY_NEWS}>
            {getCategoryName(BlogCategory.COMPANY_NEWS)}
          </TabsTrigger>
          <TabsTrigger value={BlogCategory.INVESTMENT_GUIDE}>
            {getCategoryName(BlogCategory.INVESTMENT_GUIDE)}
          </TabsTrigger>
          <TabsTrigger value={BlogCategory.MARKET_ANALYSIS}>
            {getCategoryName(BlogCategory.MARKET_ANALYSIS)}
          </TabsTrigger>
          <TabsTrigger value={BlogCategory.EVENT}>
            {getCategoryName(BlogCategory.EVENT)}
          </TabsTrigger>
          <TabsTrigger value={BlogCategory.CRYPTO_UPDATE}>
            {getCategoryName(BlogCategory.CRYPTO_UPDATE)}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ALL" className="mt-0">
          <h2 className="text-xl font-bold mb-6">
            {t('blog.allPosts', '모든 게시물')}
          </h2>
        </TabsContent>
        {Object.values(BlogCategory).map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <h2 className="text-xl font-bold mb-6">
              {getCategoryName(category)}
            </h2>
          </TabsContent>
        ))}
        
        {/* 모든 게시물 목록 */}
        {isLoadingAll ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="h-48 w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-1" />
              </div>
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">
              {t('blog.noPosts', '게시물이 없습니다.')}
            </p>
          </div>
        )}
        
        {/* 더 보기 버튼 */}
        {filteredPosts && filteredPosts.length > 0 && (
          <div className="mt-10 text-center">
            <Button variant="outline">
              {t('blog.loadMore', '더 보기')}
            </Button>
          </div>
        )}
      </Tabs>
    </div>
  );
}