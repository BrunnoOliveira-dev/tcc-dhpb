// Arquivo que conterar as rotas relacionadas as paginas web

const express = require('express');
const router = express.Router();
const path = require('path');

// Rota para a página inicial  // trocar para a pagina home quando estiver pronta
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/home.html'));
});

// Rota para cadastro
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro.html'));
});

// Rota para a página de cadastro do estudante
router.get('/cadastro_do_estudante', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro_do_estudante.html'));
});

// Rota para a página de cadastro do professor
router.get('/cadastro_professor', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro_professor.html'));
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


// Rota para login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/login.html'));
});

// Rota para caléndario
router.get('/calendario', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/calendario.html'));
});

// Rota pagina do participante
router.get('/pagina_do_participante', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/pagina_do_participante.html'));
});

// Rota pagina de cadastro de questões improvisado
router.get('/cadastro_de_questoes_improvisado', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro_de_questões_improvisado.html'));
});

// Rota pagina de editar perfil
router.get('/editar_perfil', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/editar_perfil.html'));
});

// Rota pagina fases
router.get('/fases', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/fases.html'));
});

module.exports = router;
