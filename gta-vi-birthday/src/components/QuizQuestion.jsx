import { TOTAL_QUESTIONS } from '../data/quiz.js'

const LETTERS = ['A', 'B', 'C', 'D']

// Mostra uma pergunta: progresso, alternativas, feedback e o botão
// de confirmar/avançar. Não guarda estado: tudo vem do QuizStage.
function QuizQuestion({
  question,
  index,
  selectedId,
  confirmed,
  onSelect,
  onConfirm,
  onNext,
  headingRef,
}) {
  const isLast = index === TOTAL_QUESTIONS - 1
  const isCorrect = confirmed && selectedId === question.correctId
  const answered = index + (confirmed ? 1 : 0)
  const percent = Math.round((answered / TOTAL_QUESTIONS) * 100)

  const optionState = (id) => {
    if (!confirmed) return id === selectedId ? 'is-selected' : ''
    if (id === question.correctId) return 'is-correct is-locked'
    if (id === selectedId) return 'is-wrong is-locked'
    return 'is-dimmed is-locked'
  }

  // Selos em texto: o resultado nunca depende só da cor.
  const optionBadge = (id) => {
    if (!confirmed) return id === selectedId ? 'Selecionada' : null
    if (id === question.correctId) return isCorrect ? '✓ Você acertou' : '✓ Correta'
    if (id === selectedId) return '✗ Sua resposta'
    return null
  }

  return (
    <div className="quiz">
      <div className="quiz__meta">
        <p className="chip">
          Pergunta {index + 1} de {TOTAL_QUESTIONS}
        </p>
        <div
          className="quiz__track"
          role="progressbar"
          aria-label="Progresso do quiz"
          aria-valuemin={0}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-valuenow={answered}
          aria-valuetext={`${answered} de ${TOTAL_QUESTIONS} perguntas respondidas`}
        >
          <span className="quiz__track-fill" style={{ '--w': `${percent}%` }} />
        </div>
      </div>

      <p className="quiz__tag">{question.tag}</p>

      <h2
        className="quiz__question"
        id={`${question.id}-text`}
        ref={headingRef}
        tabIndex={-1}
      >
        {question.prompt}
      </h2>

      <div
        className="quiz__options"
        role="radiogroup"
        aria-labelledby={`${question.id}-text`}
      >
        {question.options.map((option, i) => {
          const badge = optionBadge(option.id)
          return (
            <label
              key={option.id}
              className={`option reveal ${optionState(option.id)}`}
              style={{ '--i': i }}
            >
              <input
                className="option__input"
                type="radio"
                name={question.id}
                value={option.id}
                checked={selectedId === option.id}
                disabled={confirmed}
                onChange={() => onSelect(option.id)}
              />
              <span className="option__frame" aria-hidden="true" />
              <span className="option__letter" aria-hidden="true">
                {LETTERS[i]}
              </span>
              <span className="option__text">{option.text}</span>
              {badge && <span className="option__badge">{badge}</span>}
            </label>
          )
        })}
      </div>

      {/* Feedback só aparece depois de confirmar (a correta não vaza antes). */}
      <div role="status" aria-live="polite">
        {confirmed && (
          <div className={`feedback ${isCorrect ? 'feedback--right' : 'feedback--wrong'}`}>
            <span className="feedback__icon" aria-hidden="true">
              {isCorrect ? '✓' : '✗'}
            </span>
            <div>
              <p className="feedback__title">{isCorrect ? 'Acertou!' : 'Errou!'}</p>
              <p className="feedback__text">
                {isCorrect ? question.rightFeedback : question.wrongFeedback}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="quiz__actions">
        {!confirmed && selectedId === null && (
          <p className="quiz__hint">Selecione uma alternativa para confirmar.</p>
        )}
        <button
          type="button"
          className="btn btn--primary"
          onClick={confirmed ? onNext : onConfirm}
          disabled={!confirmed && selectedId === null}
        >
          {!confirmed
            ? 'Confirmar resposta'
            : isLast
              ? 'Ver resultado'
              : 'Próxima pergunta'}
        </button>
      </div>
    </div>
  )
}

export default QuizQuestion
