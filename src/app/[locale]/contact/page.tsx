"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations("contact")
  const tCommon = useTranslations("common")
  const tLabel = useTranslations("common.label")
  const tPlaceholder = useTranslations("common.placeholder")
  const tButton = useTranslations("common.button")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert(t("form.success"))
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 sm:pb-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl">{t("form.title")}</CardTitle>
                <CardDescription>
                  {t("form.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{tLabel("name")}</Label>
                    <Input
                      id="name"
                      placeholder={tPlaceholder("name")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{tLabel("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={tPlaceholder("email")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{tLabel("phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={tPlaceholder("phone")}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{tLabel("subject")}</Label>
                    <Input
                      id="subject"
                      placeholder={tPlaceholder("subject")}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{tLabel("message")}</Label>
                    <Textarea
                      id="message"
                      placeholder={tPlaceholder("message")}
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <InteractiveHoverButton type="submit" className="tracking-tight uppercase text-xs sm:text-sm">
                    {tButton("sendMessage")}
                  </InteractiveHoverButton>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">{t("info.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("info.address")}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t("info.addressValue")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("info.phone")}</h3>
                    <a href="tel:+237612345678" className="text-muted-foreground hover:text-primary transition-colors">
                      +237 6 1234 5678
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("info.email")}</h3>
                    <a href="mailto:contact@imobuy.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@imobuy.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("info.businessHours")}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t("info.hoursValue")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{t("offices.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">{t("offices.mainOffice")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("offices.mainOfficeLocation")}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("offices.branchOffice")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("offices.branchOfficeLocation")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{t("quickContact.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="tel:+237612345678" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    {tButton("callNow")}
                  </a>
                  <a href="https://wa.me/237612345678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    {t("quickContact.whatsapp")}
                  </a>
                  <a href="mailto:contact@imobuy.com" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    {t("quickContact.sendEmail")}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
            {t("map.title")}
          </h2>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("map.placeholder")}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

