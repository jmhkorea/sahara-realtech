import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Building, ChevronDown, ChevronUp } from "lucide-react";
import BusinessRegistrationCard from "./BusinessRegistrationCard";

export default function BusinessRegistrationSection() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  
  // 국가 목록 정의
  const countries = [
    { code: "malta", name: "몰타공화국" },
    { code: "usa", name: "미국" },
    { code: "korea", name: "한국" },
    { code: "china", name: "중국" },
    { code: "brazil", name: "브라질" }
  ];

  return (
    <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Building className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            회사 보유 사업자 등록증
          </h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-5">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              사하라리얼테크는 글로벌 비즈니스를 위해 여러 국가에 법인을 설립하여 운영하고 있습니다. 
              각 국가의 사업자 등록증을 확인하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {countries.map((country) => (
              <BusinessRegistrationCard
                key={country.code}
                countryCode={country.code}
                countryName={country.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}