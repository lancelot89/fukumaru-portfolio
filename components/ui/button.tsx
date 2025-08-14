import * as React from 'react';

import { cn } from '@/lib/utils';

// shadcn/ui の buttonVariants に近いAPI
export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
export type ButtonSize = 'default' | 'sm' | 'lg';

export function buttonVariants({
  variant = 'default',
  size = 'default',
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:pointer-events-none disabled:opacity-50';
  const sizes: Record<ButtonSize, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-6 text-base',
  };
  const variants: Record<ButtonVariant, string> = {
    default: 'bg-brand text-white hover:opacity-90',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100',
    outline:
      'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    link: 'text-brand underline-offset-4 hover:underline',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };
  return cn(base, sizes[size], variants[variant]);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// シンプルなButton（asChildは未対応、必要時はLinkにbuttonVariantsを適用）
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';
