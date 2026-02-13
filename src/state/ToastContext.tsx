import React, { createContext, useContext, useState, useCallback } from 'react';

// Define the available toast types based on DaisyUI alert classes
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, durationInSeconds?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType, durationInSeconds: number = 3) => {
    const id = Date.now();
    const duration = durationInSeconds * 1000;

    setToasts((prev) => [...prev, { id, message, type, duration }]);

    // Auto-remove the toast after the specified duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* DaisyUI Toast Container */}
      <div className="toast toast-center toast-bottom z-[9999]">
        {toasts.map((toast) => (
          <div key={toast.id} className={`alert alert-${toast.type} shadow-lg animate-in fade-in slide-in-from-right duration-300`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook for easy access
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
