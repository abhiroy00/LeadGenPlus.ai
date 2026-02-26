import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const Select = ({ 
  value, 
  onValueChange, 
  placeholder = 'Select an option',
  children,
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = React.Children.toArray(children).find(
    child => child.props.value === value
  );

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-w-border bg-w-surface px-3 py-2 text-sm text-w-text placeholder:text-w-text-dim focus:outline-none focus:ring-2 focus:ring-w-accent focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <span className={selectedOption ? 'text-w-text' : 'text-w-text-dim'}>
          {selectedOption ? selectedOption.props.children : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-w-border bg-w-surface shadow-lg">
          <div className="py-1">
            {React.Children.map(children, (child) => (
              <div
                key={child.props.value}
                className="cursor-pointer px-3 py-2 text-sm text-w-text hover:bg-w-surface2"
                onClick={() => {
                  onValueChange(child.props.value);
                  setIsOpen(false);
                }}
              >
                {child.props.children}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children }) => {
  return <div value={value}>{children}</div>;
};

export default Select;
export { SelectItem };