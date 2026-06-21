type HeroBannerProps = {
  className?: string;
  title?: string;
};

export function HeroBanner({ className = "", title = "THORPEBURY" }: HeroBannerProps) {
  const forest = "#1a3d32";

  return (
    <div
      className={[
        "hero-banner relative w-full overflow-hidden rounded-2xl shadow-card",
        className,
      ].join(" ")}
      role="img"
      aria-label={`${title} — Thorpebury in the Limes`}
    >
      <svg
        viewBox="0 0 1200 420"
        preserveAspectRatio="xMidYMid slice"
        className="block h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d8ede2" />
            <stop offset="55%" stopColor="#c8e4d4" />
            <stop offset="100%" stopColor="#bddcc8" />
          </linearGradient>

          <radialGradient id="hero-mist-1" cx="30%" cy="40%" r="45%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-mist-2" cx="72%" cy="28%" r="38%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-mist-3" cx="50%" cy="65%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1200" height="420" fill="url(#hero-sky)" />

        <ellipse cx="280" cy="120" rx="220" ry="70" fill="url(#hero-mist-1)" className="hero-mist-1" />
        <ellipse cx="880" cy="90" rx="200" ry="60" fill="url(#hero-mist-2)" className="hero-mist-2" />
        <ellipse cx="600" cy="200" rx="320" ry="90" fill="url(#hero-mist-3)" className="hero-mist-3" />
        <ellipse cx="150" cy="220" rx="140" ry="45" fill="#ffffff" opacity="0.2" />
        <ellipse cx="1050" cy="180" rx="160" ry="50" fill="#ffffff" opacity="0.18" />

        <rect x="0" y="318" width="1200" height="102" fill={forest} />

        <g fill={forest} className="hero-trees">
          {/* Left — wide spreading oak */}
          <rect x="348" y="268" width="14" height="50" rx="2" />
          <ellipse cx="355" cy="210" rx="78" ry="62" />
          <ellipse cx="310" cy="235" rx="52" ry="44" />
          <ellipse cx="400" cy="228" rx="58" ry="48" />
          <ellipse cx="340" cy="175" rx="48" ry="40" />
          <ellipse cx="385" cy="188" rx="42" ry="36" />

          {/* Centre — tall upright lime */}
          <rect x="593" y="218" width="12" height="100" rx="2" />
          <ellipse cx="599" cy="175" rx="38" ry="68" />
          <ellipse cx="575" cy="200" rx="28" ry="42" />
          <ellipse cx="623" cy="195" rx="30" ry="44" />
          <ellipse cx="599" cy="130" rx="32" ry="38" />

          {/* Right — rounded bushy tree */}
          <rect x="848" y="278" width="12" height="40" rx="2" />
          <ellipse cx="854" cy="238" rx="50" ry="48" />
          <ellipse cx="820" cy="255" rx="34" ry="32" />
          <ellipse cx="888" cy="250" rx="36" ry="34" />
          <ellipse cx="854" cy="210" rx="38" ry="34" />
        </g>

        <text
          x="600"
          y="378"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily='"DM Sans", system-ui, sans-serif'
          fontSize="42"
          fontWeight="700"
          letterSpacing="0.32em"
          className="hero-banner-title"
        >
          {title}
        </text>
      </svg>
    </div>
  );
}
