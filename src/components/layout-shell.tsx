"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { PageLoader } from "@/components/page-loader";
import { Toaster } from "sonner"

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
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <Toaster />
    </>
  );
}
