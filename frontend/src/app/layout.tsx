// import type { Metadata, Viewport } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   // Basic SEO
//   title: {
//     default: "TCS Smart | Candidate's Data Center",
//     template: "%s | TCS Smart Candidate's Data Center",
//   },
//   description:
//     "TCS Smart | Candidate's Data Center App is a centralized platform for managing candidate information, tracking application statuses, surveys, interviews, and onboarding progress with accuracy and efficiency.",
//   applicationName: "Candidate's Data Center",
//   generator: "Next.js",
//   keywords: ["Next.js", "React", "Web App", "SEO"],
//   authors: [
//     {
//       name: "Sankar Karmakar",
//       url: "https://sankar-karmakar-portfolio.vercel.app/",
//     },
//   ],
//   creator: "Sankar Karmakar",
//   publisher: "Sankar Karmakar",
//   category: "technology",

//   // URLs & alternates
//   // metadataBase: new URL("https://yourwebsite.com"),
//   alternates: {
//     canonical: "/",
//     languages: {
//       "en-US": "/en",
//       "hi-IN": "/hi",
//     },
//   },

//   // Robots
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },

//   // Icons
//   // icons: {
//   //   icon: "/favicon.ico",
//   //   shortcut: "/favicon-16x16.png",
//   //   apple: "/apple-touch-icon.png",
//   //   other: [
//   //     {
//   //       rel: "mask-icon",
//   //       url: "/safari-pinned-tab.svg",
//   //       color: "#000000",
//   //     },
//   //   ],
//   // },

//   // Open Graph (Facebook, LinkedIn, etc.)
//   openGraph: {
//     title: "TCS Smart | Candidate's Data Center",
//     description:
//       "TCS Smart | Candidate's Data Center App is a centralized platform for managing candidate information, tracking application statuses, surveys, interviews, and onboarding progress with accuracy and efficiency.",
//     // url: "https://yourwebsite.com",
//     siteName: "TCS Smart | Candidate's Data Center",
//     // images: [
//     //   {
//     //     url: "https://yourwebsite.com/og-image.png",
//     //     width: 1200,
//     //     height: 630,
//     //     alt: "My App Preview",
//     //   },
//     // ],
//     locale: "en_US",
//     type: "website",
//   },

//   // Theme colors (browser UI)
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     { media: "(prefers-color-scheme: dark)", color: "#000000" },
//   ],

//   // Viewport (optional here, usually separate)
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 1,
//   },
// };

// export const viewport: Viewport = {
//  themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'cyan' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


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
  keywords: ["TCS Smart", "Candidate Data", "Recruitment", "Next.js"],
  authors: [
    {
      name: "Sankar Karmakar",
      url: "https://sankar-karmakar-portfolio.vercel.app/",
    },
  ],
  creator: "Sankar Karmakar",
  publisher: "Sankar Karmakar",
  category: "technology",

  metadataBase: new URL("https://tcs-smart.vercel.app"),

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
