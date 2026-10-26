import { useEffect, useRef, useState } from 'react'

// Em telas estreitas ou "em pé" usamos o recorte vertical da imagem.
const MOBILE_QUERY = '(max-width: 700px), (max-aspect-ratio: 4/5)'

// Fundo em foto, usado na abertura e na etapa final.
// - images: { desktopAvif, desktopWebp, mobileAvif, mobileWebp }
// - variant: classe de ajuste (ex.: "final") para enquadramento e escurecimento
// - reveal: a foto "se revela" (começa escura e desfocada) quando termina de carregar
// - alt: se vazio, o fundo é decorativo e fica escondido de leitores de tela
// Enquanto a foto carrega, aparece um degradê parecido (.scene) e depois um fade.
function PhotoScene({ images, width, height, variant = '', reveal = false, alt = '' }) {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Se a imagem já estava em cache, o onLoad pode ter disparado antes do React.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const classes = [
    'scene',
    variant && `scene--${variant}`,
    reveal && 'scene--reveal',
    loaded && 'is-ready',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} aria-hidden={alt ? undefined : 'true'}>
      <div className="scene__reveal">
        <picture>
          <source media={MOBILE_QUERY} type="image/avif" srcSet={images.mobileAvif} />
          <source media={MOBILE_QUERY} type="image/webp" srcSet={images.mobileWebp} />
          <source type="image/avif" srcSet={images.desktopAvif} />
          <source type="image/webp" srcSet={images.desktopWebp} />
          <img
            ref={imgRef}
            className={`scene__photo ${loaded ? 'is-loaded' : ''}`}
            src={images.desktopWebp}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            fetchpriority="high"
            onLoad={() => setLoaded(true)}
          />
        </picture>
      </div>

      {/* Camadas de leitura e atmosfera */}
      <div className="scene__scrim" aria-hidden="true" />
      <div className="scene__vignette" aria-hidden="true" />
      <div className="scene__grain" aria-hidden="true" />
    </div>
  )
}

export default PhotoScene
