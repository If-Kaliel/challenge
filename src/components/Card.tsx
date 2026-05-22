import type { ReactNode } from 'react';
import type { CardVariant } from '../types';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-surface rounded-xl border border-border shadow-sm p-6',
  feature:
    'relative overflow-hidden bg-surface rounded-xl border border-border p-7 text-center transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-md before:content-[\'\'] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-primary before:to-accent',
  stat:
    'bg-surface rounded-xl border border-border shadow-sm p-6 text-center transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-md',
  function:
    'relative overflow-hidden bg-surface rounded-xl border border-border p-7 transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-md before:content-[\'\'] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-primary before:to-accent',
};

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const classes = [variantClasses[variant], className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
