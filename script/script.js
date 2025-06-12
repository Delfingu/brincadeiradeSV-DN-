// --- Seletores do DOM e Variáveis Iniciais ---
const btn_revelar_carta = document.getElementById("btn_revelar_carta");
const cartas = document.querySelectorAll(".cartas");
let cartaRevelada = null; // Guarda a referência da última carta mostrada

// --- Configuração do Confetti ---
// (Assumindo que a biblioteca confetti.js está carregada no seu HTML)
const confetti = new Confetti("btn_revelar_carta");
confetti.setCount(250);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(false);

// --- Função para buscar o número aleatório ---
// Ela agora apenas busca e RETORNA o número, tornando-a mais reutilizável.
async function obterNumeroAleatorio() {
    // Usamos cartas.length diretamente para garantir que o valor máximo está sempre atualizado.
    const max = cartas.length; 
    try {
        const response = await fetch(
            `https://www.random.org/integers/?num=1&min=1&max=${max}&col=1&base=10&format=plain&rnd=new`
        );
        if (response.ok) {
            const numeroTexto = await response.text();
            // Converte o número (que vem como texto) para um inteiro.
            return parseInt(numeroTexto.trim(), 10);
        } else {
            // Em caso de falha na API, sorteia um número localmente.
            console.error("Falha na API random.org, usando sorteio local.", response.status);
            return Math.floor(Math.random() * max) + 1;
        }
    } catch (error) {
        // Em caso de erro de rede, também sorteia localmente.
        console.error("Erro de rede, usando sorteio local.", error);
        return Math.floor(Math.random() * max) + 1;
    }
}

// --- Função Principal para Revelar as Cartas (agora é async) ---
async function revelar_cartas() {
    // 1. Esconde a carta anterior, se houver uma.
    if (cartaRevelada !== null) {
        cartaRevelada.classList.remove("revelada");
        // Opcional: Adicionar uma transição de saída antes de esconder.
        cartaRevelada.style.display = "none";
    }

    // 2. Aguarda o número aleatório ser retornado pela função.
    const numeroSorteado = await obterNumeroAleatorio();
    
    // 3. Converte o número sorteado (base 1) para um índice de array (base 0).
    const indiceDaCarta = numeroSorteado - 1;

    // 4. Seleciona a nova carta e a armazena.
    cartaRevelada = cartas[indiceDaCarta];

    // 5. Mostra a nova carta e ativa a animação.
    if (cartaRevelada) {
        cartaRevelada.style.display = "block";
        setTimeout(() => {
            cartaRevelada.classList.add("revelada");
        }, 10); // Pequeno delay para garantir que a transição CSS funcione.
    }
}

// --- Adiciona o Evento de Clique ao Botão ---
btn_revelar_carta.addEventListener("click", revelar_cartas);