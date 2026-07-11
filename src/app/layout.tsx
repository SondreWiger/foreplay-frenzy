import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a0505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://foreplayfrenzy.app"),
  title: "Foreplay Frenzy — Party & Couples Game",
  description:
    "The ultimate game suite for couples and friend groups. 300+ cards, 15 game modes, 4 vibe settings. Truth or dare, never have I ever, fantasy dice, roleplay, drinking games, and more.",
  keywords: [
    "party game",
    "couples game",
    "truth or dare",
    "never have i ever",
    "drinking game",
    "date night",
    "friend group",
    "NSFW",
    "adult game",
  ],
  authors: [{ name: "Foreplay Frenzy" }],
  openGraph: {
    title: "Foreplay Frenzy — Party & Couples Game",
    description:
      "300+ cards. 15 game modes. 4 vibes. The ultimate party & couples game.",
    url: "https://foreplayfrenzy.app",
    siteName: "Foreplay Frenzy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Foreplay Frenzy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foreplay Frenzy",
    description: "300+ cards. 15 game modes. 4 vibes.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Foreplay Frenzy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${poppins.variable} ${inter.variable}`}>
      <body
        className="min-h-dvh min-h-screen bg-blood-950 text-white antialiased overscroll-none"
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
