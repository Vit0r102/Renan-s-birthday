// Layout padrão das telas internas: etiqueta, título, subtítulo e card.
function StageScreen({ eyebrow, title, subtitle, children }) {
  return (
    <section className="stage-screen">
      <header className="stage-screen__header">
        <p className="stage-screen__eyebrow reveal" style={{ '--i': 0 }}>
          {eyebrow}
        </p>
        <h1 className="stage-screen__title reveal" style={{ '--i': 1 }}>
          {title}
        </h1>
        {subtitle && (
          <p className="stage-screen__subtitle reveal" style={{ '--i': 2 }}>
            {subtitle}
          </p>
        )}
      </header>

      <div className="stage-screen__card reveal" style={{ '--i': 3 }}>
        {children}
      </div>
    </section>
  )
}

export default StageScreen
