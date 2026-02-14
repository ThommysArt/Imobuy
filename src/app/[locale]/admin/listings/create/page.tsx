"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CreateListingForm } from "@/components/admin/create-listing-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function AdminCreateListingPage() {
  const t = useTranslations("admin");
  const tDialog = useTranslations("admin.createListingDialog");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/admin/listings">
          <Button variant="ghost" size="icon" title={t("backToListings")}>
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{tDialog("title")}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{tDialog("description")}</p>
        </div>
      </div>
      <CreateListingForm
        onSuccess={() => {
          router.push("/admin/listings");
        }}
      />
    </div>
  );
}
