import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCMS();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#111111]/95 backdrop-blur-md border border-[#D99A28]/40 rounded-xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)] transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#FFC857] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-[#B52B20] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#168BDA] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{toast.title}</h4>
            <p className="text-xs text-[#A5A5A5] mt-0.5 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#A5A5A5] hover:text-white transition-colors p-1 rounded-md"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
