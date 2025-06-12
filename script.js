/* script.js */

// --- Seletores do DOM e Variáveis Iniciais ---
const btn_mais_secreto = document.querySelector(".btn_mais_secreto");
const revelacao = document.getElementById("revelacao");
const secretasso = document.querySelector(".secretasso");

// Selecionamos os novos botões da revelação
const btnNao = document.querySelector(".nao");
const btnSim = document.querySelector(".sim");

// --- Função Principal para Revelar o Segredo ---
function revelar_segredo() {
    // 1. Esconde a div com a mensagem inicial
    secretasso.style.display = 'none';

    // 2. Torna o bloco da "revelacao" visível no layout, mas ainda transparente
    revelacao.style.display = 'block';

    // 3. Adiciona a classe 'visivel' para ativar a animação de fade-in e escala
    setTimeout(() => {
        revelacao.classList.add('visivel');
    }, 10);
}

// --- Função para fazer o botão "Não" fugir do mouse ---
function fugirDoMouse() {
    // Define a posição do botão como 'absolute' para que possamos movê-lo livremente
    btnNao.style.position = 'absolute';

    // Pega as dimensões da janela do navegador
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;

    // Pega as dimensões do próprio botão
    const larguraBotao = btnNao.offsetWidth;
    const alturaBotao = btnNao.offsetHeight;

    // Calcula uma posição aleatória X (horizontal) que não deixe o botão sair da tela
    const novaPosicaoX = Math.floor(Math.random() * (larguraJanela - larguraBotao));

    // Calcula uma posição aleatória Y (vertical) que não deixe o botão sair da tela
    const novaPosicaoY = Math.floor(Math.random() * (alturaJanela - alturaBotao));

    // Aplica as novas posições ao estilo do botão
    btnNao.style.left = `${novaPosicaoX}px`;
    btnNao.style.top = `${novaPosicaoY}px`;
}

// --- Adiciona os Eventos de Clique e Mouse ---

// Evento principal para começar tudo
btn_mais_secreto.addEventListener("click", revelar_segredo);

// NOVO: Evento que dispara a fuga toda vez que o mouse entra na área do botão "Não"
btnNao.addEventListener("mouseenter", fugirDoMouse);

// NOVO: Evento para quando a pessoa finalmente clica em "Sim"
btnSim.addEventListener("click", () => {
    alert("Você gostou do presente amor da minha vida?");
});