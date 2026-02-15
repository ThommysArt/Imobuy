"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  List,
  Users,
  KeyRound,
  Image,
  FileText,
  Settings,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/listings", label: "Listings", icon: List },
  { href: "/admin/chats", label: "Chats", icon: MessageCircle },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/authcodes", label: "Auth Codes", icon: KeyRound },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    setLogoutOpen(false);
    await signOut();
    router.replace("/auth/signin");
  };

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/auth/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
          <Link href="/admin" className="font-semibold text-lg">
            Imobuy Admin
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))}
                      onClick={() => router.push(item.href)}
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border px-4">
          <SidebarTrigger />
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Avatar className="size-8">
              <AvatarFallback>
                {(session.user.name ?? session.user.email ?? "A").slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Link href="/">
              <Button variant="ghost" size="sm">Exit</Button>
            </Link>
            <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLogoutOpen(true)}
                className="gap-1.5"
              >
                <LogOut className="size-4" />
                Log out
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out? You will need to sign in again to access the admin dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogoutConfirm}>
                    Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
