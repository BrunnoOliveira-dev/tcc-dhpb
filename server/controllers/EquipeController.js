const Equipe = require('../models/Equipe');

async function setEquipe(req, res) {
  try {
    const novaEquipe = await Equipe.create(req.body);
    res.status(201).json(novaEquipe);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function getEquipes(req, res) {
  try {
    const equipes = await Equipe.findAll();
    res.json(equipes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  setEquipe,
  getEquipes
};
