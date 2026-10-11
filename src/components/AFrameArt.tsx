// Simple drawing of two A-frame sandwich boards (decorative).
export default function AFrameArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 250"
      className={className}
      aria-hidden
      focusable="false"
    >
      <ellipse
        cx="160"
        cy="238"
        rx="135"
        ry="8"
        fill="#33373A"
        opacity="0.14"
      />
      {/* back frame: folding corflute A-frame with legs */}
      <g>
        <path
          d="M196 70 H290 L300 232 H272 L268 200 H218 L214 232 H186 Z"
          fill="#5E8C61"
          stroke="#33373A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect x="224" y="80" width="38" height="12" rx="6" fill="#33373A" />
        <rect x="210" y="108" width="66" height="22" rx="4" fill="#F2EBDD" />
        <path
          d="M214 146 H272 M218 162 H268 M222 178 H264"
          stroke="#FAF6EE"
          strokeOpacity="0.8"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      {/* front frame: printed A-frame on a metal frame */}
      <g>
        <path
          d="M60 40 L28 232"
          stroke="#7A7E82"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M150 40 L182 232"
          stroke="#7A7E82"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="92" y="30" width="26" height="12" rx="4" fill="#7A7E82" />
        <path
          d="M62 46 H148 L174 214 H36 Z"
          fill="#C0582F"
          stroke="#33373A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect x="70" y="66" width="70" height="30" rx="4" fill="#F2EBDD" />
        <text
          x="105"
          y="87"
          textAnchor="middle"
          fontFamily="Ultra, serif"
          fontSize="15"
          fill="#33373A"
        >
          OPEN
        </text>
        <path
          d="M64 122 H146 M60 142 H150 M56 162 H154"
          stroke="#FAF6EE"
          strokeOpacity="0.85"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <rect x="70" y="180" width="70" height="20" rx="10" fill="#33373A" />
      </g>
    </svg>
  );
}
