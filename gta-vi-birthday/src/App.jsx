import { useEffect, useState } from 'react'
import { STAGES } from './data/stages.js'
import Backdrop from './components/Backdrop.jsx'
import StageNav from './components/StageNav.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { useBackgroundMusic } from './audio/useBackgroundMusic.js'
import WelcomeStage from './stages/WelcomeStage.jsx'
import CharacterStage from './stages/CharacterStage.jsx'
import QuizStage from './stages/QuizStage.jsx'
import FinalStage from './stages/FinalStage.jsx'

// Relaciona o id de cada etapa ao seu componente.
const STAGE_COMPONENTS = {
  welcome: WelcomeStage,
  character: CharacterStage,
  quiz: QuizStage,
  final: FinalStage,
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const music = useBackgroundMusic()

  // Ao trocar de etapa, volta para o topo (útil no celular).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentIndex])

  const lastIndex = STAGES.length - 1
  const stage = STAGES[currentIndex]
  const Stage = STAGE_COMPONENTS[stage.id]

  const goBack = () => setCurrentIndex((i) => Math.max(i - 1, 0))

  // Na última etapa, "avançar" reinicia a experiência.
  const goNext = () => {
    // O clique em "Iniciar" é o gesto do usuário que libera o áudio no navegador.
    if (currentIndex === 0) music.start()
    setCurrentIndex((i) => (i >= lastIndex ? 0 : i + 1))
  }

  return (
    <>
      <Backdrop />
      <MusicToggle status={music.status} onToggle={music.toggle} lowered={currentIndex === 0} />

      <main className="app">
        {currentIndex > 0 && (
          <p className="brand-bar">
            <span className="brand-bar__dot" aria-hidden="true" />
            GTA VI Birthday Edition
          </p>
        )}

        {/* A key reinicia as animações de entrada a cada troca de etapa. */}
        <div className="app__stage" key={stage.id}>
          <Stage meta={stage} onNext={goNext} />
        </div>

        <StageNav
          current={currentIndex}
          total={STAGES.length}
          nextLabel={stage.nextLabel}
          onBack={goBack}
          onNext={goNext}
        />
      </main>
    </>
  )
}

export default App
