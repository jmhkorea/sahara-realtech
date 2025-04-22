import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useRoute, Link } from "wouter";
import { format } from "date-fns";
import { ko, enUS, ja } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { ArrowLeft, Calendar, User, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id ? parseInt(params.id) : 0;
  
  // 게시물 상세 정보 가져오기
  const { 
    data: post, 
    isLoading,
    isError
  } = useQuery<BlogPost>({
    queryKey: [`/api/blog/posts/${postId}`],
    enabled: !!postId,
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });
  
  // 관련 게시물 가져오기
  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: [`/api/blog/posts/${postId}/related`],
    enabled: !!postId,
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });
  
  // 현재 언어에 맞는 제목과 내용 선택
  const title = post && i18n.language === 'ko' && post.titleKo 
    ? post.titleKo 
    : post && i18n.language === 'ja' && post.titleJa
      ? post.titleJa
      : post?.title;
  
  const content = post && i18n.language === 'ko' && post.contentKo 
    ? post.contentKo 
    : post && i18n.language === 'ja' && post.contentJa
      ? post.contentJa
      : post?.content;
  
  // 날짜 포맷을 위한 지역 선택
  const dateLocale = i18n.language === 'ko' 
    ? ko 
    : i18n.language === 'ja'
      ? ja
      : enUS;
  
  const formattedDate = post?.publishedAt 
    ? format(new Date(post.publishedAt), 'PPP', { locale: dateLocale })
    : '';
  
  // 에러나 존재하지 않는 게시물 처리
  useEffect(() => {
    if (isError) {
      toast({
        title: t('blog.error.title', '오류 발생'),
        description: t('blog.error.notFound', '게시물을 찾을 수 없습니다.'),
        variant: "destructive",
      });
    }
  }, [isError, toast, t]);
  
  // 카테고리 이름 번역
  const getCategoryName = (category?: string) => {
    if (!category) return '';
    
    switch(i18n.language) {
      case 'ko':
        switch(category) {
          case 'company_news': return '회사 소식';
          case 'investment_guide': return '투자 가이드';
          case 'market_analysis': return '시장 분석';
          case 'event': return '이벤트';
          case 'crypto_news': return '암호화폐 뉴스';
          case 'avalanche_update': return '아발란체 업데이트';
          case 'property_showcase': return '추천 매물 소개';
          default: return category;
        }
      case 'ja':
        switch(category) {
          case 'company_news': return '会社ニュース';
          case 'investment_guide': return '投資ガイド';
          case 'market_analysis': return '市場分析';
          case 'event': return 'イベント';
          case 'crypto_news': return '暗号通貨ニュース';
          case 'avalanche_update': return 'アバランチェアップデート';
          case 'property_showcase': return '不動産紹介';
          default: return category;
        }
      default:
        switch(category) {
          case 'company_news': return 'Company News';
          case 'investment_guide': return 'Investment Guide';
          case 'market_analysis': return 'Market Analysis';
          case 'event': return 'Events';
          case 'crypto_news': return 'Crypto News';
          case 'avalanche_update': return 'Avalanche Updates';
          case 'property_showcase': return 'Property Showcase';
          default: return category;
        }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog', '블로그로 돌아가기')}
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="flex items-center space-x-4 mb-8">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-28" />
            </div>
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
          </>
        ) : post ? (
          <>
            {/* 게시물 헤더 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Badge>{getCategoryName(post.category)}</Badge>
                {post.featured && (
                  <Badge variant="secondary">
                    {t('blog.featured', '추천 게시물')}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-neutral-600 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{post.views} {t('blog.views', '조회')}</span>
                </div>
              </div>
            </div>
            
            {/* 게시물 이미지 */}
            {post.imageUrl && (
              <div className="mb-8">
                <img 
                  src={post.imageUrl} 
                  alt={title} 
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg"
                />
              </div>
            )}
            
            {/* 게시물 내용 */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            />
            
            {/* 게시물 태그 */}
            {post.tags && post.tags.length > 0 && (
              <div className="border-t border-b py-4 my-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* 관련 게시물 */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  {t('blog.relatedPosts', '관련 게시물')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <BlogPostCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold mb-4">
                {t('blog.postNotFound', '게시물을 찾을 수 없습니다.')}
              </h2>
              <Link href="/blog">
                <Button>
                  {t('blog.backToBlog', '블로그로 돌아가기')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}