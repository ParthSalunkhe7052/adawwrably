import { announcements } from '@/data/products';

export function Marquee() {
  const items = [...announcements, ...announcements, ...announcements];

  return (
    <section
      className="overflow-hidden py-3 relative group"
      style={{ backgroundColor: 'hsl(354deg 100% 57%)' }}
    >
      <div
        className="animate-marquee group-hover:[animation-play-state:paused]"
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
      >
        {items.map((text, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'white',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              flexShrink: 0,
            }}
          >
            {text}
            <span style={{ margin: '0 1rem', opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
