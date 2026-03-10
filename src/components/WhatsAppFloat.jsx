import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_CHANNEL_URL } from "../config";

function WhatsAppFloat() {
  const href = WHATSAPP_CHANNEL_URL;

  return (
    <div className="group fixed bottom-5 right-5 z-40">
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white/96 px-3 py-1 text-xs font-semibold text-brand-ink opacity-0 shadow-soft transition group-hover:opacity-100 md:block">
        Join WhatsApp Channel
      </span>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Join WhatsApp Channel"
        className="relative inline-flex items-center justify-center rounded-full border border-white/90 bg-[#25D366] p-3 text-white shadow-[0_16px_32px_-18px_rgba(23,44,85,0.6)] transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_18px_32px_-18px_rgba(23,44,85,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/45"
      >
        <FaWhatsapp className="relative z-10 text-[1.7rem]" />
      </a>
    </div>
  );
}

export default WhatsAppFloat;
