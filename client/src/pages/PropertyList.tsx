import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Property, PropertyType } from "@shared/schema";
import PropertyCard from "@/components/PropertyCard";
import SearchSection from "@/components/SearchSection";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PropertyList() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [sortBy, setSortBy] = useState("newest");
  
  // Parse URL params for filtering
  const params = new URLSearchParams(location.split('?')[1]);
  const regionParam = params.get('region');
  const typeParam = params.get('type');
  const amountParam = params.get('amount');
  
  // Construct query string for the API based on filter params
  let queryString = '/api/properties';
  if (regionParam) {
    queryString += `?region=${regionParam}`;
  } else if (typeParam) {
    queryString += `?type=${typeParam}`;
  }
  
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: [queryString],
  });
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  
  // Filter properties based on URL params and sort
  useEffect(() => {
    if (!properties) return;
    
    let result = [...properties];
    
    // Apply amount filter if present
    if (amountParam) {
      result = result.filter(property => {
        const minInvestment = Number(property.minInvestment);
        
        switch (amountParam) {
          case 'under_1m':
            return minInvestment <= 1000000;
          case '1m_5m':
            return minInvestment > 1000000 && minInvestment <= 5000000;
          case '5m_10m':
            return minInvestment > 5000000 && minInvestment <= 10000000;
          case 'over_10m':
            return minInvestment > 10000000;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id - a.id;
        case 'price_high':
          return Number(b.totalValue) - Number(a.totalValue);
        case 'price_low':
          return Number(a.totalValue) - Number(b.totalValue);
        case 'returns':
          return Number(b.expectedReturn) - Number(a.expectedReturn);
        default:
          return 0;
      }
    });
    
    setFilteredProperties(result);
  }, [properties, amountParam, sortBy]);
  
  // Get title based on filters
  const getPageTitle = () => {
    if (regionParam) {
      return t('propertyList.regionTitle', { region: regionParam });
    } else if (typeParam) {
      const typeKey = Object.entries(PropertyType).find(([_, value]) => value === typeParam)?.[0].toLowerCase();
      return t(`propertyList.typeTitle.${typeKey || 'all'}`);
    } else {
      return t('propertyList.allProperties');
    }
  };

  return (
    <>
      <SearchSection />
      
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold">
              {getPageTitle()}
            </h1>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm text-neutral-500">{t('propertyList.sortBy')}:</span>
              <Select 
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('propertyList.sortOptions.newest')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">{t('propertyList.sortOptions.newest')}</SelectItem>
                    <SelectItem value="price_high">{t('propertyList.sortOptions.priceHigh')}</SelectItem>
                    <SelectItem value="price_low">{t('propertyList.sortOptions.priceLow')}</SelectItem>
                    <SelectItem value="returns">{t('propertyList.sortOptions.returns')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-red-500 mb-2">
                {t('errors.failedToLoad')}
              </h3>
              <p className="text-neutral-500">
                {t('errors.tryAgainLater')}
              </p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">
                {t('propertyList.noProperties')}
              </h3>
              <p className="text-neutral-500">
                {t('propertyList.tryDifferentFilters')}
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-neutral-500">
                {t('propertyList.showing', { count: filteredProperties.length })}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
