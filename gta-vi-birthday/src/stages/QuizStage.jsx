import { useEffect, useReducer, useRef } from 'react'
import StageScreen from '../components/StageScreen.jsx'
import QuizQuestion from '../components/QuizQuestion.jsx'
import QuizResult from '../components/QuizResult.jsx'
import { QUESTIONS } from '../data/quiz.js'
import { initialQuizState, quizReducer } from './quizReducer.js'

// onNext vem do App e leva à etapa final (mesma ação do botão global).
function QuizStage({ meta, onNext }) {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  const headingRef = useRef(null)
  const isFirstRender = useRef(true)

  // Ao trocar de pergunta ou abrir o resultado, leva o foco para o título
  // (teclado e leitor de tela). Não faz nada na primeira renderização.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [state.index, state.finished])

  return (
    <StageScreen eyebrow={meta.eyebrow} title={meta.title} subtitle={meta.subtitle}>
      {state.finished ? (
        <QuizResult
          score={state.score}
          onContinue={onNext}
          onRestart={() => dispatch({ type: 'restart' })}
          headingRef={headingRef}
        />
      ) : (
        <QuizQuestion
          key={QUESTIONS[state.index].id}
          question={QUESTIONS[state.index]}
          index={state.index}
          selectedId={state.selectedId}
          confirmed={state.confirmed}
          onSelect={(id) => dispatch({ type: 'select', id })}
          onConfirm={() => dispatch({ type: 'confirm' })}
          onNext={() => dispatch({ type: 'next' })}
          headingRef={headingRef}
        />
      )}
    </StageScreen>
  )
}

export default QuizStage
