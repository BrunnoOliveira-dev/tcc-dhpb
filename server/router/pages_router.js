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

// Rota para selecionar escola antes de criar equipe
router.get('/selecionar_escola', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/selecionar_escola.html'));
});


// Rota para cadastro de equipe por processo
router.get('/criar_equipe/:id_processo', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro_de_equipes.html'));
});

// Rota antiga (sem id) para compatibilidade
router.get('/criar_equipe', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/cadastro_de_equipes.html'));
});

// Página de processos de inscrição por escola
router.get('/processos_inscricao', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/processos_inscricao.html'));
});
// Arquivo que conterar as rotas relacionadas as paginas web


module.exports = router;
