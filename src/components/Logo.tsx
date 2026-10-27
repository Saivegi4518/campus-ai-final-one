/** Brand mark: campus card + neural node motif + spark/navigation cue.
 *  Optimised for light backgrounds. Lightweight inline SVG.
 */
export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="CampusAI logo"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="campusai-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="0.45" stopColor="#4F7CFF" />
          <stop offset="0.8" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#E0B8FF" />
        </linearGradient>
        <radialGradient id="campusai-h" cx="50%" cy="42%" r="55%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#4F7CFF" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Campus card background — soft glassy rounded square */}
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#campusai-h)" />
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="15.5"
        fill="none"
        stroke="url(#campusai-g)"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />

      {/* Neural network node motif — 5 nodes connected in a web */}
      <g stroke="url(#campusai-g)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="32" y1="14" x2="32" y2="24" />
        <line x1="32" y1="40" x2="32" y2="50" />
        <line x1="14" y1="32" x2="24" y2="32" />
        <line x1="40" y1="32" x2="50" y2="32" />
        <line x1="14" y1="14" x2="32" y2="32" />
        <line x1="50" y1="14" x2="32" y2="32" />
        <line x1="14" y1="50" x2="32" y2="32" />
        <line x1="50" y1="50" x2="32" y2="32" />
      </g>

      <g fill="url(#campusai-g)">
        <circle cx="32" cy="14" r="2.4" />
        <circle cx="32" cy="50" r="2.4" />
        <circle cx="14" cy="32" r="2.4" />
        <circle cx="50" cy="32" r="2.4" />
      </g>

      {/* Central hub — graduation cap / building silhouette + spark */}
      <g>
        <circle cx="32" cy="32" r="11" fill="none" stroke="url(#campusai-g)" strokeWidth="2.6" />
        <circle cx="32" cy="32" r="3.8" fill="url(#campusai-g)" />
        {/* Spark / navigation cue — top-right arrow */}
        <path
          d="M46 18 L46 13 L41 13"
          fill="none"
          stroke="url(#campusai-g)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M46 18 L46 13 L41 13"
          fill="none"
          stroke="url(#campusai-g)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}