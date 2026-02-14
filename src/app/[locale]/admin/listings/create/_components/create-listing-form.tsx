"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { FileText, ImageIcon, Video } from "lucide-react";

const listingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["land", "house", "apartment", "studio", "other"]),
  transaction: z.enum(["sale", "rent"]),
  price: z.number().min(0),
  area_m2: z.number().min(0).optional().nullable(),
  bedrooms: z.number().min(0).optional().nullable(),
  bathrooms: z.number().min(0).optional().nullable(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  lat: z.number(),
  lng: z.number(),
  amenities: z.string(),
  tags: z.string(),
  featured: z.boolean(),
  status: z.enum([
    "draft",
    "pending",
    "approved",
    "active",
    "sold",
    "archived",
    "rejected",
  ]),
});

export type ListingFormValues = z.infer<typeof listingSchema>;

const defaultValues: ListingFormValues = {
  title: "",
  description: "",
  type: "house",
  transaction: "sale",
  price: 0,
  area_m2: null,
  bedrooms: null,
  bathrooms: null,
  address: "",
  city: "",
  region: "",
  country: "Cameroon",
  lat: 0,
  lng: 0,
  amenities: "",
  tags: "",
  featured: false,
  status: "draft",
};

async function uploadFile(
  uploadUrl: string,
  file: File
): Promise<{ storageId: string }> {
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { storageId: string };
  return data;
}

interface CreateListingFormProps {
  onSuccess?: () => void;
}

