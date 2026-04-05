import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Collections() {
  return (
    <section id="collections" className="relative py-14 md:py-24 px-0 overflow-hidden bg-transparent">
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
