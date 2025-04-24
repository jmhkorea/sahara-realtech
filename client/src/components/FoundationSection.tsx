import { useTranslation } from "react-i18next";

export default function FoundationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">
            사하라 리얼테크 회사 인증 및 등록증
          </h2>
          <p className="text-gray-600 mb-8">
            글로벌 부동산 자산 디지털화를 주도하는 사하라 리얼테크의 국가별 공식 법인 등록증입니다.
            각 국가의 법률 및 규제를 준수하며 토큰증권과 실물자산 디지털화를 위한 안전한 블록체인 기술을 개발합니다.
          </p>
        </div>
        
        {/* 사업자등록증 폼 4개 - 한 줄에 2개 표시 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {/* 몰타공화국 등록증 폼 */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base">몰타공화국 등록증</h3>
                <p className="text-xs text-gray-500">유럽 지역 본부</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">사업자등록증 이미지가 추가될 예정입니다</p>
            </div>
          </div>
          
          {/* 미국 등록증 폼 */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base">미국 등록증</h3>
                <p className="text-xs text-gray-500">북미 지역 본부</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">사업자등록증 이미지가 추가될 예정입니다</p>
            </div>
          </div>
          
          {/* 한국 등록증 폼 */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base">한국 등록증</h3>
                <p className="text-xs text-gray-500">아시아 지역 총괄</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">사업자등록증 이미지가 추가될 예정입니다</p>
            </div>
          </div>
          
          {/* 중국 등록증 폼 */}
          <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">중국 등록증</h3>
                <p className="text-xs text-gray-500">중국 시장 진출</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <p className="text-gray-500 text-xs">사업자등록증 이미지가 추가될 예정입니다</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            사하라 리얼테크는 글로벌 블록체인 기술을 통해 부동산 자산의 토큰화를 추진하는 선도적인 기관으로, 
            북미, 아시아, 중국에 지사를 두고 글로벌 부동산 시장의 민주화와 접근성 향상을 위해 노력하고 있습니다. 
            각 국가별 금융 규제 준수와 함께 안정적인 토큰증권(STO) 발행 및 실물자산(RWA) 디지털화를 위한 
            표준 기술을 개발하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}