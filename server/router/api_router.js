const express = require('express');
const router = express.Router();

// Atualizar equipe do aluno (adicionar/remover membro)
router.put('/alunos/:id_aluno/equipe', async (req, res) => {
  AlunoController.atualizarEquipeAluno(req, res);
});

// Importando os controladores

const QuestaoController = require('../controllers/QuestaoController');
const AlternativaController = require('../controllers/AlternativaController');
const ImagemController = require('../controllers/ImagemController');
const PessoaController = require("../controllers/PessoaController");
const EscolaController = require("../controllers/EscolaController");
const AlunoController = require("../controllers/AlunoController");
const ProfessorController = require("../controllers/ProfessorController");
const LoginController = require("../controllers/LoginController");
const EquipeController = require("../controllers/EquipeController");


// rota teste

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

//Procurar pessoa para o Login

router.post('/login', LoginController.fazerLogin);


// ============================
// ROTAS PARA ESCOLA
// ============================

router.post("/escolas", async (req, res) => {
  EscolaController.setEscola(req, res);
});


// Busca dinâmica de escolas (autocomplete)
const { Op } = require('sequelize');
const Escola = require('../models/Escola');
router.get('/escolas', async (req, res) => {
  const { nome } = req.query;
  if (!nome || nome.length < 2) return res.json([]);
  try {
    const escolas = await Escola.findAll({
      where: {
        nome: { [Op.like]: `%${nome}%` }
      },
      limit: 10,
      order: [['nome', 'ASC']]
    });
    res.json(escolas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


// ============================
// ROTAS PARA ALUNO
// ============================

router.post("/alunos", async (req, res) => {
  AlunoController.setAluno(req, res);
});


// Buscar alunos por email (para autocomplete e validação)
router.get("/alunos", async (req, res) => {
  const { email } = req.query;
  if (email) {
    try {
      const Aluno = require('../models/Aluno');
      const Pessoa = require('../models/Pessoa');
      // Busca aluno pelo email na tabela Pessoa e retorna dados essenciais
      const aluno = await Aluno.findOne({
        include: [{
          model: Pessoa,
          as: 'Pessoa',
          where: { email },
          attributes: ['id_pessoa', 'nome', 'email']
        }],
        attributes: ['id_aluno', 'id_escola', 'esta_em_uma_equipe']
      });
      if (!aluno) return res.json([]);
      // Monta resposta enxuta
      const resp = {
        id_aluno: aluno.id_aluno,
        id_escola: aluno.id_escola,
        esta_em_uma_equipe: aluno.esta_em_uma_equipe,
        nome: aluno.Pessoa.nome,
        email: aluno.Pessoa.email
      };
      return res.json([resp]);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  }
  // Se não houver email, retorna todos (comportamento antigo)
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


// ============================
// Rotas para Questao
// ============================

router.post('/questoes', QuestaoController.criarQuestao);
router.get('/questoes', QuestaoController.listarQuestoes);
router.get('/questoes/:id', QuestaoController.obterQuestaoPorId);

// ============================
// Rotas para Alternativa
// ============================

router.post('/alternativas', AlternativaController.criarAlternativa);
router.get('/alternativas', AlternativaController.listarAlternativas);
router.get('/questoes/alternativas/:id', AlternativaController.alternativasDeUmaQuestão);  // rota para pegar as alternativas de uma questão específica, passando o ID da questão como query param

// ============================
// Rotas para Imagem
// ============================

router.post('/imagens', ImagemController.criarImagem);
router.get('/imagens', ImagemController.listarImagens);


// ============================
// ROTAS PARA EQUIPE
// ============================

// Criar equipe (id_processo pode vir do corpo ou query)
router.post("/equipes", async (req, res) => {
  EquipeController.setEquipe(req, res);
});

// Listar equipes, com filtro por id_processo
router.get("/equipes", async (req, res) => {
  EquipeController.getEquipes(req, res);
});

// Atualizar equipe
router.put("/equipes/:id", async (req, res) => {
  EquipeController.updateEquipe(req, res);
});

// Remover equipe
router.delete("/equipes/:id", async (req, res) => {
  EquipeController.deleteEquipe(req, res);
});


// rotas para cadastro e login podem ser adicionadas aqui

router.post('/cadastro', PessoaController.setPessoa); // Reutilizando o controlador de Pessoa para cadastro
router.post('/login', PessoaController.login); // Rota de login

// ============================
// ROTAS PARA PROCESSO DE INSCRIÇÃO
// ============================
const ProcessoInscricaoController = require('../controllers/ProcessoInscricaoController');
router.post('/processos', ProcessoInscricaoController.criarProcesso);
router.get('/processos', ProcessoInscricaoController.listarProcessos);
router.put('/processos/:id', ProcessoInscricaoController.atualizarProcesso);
router.get('/processos/:id', ProcessoInscricaoController.buscarPorId);


module.exports = router;
