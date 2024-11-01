const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para analisar dados do formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ficha.html')); // Substitua 'seu-arquivo.html' pelo nome do seu arquivo HTML
});

// Rota para a página principal
app.get('/', (req, res) => {
    res.send('Servidor funcionando!'); // Ou você pode servir o HTML principal se quiser
});




// Endpoint para receber os dados do formulário
app.post('/enviar', (req, res) => {
    const dados = req.body;

    // Criar ou adicionar aos dados no log.txt
    fs.appendFile('log.txt', JSON.stringify(dados) + '\n', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao salvar os dados');
        }
        res.send('Dados enviados e salvos com sucesso!');
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
