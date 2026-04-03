import { products } from '@/data/products';
import { ProductFlipCard } from '@/components/cards/ProductFlipCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function LatestDrops() {
  return (
    <section id="latest-drops" className="relative py-24 px-6 overflow-hidden">
      {/* Background Image with Blending */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/hero3.png')" }}
      />
      {/* Gradient overlay for seamless blending with other sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <SectionHeading
          title="Latest Drops"
          subtitle="Fresh merch, straight from Japan"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductFlipCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
