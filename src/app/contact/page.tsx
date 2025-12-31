"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"

export default function ContactPage() {
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
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Get in touch with our team for inquiries, property viewings, or any questions
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
                <CardTitle className="text-2xl sm:text-3xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+82 2 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <InteractiveHoverButton type="submit" className="tracking-tight uppercase text-xs sm:text-sm">
                    Send Message
                  </InteractiveHoverButton>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      123 Real Estate Avenue<br />
                      Seoul, South Korea
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Phone</h3>
                    <a href="tel:+82212345678" className="text-muted-foreground hover:text-primary transition-colors">
                      +82 2 1234 5678
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <a href="mailto:contact@imobuy.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@imobuy.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday to Friday: 9:00am - 6:00pm<br />
                      Saturday: 10:00am - 4:00pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Office Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Main Office</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Real Estate Avenue, Seoul
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Branch Office</h4>
                    <p className="text-sm text-muted-foreground">
                      456 Property Street, Gangnam
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="tel:+82212345678" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    Call Now
                  </a>
                  <a href="https://wa.me/82123456789" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    WhatsApp
                  </a>
                  <a href="mailto:contact@imobuy.com" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    Send Email
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
            Find Us
          </h2>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              Map integration placeholder
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

