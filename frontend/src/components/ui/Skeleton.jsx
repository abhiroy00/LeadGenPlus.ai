import React from 'react';
import { cn } from '../utils/cn';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-w-surface2',
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;