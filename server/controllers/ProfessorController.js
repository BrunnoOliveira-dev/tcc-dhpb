const professor = require('../models/Professor');
const pessoa = require('../models/Pessoa');

async function setProfessor(req, res) {
    try {
        const novoProfessor = await professor.create(req.body);
        res.status(201).json(novoProfessor);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

async function getProfessores(req, res) {
    try {
        const professores = await professor.findAll({ include: [pessoa] });
        res.json(professores);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

module.exports = {
    setProfessor,
    getProfessores
};