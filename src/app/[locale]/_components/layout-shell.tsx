"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { FloatingCTA } from "./floating-cta";
import { PageLoader } from "./page-loader";
import { Toaster } from "sonner";
import { VisitorChatProvider } from "./visitor-chat-context";
import { VisitorChatSheet } from "./visitor-chat-sheet";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes("/admin");

  if (isAdmin) {
    return (
      <>
        <PageLoader />
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <PageLoader />
      <VisitorChatProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <VisitorChatSheet />
      </VisitorChatProvider>
      <Toaster />
    </>
  );
}
