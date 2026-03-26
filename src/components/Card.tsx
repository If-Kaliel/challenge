import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'feature' | 'stat' | 'function';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const variantClass: Record<string, string> = {
    default: 'card',
    feature: 'card card--feature feature',
    stat: 'card card--stat stat-card',
    function: 'card card--function function-card',
  };

  const classes = [variantClass[variant], className].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}
