import { useScrollPosition } from '@/hooks/useScrollPosition';
import { FlowButton } from '@/components/ui/flow-button';

export function HeroSection() {
  const { scrollY } = useScrollPosition();

  // Fade out hero content as user scrolls
  const opacity = Math.max(0, 1 - scrollY / 550);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center bg-transparent"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Layer 3: Content ── */}
      <div
        className="relative z-10 text-center px-6 flex flex-col items-center justify-start h-full pt-24 md:pt-28"
        style={{
          transform: `translate3d(0, -${scrollY * 0.25}px, 0)`,
          opacity,
          willChange: 'transform, opacity',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Subtitle */}
        <p
          className="relative z-20"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.05rem, 2.8vw, 1.7rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)',
            marginBottom: '1.5rem',
            fontWeight: 700,
          }}
        >
          India&apos;s Biggest Anime Merch Store
        </p>

        {/* Spacer for embedded image text */}
        <div className="h-[20vh] md:h-[350px]" />

        {/* CTA Button */}
        <a href="#latest-drops" className="inline-block relative z-20 mt-6 md:mt-8">
          <FlowButton text="SHOP NOW" />
        </a>
      </div>
    </section>
  );
}
