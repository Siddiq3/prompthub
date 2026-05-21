import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";

export const metadata = {
  title: "PhotoPromptsHub - AI Image Prompts for Midjourney, DALL·E, Flux & Stable Diffusion",
  description: "Browse thousands of AI image prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Organized by category, style, and use case.",
  robots: "index, follow",
  metadataBase: new URL("https://photopromptshub.in"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden" suppressHydrationWarning>
      <body className="h-full overflow-x-hidden bg-site text-slate-900 transition-colors duration-300">
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
