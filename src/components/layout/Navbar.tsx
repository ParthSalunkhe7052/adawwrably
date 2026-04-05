import { useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import { Menu, Camera, Play, MessageCircle, Share2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './MobileMenu';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: Camera, href: 'https://www.instagram.com/adawwrably', label: 'Instagram' },
  { icon: Play, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  { icon: Share2, href: '#', label: 'Facebook' },
];

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-white/8'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <ImageWithFallback
              src="/Logo.png"
              alt="Adawwrably"
              className="h-8 md:h-10 w-auto object-contain"
            />
            <span
              className="hidden font-display text-xl uppercase tracking-wider text-foreground"
            >
              Adawwrably
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-sans font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer",
                    isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons (Cart + Mobile Menu + Desktop Social) */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Social Icons */}
            <div className="hidden md:flex items-center gap-4 mr-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer hover:bg-transparent"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full -mt-1 -mr-1">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        socialLinks={socialLinks}
      />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
