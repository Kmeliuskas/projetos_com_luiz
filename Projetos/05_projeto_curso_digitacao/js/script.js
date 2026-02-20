// Elementos fixos
const inputResposta = document.querySelector('#inputResposta');
const textoNivel = document.querySelector('#textoNivel');
const letrasCorretas = document.querySelector('#letrasCorretas');
const letrasErradas = document.querySelector('#letrasErradas');
const tempoRestante = document.querySelector('#tempoRestante');

// Elementos dos níveis
const nivel01 = document.querySelector('#nivel_01');
const nivel02 = document.querySelector('#nivel_02');
const nivel03 = document.querySelector('#nivel_03');
const nivel04 = document.querySelector('#nivel_04');
const nivel05 = document.querySelector('#nivel_05');

// Variáveis de estado
let fraseOriginal = "";
let fraseEmArray = [];
let spans = [];
let tempoAtual = 60;
let intervalo = null;
let cronometroIniciado = false;

// Função que carrega um novo nível e reseta tudo
function carregarNivel(novaFrase) {
    fraseOriginal = novaFrase.trim();
    fraseEmArray = [...fraseOriginal];

    // Limpa e recria os spans
    textoNivel.innerHTML = '';
    spans = [];

    fraseEmArray.forEach(letra => {
        const span = document.createElement('span');
        span.textContent = letra;
        span.classList.add('letra-pendente');
        textoNivel.appendChild(span);
        spans.push(span);
    });

    // Reseta input, contadores e cronômetro
    inputResposta.value = '';
    inputResposta.disabled = false;
    letrasCorretas.textContent = '0';
    letrasErradas.textContent = '0';

    // Para e reseta cronômetro
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    cronometroIniciado = false;
    tempoAtual = 60;
    tempoRestante.textContent = '60';
}

// Carrega nível inicial (o que está no HTML)
carregarNivel(textoNivel.innerText);

// Clique nos níveis
nivel01.addEventListener("click", () => carregarNivel("Aprender a digitar é essencial. Comece com práticas diárias."));
nivel02.addEventListener("click", () => carregarNivel("As crianças correm descalças na areia da praia, enquanto se põe lentamente no horizonte dourado ao longe."));
nivel03.addEventListener("click", () => carregarNivel("Na tranquila tarde de verão, o vento suave balança as árvores, enquanto as flores exalam um doce perfume que enche o ar ao redor do jardim perfumado."));
nivel04.addEventListener("click", () => carregarNivel("Sob o céu estrelado da noite, os animais da floresta começam a se recolher em suas tocas, enquanto os grilos cantam sua sinfonia noturna, acompanhados pelo suave murmúrio do riacho que serpenteia entre as pedras."));
nivel05.addEventListener("click", () => carregarNivel("No coração da cidade agitada, o trânsito flui incessantemente, enquanto as luzes dos prédios brilham intensamente, refletindo-se nas águas calmas do rio que corta a metrópole, criando um cenário urbano de beleza única, onde o caos e a serenidade se encontram harmoniosamente."));

// Estilos para as letras
const estilos = `
    .letra-certa   { color: green; font-weight: bold; }
    .letra-errada  { color: red; text-decoration: underline wavy; }
    .letra-pendente { color: gray; }
`;
const styleTag = document.createElement('style');
styleTag.textContent = estilos;
document.head.appendChild(styleTag);

// Função para iniciar o cronômetro (só executa uma vez por nível)
function iniciarCronometro() {
    if (cronometroIniciado) return;

    cronometroIniciado = true;
    tempoAtual = 60;
    tempoRestante.textContent = '60';

    intervalo = setInterval(() => {
        tempoAtual--;

        // Mostra sempre dois dígitos
        tempoRestante.textContent = tempoAtual < 10 ? `0${tempoAtual}` : tempoAtual;

        if (tempoAtual <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            alert("Tempo esgotado!");
            inputResposta.disabled = true;
        }
    }, 1000);
}

// Evento principal de digitação
inputResposta.addEventListener('input', function () {

    // Inicia cronômetro na primeira letra digitada
    if (!cronometroIniciado) {
        iniciarCronometro();
    }

    const digitado = inputResposta.value;

    let corretas = 0;
    let erradas = 0;

    // Reseta visual das letras
    spans.forEach(span => span.className = 'letra-pendente');

    // Verifica letra por letra
    for (let i = 0; i < digitado.length; i++) {
        if (i >= fraseEmArray.length) break;

        if (digitado[i] === fraseEmArray[i]) {
            spans[i].className = 'letra-certa';
            corretas++;
        } else {
            spans[i].className = 'letra-errada';
            erradas++;
        }
    }

    // Atualiza contadores
    letrasCorretas.textContent = corretas;
    letrasErradas.textContent  = erradas;

    // Não permite ultrapassar o tamanho da frase
    if (digitado.length > fraseEmArray.length) {
        inputResposta.value = digitado.slice(0, fraseEmArray.length);
    }

    // Verifica se terminou a frase
    if (digitado.length === fraseEmArray.length) {

        if (corretas === fraseEmArray.length) {

            if (intervalo) {
                clearInterval(intervalo);
                intervalo = null;
            }

            alert(`Parabéns! Você completou o nível corretamente!\nTempo gasto: ${60 - tempoAtual} segundos`);
            inputResposta.disabled = true;
            // Aqui você pode adicionar lógica para avançar nível automaticamente
            // Exemplo: setTimeout(() => nivel02.click(), 3000);
        } else {
            alert("Você terminou a frase, mas contém erros. Tente novamente!");
            // Opcional: permitir corrigir sem reiniciar o tempo
            // Se quiser reiniciar o tempo mesmo assim → cronometroIniciado = false;
        }
    }
});