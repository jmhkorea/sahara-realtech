import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PropertyType } from "@shared/schema";

interface SearchParams {
  region: string;
  type: string;
  investmentAmount: string;
}

export default function SearchSection() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  
  const [searchParams, setSearchParams] = useState<SearchParams>({
    region: '',
    type: '',
    investmentAmount: '',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchParams.region) {
      params.append('region', searchParams.region);
    }
    
    if (searchParams.type) {
      params.append('type', searchParams.type);
    }
    
    if (searchParams.investmentAmount) {
      params.append('amount', searchParams.investmentAmount);
    }
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg -mt-8 relative z-20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                {t('search.region')}
              </label>
              <Select 
                value={searchParams.region}
                onValueChange={(value) => setSearchParams({...searchParams, region: value})}
              >
                <SelectTrigger className="w-full border border-neutral-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder={t('search.selectRegion')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="대한민국">대한민국 전체</SelectItem>
                    <SelectItem value="서울">서울특별시</SelectItem>
                    <SelectItem value="경기">경기도</SelectItem>
                    <SelectItem value="인천">인천광역시</SelectItem>
                    <SelectItem value="부산">부산광역시</SelectItem>
                    <SelectItem value="강원">강원도</SelectItem>
                    <SelectItem value="해외">해외</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                {t('search.propertyType')}
              </label>
              <Select 
                value={searchParams.type}
                onValueChange={(value) => setSearchParams({...searchParams, type: value})}
              >
                <SelectTrigger className="w-full border border-neutral-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder={t('search.selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={PropertyType.APARTMENT}>{t('propertyTypes.apartment')}</SelectItem>
                    <SelectItem value={PropertyType.OFFICETEL}>{t('propertyTypes.officetel')}</SelectItem>
                    <SelectItem value={PropertyType.COMMERCIAL}>{t('propertyTypes.commercial')}</SelectItem>
                    <SelectItem value={PropertyType.LAND}>{t('propertyTypes.land')}</SelectItem>
                    <SelectItem value={PropertyType.OTHER}>{t('propertyTypes.other')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                {t('search.investmentAmount')}
              </label>
              <Select 
                value={searchParams.investmentAmount}
                onValueChange={(value) => setSearchParams({...searchParams, investmentAmount: value})}
              >
                <SelectTrigger className="w-full border border-neutral-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder={t('search.selectAmount')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="under_1m">{t('search.amountRanges.under1m')}</SelectItem>
                    <SelectItem value="1m_5m">{t('search.amountRanges.1mTo5m')}</SelectItem>
                    <SelectItem value="5m_10m">{t('search.amountRanges.5mTo10m')}</SelectItem>
                    <SelectItem value="over_10m">{t('search.amountRanges.over10m')}</SelectItem>
                    <SelectItem value="all">{t('search.amountRanges.all')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                className="w-full py-3 px-4"
                onClick={handleSearch}
              >
                {t('search.searchButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
