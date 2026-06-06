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
  title: "AI Photography Prompts for ChatGPT & Gemini - Creative Image Generation",
  description: "Curated photography prompts for ChatGPT and Gemini AI image generation. Browse cinematic portraits, fashion editorials, lifestyle photography, and creative inspiration. Copy prompts for stunning AI-generated images.",
  keywords: "AI photography prompts, ChatGPT image generation, Gemini AI prompts, AI portrait prompts, cinematic photography prompts, fashion photography AI, AI image inspiration",
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
    title: "AI Photography Prompts for ChatGPT & Gemini",
    description: "Curated photography prompts for ChatGPT and Gemini AI image generation. Browse cinematic portraits, fashion editorials, lifestyle photography, and creative inspiration.",
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
    title: "AI Photography Prompts for ChatGPT & Gemini",
    description: "Curated photography prompts for ChatGPT and Gemini AI image generation. Browse creative inspiration for portraits, fashion, and cinematic photography.",
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
      <body className={`${font.variable} font-sans antialiased h-full overflow-x-hidden bg-[#f6f7f8] text-slate-900 transition-colors duration-300`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
