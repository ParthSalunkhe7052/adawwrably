import { collections } from '@/data/products';
import { CollectionCard } from '@/components/cards/CollectionCard';

export function CollectionsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6 max-w-[1400px] mx-auto bg-background">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display uppercase tracking-wider mb-4">Shop By Collection</h1>
        <p className="text-muted-foreground font-sans">Find your favourite universe</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((col, index) => (
          <CollectionCard
            key={col.id}
            name={col.name}
            count={col.count}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}
