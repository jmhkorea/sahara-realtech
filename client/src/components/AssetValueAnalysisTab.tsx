import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface AssetValueAnalysisTabProps {
  formatCurrency: (value: number) => string;
}

export default function AssetValueAnalysisTab({ formatCurrency }: AssetValueAnalysisTabProps) {
  const { data: assetValueData, isLoading: isAssetValueLoading, isError: isAssetValueError } = useQuery({
    queryKey: ['/api/financial/asset-value'],
    queryFn: () => fetch('/api/financial/asset-value').then(res => res.json()),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐싱
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">자산 가치 분석</CardTitle>
            <CardDescription>부동산 자산의 가치 변화 예측을 확인하세요</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isAssetValueLoading ? (
          <div className="py-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Skeleton className="h-60 w-full mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        ) : isAssetValueError ? (
          <div className="h-72 flex flex-col items-center justify-center p-6 bg-amber-50 rounded-lg border border-amber-200">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium text-amber-800 mb-2">자산 가치 데이터를 불러올 수 없습니다</h3>
            <p className="text-amber-700 text-center max-w-md">
              데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                window.location.reload();
              }}
            >
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              다시 시도
            </Button>
          </div>
        ) : assetValueData && assetValueData.length > 0 ? (
          <div className="space-y-6">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={assetValueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'propertyValue') {
                        return [formatCurrency(Number(value)), '자산 가치'];
                      } else {
                        return [formatCurrency(Number(value)), '토큰 가치'];
                      }
                    }}
                    labelFormatter={(label) => `${label}년`}
                  />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="propertyValue" 
                    stroke="#3b82f6" 
                    fill="#3b82f680"
                    name="자산 가치" 
                  />
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="tokenValue" 
                    stroke="#10b981" 
                    fill="#10b98180"
                    name="토큰 가치" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-blue-50">
                <CardContent className="pt-4">
                  <h3 className="text-sm text-blue-700 mb-1">초기 자산 가치 (2020)</h3>
                  <p className="text-xl font-bold text-blue-800">{formatCurrency(assetValueData[0].propertyValue)}</p>
                  <div className="mt-2 flex items-center">
                    <p className="text-xs text-blue-600">토큰 당 {formatCurrency(assetValueData[0].tokenValue)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50">
                <CardContent className="pt-4">
                  <h3 className="text-sm text-green-700 mb-1">현재 자산 가치 (2024)</h3>
                  <p className="text-xl font-bold text-green-800">{formatCurrency(assetValueData[4].propertyValue)}</p>
                  <div className="mt-2 flex items-center">
                    <p className="text-xs text-green-600">토큰 당 {formatCurrency(assetValueData[4].tokenValue)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="pt-4">
                  <h3 className="text-sm text-purple-700 mb-1">5년 후 예상 가치 (2029)</h3>
                  <p className="text-xl font-bold text-purple-800">{formatCurrency(assetValueData[9].propertyValue)}</p>
                  <div className="mt-2 flex items-center">
                    <p className="text-xs text-purple-600">토큰 당 {formatCurrency(assetValueData[9].tokenValue)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">자산 가치 상승 요인</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <span className="font-medium text-blue-600">30%</span>
                  </div>
                  <p className="text-xs">위치</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <span className="font-medium text-green-600">15%</span>
                  </div>
                  <p className="text-xs">주변시설</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                    <span className="font-medium text-yellow-600">20%</span>
                  </div>
                  <p className="text-xs">교통</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <span className="font-medium text-purple-600">15%</span>
                  </div>
                  <p className="text-xs">건물상태</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                    <span className="font-medium text-pink-600">20%</span>
                  </div>
                  <p className="text-xs">시장수요</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-72 flex flex-col items-center justify-center p-6 bg-amber-50 rounded-lg border border-amber-200">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium text-amber-800 mb-2">자산 가치 데이터를 불러올 수 없습니다</h3>
            <p className="text-amber-700 text-center max-w-md">
              데이터가 비어있거나 형식이 올바르지 않습니다. 관리자에게 문의하세요.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}