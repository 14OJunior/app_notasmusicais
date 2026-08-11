// Tabela de frequências das notas (oitava central) 
// const notas = {  "DÓ": 261.63, "RÉ": 293.66, "MI": 329.63, "FÁ": 349.23, "SOL": 392.00, "LÁ": 440.00, "SI": 493.88 };

// Função que toca uma frequência por um tempo curto
function tocarNota(frequencia) {
    const contexto = new (window.AudioContext || window.webkitAudioContext)();
    const oscilador = contexto.createOscillator();
    const volume = contexto.createGain();

    oscilador.type = 'sine'; // onda senoidal = som "puro", parecido com um diapasão
    oscilador.frequency.value = frequencia; // frequência da nota

    oscilador.connect(volume);
    volume.connect(contexto.destination); // conecta o volume à saída de áudio

    volume.gain.setValueAtTime(0.3, contexto.currentTime); // volume baixo para não incomodar
    oscilador.start(); // inicia o oscilador
    oscilador.stop(contexto.currentTime + 1); // para o oscilador após 1 segundo
}

