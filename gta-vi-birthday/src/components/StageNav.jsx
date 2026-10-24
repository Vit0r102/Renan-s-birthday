// Navegação: voltar, indicador de progresso e avançar.
// Na primeira etapa vira um grande botão de início, centralizado.
function StageNav({ current, total, nextLabel, onBack, onNext }) {
  const isFirst = current === 0

  // Mesmo botão em todas as etapas; na primeira ele ganha um wrapper para o brilho.
  const nextButton = (
    <button
      type="button"
      className={`btn btn--primary ${isFirst ? 'btn--hero' : ''}`}
      onClick={onNext}
    >
      {nextLabel}
      {isFirst && <span aria-hidden="true"> →</span>}
    </button>
  )

  return (
    <nav
      className={`stage-nav ${isFirst ? 'stage-nav--hero' : ''}`}
      aria-label="Navegação entre etapas"
    >
      {!isFirst && (
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Voltar
        </button>
      )}

      <ol className="progress" aria-label={`Etapa ${current + 1} de ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            className={`progress__dot ${i === current ? 'is-active' : ''} ${
              i < current ? 'is-done' : ''
            }`}
            aria-current={i === current ? 'step' : undefined}
          />
        ))}
      </ol>

      {isFirst ? <span className="cta-glow">{nextButton}</span> : nextButton}
    </nav>
  )
}

export default StageNav
