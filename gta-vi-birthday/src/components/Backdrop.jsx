import Palm from './Palm.jsx'

// Prédios: [x, largura, altura] em um viewBox de 1200 x 220.
const BUILDINGS = [
  [0, 70, 90], [70, 50, 140], [120, 80, 110], [200, 60, 170], [260, 90, 100],
  [350, 55, 150], [405, 75, 125], [480, 65, 190], [545, 85, 115], [630, 50, 145],
  [680, 80, 100], [760, 60, 175], [820, 90, 120], [910, 55, 150], [965, 75, 105],
  [1040, 60, 165], [1100, 100, 95],
]
const WINDOW_COLORS = ['#2ee6ff', '#ff2d95', '#ff8a3d']

// Janelas acesas geradas de forma determinística (sem Math.random,
// para o cenário ser sempre igual).
function buildWindows() {
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const windows = []
  BUILDINGS.forEach(([x, w, h]) => {
    for (let i = 0; i < 5; i += 1) {
      windows.push({
        x: Math.round(x + 6 + rand() * (w - 18)),
        y: Math.round(220 - h + 10 + rand() * (h - 34)),
        color: WINDOW_COLORS[Math.floor(rand() * WINDOW_COLORS.length)],
      })
    }
  })
  return windows
}
const WINDOWS = buildWindows()

// Cenário fixo atrás de todo o conteúdo: estrelas, pôr do sol,
// neblina do horizonte, skyline e palmeiras. Feito só com CSS e SVG.
function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__stars" />
      <div className="backdrop__sun" />
      <div className="backdrop__haze" />

      <svg
        className="backdrop__skyline"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        {BUILDINGS.map(([x, w, h]) => (
          <rect key={x} x={x} y={220 - h} width={w} height={h} />
        ))}
        <g className="backdrop__windows">
          {WINDOWS.map((win, i) => (
            <rect key={i} x={win.x} y={win.y} width="4" height="6" fill={win.color} />
          ))}
        </g>
      </svg>

      <Palm className="palm--left" />
      <Palm className="palm--right" />
      <Palm className="palm--small" />
    </div>
  )
}

export default Backdrop
