import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/data/products';

interface ProductFlipCardProps {
  product: Product;
}

export function ProductFlipCard({ product }: ProductFlipCardProps) {
  return (
    <div className="product-card group cursor-pointer" style={{ aspectRatio: '3/4' }}>
      {/* Image container */}
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/400x533/0d0d1a/ffffff?text=No+Image';
          }}
        />

        {/* Hover overlay — slides up from bottom */}
        <div className="product-card__overlay">
          <Button
            size="sm"
            className="product-card__cta"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Badge */}
      {product.badge && (
        <div className="product-card__badge-wrap">
          <Badge
            variant={
              product.badge === 'SALE'
                ? 'destructive'
                : product.badge === 'NEW'
                ? 'default'
                : 'secondary'
            }
            className="product-card__badge"
          >
            {product.badge === 'HOT' ? '🔥 HOT' : product.badge}
          </Badge>
        </div>
      )}

      {/* Info bar — always visible below image */}
      <div className="product-card__info">
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__prices">
          {product.originalPrice && (
            <span className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="product-card__price">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
}
