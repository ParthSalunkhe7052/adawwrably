import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { NotFound } from './NotFound';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <Button variant="ghost" render={<Link to="/shop" />} className="mb-8 font-sans uppercase tracking-wider text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover aspect-[3/4]"
            />
            {product.badge && (
              <Badge
                variant={product.badge === 'SALE' ? 'destructive' : product.badge === 'NEW' ? 'default' : 'secondary'}
                className="absolute top-4 left-4"
              >
                {product.badge === 'HOT' ? '🔥 HOT' : product.badge}
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8 py-4">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="outline" className="font-sans uppercase tracking-wider">{product.category}</Badge>
                <Badge variant="outline" className="font-sans uppercase tracking-wider">{product.anime}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-2xl font-sans font-medium">
                <span className="text-foreground">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-xl">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-muted-foreground font-sans">
              <p>
                A must-have for any true fan. This premium quality item is designed with meticulous attention to detail,
                capturing the essence of your favorite character. Perfect for your collection or as a gift.
              </p>
            </div>

            <div className="pt-6 border-t border-border/50">
              <Button 
                size="lg" 
                className="w-full md:w-auto h-14 px-8 text-lg font-sans uppercase tracking-widest"
                onClick={() => addItem(product)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-8 text-sm font-sans text-muted-foreground">
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <span className="block text-2xl mb-2">✨</span>
                Premium Quality
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <span className="block text-2xl mb-2">🚚</span>
                Fast Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
