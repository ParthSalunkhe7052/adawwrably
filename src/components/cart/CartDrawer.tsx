import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-background border-border p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border/50">
          <SheetTitle className="text-2xl font-display uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Your Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 px-6 overflow-y-auto custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-xl font-display uppercase tracking-widest text-muted-foreground mb-6">
                Your cart is empty
              </p>
              <Button render={<Link to="/shop" />} onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 py-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-32 rounded-lg overflow-hidden border border-border/50 shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="font-sans font-medium line-clamp-2 leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <div className="font-sans font-medium">{formatPrice(item.price)}</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border/50 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-card mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-sans font-medium text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-sans font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <Button className="w-full h-14 text-lg font-sans uppercase tracking-widest" size="lg" onClick={() => {
              // Mock checkout
              alert("Proceeding to checkout");
            }}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
