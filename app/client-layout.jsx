"use client";

import { Suspense } from "react";
import Navbar from "@/src/components/Navbar";
import MobileBottomNav from "@/src/components/MobileBottomNav";
import Footer from "@/src/components/Footer";
import ScrollToTop from "@/src/components/ScrollToTop";
import Toast from "@/src/components/Toast";

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
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(185,138,82,0.09),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(42,125,114,0.06),transparent_28%)]" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <NavbarWithSuspense />
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:pb-20 lg:px-8"
      >
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
      <Toast />
    </>
  );
}
