import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils/cn';

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...rest }: TabsPrimitive.TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn('inline-flex gap-1 rounded-xl border border-line bg-surface/60 p-1', className)}
      {...rest}
    />
  );
}

export function TabsTrigger({ className, ...rest }: TabsPrimitive.TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'focus-ring rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap text-slate-500',
        'transition-colors duration-200 hover:text-slate-900',
        'data-[state=active]:bg-brand-500/15 data-[state=active]:text-brand-300',
        className,
      )}
      {...rest}
    />
  );
}

export function TabsContent({ className, ...rest }: TabsPrimitive.TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn('focus-ring mt-4 data-[state=active]:animate-pop-in', className)}
      {...rest}
    />
  );
}
