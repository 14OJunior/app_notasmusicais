const contextoAudio = new (window.AudioContext || window.webkitAudioContext)();

// Tabela de frequências das notas (oitava central) 
const notas = {  "DÓ": 261.63, "RÉ": 293.66, "MI": 329.63, "FÁ": 349.23, "SOL": 392.00, "LÁ": 440.00, "SI": 493.88 };

// Função que toca uma frequência por um tempo curto
function tocarNota(frequencia) {
    const oscilador = contextoAudio.createOscillator();
    const volume = contextoAudio.createGain();

    oscilador.type = 'sine'; //som "puro", parecido com um diapasão
    oscilador.frequency.value = frequencia; // frequência da nota

    oscilador.connect(volume);
    volume.connect(contextoAudio.destination); // conecta o volume à saída de áudio

    volume.gain.setValueAtTime(0.3, contextoAudio.currentTime); // volume baixo para não incomodar
    oscilador.start(); 
    oscilador.stop(contextoAudio.currentTime + 1);
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
        tocarSomAcerto();
    } else {
        resultado.textContent = `Errou! A nota correta era ${notaAtual}.`;
        tocarSomErro();
    }
    document.getElementById("pontuacao").textContent = `Pontos: ${pontos}`;
}

document.getElementById("tocar").addEventListener("click", novaRodada);
criarBotoesDeOpcoes();

function tocarSomAcerto() {
    const oscilador = contextoAudio.createOscillator();
    const volume = contextoAudio.createGain();

    oscilador.type = "sine"; // som puro para indicar acerto
    oscilador.frequency.setValueAtTime(880, contextoAudio.currentTime); // nota aguda para indicar acerto
    oscilador.frequency.exponentialRampToValueAtTime(1320, contextoAudio.currentTime + 0.15) // sobe rapidamente para uma nota mais alta
    oscilador.connect(volume);
    volume.connect(contextoAudio.destination);

    volume.gain.setValueAtTime(0.3, contextoAudio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.01, contextoAudio.currentTime + 0.3); // diminui o volume suavimente

    oscilador.start();
    oscilador.stop(contextoAudio.currentTime + 0.3);
}

function tocarSomErro() {
    const oscilador = contextoAudio.createOscillator();
    const volume = contextoAudio.createGain();

    oscilador.type = "sawtooth"; // som mais áspero para indicar erro
    oscilador.frequency.setValueAtTime(150, contextoAudio.currentTime); // nota grave

    oscilador.connect(volume);
    volume.connect(contextoAudio.destination);

    volume.gain.setValueAtTime(0.2, contextoAudio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.01, contextoAudio.currentTime + 0.4); // diminui o volume suavemente

    oscilador.start();
    oscilador.stop(contextoAudio.currentTime + 0.4);
}