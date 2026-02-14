import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "./_components/layout-shell";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ConvexClientProvider } from "@/lib/convex-provider";
import { getToken } from "@/lib/auth-server";

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata.home" })
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://imobuy.example.com"
  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/IMOBUY.svg",
      shortcut: "/IMOBUY.svg",
      apple: "/IMOBUY.svg",
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const token = await getToken();

  return (
    <html lang={locale} className={dmSans.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen min-h-screen overflow-x-hidden`}
      >
        <ConvexClientProvider initialToken={token}>
          <NextIntlClientProvider messages={messages}>
            <LayoutShell>{children}</LayoutShell>
          </NextIntlClientProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
