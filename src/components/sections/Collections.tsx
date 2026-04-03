import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Collections() {
  return (
    <section id="collections" className="relative py-24 px-0 overflow-hidden">
      {/* Background Image with Blending */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/hero2.png')" }}
      />
      {/* Gradient overlay for seamless blending with other sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <SectionHeading
          title="Shop by Collection"
          subtitle="Discover your next anime obsession"
        />
      </div>

      <div className="relative z-10 mt-8">
        <ImageAutoSlider />
      </div>
    </section>
  );
}
