import { useScrollPosition } from '@/hooks/useScrollPosition';
import { FlowButton } from '@/components/ui/flow-button';
import { ShaderAnimation } from '@/components/ui/shader-animation';

export function HeroSection() {
  const { scrollY } = useScrollPosition();

  // Parallax: background moves up at 0.15x scroll speed (subtle)
  const bgOffset = scrollY * 0.15;
  // Fade out hero content as user scrolls
  const opacity = Math.max(0, 1 - scrollY / 550);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Layer 1: Background Image ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/cute-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: `translate3d(0, ${bgOffset}px, 0)`,
          willChange: 'transform',
          backgroundColor: '#08080f',
        }}
      />

      {/* ── Layer 1.5: Shader Animation Overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate3d(0, ${bgOffset}px, 0)`,
          willChange: 'transform',
          mixBlendMode: 'screen',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <ShaderAnimation />
      </div>

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
        <div style={{ height: 'min(42vh, 430px)' }} />

        {/* CTA Button */}
        <a href="#latest-drops" className="inline-block relative z-20 mt-10 md:mt-12">
          <FlowButton text="SHOP NOW" />
        </a>
      </div>
    </section>
  );
}
