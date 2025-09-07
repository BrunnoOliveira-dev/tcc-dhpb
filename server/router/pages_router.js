// Arquivo que conterar as rotas relacionadas as paginas web

const express = require('express');
const router = express.Router();
const path = require('path');

// Rota para a página inicial  // trocar para a pagina home quando estiver pronta
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/cadastro_do_estudante.html'));
});

// Rota para a página de cadastro do estudante
router.get('/cadastro_do_estudante', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro_do_estudante.html'));
});

// Rota para a página de modelo de questão
router.get('/model_questao', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/model_questao.html'));
});

router.get('/model_questao/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/model_questao.html'));
});

// Rota para a página da equipe
router.get('/pagina_da_equipe', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/pagina_da_equipe.html'));
});

module.exports = router;