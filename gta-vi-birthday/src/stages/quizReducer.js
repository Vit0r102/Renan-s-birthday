import { QUESTIONS } from '../data/quiz.js'

export const initialQuizState = {
  index: 0, // pergunta atual
  selectedId: null, // alternativa marcada (ainda não confirmada)
  confirmed: false, // resposta da pergunta atual já confirmada?
  score: 0,
  finished: false,
}

// Toda a regra do quiz fica aqui. As guardas (confirmed, selectedId...)
// impedem confirmar duas vezes, trocar a resposta depois de confirmar
// ou somar ponto repetido.
export function quizReducer(state, action) {
  switch (action.type) {
    case 'select':
      if (state.confirmed || state.finished) return state
      return { ...state, selectedId: action.id }

    case 'confirm': {
      if (state.confirmed || state.finished || state.selectedId === null) {
        return state
      }
      const isCorrect = state.selectedId === QUESTIONS[state.index].correctId
      return {
        ...state,
        confirmed: true,
        score: state.score + (isCorrect ? 1 : 0),
      }
    }

    case 'next':
      if (!state.confirmed || state.finished) return state
      if (state.index >= QUESTIONS.length - 1) {
        return { ...state, finished: true }
      }
      return { ...state, index: state.index + 1, selectedId: null, confirmed: false }

    case 'restart':
      return initialQuizState

    default:
      return state
  }
}
