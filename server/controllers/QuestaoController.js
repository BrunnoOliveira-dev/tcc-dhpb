const Questao = require('../models/Questao');

async function criarQuestao(req, res) {
  try {
    const questao = await Questao.create(req.body);
    res.status(201).json(questao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function listarQuestoes(req, res) {
  try {
    const questoes = await Questao.findAll();
    res.json(questoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function obterQuestaoPorId(req, res) {
  try {
    const { id } = req.params;
    const questao = await Questao.findByPk(id);
    res.json(questao)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
}

module.exports = {
  criarQuestao,
  listarQuestoes,
  obterQuestaoPorId
};
