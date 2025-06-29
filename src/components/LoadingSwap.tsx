import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { ReactNode } from 'react';

export default function LoadingSwap(
  { isLoading, children, className }: {
    isLoading: boolean;
    children: ReactNode;
    className?: string;
  }
) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          'col-span-full row-span-full',
          isLoading ? 'invisible' : 'visible',
          className
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'col-span-full row-span-full',
          isLoading ? 'visible' : 'invisible',
          className
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
