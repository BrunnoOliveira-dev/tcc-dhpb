const express = require("express");
const router = express.Router();

const PessoaController = require("../controllers/PessoaController");
const EscolaController = require("../controllers/EscolaController");
const AlunoController = require("../controllers/AlunoController");
const ProfessorController = require("../controllers/ProfessorController");


router.get("/", (req, res) => {
  res.send("API de Gestão Escolar");
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

module.exports = router;
