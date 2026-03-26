import type { ReactNode } from 'react';
import type { CardVariant } from '../types';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const variantClass: Record<CardVariant, string> = {
    default: 'card',
    feature: 'card card--feature feature',
    stat: 'card card--stat stat-card',
    function: 'card card--function function-card',
  };

  const classes = [variantClass[variant], className].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

