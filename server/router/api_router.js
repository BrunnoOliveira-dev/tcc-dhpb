const express = require('express');
const router = express.Router();

const QuestaoController = require('../controllers/QuestaoController');
const AlternativaController = require('../controllers/AlternativaController');
const ImagemController = require('../controllers/ImagemController');
const PessoaController = require("../controllers/PessoaController");
const EscolaController = require("../controllers/EscolaController");
const AlunoController = require("../controllers/AlunoController");
const ProfessorController = require("../controllers/ProfessorController");


router.get("/", (req, res) => {
  res.send("API da dhpb");
});


// ============================
// ROTAS PARA PESSOA
// ============================

// Criar nova pessoa
router.post("/pessoas", async (req, res) => {
  PessoaController.setPessoa(req, res);
});

// Listar pessoas
router.get("/pessoas", async (req, res) => {
  PessoaController.getPessoas(req, res);
});


// ============================
// ROTAS PARA ESCOLA
// ============================

router.post("/escolas", async (req, res) => {
  EscolaController.setEscola(req, res);
});

router.get("/escolas", async (req, res) => {
  EscolaController.getEscolas(req, res);
});


// ============================
// ROTAS PARA ALUNO
// ============================

router.post("/alunos", async (req, res) => {
  AlunoController.setAluno(req, res);
});

router.get("/alunos", async (req, res) => {
  AlunoController.getAlunos(req, res);
});


// ============================
// ROTAS PARA PROFESSOR
// ============================

router.post("/professores", async (req, res) => {
  ProfessorController.setProfessor(req, res);
});

router.get("/professores", async (req, res) => {
  ProfessorController.getProfessores(req, res);
});


// Rotas para Questao
router.post('/questoes', QuestaoController.criarQuestao);
router.get('/questoes', QuestaoController.listarQuestoes);
router.get('/questoes/:id', QuestaoController.obterQuestaoPorId);


// Rotas para Alternativa
router.post('/alternativas', AlternativaController.criarAlternativa);
router.get('/alternativas', AlternativaController.listarAlternativas);
router.get('/questoes/alternativas/:id', AlternativaController.alternativasDeUmaQuestão);  // rota para pegar as alternativas de uma questão específica, passando o ID da questão como query param

// Rotas para Imagem
router.post('/imagens', ImagemController.criarImagem);
router.get('/imagens', ImagemController.listarImagens);


module.exports = router;
