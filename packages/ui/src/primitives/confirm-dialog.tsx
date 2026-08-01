import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { fadeIn, scaleIn } from '../motion/presets';
import { Button, type ButtonVariants } from './button';

export interface ConfirmDialogProps {
  /** Any element; it receives the open handler through Radix's `asChild`. */
  trigger: ReactNode;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  /** Required like every other label: the design system holds no copy of its own to translate. */
  cancelLabel: string;
  tone?: ButtonVariants['tone'];
  onConfirm: () => void;
}

/**
 * Replaces `window.confirm`, which cannot be styled, ignores the dark theme and blocks the main
 * thread. Radix's AlertDialog traps focus, restores it on close, wires `aria-labelledby` and
 * `aria-describedby`, and closes on Escape.
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  tone = 'danger',
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            </AlertDialog.Overlay>
            <AlertDialog.Content asChild forceMount>
              <m.div
                className={cn(
                  'fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2',
                  'rounded-2xl border border-line-strong bg-overlay p-6 shadow-2xl shadow-black/60',
                )}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <AlertDialog.Title className="text-lg font-bold text-slate-900">{title}</AlertDialog.Title>
                <AlertDialog.Description className="mt-2 text-sm leading-relaxed text-slate-500">
                  {description}
                </AlertDialog.Description>
                <div className="mt-6 flex justify-end gap-3">
                  <AlertDialog.Cancel asChild>
                    <Button tone="secondary">{cancelLabel}</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button tone={tone} onClick={onConfirm}>
                      {confirmLabel}
                    </Button>
                  </AlertDialog.Action>
                </div>
              </m.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
