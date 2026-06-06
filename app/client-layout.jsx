"use client";

import { Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import CookieConsent from "react-cookie-consent";
import Navbar from "@/src/components/Navbar";
import MobileBottomNav from "@/src/components/MobileBottomNav";
import Footer from "@/src/components/Footer";
import ScrollToTop from "@/src/components/ScrollToTop";
import Toast from "@/src/components/Toast";
import PageTransition from "@/src/components/PageTransition";

function NavbarWithSuspense() {
  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
}

export default function ClientLayout({ children }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#f6f7f8]" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <NavbarWithSuspense />
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:pb-20 lg:px-8"
      >
        <LazyMotion features={domAnimation}>
          <PageTransition>{children}</PageTransition>
        </LazyMotion>
      </main>
      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
      <Toast />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '16px 24px',
          color: '#111827',
        }}
        buttonStyle={{
          background: '#2271b1',
          color: '#fff',
          borderRadius: '8px',
          padding: '12px 20px',
          fontWeight: 600,
        }}
        buttonWrapperClasses="!m-0"
      >
        <span className="text-sm">
          This site uses cookies to improve your experience and serve relevant ads.
        </span>
      </CookieConsent>
    </>
  );
}
