import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "About Imobuy - Real Estate Platform",
  description: "Learn about Imobuy, our mission, vision, values, and team dedicated to bringing customers and sellers closer.",
}

export default function AboutPage() {
  const values = [
    {
      title: "Transparency",
      description: "We believe in complete transparency in all our transactions, ensuring clients have full visibility into every step of the process.",
    },
    {
      title: "Reliability",
      description: "Our commitment to reliability means you can trust us to deliver on our promises and provide consistent, high-quality service.",
    },
    {
      title: "Professionalism",
      description: "We maintain the highest standards of professionalism in all our interactions, from initial consultation to final transaction.",
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            About Imobuy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Bringing customers and sellers/agents closer to facilitate sales and transparency for houses, apartments, parcels, and more.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Who We Are
          </h2>
          <div className="space-y-4 text-lg sm:text-xl text-muted-foreground">
            <p>
              Imobuy is a leading real estate platform dedicated to connecting buyers, sellers, and agents in a transparent and efficient marketplace. Since our founding, we have been committed to revolutionizing the real estate industry by providing comprehensive services that make property transactions seamless and trustworthy.
            </p>
            <p>
              Our platform serves as a bridge between customers seeking their dream properties and sellers/agents looking to facilitate successful transactions. We understand that buying or selling property is one of life's most significant decisions, and we're here to make that process as smooth and transparent as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg text-muted-foreground">
                To create a transparent, efficient, and trustworthy real estate marketplace that brings customers and sellers closer together, facilitating successful property transactions while ensuring legal security and customer satisfaction.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl mb-4">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg text-muted-foreground">
                To become the most trusted and innovative real estate platform, setting new standards for transparency, customer service, and market expertise while expanding our reach to serve more clients across diverse property markets.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center">
            Our Values
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
            Our Team
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
            Certifications & Partners
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            We are proud to be certified and partnered with leading institutions in the real estate industry.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {["Real Estate Association", "Legal Compliance Board", "Property Management Institute", "Investment Advisory Council"].map((partner, idx) => (
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

