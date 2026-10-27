// Procura o arquivo de música em src/assets/audio/ (qualquer nome).
// Formatos aceitos: mp3, ogg, m4a, aac, wav, webm.
// Se a pasta estiver vazia, MUSIC_URL é null e o site funciona sem música.
// Havendo mais de um arquivo, usa o primeiro em ordem alfabética.
const files = import.meta.glob('../assets/audio/*.{mp3,ogg,m4a,aac,wav,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const [firstFile] = Object.entries(files).sort(([a], [b]) => a.localeCompare(b))

export const MUSIC_URL = firstFile ? firstFile[1] : null
