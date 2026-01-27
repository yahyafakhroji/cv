import { Hero, About, Experience, Projects, Skills, Contact, Footer } from '@/components/sections';
import { CRTBoot } from '@/components/animations/crt-boot';
import { ZoneTransition } from '@/components/ui/zone-transition';
import { ZoneIndicator } from '@/components/ui/zone-indicator';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Noise overlay for the whole page */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-50" />

      {/* Zone indicator navigation (fixed right-side dots) */}
      <ZoneIndicator />

      {/* CRT boot sequence wraps all section content */}
      <CRTBoot>
        <Hero />
        <ZoneTransition />
        <About />
        <ZoneTransition variant="vhs" />
        <Experience />
        <ZoneTransition />
        <Projects />
        <ZoneTransition variant="vhs" />
        <Skills />
        <ZoneTransition />
        <Contact />
      </CRTBoot>

      <Footer />
    </main>
  );
}
