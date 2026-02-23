import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_CHANNEL_URL } from "../config";

function WhatsAppFloat() {
  const href = WHATSAPP_CHANNEL_URL;

  return (
    <div className="group fixed bottom-6 right-6 z-50">
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-primary/12 bg-white/96 px-3 py-1 text-xs font-semibold text-primary-dark opacity-0 shadow-soft transition group-hover:opacity-100">
        Join WhatsApp Channel
      </span>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Join WhatsApp Channel"
        className="relative inline-flex items-center justify-center rounded-full border-2 border-white/90 bg-gradient-to-br from-[#25D366] to-[#109a46] p-4 text-white shadow-[0_22px_44px_-16px_rgba(23,44,85,0.6)] transition duration-300 hover:from-[#28e06f] hover:to-[#12a84d] hover:shadow-[0_26px_50px_-18px_rgba(23,44,85,0.7)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/45"
      >
        <span
          className="pointer-events-none absolute inset-[-6px] rounded-full border border-[#25D366]/50 animate-pulse-ring"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/40 blur-md" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-1 rounded-full bg-white/10" aria-hidden="true" />
        <FaWhatsapp className="relative z-10 text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
      </a>
    </div>
  );
}

export default WhatsAppFloat;
