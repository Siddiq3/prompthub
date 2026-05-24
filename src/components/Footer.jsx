import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 dark:bg-black border-t border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
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
                href="https://www.instagram.com/photosprompthub?igsh=MTNoNzJvYmxraG1meQ=="
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbCfYa9002TAlsIdh71m"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.765.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.787-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.672-1.612-.92-2.21-.242-.579-.487-.5-.672-.51-.173-.01-.372-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.475 0 1.459 1.065 2.873 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.27-.198-.567-.347z" />
                  <path d="M20.52 3.48C18.398 1.36 15.6 0 12.478 0 5.727 0 .4 5.325.4 11.98c0 2.1.62 4.16 1.792 5.96L0 24l6.38-1.668c1.74 1.03 3.7 1.584 5.8 1.584 6.75 0 12.08-5.324 12.08-11.98 0-3.124-1.36-5.922-3.74-8.452z" />
                </svg>
              </a>
              <a
                href="https://t.me/photopromptshub"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Telegram"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3L3 10l5.14 1.9L8 19l4.56-2.86L20 21 21 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm text-center sm:text-left">
          <p>© {currentYear} PhotoPromptsHub. All rights reserved.</p>
          <p>Made with ❤️ for creative professionals</p>
          <p>
            <a href="https://www.instagram.com/siddiqkolimi/" className="hover:text-white transition-colors inline-block py-1">
              Developed by Siddiq Kolimi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
