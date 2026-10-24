import ViceCityScene from '../components/scene/ViceCityScene.jsx'

// Abertura cinematográfica. O cenário (ViceCityScene) é arte separada;
// todos os textos abaixo são elementos reais da interface.
// O botão "Iniciar" fica no StageNav (modo hero).
function WelcomeStage({ meta }) {
  return (
    <section className="hero">
      <ViceCityScene />

      <p className="hero__corner hero__corner--left reveal" style={{ '--i': 6 }}>
        GTA VI Birthday Edition
      </p>
      <p className="hero__corner hero__corner--right reveal" style={{ '--i': 6 }}>
        Vice City
      </p>

      <p className="hero__badge reveal" style={{ '--i': 0 }}>
        Experiência de aniversário personalizada
      </p>

      <h1 className="hero__logo reveal" style={{ '--i': 1 }} aria-label="GTA VI Birthday Edition">
        <span className="hero__gta" aria-hidden="true">
          <span className="hero__gta-letters">GTA</span>
          <span className="hero__gta-vi">VI</span>
        </span>
        <span className="hero__script" aria-hidden="true">
          Birthday Edition
        </span>
      </h1>

      <p className="hero__eyebrow reveal" style={{ '--i': 3 }}>
        {meta.title}
      </p>

      <p className="hero__tagline reveal" style={{ '--i': 4 }}>
        Todo mundo chega a Vice City atrás de alguma coisa. Hoje, o motivo
        tem nome — e faz aniversário.
      </p>

      <span className="hero__rule reveal" style={{ '--i': 4 }} aria-hidden="true" />

      <div className="hero__player reveal" style={{ '--i': 5 }}>
        <span className="hero__player-label">Protagonista</span>
        <span className="hero__player-name">
          <svg className="hero__crown" viewBox="0 0 40 28" aria-hidden="true" focusable="false">
            <path d="M3 24L1 6L12 15L20 2L28 15L39 6L37 24Z" />
          </svg>
          Renan
        </span>
      </div>

      <p className="hero__tease" aria-hidden="true">
        Vice City te espera...
      </p>

      <p className="hero__footer reveal" style={{ '--i': 8 }}>
        <span className="hero__footer-main">Um presente especial</span>
        <span className="hero__footer-note">Projeto de fã · não oficial</span>
      </p>
    </section>
  )
}

export default WelcomeStage
