// Botão redondo para ligar/desligar a música. Só aparece depois que a
// música começou (ou foi bloqueada pelo navegador) e se existe arquivo de áudio.
function MusicToggle({ status, onToggle, lowered = false }) {
  if (status === 'idle' || status === 'unavailable') return null

  const playing = status === 'playing'
  const label = playing ? 'Desligar música' : 'Ligar música'

  return (
    <button
      type="button"
      className={`music-toggle ${lowered ? 'music-toggle--low' : ''}`}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" stroke="none" />
        {playing ? (
          <>
            <path d="M15.5 9a4 4 0 0 1 0 6" />
            <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
    </button>
  )
}

export default MusicToggle
