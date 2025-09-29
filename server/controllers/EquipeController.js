const Equipe = require('../models/Equipe');


// Cria uma equipe, aceitando id_processo do corpo ou da query
async function setEquipe(req, res) {
  try {
    const { id_processo } = req.body.id_processo ? req.body : req.query;
    const novaEquipe = await Equipe.create({ ...req.body, id_processo });
    res.status(201).json(novaEquipe);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


// Lista equipes, podendo filtrar por id_processo
async function getEquipes(req, res) {
  try {
    const { id_processo } = req.query;
    const where = id_processo ? { id_processo } : undefined;
    const equipes = await Equipe.findAll({ where });
    res.json(equipes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Atualiza uma equipe
async function updateEquipe(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await Equipe.update(req.body, { where: { id_equipe: id } });
    if (updated) {
      const equipe = await Equipe.findByPk(id);
      res.json(equipe);
    } else {
      res.status(404).json({ erro: 'Equipe não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Remove uma equipe
async function deleteEquipe(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Equipe.destroy({ where: { id_equipe: id } });
    if (deleted) {
      res.json({ mensagem: 'Equipe removida com sucesso' });
    } else {
      res.status(404).json({ erro: 'Equipe não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  setEquipe,
  getEquipes,
  updateEquipe,
  deleteEquipe
};
