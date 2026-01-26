import { Hero, About, Experience, Projects, Skills, Contact, Footer } from '@/components/sections';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Noise overlay for the whole page */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-50" />

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
