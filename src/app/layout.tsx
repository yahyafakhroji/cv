import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | Full-Stack Developer`,
  description: RESUME_DATA.summary,
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Angular",
    "Node.js",
    RESUME_DATA.name,
  ],
  authors: [{ name: RESUME_DATA.name }],
  openGraph: {
    type: "website",
    title: `${RESUME_DATA.name} | Full-Stack Developer`,
    description: RESUME_DATA.summary,
    siteName: RESUME_DATA.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} | Full-Stack Developer`,
    description: RESUME_DATA.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        {/* Google Fonts loaded via CDN for reliability */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <GoogleAnalytics gaId="G-KTXCV72QXG" />
      </body>
    </html>
  );
}
