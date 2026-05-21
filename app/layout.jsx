import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "PhotoPromptsHub - AI Image Prompts for Midjourney, DALL·E, Flux & Stable Diffusion",
  description: "Discover thousands of curated AI image prompts for Midjourney, DALL·E, Flux, Stable Diffusion & more. Browse by category, model, and style. Get trending prompts, celebrity looks, movie styles, and viral AI art prompts.",
  keywords: "ai prompts, midjourney prompts, dall-e prompts, flux prompts, stable diffusion prompts, ai image generation, prompt engineering, trending ai prompts, celebrity ai prompts, movie style prompts",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  metadataBase: new URL("https://photopromptshub.in"),
  alternates: {
    canonical: "https://photopromptshub.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://photopromptshub.in",
    siteName: "PhotoPromptsHub",
    title: "PhotoPromptsHub - AI Image Prompts",
    description: "Discover thousands of curated AI image prompts for Midjourney, DALL·E, Flux, Stable Diffusion & more.",
    images: [
      {
        url: "https://photopromptshub.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoPromptsHub - AI Image Prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoPromptsHub - AI Image Prompts",
    description: "Discover thousands of curated AI image prompts for Midjourney, DALL·E, Flux, Stable Diffusion & more.",
    images: ["https://photopromptshub.in/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden" suppressHydrationWarning>
      <body className={`${font.variable} font-sans antialiased h-full overflow-x-hidden bg-white text-slate-900 transition-colors duration-300`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
