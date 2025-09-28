const Pessoa = require('../models/Pessoa');
const Aluno = require('../models/Aluno');
const Professor = require('../models/Professor');
const Equipe = require('../models/Equipe');

async function fazerLogin(req, res) {
  const { email, senha } = req.body;

  try {
    const pessoa = await Pessoa.findOne({ where: { email, senha } });

    if (!pessoa) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const tipo = pessoa.tipo_pessoa;

    if (tipo === 'aluno') {
      const aluno = await Aluno.findOne({ where: { id_pessoa: pessoa.id_pessoa }});
      if (!aluno) {
        return res.status(404).json({ erro: 'Aluno não encontrado para esta pessoa.' });
      }
      return res.status(200).json({ mensagem: 'Login como aluno', tipo, pessoa });
    }

    if (tipo === 'professor') {
      const professor = await Professor.findOne({ where: { id_pessoa: pessoa.id_pessoa } });
      return res.status(200).json({ mensagem: 'Login como professor', tipo, pessoa });
    }

    return res.status(403).json({ erro: 'Tipo de pessoa não reconhecido' });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = { fazerLogin };
