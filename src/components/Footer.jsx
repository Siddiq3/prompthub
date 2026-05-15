import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 dark:bg-black border-t border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">PhotoPromptsHub</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The premier library of AI image prompts for creators, designers, and artists.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://twitter.com"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/prompts" className="text-slate-400 hover:text-white text-sm transition-colors">
                  All Prompts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/latest" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Latest
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-slate-400 hover:text-white text-sm transition-colors">
                  DMCA & Content Removal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>
            © {currentYear} PhotoPromptsHub. All rights reserved.
          </p>
          <p>
            Made with ❤️ for creative professionals
          </p>
          <p>
            <a href="https://www.instagram.com/siddiqkolimi/" className="hover:text-white transition-colors">
              Developed by Siddiq Kolimi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
