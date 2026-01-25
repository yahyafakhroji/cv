import {
  Hero,
  About,
  Experience,
  Projects,
  Skills,
  Contact,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Noise overlay for the whole page */}
      <div className="fixed inset-0 pointer-events-none z-50 noise-overlay opacity-50" />

      {/* Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
