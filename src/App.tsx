import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { Marquee } from '@/components/sections/Marquee';
import { LatestDrops } from '@/components/sections/LatestDrops';
import { Collections } from '@/components/sections/Collections';
import { Testimonials } from '@/components/sections/Testimonials';
import { PageReveal } from '@/components/shared/PageReveal';

function App() {
  return (
    <>
      {/* Entry animation overlay */}
      <PageReveal />

      {/* Fixed elements (always visible) */}
      <Navbar />

      {/* Scrollable content */}
      <main>
        {/* Section 1: Full-viewport cinematic hero */}
        <HeroSection />

        {/* Section 2: Announcement ticker */}
        <Marquee />

        {/* Section 3: Category collection carousel */}
        <Collections />

        {/* Section 4: Product flip cards */}
        <LatestDrops />

        {/* Section 5: Testimonials */}
        <Testimonials />
      </main>

      {/* Footer with social buttons */}
      <Footer />
    </>
  );
}

export default App;