export function CreateListingForm({ onSuccess }: CreateListingFormProps) {
  const t = useTranslations("admin.createListingDialog");
  const tDetails = useTranslations("admin.createListingDialog.details");
  const tLocation = useTranslations("admin.createListingDialog.location");
  const tMedia = useTranslations("admin.createListingDialog.media");
  const tCommon = useTranslations("common");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const propertyTypeLabels: Record<ListingFormValues["type"], string> = {
    land: tDetails("typeLand"),
    house: tDetails("typeHouse"),
    apartment: tDetails("typeApartment"),
    studio: tDetails("typeStudio"),
    other: tDetails("typeOther"),
  };
  const transactionLabels: Record<ListingFormValues["transaction"], string> = {
    sale: tDetails("sale"),
    rent: tDetails("rent"),
  };
  const statusLabels: Record<ListingFormValues["status"], string> = {
    draft: tCommon("status.draft"),
    pending: tCommon("status.pending"),
    approved: tCommon("status.approved"),
    active: tCommon("status.active"),
    sold: tCommon("status.sold"),
    archived: tCommon("status.archived"),
    rejected: tCommon("status.rejected"),
  };

  const generateUploadUrl = useMutation(api.listings.generateUploadUrl);
  const createListing = useMutation(api.listings.createListing);

  const form = useForm<ListingFormValues>({
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const parsed = listingSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const [key, messages] = Object.entries(first)[0] ?? [];
      if (key && messages?.[0])
        form.setError(key as keyof ListingFormValues, { message: messages[0] });
      toast.error(t("formError"), {
        description: messages?.[0] ?? undefined,
      });
      return;
    }
    const values = parsed.data;
    if (imageFiles.length === 0) {
      form.setError("root", { message: "At least one image is required" });
      toast.error(t("formError"), {
        description: tMedia("imagesRequired"),
      });
      return;
    }

    setUploadProgress(0);
    const total =
      imageFiles.length + (videoFile ? 1 : 0) + documentFiles.length;
    let done = 0;

    const loadingToastId = "create-listing";
    toast.loading(t("creating"), { id: loadingToastId });

    try {
      const imageStorageIds: string[] = [];
      for (const file of imageFiles) {
        const url = await generateUploadUrl();
        const { storageId } = await uploadFile(url, file);
        imageStorageIds.push(storageId);
        done += 1;
        setUploadProgress((done / total) * 100);
      }

      let videoStorageId: string | undefined;
      let videoThumbnailStorageId: string | undefined;
      if (videoFile) {
        const url = await generateUploadUrl();
        const { storageId } = await uploadFile(url, videoFile);
        videoStorageId = storageId;
        done += 1;
        setUploadProgress((done / total) * 100);
      }

      const ownershipDocumentStorageIds: string[] = [];
      for (const file of documentFiles) {
        const url = await generateUploadUrl();
        const { storageId } = await uploadFile(url, file);
        ownershipDocumentStorageIds.push(storageId);
        done += 1;
        setUploadProgress((done / total) * 100);
      }

      await createListing({
        title: values.title,
        description: values.description,
        type: values.type,
        transaction: values.transaction,
        price: values.price,
        area_m2: values.area_m2 ?? undefined,
        bedrooms: values.bedrooms ?? undefined,
        bathrooms: values.bathrooms ?? undefined,
        location: {
          address: values.address,
          city: values.city,
          region: values.region || undefined,
          country: values.country,
          lat: values.lat,
          lng: values.lng,
        },
        amenities: values.amenities
          ? values.amenities.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        tags: values.tags
          ? values.tags.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        featured: values.featured,
        status: values.status,
        imageStorageIds,
        videoStorageId,
        videoThumbnailStorageId,
        ownershipDocumentStorageIds:
          ownershipDocumentStorageIds.length > 0
            ? ownershipDocumentStorageIds
            : undefined,
      });

      toast.dismiss(loadingToastId);
      toast.success(t("success"));
      onSuccess?.();
    } catch {
      toast.dismiss(loadingToastId);
      toast.error(t("error"));
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-fit">
          <TabsTrigger value="details">{t("tabs.details")}</TabsTrigger>
          <TabsTrigger value="location">{t("tabs.location")}</TabsTrigger>
          <TabsTrigger value="media">{t("tabs.media")}</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("tabs.details")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>{tDetails("title")}</FieldLabel>
                  <Input
                    {...form.register("title")}
                    placeholder={tDetails("titlePlaceholder")}
                  />
                  <FieldError errors={[form.formState.errors.title]} />
                </Field>
                <Field>
                  <FieldLabel>{tDetails("description")}</FieldLabel>
                  <Textarea
                    {...form.register("description")}
                    placeholder={tDetails("descriptionPlaceholder")}
                    rows={4}
                  />
                  <FieldError errors={[form.formState.errors.description]} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>{tDetails("type")}</FieldLabel>
                    <Select
                      value={form.watch("type")}
                      onValueChange={(v) =>
                        form.setValue("type", v as ListingFormValues["type"])
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {propertyTypeLabels[form.watch("type")]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="land">{tDetails("typeLand")}</SelectItem>
                        <SelectItem value="house">{tDetails("typeHouse")}</SelectItem>
                        <SelectItem value="apartment">{tDetails("typeApartment")}</SelectItem>
                        <SelectItem value="studio">{tDetails("typeStudio")}</SelectItem>
                        <SelectItem value="other">{tDetails("typeOther")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>{tDetails("transaction")}</FieldLabel>
                    <Select
                      value={form.watch("transaction")}
                      onValueChange={(v) =>
                        form.setValue("transaction", v as "sale" | "rent")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {transactionLabels[form.watch("transaction")]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">{tDetails("sale")}</SelectItem>
                        <SelectItem value="rent">{tDetails("rent")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>{tDetails("price")}</FieldLabel>
                  <Input
                    type="number"
                    placeholder={tDetails("pricePlaceholder")}
                    {...form.register("price", { valueAsNumber: true })}
                  />
                  <FieldError errors={[form.formState.errors.price]} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>{tDetails("area_m2")}</FieldLabel>
                    <Input
                      type="number"
                      placeholder={tDetails("areaPlaceholder")}
                      {...form.register("area_m2", {
                        setValueAs: (v) =>
                          v === "" || v === undefined ? null : Number(v),
                      })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>{tDetails("bedrooms")}</FieldLabel>
                    <Input
                      type="number"
                      min={0}
                      {...form.register("bedrooms", {
                        setValueAs: (v) =>
                          v === "" || v === undefined ? null : Number(v),
                      })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>{tDetails("bathrooms")}</FieldLabel>
                    <Input
                      type="number"
                      min={0}
                      {...form.register("bathrooms", {
                        setValueAs: (v) =>
                          v === "" || v === undefined ? null : Number(v),
                      })}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>{tDetails("amenities")}</FieldLabel>
                  <Input
                    {...form.register("amenities")}
                    placeholder={tDetails("amenitiesPlaceholder")}
                  />
                </Field>
                <Field>
                  <FieldLabel>{tDetails("tags")}</FieldLabel>
                  <Input
                    {...form.register("tags")}
                    placeholder={tDetails("tagsPlaceholder")}
                  />
                </Field>
                <div className="flex flex-wrap items-center gap-6">
                  <Field orientation="horizontal" className="flex-row items-center gap-2">
                    <Switch
                      checked={form.watch("featured")}
                      onCheckedChange={(v) => form.setValue("featured", v)}
                    />
                    <FieldLabel className="mb-0!">{tDetails("featured")}</FieldLabel>
                  </Field>
                  <Field>
                    <FieldLabel>{tDetails("status")}</FieldLabel>
                    <Select
                      value={form.watch("status")}
                      onValueChange={(v) =>
                        form.setValue("status", v as ListingFormValues["status"])
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          {statusLabels[form.watch("status")]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">{tCommon("status.draft")}</SelectItem>
                        <SelectItem value="pending">{tCommon("status.pending")}</SelectItem>
                        <SelectItem value="active">{tCommon("status.active")}</SelectItem>
                        <SelectItem value="approved">{tCommon("status.approved")}</SelectItem>
                        <SelectItem value="sold">{tCommon("status.sold")}</SelectItem>
                        <SelectItem value="archived">{tCommon("status.archived")}</SelectItem>
                        <SelectItem value="rejected">{tCommon("status.rejected")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="location" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("tabs.location")}</CardTitle>
              <CardDescription>{tLocation("address")} &amp; coordinates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>{tLocation("address")}</FieldLabel>
                  <Input
                    {...form.register("address")}
                    placeholder={tLocation("addressPlaceholder")}
                  />
                  <FieldError errors={[form.formState.errors.address]} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>{tLocation("city")}</FieldLabel>
                    <Input
                      {...form.register("city")}
                      placeholder={tLocation("cityPlaceholder")}
                    />
                    <FieldError errors={[form.formState.errors.city]} />
                  </Field>
                  <Field>
                    <FieldLabel>{tLocation("region")}</FieldLabel>
                    <Input
                      {...form.register("region")}
                      placeholder={tLocation("regionPlaceholder")}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>{tLocation("country")}</FieldLabel>
                  <Input
                    {...form.register("country")}
                    placeholder={tLocation("countryPlaceholder")}
                  />
                  <FieldError errors={[form.formState.errors.country]} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>{tLocation("lat")}</FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      placeholder={tLocation("latLngPlaceholder")}
                      {...form.register("lat", { valueAsNumber: true })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>{tLocation("lng")}</FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      placeholder={tLocation("latLngPlaceholder")}
                      {...form.register("lng", { valueAsNumber: true })}
                    />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="media" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("tabs.media")}</CardTitle>
              <CardDescription>{tMedia("imagesHint")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>{tMedia("images")}</FieldLabel>
                  <FieldDescription>{tMedia("imagesHint")}</FieldDescription>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Label
                      htmlFor="images-upload"
                      className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
                    >
                      <ImageIcon className="size-4" />
                      {tMedia("images")}
                    </Label>
                    <input
                      id="images-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        setImageFiles((prev) => [...prev, ...files]);
                      }}
                    />
                    {imageFiles.length > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {imageFiles.length} file(s)
                      </span>
                    )}
                  </div>
                </Field>
                <Field>
                  <FieldLabel>{tMedia("video")}</FieldLabel>
                  <FieldDescription>{tMedia("videoHint")}</FieldDescription>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="video-upload"
                      className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
                    >
                      <Video className="size-4" />
                      {tMedia("video")}
                    </Label>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="sr-only"
                      onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                    />
                    {videoFile && (
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {videoFile.name}
                      </span>
                    )}
                  </div>
                </Field>
                <Field>
                  <FieldLabel>{tMedia("ownershipDocuments")}</FieldLabel>
                  <FieldDescription>{tMedia("ownershipDocumentsHint")}</FieldDescription>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Label
                      htmlFor="docs-upload"
                      className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
                    >
                      <FileText className="size-4" />
                      {tMedia("ownershipDocuments")}
                    </Label>
                    <input
                      id="docs-upload"
                      type="file"
                      accept=".pdf,image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        setDocumentFiles((prev) => [...prev, ...files]);
                      }}
                    />
                    {documentFiles.length > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {documentFiles.length} file(s)
                      </span>
                    )}
                  </div>
                </Field>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{t("uploading")}</p>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t("creating") : t("create")}
        </Button>
      </div>
    </form>
  );
}
