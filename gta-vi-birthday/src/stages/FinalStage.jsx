import StageScreen from '../components/StageScreen.jsx'

function FinalStage({ meta }) {
  return (
    <StageScreen eyebrow={meta.eyebrow} title={meta.title} subtitle={meta.subtitle}>
      <div className="final">
        <p className="final__stamp">Missão cumprida</p>
        <span className="final__line" aria-hidden="true" />
        <p className="final__text">
          Conteúdo provisório: a mensagem final de aniversário e a animação de
          revelação entram nas próximas missões.
        </p>
      </div>
    </StageScreen>
  )
}

export default FinalStage
