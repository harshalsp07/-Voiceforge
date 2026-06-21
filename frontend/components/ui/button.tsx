import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm rounded-md transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        vintage: 'bg-gradient-gold text-white shadow-warm-sm hover:-translate-y-px hover:shadow-glow-gold active:translate-y-0',
        secondary: 'bg-surface-secondary text-ink border border-cream hover:bg-cream hover:shadow-warm-sm',
        ghost: 'text-amber-600 hover:text-amber-700 hover:bg-amber-50',
        outline: 'border border-amber-300 text-amber-700 hover:bg-amber-50',
        danger: 'bg-error text-white hover:bg-red-600 shadow-warm-sm',
        link: 'text-amber-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-5 py-2.5',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'vintage',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
