import PhotoScene from './PhotoScene.jsx'
import desktopAvif from '../../assets/scene/final-couple-desktop.avif'
import desktopWebp from '../../assets/scene/final-couple-desktop.webp'
import mobileAvif from '../../assets/scene/final-couple-mobile.avif'
import mobileWebp from '../../assets/scene/final-couple-mobile.webp'

const IMAGES = { desktopAvif, desktopWebp, mobileAvif, mobileWebp }

// Fundo da etapa final: a foto em destaque, revelada aos poucos.
function FinalScene() {
  return (
    <PhotoScene
      images={IMAGES}
      width={1672}
      height={941}
      variant="final"
      reveal
      alt="Ilustração dos protagonistas sentados no capô de um carro clássico em Vice City, ao pôr do sol"
    />
  )
}

export default FinalScene
