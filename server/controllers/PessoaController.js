const pessoa = require('../models/Pessoa');

async function setPessoa(req, res) {
  try {
    const novaPessoa = await pessoa.create(req.body);
    res.status(201).json(novaPessoa);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
    
}

async function getPessoas(req, res) {
    try {
    
        const pessoas = await pessoa.findAll();
        res.json(pessoas);
    } catch (err) {
        res.status(500).json({ erro: err.message }
    );
  }
}

module.exports = {
  setPessoa,
  getPessoas
};