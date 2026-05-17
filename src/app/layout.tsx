import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Boom",
  description: "Social Commerce App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}