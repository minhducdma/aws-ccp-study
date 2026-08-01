import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useId } from 'react';
import { cn } from '../lib/cn';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}

/**
 * A toggle whose state is the point, as opposed to a button that performs an action. Radix
 * reports `role="switch"` with `aria-checked`, which a styled button would announce wrongly.
 */
export function Switch({ checked, onCheckedChange, label, description, className }: SwitchProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-describedby={descriptionId}
        className={cn(
          'focus-ring relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200',
          'bg-slate-200 data-[state=checked]:bg-brand-500',
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'block size-5 translate-x-0.5 rounded-full bg-white shadow-sm',
            'transition-transform duration-200 ease-out-expo data-[state=checked]:translate-x-[1.375rem]',
          )}
        />
      </SwitchPrimitive.Root>
      <div className="min-w-0">
        <label htmlFor={id} className="cursor-pointer text-sm font-medium text-slate-700">
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-xs text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
