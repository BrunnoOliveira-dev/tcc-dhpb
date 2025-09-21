const pessoa = require('../models/Pessoa');

async function setPessoa(req, res) {
  try {
    const novaPessoa = await pessoa.create(req.body);
    res.status(201).json(novaPessoa);
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }

}

async function getPessoas(req, res) {
  try {
    const pessoas = await pessoa.findAll();
    res.json(pessoas);
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await pessoa.findOne({ where: { email } });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }
    res.json({ mensagem: 'Login bem-sucedido', usuario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  setPessoa,
  getPessoas,
  login
};