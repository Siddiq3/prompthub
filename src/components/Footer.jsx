import { Link } from "react-router-dom";
import { SITE_NAME } from "../config";

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#111827] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h4 className="font-heading text-2xl font-semibold text-white">{SITE_NAME}</h4>
          <p className="mt-2 text-sm text-blue-200">
            A premium gallery to discover production-ready image prompts. Save ideas, copy quickly, and move faster in your creative workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <Link className="text-blue-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" to="/about">
            About
          </Link>
          <Link className="text-blue-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" to="/contact">
            Contact
          </Link>
          <Link className="text-blue-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" to="/saved">
            Saved
          </Link>
          <Link className="text-blue-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="text-blue-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" to="/terms">
            Terms
          </Link>
          <Link className="text-blue-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" to="/disclaimer">
            Disclaimer
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-200">
        {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
