const ProcessoInscricao = require('../models/ProcessoInscricao');
const Escola = require('../models/Escola');

const ProcessoInscricaoController = {
  // Criar novo processo
  async criarProcesso(req, res) {
    try {
      const { id_escola } = req.body;
      if (!id_escola) return res.status(400).json({ erro: 'id_escola é obrigatório' });
      // Gera código único (ex: 8 dígitos hex)
      function gerarCodigo() {
        return Math.random().toString(16).slice(2, 10);
      }
      let codigo;
      let existe = true;
      // Garante unicidade
      while (existe) {
        codigo = gerarCodigo();
        existe = await ProcessoInscricao.findOne({ where: { codigo_processo: codigo } });
      }
      const processo = await ProcessoInscricao.create({ id_escola, codigo_processo: codigo });
      res.status(201).json(processo);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  // Listar todos os processos (com dados da escola)
  async listarProcessos(req, res) {
    try {
      const { id_escola } = req.query;
      const where = id_escola ? { id_escola } : {};
      const processos = await ProcessoInscricao.findAll({
        where,
        include: [{ model: Escola, as: 'Escola', attributes: ['id_escola', 'nome', 'municipio', 'uf'] }],
        order: [['data_inicio', 'DESC']]
      });
      res.json(processos);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  // Atualizar status do processo (para completo, ou outros campos)
  async atualizarProcesso(req, res) {
    try {
      const { id } = req.params;
      const { status, data_fim } = req.body;
      const processo = await ProcessoInscricao.findByPk(id);
      if (!processo) return res.status(404).json({ erro: 'Processo não encontrado' });
      if (status) processo.status = status;
      if (data_fim) processo.data_fim = data_fim;
      await processo.save();
      res.json(processo);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  // Buscar processo por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const processo = await ProcessoInscricao.findByPk(id, {
        include: [{ model: Escola, as: 'Escola', attributes: ['id_escola', 'nome', 'municipio', 'uf'] }]
      });
      if (!processo) return res.status(404).json({ erro: 'Processo não encontrado' });
      res.json(processo);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

module.exports = ProcessoInscricaoController;
