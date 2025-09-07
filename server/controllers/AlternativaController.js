const Alternativa = require('../models/Alternativa');

async function criarAlternativa(req, res) {
  try {
    const alternativa = await Alternativa.create(req.body);
    res.status(201).json(alternativa);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function listarAlternativas(req, res) {
  try {
    const alternativas = await Alternativa.findAll();
    res.json(alternativas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function alternativasDeUmaQuestão(req, res) {
  try {
    const { id } = req.params;
    const alternativas = await Alternativa.findAll({ where: { id_questao: id } });
    res.json(alternativas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  criarAlternativa,
  listarAlternativas,
  alternativasDeUmaQuestão
};
