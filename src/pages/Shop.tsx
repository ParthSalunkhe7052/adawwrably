import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, animeList } from '@/data/products';
import { ProductFlipCard } from '@/components/cards/ProductFlipCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Search } from 'lucide-react';

const categories = Array.from(new Set(products.map(p => p.category)));

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get('category');
  const selectedAnime = searchParams.get('anime');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const setFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchAnime = selectedAnime ? product.anime === selectedAnime : true;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchAnime && matchSearch;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = result.filter(p => p.badge === 'NEW').concat(result.filter(p => p.badge !== 'NEW'));
    }

    return result;
  }, [selectedCategory, selectedAnime, searchQuery, sortBy]);

  const SidebarContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-xl uppercase tracking-wider mb-4 border-b border-border/50 pb-2">
          Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setFilter('category', null)}
              className={`text-sm font-sans uppercase tracking-wider hover:text-primary transition-colors ${
                !selectedCategory ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setFilter('category', cat)}
                className={`text-sm font-sans uppercase tracking-wider hover:text-primary transition-colors text-left ${
                  selectedCategory === cat ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl uppercase tracking-wider mb-4 border-b border-border/50 pb-2">
          Shop By Anime
        </h3>
        <ul className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          <li>
            <button
              onClick={() => setFilter('anime', null)}
              className={`text-sm font-sans uppercase tracking-wider hover:text-primary transition-colors ${
                !selectedAnime ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              All Anime
            </button>
          </li>
          {animeList.map((anime) => (
            <li key={anime}>
              <button
                onClick={() => setFilter('anime', anime)}
                className={`text-sm font-sans uppercase tracking-wider hover:text-primary transition-colors text-left ${
                  selectedAnime === anime ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                {anime}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {(selectedCategory || selectedAnime) && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 max-w-[1400px] mx-auto bg-background">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-4xl font-display uppercase tracking-wider">Shop All</h1>
            
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              
              {/* Mobile Filter Trigger */}
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTrigger render={<Button variant="outline" className="md:hidden flex items-center gap-2" />}>
                  <Filter className="h-4 w-4" /> Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-border overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="font-display uppercase tracking-widest text-left">Filter Products</SheetTitle>
                  </SheetHeader>
                  <SidebarContent />
                </SheetContent>
              </Sheet>

              {/* Search Bar */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 h-10 pl-10 pr-4 rounded-md border border-border/50 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Sort Dropdown */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-md border border-border/50 bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-wider font-sans cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

            </div>
          </div>

          <div className="mb-6 text-sm text-muted-foreground font-sans uppercase tracking-wider">
            Showing {filteredProducts.length} results
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductFlipCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-border rounded-xl">
              <h2 className="text-xl font-display tracking-widest text-muted-foreground mb-2">No products found</h2>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
