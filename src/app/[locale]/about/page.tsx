import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("metadata.about")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function AboutPage() {
  const t = await getTranslations("about")
  
  const values = [
    {
      title: t("transparency"),
      description: t("transparencyDesc"),
    },
    {
      title: t("reliability"),
      description: t("reliabilityDesc"),
    },
    {
      title: t("professionalism"),
      description: t("professionalismDesc"),
    },
  ]

  const team = [
    {
      name: "John Kim",
      role: "CEO & Founder",
      description: "15+ years of experience in real estate development and investment.",
    },
    {
      name: "Sarah Park",
      role: "Head of Sales",
      description: "Expert in property valuation and client relations.",
    },
    {
      name: "Michael Lee",
      role: "Legal Advisor",
      description: "Specialized in real estate law and transaction compliance.",
    },
    {
      name: "Emily Choi",
      role: "Property Manager",
      description: "Dedicated to property management and tenant relations.",
    },
  ]
  
  const partners = [
    t("partner1"),
    t("partner2"),
    t("partner3"),
    t("partner4"),
  ]

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

      {/* Company Overview */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("whoWeAre")}
          </h2>
          <div className="space-y-4 text-lg sm:text-xl text-muted-foreground">
            <p>
              {t("whoWeAreDesc1")}
            </p>
            <p>
              {t("whoWeAreDesc2")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl mb-4">{t("mission")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg text-muted-foreground">
                {t("missionDesc")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl mb-4">{t("vision")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg text-muted-foreground">
                {t("visionDesc")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center">
            {t("values")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center">
            {t("team")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("certifications")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            {t("certificationsDesc")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {partners.map((partner, idx) => (
              <Card key={idx} className="p-6">
                <p className="text-sm sm:text-base font-medium">{partner}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

