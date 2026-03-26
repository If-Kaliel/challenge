import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant } from '../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-btn-gradient text-white border-transparent hover:-translate-y-0.5 hover:shadow-btn active:translate-y-0',
  outline:
    'bg-transparent text-primary border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-md',
  ghost:
    'bg-transparent text-primary border-transparent hover:bg-primary/10',
};

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'px-8 py-3.5 rounded-md border-2',
        'text-base font-bold font-sans tracking-wide',
        'transition-all duration-200 cursor-pointer',
        'disabled:opacity-55 disabled:cursor-not-allowed disabled:!translate-y-0 disabled:!shadow-none',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
