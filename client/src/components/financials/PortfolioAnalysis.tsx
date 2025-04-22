import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PortfolioAnalysis() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-neutral-500 text-lg">포트폴리오 분석 기능이 곧 제공될 예정입니다</p>
    </div>
  );
}