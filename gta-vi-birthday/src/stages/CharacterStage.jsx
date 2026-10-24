import StageScreen from '../components/StageScreen.jsx'
import { CHARACTER, STATS, ACHIEVEMENTS } from '../data/character.js'
import casalNeonImg from '../assets/scene/casal-neon.png'

// Garante que a barra nunca passe dos limites de 0 a 100.
const clampPercent = (value) => Math.min(100, Math.max(0, value))

function CharacterStage({ meta }) {
  return (
    <StageScreen eyebrow={meta.eyebrow} title={meta.title} subtitle={meta.subtitle}>
      <div className="character">
        {/* Identificação */}
        <div className="character__top">
          <figure className="character__figure">
            <div className="character__portrait">
              <img src={casalNeonImg} alt="Casal Neon em Vice City" className="character__image" />
            </div>
            <figcaption className="character__caption">
              Protagonistas de Vice City
            </figcaption>
          </figure>

          <div className="character__info">
            <p className="chip">Ficha do protagonista</p>
            <h2 className="character__name">{CHARACTER.name}</h2>

            <dl className="facts">
              <div className="fact">
                <dt>Codinome</dt>
                <dd>{CHARACTER.alias}</dd>
              </div>
              <div className="fact">
                <dt>Classe</dt>
                <dd>{CHARACTER.className}</dd>
              </div>
              <div className="fact">
                <dt>Status</dt>
                <dd>{CHARACTER.status}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Descrição */}
        <p className="character__dossier">{CHARACTER.description}</p>

        {/* Atributos */}
        <section aria-labelledby="stats-title">
          <h3 className="section-title" id="stats-title">
            Atributos
          </h3>
          <ul className="stats">
            {STATS.map((stat, index) => {
              const percent = clampPercent(stat.value)
              return (
                <li
                  key={stat.id}
                  className="stat reveal"
                  style={{ '--i': 4 + index, '--n': index }}
                >
                  <div className="stat__head">
                    <span className="stat__label">{stat.label}</span>
                    <span className="stat__value">
                      {percent}
                      <small>/100</small>
                    </span>
                  </div>
                  <div
                    className="stat__bar"
                    role="progressbar"
                    aria-label={stat.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percent}
                    aria-valuetext={`${percent} de 100`}
                  >
                    <span className="stat__fill" style={{ '--w': `${percent}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Conquistas */}
        <section aria-labelledby="achievements-title">
          <h3 className="section-title" id="achievements-title">
            Conquistas desbloqueadas
          </h3>
          <ul className="achievements">
            {ACHIEVEMENTS.map((item, index) => (
              <li
                key={item.id}
                className="achievement reveal"
                style={{ '--i': 8 + index }}
              >
                <span className="achievement__badge" aria-hidden="true">
                  ★
                </span>
                <div>
                  <p className="achievement__tag">Conquista</p>
                  <h4 className="achievement__title">{item.title}</h4>
                  <p className="achievement__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <p className="character__disclaimer">{CHARACTER.disclaimer}</p>
      </div>
    </StageScreen>
  )
}

export default CharacterStage