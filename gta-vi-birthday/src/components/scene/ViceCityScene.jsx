import PhotoScene from './PhotoScene.jsx'
import desktopAvif from '../../assets/scene/vice-city-desktop.avif'
import desktopWebp from '../../assets/scene/vice-city-desktop.webp'
import mobileAvif from '../../assets/scene/vice-city-mobile.avif'
import mobileWebp from '../../assets/scene/vice-city-mobile.webp'

const IMAGES = { desktopAvif, desktopWebp, mobileAvif, mobileWebp }

// Cenário da abertura: Vice City ao pôr do sol.
// Título, nome e botão são elementos reais da interface, por cima da foto.
function ViceCityScene() {
  return <PhotoScene images={IMAGES} width={1671} height={941} />
}

export default ViceCityScene
