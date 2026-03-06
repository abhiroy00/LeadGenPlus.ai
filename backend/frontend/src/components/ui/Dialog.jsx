import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from './Button';

const Dialog = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={() => onOpenChange(false)} 
      />
      <div className="relative bg-w-surface rounded-2xl shadow-2xl w-full max-w-lg z-10">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ className, children, ...props }) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ className, children, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ className, children, ...props }) => (
  <h2 className={cn('text-lg font-semibold leading-none tracking-tight text-w-text', className)} {...props}>
    {children}
  </h2>
);

const DialogDescription = ({ className, children, ...props }) => (
  <p className={cn('text-sm text-w-text-dim', className)} {...props}>
    {children}
  </p>
);

const DialogFooter = ({ className, children, ...props }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props}>
    {children}
  </div>
);

const DialogClose = ({ onClose, className, ...props }) => (
  <button
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
      className
    )}
    onClick={onClose}
    {...props}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);

export default Dialog;
export { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose };