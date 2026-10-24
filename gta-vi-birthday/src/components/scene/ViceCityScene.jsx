import { useEffect, useRef, useState } from 'react'
import desktopAvif from '../../assets/scene/vice-city-desktop.avif'
import desktopWebp from '../../assets/scene/vice-city-desktop.webp'
import mobileAvif from '../../assets/scene/vice-city-mobile.avif'
import mobileWebp from '../../assets/scene/vice-city-mobile.webp'

// Em telas estreitas ou "em pé" usamos o recorte vertical (sol, skyline e iate).
const MOBILE_QUERY = '(max-width: 700px), (max-aspect-ratio: 4/5)'

// Cenário da abertura: ilustração de Vice City ao pôr do sol.
// A imagem fica no fundo; título, nome e botão são elementos reais da interface.
// Enquanto ela carrega, aparece um degradê parecido (.scene) e depois um fade.
function ViceCityScene() {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Se a imagem já estava em cache, o onLoad pode ter disparado antes do React.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div className="scene" aria-hidden="true">
      <picture>
        <source media={MOBILE_QUERY} type="image/avif" srcSet={mobileAvif} />
        <source media={MOBILE_QUERY} type="image/webp" srcSet={mobileWebp} />
        <source type="image/avif" srcSet={desktopAvif} />
        <source type="image/webp" srcSet={desktopWebp} />
        <img
          ref={imgRef}
          className={`scene__photo ${loaded ? 'is-loaded' : ''}`}
          src={desktopWebp}
          alt=""
          width="1671"
          height="941"
          decoding="async"
          fetchpriority="high"
          onLoad={() => setLoaded(true)}
        />
      </picture>

      {/* Camadas de leitura e atmosfera */}
      <div className="scene__scrim" />
      <div className="scene__vignette" />
      <div className="scene__grain" />
    </div>
  )
}

export default ViceCityScene
