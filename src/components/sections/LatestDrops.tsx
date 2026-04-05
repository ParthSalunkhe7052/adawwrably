import { products } from '@/data/products';
import { ProductFlipCard } from '@/components/cards/ProductFlipCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function LatestDrops() {
  return (
    <section id="latest-drops" className="relative py-14 md:py-24 px-4 md:px-6 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <SectionHeading
          title="Latest Drops"
          subtitle="Fresh merch, straight from Japan"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductFlipCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
