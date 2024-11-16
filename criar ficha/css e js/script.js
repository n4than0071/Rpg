// Função para coletar as seleções e exibir na tela
function obterSelecoes() {
    const nome = document.getElementById('nome').value;
    const profissao = document.getElementById('profissao').value;

    // Coleta de seleções de hobbies
    const hobbies = [];
    document.querySelectorAll('input[name="hobbies"]:checked').forEach(input => {
        hobbies.push(input.value);
    });

    // Coleta de traços positivos
    const tracosPos = [];
    document.querySelectorAll('input[name="tracosPos"]:checked').forEach(input => {
        tracosPos.push(input.value);
    });

    // Coleta de traços negativos
    const tracosNeg = [];
    document.querySelectorAll('input[name="tracosNeg"]:checked').forEach(input => {
        tracosNeg.push(input.value);
    });

    // Exibir os dados na página
    document.getElementById('log').innerHTML = `
        <p>Nome: ${nome}</p>
        <p>Profissão: ${profissao}</p>
        <p>Hobbies: ${hobbies.join(', ')}</p>
        <p>Traços Positivos: ${tracosPos.join(', ')}</p>
        <p>Traços Negativos: ${tracosNeg.join(', ')}</p>
    `;
}

// Inicializa o total de pontos
let total = 10;

// Atualiza o total de pontos na tela
function atualizarTotal() {
    document.getElementById("Pontos").textContent = `Pontos: ${total}`;
}

// Função para processar alterações nos checkboxes e atualizar o total
function processarAlteracao(event) {
    const checkbox = event.target;
    const valor = parseInt(checkbox.getAttribute('data-valor'), 10) || 0;

    if (checkbox.checked) {
        total += valor;
    } else {
        total -= valor;
    }
    atualizarTotal();
}

// Função para processar alterações no select de profissão
function processarProfissao() {
    const selectProfissao = document.getElementById('profissao');
    const valor = parseInt(selectProfissao.selectedOptions[0].getAttribute('data-valor'), 10) || 0;
    
    total += valor;  // Reseta para o valor da profissão, garantindo que o cálculo esteja correto
    atualizarTotal();
}

// Função para inicializar eventos nos checkboxes e no select de profissão
function inicializarEventos() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", processarAlteracao);
    });

    const selectProfissao = document.getElementById('profissao');
    selectProfissao.addEventListener("change", processarProfissao);
}

// Inicializa ao carregar a página
window.onload = function () {
    atualizarTotal(); 
    inicializarEventos();
};
