import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;        // Brand color (e.g., '#CC39A4' for Instagram)
  position: 'tl' | 'tr' | 'bl' | 'br'; // Corner radius position
}

const radiusMap = {
  tl: 'rounded-[45px_5px_5px_5px]',   // Top-left rounded
  tr: 'rounded-[5px_45px_5px_5px]',   // Top-right rounded
  bl: 'rounded-[5px_5px_5px_45px]',   // Bottom-left rounded
  br: 'rounded-[5px_5px_45px_5px]',   // Bottom-right rounded
};

export function SocialButton({ icon: Icon, label, href, color, position }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'w-[72px] h-[72px] md:w-[80px] md:h-[80px] flex items-center justify-center',
        'bg-card border border-border/50',
        'transition-all duration-200 ease-in-out cursor-pointer',
        'hover:scale-110',
        radiusMap[position]
      )}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = color;
        e.currentTarget.querySelector('svg')?.classList.add('text-white');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '';
        e.currentTarget.querySelector('svg')?.classList.remove('text-white');
      }}
    >
      <Icon className="h-6 w-6 transition-colors duration-200" style={{ color }} />
    </a>
  );
}
