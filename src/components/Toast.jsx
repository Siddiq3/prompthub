import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function Toast({ toast, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;

    setVisible(true);

    const hideTimer = setTimeout(() => setVisible(false), 2200);
    const closeTimer = setTimeout(() => onClose(), 2600);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type !== "error";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[90] flex justify-center px-4">
      <div
        className={`pointer-events-auto inline-flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-lift backdrop-blur transition duration-300 ${
          isSuccess
            ? "border-primary/20 bg-white/94 text-primary-dark"
            : "border-warm/30 bg-white/94 text-amber-800"
        } ${visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        role="status"
        aria-live="polite"
      >
        {isSuccess ? <FaCheckCircle className="text-emerald-600" /> : <FaExclamationCircle className="text-amber-700" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export default Toast;
