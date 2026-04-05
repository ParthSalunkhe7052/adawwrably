import { HeroSection } from '@/components/sections/HeroSection';
import { Marquee } from '@/components/sections/Marquee';
import { LatestDrops } from '@/components/sections/LatestDrops';
import { Collections } from '@/components/sections/Collections';
import { Testimonials } from '@/components/sections/Testimonials';
import { HappyCustomers } from '@/components/sections/HappyCustomers';
import { ScrollVideoBackground } from '@/components/shared/ScrollVideoBackground';

export function Home() {
  return (
    <>
      {/* Scroll-linked video background */}
      <ScrollVideoBackground />

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

        {/* Section 6: Happy Customers */}
        <HappyCustomers />
      </main>
    </>
  );
}
