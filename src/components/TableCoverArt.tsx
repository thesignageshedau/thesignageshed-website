// Simple drawing of a table with a printed fitted throw (decorative).
export default function TableCoverArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 230"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <pattern
          id="tc-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="8" cy="8" r="1.6" fill="#F2EBDD" opacity="0.3" />
        </pattern>
      </defs>
      <ellipse
        cx="160"
        cy="214"
        rx="140"
        ry="9"
        fill="#33373A"
        opacity="0.14"
      />
      {/* table top (seen from slightly above) */}
      <path d="M58 62 L262 62 L292 88 L28 88 Z" fill="#A2461F" />
      <path d="M58 62 L262 62 L292 88 L28 88 Z" fill="url(#tc-dots)" />
      {/* front drop */}
      <rect x="28" y="88" width="264" height="122" fill="#C0582F" />
      <rect x="28" y="88" width="264" height="122" fill="url(#tc-dots)" />
      {/* side drop hint */}
      <path d="M292 88 L300 96 L300 214 L292 210 Z" fill="#8E3D1B" />
      <rect x="96" y="112" width="128" height="62" rx="9" fill="#33373A" />
      <rect
        x="102"
        y="118"
        width="116"
        height="50"
        rx="6"
        fill="none"
        stroke="#E8946C"
        strokeWidth="2"
      />
      <text
        x="160"
        y="140"
        textAnchor="middle"
        fontFamily="Ultra, Georgia, serif"
        fontSize="15"
        fill="#F2EBDD"
      >
        YOUR
      </text>
      <text
        x="160"
        y="159"
        textAnchor="middle"
        fontFamily="Ultra, Georgia, serif"
        fontSize="15"
        fill="#F2EBDD"
      >
        BRAND
      </text>
      <text
        x="160"
        y="196"
        textAnchor="middle"
        fontFamily="'Zilla Slab', Georgia, serif"
        fontWeight="700"
        fontSize="12"
        letterSpacing="3"
        fill="#FAF6EE"
      >
        YOURBRAND.COM.AU
      </text>
      <path
        d="M40 98 H110"
        stroke="#FAF6EE"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
