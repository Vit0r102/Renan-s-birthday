// Perguntas e resultados do quiz. Cada pergunta tem 4 alternativas e
// apenas uma correta (correctId). Nenhuma informação aqui é sobre a vida
// real do Renan: as situações são todas fictícias.

export const QUESTIONS = [
  {
    id: 'q1',
    tag: 'Conhecimento GTA',
    prompt: 'Em GTA V, o jogador alterna entre três protagonistas. Quais são eles?',
    options: [
      { id: 'a', text: 'Niko, Franklin e Trevor' },
      { id: 'b', text: 'Michael, Franklin e Trevor' },
      { id: 'c', text: 'Michael, Tommy e Trevor' },
      { id: 'd', text: 'CJ, Franklin e Michael' },
    ],
    correctId: 'b',
    rightFeedback:
      'Michael, Franklin e Trevor: o trio que prova que planejamento é opcional em Los Santos.',
    wrongFeedback:
      'Eram Michael, Franklin e Trevor. Niko (GTA IV), Tommy (Vice City) e CJ (San Andreas) são protagonistas de outros jogos da franquia.',
  },
  {
    id: 'q2',
    tag: 'Decisão em Vice City',
    prompt:
      'Cenário em Vice City: sirenes atrás do carro do Renan, um helicóptero iluminando a rua e o tanque quase vazio. Qual estratégia tem a melhor chance de funcionar?',
    options: [
      { id: 'a', text: 'Parar no meio da avenida e explicar que foi tudo um mal-entendido' },
      { id: 'b', text: 'Seguir o caminho mais complicado da cidade, só para parecer imprevisível' },
      { id: 'c', text: 'Despistar pelos becos, trocar de carro e esperar a poeira baixar' },
      { id: 'd', text: 'Aumentar o rádio e torcer para a polícia gostar da música' },
    ],
    correctId: 'c',
    rightFeedback:
      'Becos, carro novo e paciência: o raro caso em que o plano simples funciona. Anota aí, Renan.',
    wrongFeedback:
      'A melhor aposta era despistar pelos becos e trocar de carro. “Vai dar certo, confia” continua não sendo uma estratégia.',
  },
  {
    id: 'q3',
    tag: 'Conhecimento GTA',
    prompt: 'Na franquia GTA, quem é o protagonista de GTA: San Andreas?',
    options: [
      { id: 'a', text: 'Carl “CJ” Johnson' },
      { id: 'b', text: 'Tommy Vercetti' },
      { id: 'c', text: 'Niko Bellic' },
      { id: 'd', text: 'Claude' },
    ],
    correctId: 'a',
    rightFeedback:
      'CJ de volta a Grove Street! Tommy é de Vice City, Niko de GTA IV e Claude de GTA III.',
    wrongFeedback:
      'Era o CJ (Carl Johnson), de Grove Street. Tommy Vercetti é de Vice City, Niko Bellic de GTA IV e Claude de GTA III.',
  },
  {
    id: 'q4',
    tag: 'Decisão questionável',
    prompt:
      'O Renan encontra um botão vermelho gigante com uma placa: “NÃO APERTE ANTES DE LER AS INSTRUÇÕES”. O que um sobrevivente de Vice City faz?',
    options: [
      { id: 'a', text: 'Aperta rapidinho: instruções são só sugestões' },
      { id: 'b', text: 'Aperta de olhos fechados para ter mais emoção' },
      { id: 'c', text: 'Pede para um amigo apertar e assiste de longe' },
      { id: 'd', text: 'Lê as instruções antes de decidir qualquer coisa' },
    ],
    correctId: 'd',
    rightFeedback:
      'Ler antes de apertar: tecnicamente, a decisão mais radical da história do Renan.',
    wrongFeedback:
      'A placa avisou: ler primeiro. Apertar e descobrir depois é o clássico “efeito colateral” das decisões questionáveis.',
  },
  {
    id: 'q5',
    tag: 'Missão final',
    prompt:
      'Missão final: para um aniversário em Vice City dar certo de verdade, o que não pode faltar?',
    options: [
      { id: 'a', text: 'Um plano infalível (sem testar)' },
      { id: 'b', text: 'Um amigo que zoa, mas está sempre por perto' },
      { id: 'c', text: 'Um mapa da cidade de cabeça para baixo' },
      { id: 'd', text: 'Um helicóptero com o tanque pela metade' },
    ],
    correctId: 'b',
    rightFeedback:
      'Exato: nenhum cheat code entrega isso. A missão só fecha com um amigo por perto.',
    wrongFeedback:
      'Boa tentativa, mas faltou o item principal: um amigo que zoa, mas está sempre por perto. Nenhum cheat code entrega isso.',
  },
]

export const TOTAL_QUESTIONS = QUESTIONS.length

// Faixas de resultado, da menor para a maior pontuação.
const RESULTS = [
  {
    min: 0,
    max: 1,
    title: 'Turista Perdido em Vice City',
    message:
      'Renan, você ainda precisa aprender a sobreviver por aqui. Mas calma: toda lenda já começou perdida, com o mapa de cabeça para baixo.',
  },
  {
    min: 2,
    max: 3,
    title: 'Criminoso em Treinamento',
    message:
      'Renan, você tem potencial, mas o planejamento continua questionável. A cidade está de olho em você (e a polícia também).',
  },
  {
    min: 4,
    max: 4,
    title: 'Lenda de Vice City',
    message:
      'Renan, você quase dominou a cidade. Falta só aquele 1% de sorte nas decisões.',
  },
  {
    min: 5,
    max: 5,
    title: 'CEO das Decisões Duvidosas',
    message:
      'Renan, conhecimento impressionante e confiança provavelmente perigosa. Vice City agora trabalha para você.',
  },
]

// Devolve a faixa de resultado; a pontuação é sempre limitada a 0–5.
export function getResult(score) {
  const safe = Math.min(TOTAL_QUESTIONS, Math.max(0, Math.round(score)))
  return RESULTS.find((r) => safe >= r.min && safe <= r.max)
}
