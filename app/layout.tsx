import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import TanstackProvider from "@/providers/TanstackProvider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Prompt Uni | Best AI Image Generation Prompts for Gemini, Midjourney & Firefly",
  description:
    "Explore and copy high-quality AI image generation prompts for Gemini, Midjourney, Leonardo AI, and Firefly. Discover trending, creative, and realistic prompt ideas daily on Prompt Uni.",
  keywords: [
    "AI image prompts",
    "Gemini prompts",
    "Midjourney prompts",
    "Leonardo AI prompts",
    "Firefly AI",
    "AI art generation",
    "AI prompt ideas",
    "prompt engineering",
    "realistic AI portraits",
    "photorealistic AI images",
  ],
  authors: [{ name: "Prompt Uni" }],
  creator: "Prompt Uni",
  publisher: "Prompt Uni",
  openGraph: {
    title: "Prompt Uni - Explore the Best AI Image Generation Prompts",
    description:
      "Your creative hub for discovering the best AI prompts for Gemini, Midjourney, Firefly, and Leonardo AI. Get daily trending prompts for photorealistic and cinematic results.",
    url: "https://promptuni.vercel.app",
    siteName: "Prompt Uni",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prompt Uni - AI Image Generation Prompts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Uni - Trending AI Image Generation Prompts",
    description:
      "Find trending prompts for Gemini, Midjourney, and Firefly. Generate realistic and creative AI images instantly.",
    images: ["/og-image.jpg"],
    creator: "@promptuni",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://promptuni.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} font-sans antialiased`}>
        <ThemeProvider>
          <TanstackProvider>
            <Navbar />
            {children}
            <Footer />
          </TanstackProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
