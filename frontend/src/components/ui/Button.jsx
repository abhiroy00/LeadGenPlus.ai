import React from 'react';
import { cn } from '../utils/cn';
import Spinner from './Spinner';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-w-accent hover:bg-blue-700 text-white focus:ring-w-accent",
    secondary: "bg-w-accent2 hover:bg-green-600 text-white focus:ring-w-accent2",
    outline: "border border-w-border bg-w-surface hover:bg-w-surface2 text-w-text focus:ring-w-accent",
    ghost: "hover:bg-w-surface2 text-w-text-mid hover:text-w-text focus:ring-w-accent",
    danger: "bg-w-red hover:bg-red-600 text-white focus:ring-w-red",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;