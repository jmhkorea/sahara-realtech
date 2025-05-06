import React from 'react';

export default function SaharaLogo({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  // 로고 크기에 따른 클래스 설정
  const sizeClasses = {
    small: 'text-lg md:text-xl',
    medium: 'text-xl md:text-2xl',
    large: 'text-2xl md:text-3xl'
  };

  return (
    <div className="inline-flex flex-col items-center">
      <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 ${sizeClasses[size]} leading-tight`}>
        SAHARA
      </span>
      <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 ${sizeClasses[size]} leading-tight`}>
        REALTECH
      </span>
    </div>
  );
}