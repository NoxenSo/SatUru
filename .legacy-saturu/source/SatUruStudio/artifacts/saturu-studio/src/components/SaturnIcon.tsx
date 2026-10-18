import { useId } from 'react';

interface SaturnIconProps {
  className?: string;
  /** Width/height in any CSS unit. Defaults to '1em' so it scales with surrounding text. */
  size?: number | string;
}

/**
 * Inline SVG Saturn icon with:
 *  - Purple-to-blue radial planet gradient
 *  - Tilted ring split into back + front arcs
 *  - Slow ring-glow sweep animation (CSS, GPU-friendly)
 *  - Subtle twinkle stars
 *
 * IDs are scoped per-instance via useId() to prevent SVG defs collisions.
 */
export function SaturnIcon({ className = '', size = '1em' }: SaturnIconProps) {
  const uid = useId().replace(/:/g, '');
  const pgId = `saturn-pg-${uid}`;
  const rgId = `saturn-rg-${uid}`;
  const rgFId = `saturn-rgf-${uid}`;
  const glowId = `saturn-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      style={{ verticalAlign: '-0.12em' }}
      aria-hidden="true"
    >
      <defs>
        {/* Planet gradient — slightly off-centre so it catches 'light' from upper-left */}
        <radialGradient id={pgId} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>

        {/* Ring gradient — transparent at tips, bright in the middle arc */}
        <linearGradient id={rgId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
          <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>

        {/* Front-arc gradient — slightly warmer/brighter than back arc */}
        <linearGradient id={rgFId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.05" />
          <stop offset="35%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
        </linearGradient>

        {/* Soft glow behind planet */}
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Ring back arc (drawn first, behind planet) ── */}
      <ellipse
        cx="15"
        cy="13"
        rx="13.5"
        ry="4.2"
        stroke={`url(#${rgId})`}
        strokeWidth="1.3"
        fill="none"
        className="saturn-ring"
      />

      {/* ── Glow halo ── */}
      <circle cx="15" cy="13" r="8.5" fill="#8b5cf6" opacity="0.12" filter={`url(#${glowId})`} className="saturn-halo" />

      {/* ── Planet ── */}
      <circle cx="15" cy="13" r="7" fill={`url(#${pgId})`} />

      {/* Specular highlight */}
      <ellipse cx="12.5" cy="10.5" rx="2.2" ry="1.4" fill="white" opacity="0.18" transform="rotate(-20 12.5 10.5)" />

      {/* ── Ring front arc (drawn last, over lower-half of planet) ──
          A cubic bezier that dips below the planet equator */}
      <path
        d="M 1.5 13 C 5 18.5 25 18.5 28.5 13"
        stroke={`url(#${rgFId})`}
        strokeWidth="1.5"
        fill="none"
        className="saturn-ring"
      />

      {/* ── Twinkle stars ── */}
      <circle cx="2.5" cy="5" r="0.9" fill="#c4b5fd" className="saturn-twinkle" style={{ animationDelay: '0s' }} />
      <circle cx="27" cy="3.5" r="0.7" fill="#93c5fd" className="saturn-twinkle" style={{ animationDelay: '1.4s' }} />
      <circle cx="25.5" cy="22.5" r="0.6" fill="#a78bfa" className="saturn-twinkle" style={{ animationDelay: '2.8s' }} />
      <circle cx="3.5" cy="21" r="0.5" fill="#60a5fa" className="saturn-twinkle" style={{ animationDelay: '0.7s' }} />
    </svg>
  );
}
