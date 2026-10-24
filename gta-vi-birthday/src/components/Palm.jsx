// Silhueta de palmeira em SVG inline (sem imagens externas).
// Cada folha é o mesmo desenho, rotacionado ao redor da copa.
const FROND_ANGLES = [-172, -145, -118, -85, -55, -25, 8, 160, 135]

function Palm({ className = '' }) {
  return (
    <svg
      className={`palm ${className}`}
      viewBox="0 0 220 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M96 420 C92 310 110 210 102 120 L111 120 C121 210 106 310 112 420 Z" />
      <g transform="translate(106 118)">
        {FROND_ANGLES.map((angle) => (
          <path
            key={angle}
            transform={`rotate(${angle})`}
            d="M0 0 C26 -30 70 -32 108 12 C72 -6 28 -9 0 0 Z"
          />
        ))}
      </g>
    </svg>
  )
}

export default Palm
