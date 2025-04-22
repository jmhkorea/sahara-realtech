import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { ko, enUS, ja } from "date-fns/locale";
import { BlogPost } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const { i18n, t } = useTranslation();
  
  // 현재 언어에 맞는 제목과 요약 선택
  const title = i18n.language === 'ko' && post.titleKo 
    ? post.titleKo 
    : i18n.language === 'ja' && post.titleJa
      ? post.titleJa
      : post.title;
  
  const summary = i18n.language === 'ko' && post.summaryKo 
    ? post.summaryKo 
    : i18n.language === 'ja' && post.summaryJa
      ? post.summaryJa
      : post.summary;
  
  // 날짜 포맷을 위한 지역 선택
  const dateLocale = i18n.language === 'ko' 
    ? ko 
    : i18n.language === 'ja'
      ? ja
      : enUS;
  
  const formattedDate = post.publishedAt 
    ? formatDistanceToNow(new Date(post.publishedAt), { 
        addSuffix: true,
        locale: dateLocale
      })
    : '';
  
  return (
    <Link href={`/blog/${post.id}`}>
      <Card className={`cursor-pointer transition-all duration-300 hover:shadow-md ${featured ? 'md:flex h-full' : ''}`}>
        {post.imageUrl && (
          <div className={`relative ${featured ? 'md:w-1/2' : 'w-full'} h-48 overflow-hidden rounded-t-lg`}>
            <img 
              src={post.imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {post.featured && (
              <Badge className="absolute top-2 right-2 bg-primary text-white">
                {t('blog.featured', '추천 게시물')}
              </Badge>
            )}
          </div>
        )}
        <div className={`${featured ? 'md:w-1/2 md:flex md:flex-col' : ''} flex-grow`}>
          <CardContent className="p-4">
            <div className="mb-1">
              <Badge variant="outline" className="text-xs">
                {t(`blog.category.${post.category.toLowerCase()}`, post.category)}
              </Badge>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2">{title}</h3>
            {summary && (
              <p className="text-sm text-neutral-600 mb-3 line-clamp-3">{summary}</p>
            )}
          </CardContent>
          <CardFooter className="px-4 py-3 border-t text-sm text-neutral-500 flex justify-between">
            <span>{post.author}</span>
            <span>{formattedDate}</span>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}