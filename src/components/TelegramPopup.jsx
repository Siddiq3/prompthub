import { useEffect, useState } from "react";
import { FaArrowRight, FaTelegramPlane, FaTimes } from "react-icons/fa";
import { TELEGRAM_CHANNEL_URL } from "../config";
import { lockBodyScroll } from "../utils/scrollLock";

const TELEGRAM_POPUP_FLAG = "__telegramPopupShownThisLoad";

function TelegramPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (window[TELEGRAM_POPUP_FLAG]) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (window[TELEGRAM_POPUP_FLAG]) {
        return;
      }

      window[TELEGRAM_POPUP_FLAG] = true;
      setIsVisible(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    return lockBodyScroll("telegram-popup");
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="popup-overlay-in fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/48 px-4 backdrop-blur-[6px] sm:px-6">
      <div
        className="popup-scale-in relative w-full max-w-[25.5rem] overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.94))] shadow-[0_32px_90px_-34px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.92))]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="telegram-popup-title"
        aria-describedby="telegram-popup-description"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_62%)]" />
        <div className="pointer-events-none absolute -left-8 top-12 h-28 w-28 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/15" />
        <div className="pointer-events-none absolute -right-10 bottom-12 h-32 w-32 rounded-full bg-cyan-100/60 blur-3xl dark:bg-cyan-400/10" />

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/85 text-slate-500 transition duration-200 hover:bg-white hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close Telegram popup"
        >
          <FaTimes />
        </button>

        <div className="relative px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8">
          <div className="mx-auto flex max-w-[18rem] flex-col items-center text-center">
            <div className="relative inline-flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 shadow-[0_24px_48px_-20px_rgba(37,99,235,0.55)]" />
              <div className="absolute inset-[1px] rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))]" />
              <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white/16 text-[1.7rem] text-white backdrop-blur-sm">
                <FaTelegramPlane />
              </div>
            </div>

            <div className="mt-5 inline-flex items-center rounded-full border border-sky-100 bg-white/85 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sky-700 dark:border-sky-400/20 dark:bg-slate-900/70 dark:text-sky-200">
              Telegram updates
            </div>

            <h2
              id="telegram-popup-title"
              className="mt-4 text-balance text-[1.9rem] font-semibold tracking-tight text-slate-900 dark:text-white"
            >
              Get New Prompts First 🚀
            </h2>

            <p
              id="telegram-popup-description"
              className="mt-3 text-balance text-sm leading-7 text-slate-600 dark:text-slate-300"
            >
              Join our Telegram for latest prompts and updates.
            </p>
          </div>

          <div className="mt-7 grid gap-3">
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsVisible(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(37,99,235,0.42)] transition duration-200 hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <FaTelegramPlane />
              Join Telegram
              <FaArrowRight className="text-[0.78rem]" />
            </a>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200/90 bg-white/70 px-5 py-3.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-sky-200 hover:bg-white hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-sky-400/25 dark:hover:bg-slate-900 dark:hover:text-sky-200"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelegramPopup;
