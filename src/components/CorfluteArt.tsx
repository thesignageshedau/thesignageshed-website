// Simple drawing of two printed corflute signs (decorative).
export default function CorfluteArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 250"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <pattern
          id="cf-flutes"
          width="6"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="3"
            y1="0"
            x2="3"
            y2="10"
            stroke="#FAF6EE"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <ellipse
        cx="160"
        cy="236"
        rx="135"
        ry="8"
        fill="#33373A"
        opacity="0.14"
      />
      {/* landscape sign at the back */}
      <g transform="rotate(-4 220 120)">
        <rect
          x="150"
          y="56"
          width="150"
          height="112"
          rx="3"
          fill="#F2EBDD"
          stroke="#33373A"
          strokeWidth="3"
        />
        <rect x="150" y="56" width="150" height="34" fill="#5E8C61" />
        <path
          d="M168 110 H282 M168 126 H262 M168 142 H274"
          stroke="#33373A"
          strokeOpacity="0.55"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {[
          [160, 66],
          [290, 66],
          [160, 158],
          [290, 158],
        ].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="4.5"
            fill="#FAF6EE"
            stroke="#A9AEB2"
            strokeWidth="2"
          />
        ))}
      </g>
      {/* portrait sign at the front */}
      <rect
        x="34"
        y="40"
        width="128"
        height="188"
        rx="3"
        fill="#C0582F"
        stroke="#33373A"
        strokeWidth="3"
      />
      <rect
        x="34"
        y="40"
        width="128"
        height="188"
        rx="3"
        fill="url(#cf-flutes)"
      />
      <rect x="52" y="64" width="92" height="30" rx="4" fill="#F2EBDD" />
      <text
        x="98"
        y="85"
        textAnchor="middle"
        fontFamily="Ultra, serif"
        fontSize="17"
        fill="#33373A"
      >
        SALE
      </text>
      <path
        d="M54 120 H142 M60 138 H136 M66 156 H130"
        stroke="#FAF6EE"
        strokeOpacity="0.8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="62" y="180" width="72" height="26" rx="13" fill="#33373A" />
      <path
        d="M78 193 H118"
        stroke="#F2EBDD"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[
        [44, 50],
        [152, 50],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="4.5"
          fill="#FAF6EE"
          stroke="#A9AEB2"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
