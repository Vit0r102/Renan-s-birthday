import { TOTAL_QUESTIONS, getResult } from '../data/quiz.js'

// Tela de resultado: pontuação X/5, título, mensagem e ações.
function QuizResult({ score, onContinue, onRestart, headingRef }) {
  const safeScore = Math.min(TOTAL_QUESTIONS, Math.max(0, score))
  const result = getResult(safeScore)

  return (
    <div className="result">
      <p className="chip">Resultado final</p>

      <p className="result__score" aria-label={`Pontuação: ${safeScore} de ${TOTAL_QUESTIONS}`}>
        <span aria-hidden="true">
          {safeScore}/{TOTAL_QUESTIONS}
        </span>
      </p>

      <h2 className="result__title" ref={headingRef} tabIndex={-1}>
        {result.title}
      </h2>
      <p className="result__text">{result.message}</p>

      <div className="result__actions">
        <button type="button" className="btn btn--primary" onClick={onContinue}>
          Ir para o final
        </button>
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          Jogar novamente
        </button>
      </div>
    </div>
  )
}

export default QuizResult
