// Função para coletar as seleções e exibir na tela
function obterSelecoes() {
    const nome = document.getElementById('nome').value;
    const profissao = document.getElementById('profissao').selectedOptions[0].textContent;

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
let valorProfissaoAnterior = 0;

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
    const valorAtual = parseInt(selectProfissao.selectedOptions[0].getAttribute('data-valor'), 10) || 0;

    // Subtrai o valor anterior e adiciona o valor atual
    total = total - valorProfissaoAnterior + valorAtual;
    valorProfissaoAnterior = valorAtual; // Atualiza o valor anterior

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

//descrição das habilidades

// Função para mostrar a descrição
function mostrarDescricao(event) {
    const descricaoDiv = document.getElementById("descricao");
    let descricao = "";

    if (event.target.tagName === 'SELECT') {
        // Captura a descrição da profissão selecionada
        descricao = event.target.selectedOptions[0].getAttribute("data-descricao");
    } else if (event.target.tagName === 'INPUT') {
        // Captura a descrição do checkbox
        descricao = event.target.getAttribute("data-descricao");
    }

    // Exibe a div e ajusta o conteúdo
    if (descricao) {
        descricaoDiv.style.display = "block";
        descricaoDiv.textContent = descricao;

        // Posiciona a div próxima ao cursor do mouse
        descricaoDiv.style.left = `${event.pageX + 10}px`;
        descricaoDiv.style.top = `${event.pageY + 10}px`;
    }
}

// Função para ocultar a descrição
function esconderDescricao() {
    const descricaoDiv = document.getElementById("descricao");
    descricaoDiv.style.display = "none";
}

// Função para inicializar eventos nos checkboxes e no select de profissão
function inicializarDescricoes() {
    // Eventos para checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("mouseover", mostrarDescricao);
        checkbox.addEventListener("mouseout", esconderDescricao);
    });

    // Eventos para o select de profissão
    const selectProfissao = document.getElementById("profissao");
    selectProfissao.addEventListener("mouseover", mostrarDescricao);
    selectProfissao.addEventListener("mouseout", esconderDescricao);
}

// Inicializa ao carregar a página
window.onload = function () {
    atualizarTotal(); 
    inicializarEventos();
    inicializarDescricoes();
};
