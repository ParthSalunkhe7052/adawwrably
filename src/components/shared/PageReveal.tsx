import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function PageReveal() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 600);
    const hideTimer = setTimeout(() => setPhase('hidden'), 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] bg-background flex items-center justify-center',
        'transition-opacity duration-400 ease-out',
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      )}
    >
      <img
        src="/Logo.png"
        alt="Loading..."
        className="w-24 h-auto animate-pulse"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/100x40/000000/ffffff?text=LOGO';
        }}
      />
    </div>
  );
}
