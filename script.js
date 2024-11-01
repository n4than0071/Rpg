function obterSelecoes() {
    const nome = document.getElementById("nome").value;
    const vida = document.getElementById("vida").value;
    const sanidade = document.getElementById("sanidade").value;
    const nivel = document.getElementById("nivel").value;
    const profissao = document.getElementById("profissao").value;

    const checkboxes = document.querySelectorAll('input[name="hobbies"]:checked');
    const hobbiesSelecionados = Array.from(checkboxes).map(checkbox => checkbox.value);

    const dados = {
        nome: nome,
        vida: vida,
        sanidade: sanidade,
        nivel: nivel,
        profissao: profissao,
        hobbies: hobbiesSelecionados
    };

    const logDiv = document.getElementById("log");
    logDiv.innerHTML += `<pre>${JSON.stringify(dados, null, 2)}</pre>`;

    fetch('/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Alerta com a resposta do servidor
        document.getElementById("log", nome ).innerHTML += `<pre>${JSON.stringify(dados, null, 2)}</pre>`;
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}