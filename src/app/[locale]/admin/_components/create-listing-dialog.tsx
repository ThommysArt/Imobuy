"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";

export function CreateListingButton() {
  const t = useTranslations("admin");
  return (
    <Link href="/admin/listings/create">
      <Button>
        <Plus className="size-4 mr-2" />
        {t("createListing")}
      </Button>
    </Link>
  );
}
