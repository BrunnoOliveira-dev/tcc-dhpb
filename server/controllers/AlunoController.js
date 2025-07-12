const aluno = require('../models/Aluno');
const pessoa = require('../models/Pessoa');
const escola = require('../models/Escola');

async function setAluno(req, res) {
    try {
        const novoAluno = await aluno.create(req.body);
        res.status(201).json(novoAluno);
    } catch (err) {
        res.status(500).json({ erro: err.message });
  }
}

async function getAlunos(req, res) {
    try {
        const alunos = await aluno.findAll({ include: [pessoa, escola] });
        res.json(alunos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

module.exports = {
    setAluno,
    getAlunos
};