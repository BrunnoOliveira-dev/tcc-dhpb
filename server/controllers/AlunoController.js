// Atualiza o id_equipe do aluno (adiciona ou remove de uma equipe)
async function atualizarEquipeAluno(req, res) {
    try {
        const { id_aluno } = req.params;
        const { id_equipe } = req.body;
        const [updated] = await aluno.update({ id_equipe, esta_em_uma_equipe: !!id_equipe }, { where: { id_aluno } });
        if (updated) {
            const alunoAtualizado = await aluno.findByPk(id_aluno);
            res.json(alunoAtualizado);
        } else {
            res.status(404).json({ erro: 'Aluno não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
const aluno = require('../models/Aluno');
const pessoa = require('../models/Pessoa');
const escola = require('../models/Escola');

const limparCPF = require('./PessoaController').limparCPF;

async function setAluno(req, res) {
    try {
        console.log('[AlunoController] Dados recebidos para criar aluno:', req.body);
        // Se não vier id_pessoa, cria a pessoa primeiro
        let pessoaCriada;
        if (!req.body.id_pessoa) {

            req.body.cpf = await limparCPF(req.body.cpf);

            const dadosPessoa = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                cpf: req.body.cpf,
                cidade: req.body.cidade,
                tipo_pessoa: 'aluno',
                // adicione outros campos necessários para Pessoa
            };
            pessoaCriada = await pessoa.create(dadosPessoa);
            console.log('[AlunoController] Pessoa criada:', pessoaCriada);
        }

        // Se não vier id_escola, retorna erro
        if (!req.body.id_escola) {
            return res.status(400).json({ erro: 'id_escola é obrigatório para criar aluno.' });
        }

        // Monta dados do aluno
        const dadosAluno = {
            id_pessoa: req.body.id_pessoa || pessoaCriada.id_pessoa,
            id_escola: req.body.id_escola,
            esta_em_uma_equipe: req.body.esta_em_uma_equipe || false,
            // outros campos específicos do aluno
        };

        const novoAluno = await aluno.create(dadosAluno);
        console.log('[AlunoController] Aluno criado com sucesso:', novoAluno);
        res.status(201).json({ aluno: novoAluno, pessoa: pessoaCriada });
    } catch (err) {
        console.error('[AlunoController] Erro ao criar aluno:', err);
        res.status(500).json({ erro: err.message, detalhes: err });
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
    getAlunos,
    atualizarEquipeAluno
};