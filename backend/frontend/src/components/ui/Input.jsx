import React from 'react';
import { cn } from '../utils/cn';

const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  error,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-w-border bg-w-surface px-3 py-2 text-sm text-w-text placeholder:text-w-text-dim focus:outline-none focus:ring-2 focus:ring-w-accent focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-w-red focus:ring-w-red",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-w-red">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;