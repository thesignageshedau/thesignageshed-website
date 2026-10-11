// Simple drawing of two pull up banner stands (decorative).
export default function PullUpBannerArt({
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
          id="pu-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="8" cy="8" r="1.6" fill="#F2EBDD" opacity="0.3" />
        </pattern>
      </defs>
      <ellipse
        cx="160"
        cy="238"
        rx="130"
        ry="8"
        fill="#33373A"
        opacity="0.14"
      />
      {/* back stand (smaller, shopping centre height) */}
      <rect x="196" y="78" width="78" height="142" fill="#8E3D1B" />
      <rect x="196" y="78" width="78" height="142" fill="url(#pu-dots)" />
      <rect x="192" y="74" width="86" height="6" rx="3" fill="#A9AEB2" />
      <rect x="216" y="104" width="38" height="38" rx="19" fill="#F2EBDD" opacity="0.9" />
      <path
        d="M210 160 H260 M214 172 H256"
        stroke="#FAF6EE"
        strokeOpacity="0.6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="188" y="218" width="94" height="14" rx="5" fill="#A9AEB2" />
      {/* front stand (full height) */}
      <rect x="62" y="22" width="112" height="198" fill="#C0582F" />
      <rect x="62" y="22" width="112" height="198" fill="url(#pu-dots)" />
      <rect x="57" y="17" width="122" height="7" rx="3.5" fill="#A9AEB2" />
      <rect x="76" y="48" width="84" height="56" rx="8" fill="#33373A" />
      <rect
        x="81"
        y="53"
        width="74"
        height="46"
        rx="5"
        fill="none"
        stroke="#E8946C"
        strokeWidth="2"
      />
      <text
        x="118"
        y="74"
        textAnchor="middle"
        fontFamily="Ultra, Georgia, serif"
        fontSize="13"
        fill="#F2EBDD"
      >
        YOUR
      </text>
      <text
        x="118"
        y="91"
        textAnchor="middle"
        fontFamily="Ultra, Georgia, serif"
        fontSize="13"
        fill="#F2EBDD"
      >
        BRAND
      </text>
      <path
        d="M80 128 H156 M86 142 H150 M92 156 H144"
        stroke="#FAF6EE"
        strokeOpacity="0.55"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text
        x="118"
        y="192"
        textAnchor="middle"
        fontFamily="'Zilla Slab', Georgia, serif"
        fontWeight="700"
        fontSize="9"
        letterSpacing="1.5"
        fill="#FAF6EE"
      >
        YOURBRAND.COM.AU
      </text>
      <rect x="52" y="218" width="132" height="15" rx="5" fill="#A9AEB2" />
      <rect x="60" y="222" width="116" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}
