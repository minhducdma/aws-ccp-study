import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import type { ReactNode } from 'react';
import { transition } from '../motion/presets';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Announced when the panel opens; visually hidden. */
  title: string;
  children: ReactNode;
}

/**
 * Slide-in panel for navigation on small screens.
 *
 * Radix supplies what a hand-rolled overlay usually lacks: focus is trapped inside the panel,
 * returned to the opener on close, the page behind is marked `aria-hidden` and inert, and both
 * Escape and an outside click dismiss it.
 */
export function Sheet({ open, onOpenChange, title, children }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition.quick}
              />
            </Dialog.Overlay>
            {/* The panel is a list of links with no prose to describe, so opt out of
                Radix's description slot rather than leaving it unset. */}
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <m.div
                className="fixed inset-y-0 left-0 z-50 flex w-[19rem] max-w-[85vw] flex-col overflow-y-auto border-r border-line bg-canvas lg:hidden"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={transition.normal}
              >
                <Dialog.Title className="sr-only">{title}</Dialog.Title>
                {children}
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
