import type { Metadata } from "next";
import { Source_Serif_4, Special_Elite, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReachOut — AI Cold Email & Cover Letter Writer",
  description:
    "Generate tailored cold outreach emails and cover letters in seconds. Powered by AI, free to use. Paste a job posting, describe your background, and get a sharp, specific draft ready to send.",
  openGraph: {
    title: "ReachOut — AI Cold Email & Cover Letter Writer",
    description:
      "Generate tailored cold outreach emails and cover letters in seconds. Free, AI-powered, no sign-up required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${specialElite.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
