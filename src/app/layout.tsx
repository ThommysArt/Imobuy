import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { PageLoader } from "@/components/page-loader";

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imobuy - Real Estate Platform | Find Your Dream Property",
  description: "Imobuy brings customers and sellers/agents closer to facilitate sales and transparency for houses, apartments, parcels, and more. Find your perfect property today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageLoader />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
