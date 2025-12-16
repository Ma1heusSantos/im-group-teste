"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  open: boolean;
  onClose: () => void;
  duration?: number;
};

function Toast({
  message,
  type = "info",
  open,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const bgColor =
    type === "success"
      ? "bg-emerald-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <div
        className={`${bgColor} rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg`}
      >
        {message}
      </div>
    </div>
  );
}

export default Toast;
