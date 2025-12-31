import Hero from "./hero"
import ReactLenis from "lenis/react";
import WorksSection from "./works-section";
import TestimonialsSections from "./testimonials-sections";
import FooterSection from "./footer-section";
import Menu from "@/components/menu";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative flex flex-col w-screen min-h-screen h-full p-0 m-0 overflow-x-hidden">
        <Menu />
        <Hero />
        <WorksSection />
        <TestimonialsSections />
        <FooterSection />
      </div>
    </ReactLenis>
  );
}
