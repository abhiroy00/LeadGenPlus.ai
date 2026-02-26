import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

const Dropdown = ({ 
  children, 
  items = [], 
  align = 'left',
  className,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-48 rounded-lg border border-w-border bg-w-surface shadow-lg',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div className="py-1">
            {items.map((item, index) => {
              if (item.type === 'divider') {
                return (
                  <div
                    key={index}
                    className="my-1 h-px bg-w-border"
                  />
                );
              }

              const content = (
                <div className="flex items-center px-4 py-2 text-sm text-w-text hover:bg-w-surface2 cursor-pointer">
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </div>
              );

              if (item.href) {
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;