import type { Metadata } from "next";
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
  title: "CVFlow — AI Resume Builder",
  description:
    "Build ATS-optimized, job-winning resumes in minutes with AI. Generate tailored applications, land more interviews, and advance your career effortlessly.",
  keywords: ["resume builder", "AI resume", "ATS optimization", "job application", "CV builder"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-black text-white min-h-screen">{children}</body>
    </html>
  );
}
