import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const hudItems = [
  { label: 'HOME', sectionId: 'hero' },
  { label: 'LATEST', sectionId: 'latest-drops' },
  { label: 'COLLECTIONS', sectionId: 'collections' },
  { label: 'CONTACT', sectionId: 'contact' },
];

export function SideHUD() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );

    // Observe each section that corresponds to HUD items
    const sections = ['hero', 'latest-drops', 'collections', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-start">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

      <div className="flex flex-col gap-6 pl-4">
        {hudItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.sectionId}`}
            className={cn(
              'relative text-[11px] font-sans font-bold uppercase tracking-[3px] transition-all duration-300 cursor-pointer',
              activeSection === item.sectionId
                ? 'text-primary'
                : 'text-muted-foreground/50 hover:text-muted-foreground'
            )}
            style={{
              textShadow: '0 0 8px rgba(8, 8, 15, 0.9)',
            }}
          >
            {/* Active indicator tick */}
            <span
              className={cn(
                'absolute -left-4 top-1/2 -translate-y-1/2 h-px transition-all duration-300',
                activeSection === item.sectionId
                  ? 'w-3 bg-primary'
                  : 'w-1.5 bg-white/20'
              )}
            />
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
