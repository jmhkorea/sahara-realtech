import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";
import { Property } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function FeaturedProperties() {
  const { t } = useTranslation();
  
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Render loading skeletons
  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t('featuredProperties.title')}
            </h2>
            <Link href="/properties" className="text-primary font-medium flex items-center">
              {t('featuredProperties.viewAll')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-6" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-2 w-full mb-4" />
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              {t('errors.failedToLoad')}
            </h2>
            <p className="text-neutral-500">
              {t('errors.tryAgainLater')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('featuredProperties.title')}
          </h2>
          <Link href="/properties" className="text-primary font-medium flex items-center">
            {t('featuredProperties.viewAll')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
