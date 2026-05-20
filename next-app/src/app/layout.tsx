import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Inter = fallback si Söhne ne charge pas (TestSohne local @font-face dans globals.css)
const inter = Inter({
  variable: "--font-inter-fallback",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Quentin Singama · Product Designer SaaS B2B",
    template: "%s · Quentin Singama",
  },
  description:
    "Portfolio de Quentin Singama, M2 UX/UI à Bordeaux. Product Designer, Generalist Research + Craft. En recherche d'alternance · septembre 2026.",
  metadataBase: new URL("https://quentin-singama.com"),
  authors: [{ name: "Quentin Singama" }],
  keywords: [
    "UX Designer",
    "UI Designer",
    "Product Design",
    "Portfolio",
    "Alternance",
    "Bordeaux",
    "SaaS B2B",
    "Quentin Singama",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Quentin Singama",
    title: "Quentin Singama · Product Designer SaaS B2B",
    description:
      "M2 UX/UI à Bordeaux. 6 projets, 2 ans à transformer du flou en interfaces qui tiennent.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@quentinsingama",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-t1">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
