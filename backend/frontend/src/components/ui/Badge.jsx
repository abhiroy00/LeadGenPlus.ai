import React from 'react';
import { cn } from '../utils/cn';

const Badge = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-w-surface2 text-w-text-mid border-w-border',
    primary: 'bg-w-accent text-white',
    secondary: 'bg-w-accent2 text-white',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    outline: 'text-w-text border-w-border bg-transparent',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export default Badge;