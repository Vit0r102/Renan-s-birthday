import FinalScene from '../components/scene/FinalScene.jsx'
import { FINAL_MESSAGE } from '../data/finalMessage.js'

// Etapa final: a foto ocupa o fundo (revelada aos poucos) e a mensagem
// fica em um card de vidro roxo, posicionado para não cobrir os rostos.
// Os botões Voltar / Rever experiência continuam no StageNav.
function FinalStage({ meta }) {
  const { badge, greeting, paragraphs, closing, signature, sender } = FINAL_MESSAGE

  return (
    <section className="final">
      <FinalScene />

      <article className="final__card reveal" style={{ '--i': 13 }}>
        <p className="chip reveal" style={{ '--i': 14 }}>
          {badge}
        </p>
        <h1 className="final__title reveal" style={{ '--i': 15 }}>
          {meta.title}
        </h1>

        <p className="final__greeting reveal" style={{ '--i': 16 }}>
          {greeting}
        </p>

        {paragraphs.map((text, index) => (
          <p key={index} className="final__text reveal" style={{ '--i': 17 + index * 2 }}>
            {text}
          </p>
        ))}

        <p className="final__text final__text--closing reveal" style={{ '--i': 21 }}>
          {closing}
        </p>

        <p className="final__signature reveal" style={{ '--i': 23 }}>
          {signature} {sender}
        </p>
      </article>
    </section>
  )
}

export default FinalStage
