import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  socialLinks: { icon: LucideIcon; href: string; label: string }[];
}

export function MobileMenu({ open, onClose, navLinks, socialLinks }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="bg-background border-border w-full sm:w-80">
        <SheetHeader>
          <SheetTitle>
            <ImageWithFallback 
              src="/Logo.png" 
              alt="Adawwrably" 
              className="h-10 w-auto" 
            />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 mt-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              onClick={onClose}
              className={({ isActive }) => cn(
                "py-3 px-4 text-lg font-sans font-medium uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer",
                isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Separator className="my-6" />

        <div className="flex items-center gap-4 px-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="
                p-3 rounded-xl bg-muted text-muted-foreground
                hover:bg-primary hover:text-white
                transition-all duration-200
                cursor-pointer
              "
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
