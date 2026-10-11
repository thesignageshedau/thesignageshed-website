// Simple drawing of a straight stretch fabric media wall (decorative).
export default function MediaWallArt({
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
          id="mw-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="8" cy="8" r="1.6" fill="#F2EBDD" opacity="0.35" />
        </pattern>
      </defs>
      <ellipse
        cx="160"
        cy="236"
        rx="132"
        ry="8"
        fill="#33373A"
        opacity="0.12"
      />
      {/* feet */}
      <rect x="40" y="226" width="56" height="7" rx="3.5" fill="#3B3F40" />
      <rect x="224" y="226" width="56" height="7" rx="3.5" fill="#3B3F40" />
      {/* fabric sleeve with rounded top corners */}
      <path
        d="M48 228 V34 Q48 14 68 14 H252 Q272 14 272 34 V228 Z"
        fill="#C0582F"
      />
      <path
        d="M48 228 V34 Q48 14 68 14 H252 Q272 14 272 34 V228 Z"
        fill="url(#mw-dots)"
      />
      <path d="M48 168 H272 V228 H48 Z" fill="#A2461F" />
      <rect x="92" y="62" width="136" height="72" rx="10" fill="#33373A" />
      <rect
        x="99"
        y="69"
        width="122"
        height="58"
        rx="7"
        fill="none"
        stroke="#E8946C"
        strokeWidth="2"
      />
      <text
        x="160"
        y="96"
        textAnchor="middle"
        fontFamily="Ultra, Georgia, serif"
        fontSize="17"
        fill="#F2EBDD"
      >
        YOUR
      </text>
      <text
        x="160"
        y="117"
        textAnchor="middle"
        fontFamily="Ultra, Georgia, serif"
        fontSize="17"
        fill="#F2EBDD"
      >
        BRAND
      </text>
      <text
        x="160"
        y="203"
        textAnchor="middle"
        fontFamily="'Zilla Slab', Georgia, serif"
        fontWeight="700"
        fontSize="15"
        letterSpacing="3"
        fill="#FAF6EE"
      >
        YOUR EVENT · 2026
      </text>
      {/* sheen */}
      <path
        d="M62 30 Q66 22 76 22 H120"
        stroke="#FAF6EE"
        strokeOpacity="0.4"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
