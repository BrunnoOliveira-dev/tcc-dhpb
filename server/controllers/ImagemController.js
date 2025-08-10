const Imagem = require('../models/Imagem');

async function criarImagem(req, res) {
  try {
    const imagem = await Imagem.create(req.body);
    res.status(201).json(imagem);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function listarImagens(req, res) {
  try {
    const imagens = await Imagem.findAll();
    res.json(imagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  criarImagem,
  listarImagens
};
