import React from 'react';

interface SiteNameProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export function SiteName({ className = '', size = 'xl' }: SiteNameProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl'
  };

  return (
    <span className={`font-heading font-bold ${sizeClasses[size]} ${className}`}>
      <span style={{ color: '#14213D' }}>Nabha</span>
      <span style={{ color: '#2CA02C' }}>Sehat</span>
      <span style={{ color: '#C62828' }}>Mitr</span>
    </span>
  );
}