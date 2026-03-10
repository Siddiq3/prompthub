import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Toast from "./components/Toast";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { AppProvider, useAppContext } from "./context/AppContext";
import About from "./pages/About";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import CollectionPage from "./pages/CollectionPage";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Dmca from "./pages/Dmca";
import Home from "./pages/Home";
import Latest from "./pages/Latest";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PromptDetails from "./pages/PromptDetails";
import Prompts from "./pages/Prompts";
import Saved from "./pages/Saved";
import Terms from "./pages/Terms";
import Trending from "./pages/Trending";

function PrerenderSignal() {
  const { loading } = useAppContext();
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (loading || typeof document === "undefined") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.dispatchEvent(new Event("app-rendered"));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [loading, pathname, search]);

  return null;
}

function Layout() {
  const { toast, dismissToast } = useAppContext();

  return (
    <div className="min-h-screen bg-site text-slate-900 transition-colors duration-300 dark:bg-[#08131d] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(185,138,82,0.09),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(42,125,114,0.06),transparent_28%)]" />
      <Navbar />
      <PrerenderSignal />
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toast toast={toast} onClose={dismissToast} />
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collection/:slug" element={<CollectionPage />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/prompt/:slug" element={<PromptDetails />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/dmca" element={<Dmca />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
