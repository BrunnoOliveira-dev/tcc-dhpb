const escola = require('../models/Escola');

async function setEscola(req, res) {
    try {
        const novaEscola = await escola.create(req.body);
        res.status(201).json(novaEscola);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

async function getEscolas(req, res) {
    try {
        const escolas = await escola.findAll();
        res.json(escolas);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

module.exports = {
    setEscola,
    getEscolas
};