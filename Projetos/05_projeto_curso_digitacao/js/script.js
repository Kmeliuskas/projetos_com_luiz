// Pega os elementos
const inputResposta = document.querySelector('#inputResposta');
const textoNivel = document.querySelector('#textoNivel');
const letrasCorretas = document.querySelector('#letrasCorretas');
const letrasErradas = document.querySelector('#letrasErradas');

// Pega a frase e transforma em array
const fraseOriginal = textoNivel.innerText.trim();  // Usa innerText para evitar HTML extra
const fraseEmArray = [...fraseOriginal];


// Limpa o #textoNivel e recria com spans para cada letra (para podermos colorir individualmente)
textoNivel.innerHTML = '';  // Limpa o conteúdo atual
fraseEmArray.forEach(letra => {
    const span = document.createElement('span');
    span.textContent = letra;
    span.classList.add('letra-pendente');  // Classe inicial (cinza, por exemplo)
    textoNivel.appendChild(span);
});

// Estilos CSS (adicione no <style> ou CSS externo)
const estilos = `
    .letra-certa { color: green; font-weight: bold; }
    .letra-errada { color: red; text-decoration: underline wavy; }  /* Vermelho com sublinhado ondulado para destacar */
    .letra-pendente { color: gray; }  /* Letras ainda não digitadas */
`;
const styleTag = document.createElement('style');
styleTag.textContent = estilos;
document.head.appendChild(styleTag);

// Agora o evento de digitação
inputResposta.addEventListener('input', function () {
    const digitado = inputResposta.value;  // O que foi digitado até agora
    const spans = textoNivel.querySelectorAll('span');  // Pega todos os spans da frase

    //Contadores de correto e errado
    let corretas = 0;
    let erradas = 0;


    // Reseta todas as classes para pendente
    spans.forEach(span => span.className = 'letra-pendente');

    // Verifica letra por letra
    for (let i = 0; i < spans.length; i++) {
        if (i >= digitado.length) break;  // Para nas letras não digitadas ainda

        if (digitado[i] === fraseEmArray[i]) {
            //Atualiza o HTML com os valores alterados


            spans[i].className = 'letra-certa';  // Verde se certa
            corretas++
        } else {
            spans[i].className = 'letra-errada';  // Vermelha se errada
            erradas++;
        }
    }

    letrasCorretas.innerHTML = corretas;
    letrasErradas.innerHTML = erradas;


    // Opcional: Bloqueia digitar mais que o tamanho da frase
    if (digitado.length > fraseEmArray.length) {
        inputResposta.value = digitado.slice(0, fraseEmArray.length);
    }

    // Quando completar
    if (digitado.length === fraseEmArray.length) {
        if (digitado === fraseOriginal) {
            alert("Parabens você completou a frase corretamente")
            // Aqui: avança nível, toca som, etc.
        } else {
            console.log("Tem erros... Tente de novo.");
        }
    }
});