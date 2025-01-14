import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SummaryProvider } from "@/context/SummaryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estuda +",
  description: "App para resumos e questões",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SummaryProvider>
      <html lang="pt-br">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased md:overflow-hidden`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </SummaryProvider>

  );
}
