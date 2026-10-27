import { useCallback, useEffect, useRef, useState } from 'react'
import { MUSIC_URL } from './musicSource.js'
import { FADE_IN_MS, FADE_OUT_MS, MUSIC_VOLUME, PRELOAD_DELAY_MS } from './musicConfig.js'

// Trilha sonora de fundo.
// status: 'unavailable' (sem arquivo ou erro) | 'idle' (ainda não começou)
//         | 'playing' | 'paused' (desligada pelo usuário ou bloqueada pelo navegador)
//
// start()  -> chame dentro de um clique (ex.: botão "Iniciar"): é o que libera o áudio.
// toggle() -> liga/desliga; se o usuário desligou, start() não religa sozinho.
export function useBackgroundMusic() {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const statusRef = useRef(MUSIC_URL ? 'idle' : 'unavailable')
  const userMutedRef = useRef(false)
  const resumeOnVisibleRef = useRef(false)
  const playRequestedRef = useRef(false) // já pediram para tocar? (impede o pré-carregamento de reiniciar o áudio)
  const [status, setStatus] = useState(statusRef.current)

  const updateStatus = useCallback((next) => {
    statusRef.current = next
    setStatus(next)
  }, [])

  const fadeTo = useCallback((target, duration, onDone) => {
    const audio = audioRef.current
    if (!audio) return
    window.clearInterval(fadeRef.current)
    const from = audio.volume
    const startedAt = performance.now()
    fadeRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / duration)
      // Alguns navegadores de celular (iOS) ignoram o volume: não é erro.
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * progress))
      if (progress >= 1) {
        window.clearInterval(fadeRef.current)
        onDone?.()
      }
    }, 50)
  }, [])

  // Cria o <audio> uma vez e começa a baixar o arquivo em segundo plano,
  // depois que a abertura terminou de carregar (não disputa com a foto).
  useEffect(() => {
    if (!MUSIC_URL) {
      if (import.meta.env.DEV) {
        console.info('[música] Nenhum arquivo em src/assets/audio/. O site roda sem trilha.')
      }
      return undefined
    }

    const audio = new Audio()
    audio.src = MUSIC_URL
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0
    audioRef.current = audio

    const onError = () => updateStatus('unavailable')
    audio.addEventListener('error', onError)

    let timer
    const preload = () => {
      timer = window.setTimeout(() => {
        // load() reinicia o elemento: se a música já foi pedida, ela seria derrubada.
        if (playRequestedRef.current) return
        audio.preload = 'auto'
        audio.load()
      }, PRELOAD_DELAY_MS)
    }
    if (document.readyState === 'complete') preload()
    else window.addEventListener('load', preload, { once: true })

    return () => {
      window.removeEventListener('load', preload)
      window.clearTimeout(timer)
      window.clearInterval(fadeRef.current)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [updateStatus])

  // Pausa quando a aba/app vai para segundo plano e retoma ao voltar.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        if (statusRef.current === 'playing') {
          resumeOnVisibleRef.current = true
          audio.pause()
        }
      } else if (resumeOnVisibleRef.current && !userMutedRef.current) {
        resumeOnVisibleRef.current = false
        audio.play().catch(() => updateStatus('paused'))
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [updateStatus])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    playRequestedRef.current = true
    audio.volume = 0
    const attempt = audio.play()
    const onStarted = () => {
      updateStatus('playing')
      fadeTo(MUSIC_VOLUME, FADE_IN_MS)
    }
    if (attempt && typeof attempt.then === 'function') {
      // Se o navegador bloquear, o botão de música aparece para o usuário ligar.
      attempt.then(onStarted).catch(() => updateStatus('paused'))
    } else {
      onStarted()
    }
  }, [fadeTo, updateStatus])

  const start = useCallback(() => {
    if (!audioRef.current || userMutedRef.current) return
    if (statusRef.current === 'playing' || statusRef.current === 'unavailable') return
    play()
  }, [play])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || statusRef.current === 'unavailable') return
    if (statusRef.current === 'playing') {
      userMutedRef.current = true
      updateStatus('paused')
      fadeTo(0, FADE_OUT_MS, () => audio.pause())
    } else {
      userMutedRef.current = false
      play()
    }
  }, [fadeTo, play, updateStatus])

  return { status, start, toggle }
}
