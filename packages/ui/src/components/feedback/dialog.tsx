import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import type { ReactNode } from 'react';
import { XIcon } from '../../icons';
import { fadeIn, scaleIn } from '../../motion/presets';
import { cn } from '../../utils/cn';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  closeLabel: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  closeLabel,
  children,
  className,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <m.div
                className={cn(
                  'fixed top-1/2 left-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-md',
                  '-translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line-strong bg-overlay shadow-2xl shadow-slate-900/20',
                  className,
                )}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-start gap-4 border-b border-line px-6 py-5">
                  <div className="min-w-0 flex-1">
                    <DialogPrimitive.Title className="font-display text-xl font-bold text-slate-900">
                      {title}
                    </DialogPrimitive.Title>
                    {description && (
                      <DialogPrimitive.Description className="mt-1 text-sm leading-relaxed text-slate-500">
                        {description}
                      </DialogPrimitive.Description>
                    )}
                  </div>
                  <DialogPrimitive.Close className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                    <XIcon width={20} height={20} />
                    <span className="sr-only">{closeLabel}</span>
                  </DialogPrimitive.Close>
                </div>
                <div className="p-6">{children}</div>
              </m.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}