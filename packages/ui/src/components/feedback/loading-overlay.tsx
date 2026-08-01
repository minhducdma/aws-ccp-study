import { createPortal } from 'react-dom';
import { Spinner } from './spinner';

export function LoadingOverlay({ open, label }: { open: boolean; label: string }) {
  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/55 px-6 backdrop-blur-sm"
    >
      <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-xl border border-line-strong bg-overlay px-5 py-4 text-sm font-semibold text-slate-800 shadow-2xl">
        <Spinner className="size-5 text-brand-600" />
        <span>{label}</span>
      </div>
    </div>,
    document.body,
  );
}