let agua = 0
let refeicoes = 0
let exercicios = 0

const metaAgua = 2000
const metaRefeicoes = 5

const dadosSalvos = localStorage.getItem('saudeDados')

if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos)
    agua = dados.agua
    refeicoes = dados.refeicoes
    exercicios = dados.exercicios
}

atualizarTudo()
mostrarData()

function adicionarAgua(ml) {
    agua += ml
    salvar()
    atualizarTudo()
}

function adicionarRefeicao() {
    refeicoes += 1
    salvar()
    atualizarTudo()
}

function adicionarExercicio(min) {
    exercicios += min
    salvar()
    atualizarTudo()
}

function resetarTudo() {
    agua = 0
    refeicoes = 0
    exercicios = 0
    salvar()
    atualizarTudo()
    document.getElementById('mensagemFinal').textContent = ''
}

function atualizarTudo() {
    document.getElementById('aguaAtual').textContent = agua
    document.getElementById('refeicoesCount').textContent = refeicoes
    document.getElementById('exerciciosMin').textContent = exercicios

    const porcAgua = Math.min((agua / metaAgua) * 100, 100)
    document.getElementById('barraAgua').style.width = porcAgua + '%'

    const porcRefeicoes = Math.min((refeicoes / metaRefeicoes) * 100, 100)
    document.getElementById('barraRefeicoes').style.width = porcRefeicoes + '%'

    document.getElementById('resAgua').textContent = agua
    document.getElementById('resRefeicoes').textContent = refeicoes
    document.getElementById('resExercicios').textContent = exercicios

    verificarMetas()
}

function verificarMetas() {
    const msg = document.getElementById('mensagemFinal')
    let mensagens = []

    if (agua >= metaAgua) {
        mensagens.push('💧 Água OK')
    }
    if (refeicoes >= metaRefeicoes) {
        mensagens.push('🍎 Refeições OK')
    }
    if (exercicios >= 30) {
        mensagens.push('🏃 Exercícios OK')
    }

    if (mensagens.length === 3) {
        msg.textContent = '🎉 Parabéns! Dia perfeito!'
    } else if (mensagens.length > 0) {
        msg.textContent = '👍 ' + mensagens.join(' • ')
    } else {
        msg.textContent = 'Continue assim! 💪'
    }
}

function salvar() {
    const dados = {
        agua: agua,
        refeicoes: refeicoes,
        exercicios: exercicios
    }
    localStorage.setItem('saudeDados', JSON.stringify(dados))
}

function mostrarData() {
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const hoje = new Date().toLocaleDateString('pt-BR', opcoes)
    document.getElementById('dataHoje').textContent = hoje.charAt(0).toUpperCase() + hoje.slice(1)
}