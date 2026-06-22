'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X, XCircle } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
}

const variantConfig = {
  success: { icon: CheckCircle2, color: 'text-success', bg: 'bg-green-50', border: 'border-green-200' },
  error: { icon: XCircle, color: 'text-error', bg: 'bg-red-50', border: 'border-red-200' },
  warning: { icon: AlertCircle, color: 'text-warning', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  info: { icon: Info, color: 'text-info', bg: 'bg-blue-50', border: 'border-blue-200' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const config = variantConfig[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-3 ${config.bg} ${config.border} border rounded-lg shadow-warm-lg px-4 py-3 max-w-sm`}
              >
                <config.icon className={`h-5 w-5 ${config.color} flex-shrink-0 mt-0.5`} />
                <p className="text-sm font-ui text-ink flex-1">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-copper-400 hover:text-ink transition-colors flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
