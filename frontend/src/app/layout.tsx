import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TCS Smart | Candidate's Data Center",
    template: "%s | TCS Smart Candidate's Data Center",
  },
  description:
    "TCS Smart | Candidate's Data Center App is a centralized platform for managing candidate information, tracking application statuses, surveys, interviews, and onboarding progress with accuracy and efficiency.",

  applicationName: "Candidate's Data Center",
  generator: "Next.js",
  keywords: ["TCS", "TCS Smart", "Candidate Data", "Recruitment", "Next.js"],
  authors: [
    {
      name: "Sankar Karmakar",
      url: "https://sankar-karmakar-portfolio.vercel.app/",
    },
  ],
  creator: "Sankar Karmakar",
  publisher: "Sankar Karmakar",
  category: "technology",

  // metadataBase: new URL("https://tcs-smart.vercel.app"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "TCS Smart | Candidate's Data Center",
    description:
      "Centralized platform for managing candidate data, interviews, surveys, and onboarding.",
    siteName: "TCS Smart",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
