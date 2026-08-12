// Tabela de frequências das notas (oitava central) 
const notas = {  "DÓ": 261.63, "RÉ": 293.66, "MI": 329.63, "FÁ": 349.23, "SOL": 392.00, "LÁ": 440.00, "SI": 493.88 };

// Função que toca uma frequência por um tempo curto
function tocarNota(frequencia) {
    const contexto = new (window.AudioContext || window.webkitAudioContext)();
    const oscilador = contexto.createOscillator();
    const volume = contexto.createGain();

    oscilador.type = 'sine'; //som "puro", parecido com um diapasão
    oscilador.frequency.value = frequencia; // frequência da nota

    oscilador.connect(volume);
    volume.connect(contexto.destination); // conecta o volume à saída de áudio

    volume.gain.setValueAtTime(0.3, contexto.currentTime); // volume baixo para não incomodar
    oscilador.start(); 
    oscilador.stop(contexto.currentTime + 1);
}

let notaAtual = ""; // variável para armazenar a nota atual
let pontos = 0;

function novaRodada() {
    const listaNotas = Object.keys(notas);
    const sorteada = listaNotas[Math.floor(Math.random() * listaNotas.length)];
    notaAtual = sorteada;
    tocarNota(notas[sorteada]);
}

function criarBotoesDeOpcoes () {
    const container = document.getElementById("opcoes");
    Object.keys(notas).forEach(nome => {
        const botao = document.createElement("button");
        botao.textContent = nome;
        botao.classList.add("nota-" + nome.toLowerCase());
        botao.addEventListener("click", () => verificarResposta(nome));
        container.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    const resultado = document.getElementById("resultado");
    if (escolha === notaAtual) {
        pontos++;
        resultado.textContent = "Acertou!";
    } else {
        resultado.textContent = `Errou! A nota correta era ${notaAtual}.`;
    }
    document.getElementById("pontuacao").textContent = `Pontos: ${pontos}`;
}

document.getElementById("tocar").addEventListener("click", novaRodada);
criarBotoesDeOpcoes();