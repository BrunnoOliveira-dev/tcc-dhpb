// Utilitário para atualizar visual dos cards de equipe
function atualizarCardsEquipe(membros) {
	// membros: [{nome, tipo: 'orientador'|'aluno', status: 'green'|'red'|'gray'}]
	const cards = document.querySelectorAll('.team-card');
	cards.forEach((card, i) => {
		const membro = membros[i];
		card.classList.remove('card-status-green', 'card-status-red', 'card-status-gray');
		if (membro) {
			card.querySelector('.member').innerHTML = `${membro.nome || '---'}<br><small>${membro.tipo === 'orientador' ? 'Orientador(a)' : 'Aluno(a)'}</small>`;
			card.classList.add(`card-status-${membro.status}`);
		} else {
			card.querySelector('.member').innerHTML = '---<br><small>Aluno(a)</small>';
			card.classList.add('card-status-gray');
		}
	});
}

// Exemplo de uso inicial (pode ser substituído por dados reais do backend)
// Estado local dos membros da equipe
let membrosEquipe = [
	{ nome: 'Gladys Veiga', tipo: 'orientador', status: 'green' },
	{ nome: '---', tipo: 'aluno', status: 'gray' },
	{ nome: '---', tipo: 'aluno', status: 'gray' },
	{ nome: '---', tipo: 'aluno', status: 'gray' }
];

document.addEventListener('DOMContentLoaded', () => {
	// Pega id_processo da URL (?id_processo=123)
	const urlParams = new URLSearchParams(window.location.search);
	const idProcesso = urlParams.get('id_processo');

	// Atualizar código do processo na tela
	const processCodeEl = document.querySelector('.process-code');
	const processCodeTitleEl = document.querySelector('.process-title');
	if (idProcesso && processCodeEl) {
		fetch(`/api/processos/${idProcesso}`)
			.then(res => res.json())
			.then(proc => {
				if (proc && proc.codigo_processo) {
					processCodeEl.textContent = `Código de processo: ${proc.codigo_processo}`;
					processCodeTitleEl.textContent = `Processo de inscrição #${proc.codigo_processo}`;
				}
			});
	}

	// Buscar equipes já criadas para o processo
	async function carregarEquipesDoProcesso() {
		if (!idProcesso) return;
		try {
			const res = await fetch(`/api/equipes?id_processo=${idProcesso}`);
			if (!res.ok) throw new Error('Erro ao buscar equipes');
			const equipes = await res.json();
			if (equipes.length > 0) {
				// Preencher cards com a primeira equipe encontrada (ajuste conforme sua lógica)
				const equipe = equipes[0];
				// Exemplo: preencher nome
				const teamNameDisplay = document.querySelector('.team-name-display');
				if (teamNameDisplay) teamNameDisplay.textContent = equipe.nome_equipe;
				// TODO: preencher membrosEquipe com dados reais do backend
				// atualizarCardsEquipe(membrosEquipe);
			}
		} catch (err) {
			console.error(err);
		}
	}
	carregarEquipesDoProcesso();

	atualizarCardsEquipe(membrosEquipe);

	// Cadastro de equipe
	const btnSave = document.querySelector('.btn-save');
	const inputNome = document.querySelector('.team-input');
	const teamNameDisplay = document.querySelector('.team-name-display');

	// Função para checar se nome de equipe já existe
	async function nomeEquipeEmUso(nomeEquipe) {
		try {
			const res = await fetch(`/api/equipes?nome=${encodeURIComponent(nomeEquipe)}`);
			if (!res.ok) return false;
			const equipes = await res.json();
			// Considera em uso se houver alguma equipe com esse nome (case-insensitive)
			return equipes.some(eq => eq.nome_equipe?.toLowerCase() === nomeEquipe.toLowerCase());
		} catch {
			return false;
		}
	}

	btnSave?.addEventListener('click', async (e) => {
		e.preventDefault();
		const nomeEquipe = inputNome.value.trim();
		btnSave.style.background = '';
		btnSave.style.color = '';
		if (!nomeEquipe) {
			alert('Digite o nome da equipe!');
			return;
		}
		// Checar se nome já está em uso
		if (await nomeEquipeEmUso(nomeEquipe)) {
			alert('Este nome de equipe já está em uso. Escolha outro.');
			btnSave.style.background = '';
			btnSave.style.color = '';
			return;
		}
		// Nome disponível: simula cadastro e feedback visual
		btnSave.style.background = '#3bb54a';
		btnSave.style.color = '#fff';
		// const equipe = await cadastrarEquipe(nomeEquipe);
		// if (equipe) {
		//   alert('Equipe cadastrada com sucesso!');
		//   teamNameDisplay.textContent = nomeEquipe;
		//   inputNome.value = '';
		// }
	});

	// Volta botão ao normal ao digitar
	inputNome?.addEventListener('input', () => {
		btnSave.style.background = '';
		btnSave.style.color = '';
	});

	// Convite de estudante
	const btnInvite = document.querySelector('.btn-invite');
	const inputEmail = document.querySelector('.invite-form input[type="email"]');
	const inputNomeEstudante = document.querySelector('.invite-form input[type="text"]');
	btnInvite?.addEventListener('click', async (e) => {
		e.preventDefault();
		const email = inputEmail.value.trim();
		if (!email) {
			alert('Digite o email do estudante!');
			return;
		}
		const resultado = await pesquisarEstudante(email);
		if (!resultado.existe) {
			alert('Estudante não encontrado. Você pode convidá-lo para se cadastrar.');
			// Aqui pode-se implementar lógica para convite real
			return;
		}
		if (!resultado.cadastroCompleto) {
			alert('O estudante existe, mas o cadastro está incompleto.');
			return;
		}
		if (resultado.emEquipe) {
			alert('O estudante já está em uma equipe.');
			return;
		}
		alert('Estudante encontrado e apto para ser adicionado à equipe!');

		// Procurar próximo slot de aluno disponível
		const idx = membrosEquipe.findIndex((m, i) => m.tipo === 'aluno' && m.status !== 'green');
		if (idx === -1) {
			alert('Todos os slots de aluno já estão preenchidos!');
			return;
		}
		membrosEquipe[idx] = {
			nome: resultado.aluno.nome || resultado.aluno.email,
			tipo: 'aluno',
			status: 'green',
			id_aluno: resultado.aluno.id_aluno
		};
		atualizarCardsEquipe(membrosEquipe);
		// Salvar imediatamente no backend (vincular aluno à equipe)
		await salvarMembroNaEquipe(resultado.aluno.id_aluno);
		// Limpar campos do convite
		inputEmail.value = '';
		inputNomeEstudante.value = '';
// Função para salvar membro (aluno) na equipe no backend
async function salvarMembroNaEquipe(idAluno) {
	const urlParams = new URLSearchParams(window.location.search);
	const idProcesso = urlParams.get('id_processo');
	// Buscar equipe existente para o processo
	let equipeId = null;
	try {
		const res = await fetch(`/api/equipes?id_processo=${idProcesso}`);
		if (res.ok) {
			const equipes = await res.json();
			if (equipes.length > 0) equipeId = equipes[0].id_equipe;
		}
	} catch {}
	if (!equipeId) return;
	try {
		await fetch(`/api/alunos/${idAluno}/equipe`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id_equipe: equipeId })
		});
	} catch {}
}
// Função para salvar equipe no backend (update)
async function salvarEquipeBackend() {
	// Exemplo: salvar nome e membros (ajuste conforme seu backend)
	const urlParams = new URLSearchParams(window.location.search);
	const idProcesso = urlParams.get('id_processo');
	// Buscar equipe existente para o processo
	let equipeId = null;
	try {
		const res = await fetch(`/api/equipes?id_processo=${idProcesso}`);
		if (res.ok) {
			const equipes = await res.json();
			if (equipes.length > 0) equipeId = equipes[0].id_equipe;
		}
	} catch {}
	if (!equipeId) return;
	// Exemplo: só salva nome da equipe (ajuste para salvar membros se backend permitir)
	const teamNameDisplay = document.querySelector('.team-name-display');
	const nomeEquipe = teamNameDisplay ? teamNameDisplay.textContent : '';
	try {
		await fetch(`/api/equipes/${equipeId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nome_equipe: nomeEquipe })
		});
	} catch {}
}
	});

	// Exibir nome salvo ao carregar (se já existir)
	if (teamNameDisplay && inputNome.value) {
		teamNameDisplay.textContent = inputNome.value;
	}
});
// Função para pesquisar estudante por email
async function pesquisarEstudante(email) {
	try {
		// 1. Verifica se existe aluno com esse email
		const resAluno = await fetch(`/api/alunos?email=${encodeURIComponent(email)}`);
		if (!resAluno.ok) throw new Error('Erro ao buscar aluno');
		const alunos = await resAluno.json();
		if (!alunos.length) return { existe: false };
		const aluno = alunos[0];

		// 2. Verifica se cadastro está completo (exemplo: campos obrigatórios)
		const cadastroCompleto = aluno.nome && aluno.email && aluno.id_escola;

		// 3. Verifica se já está em equipe (exemplo: campo id_equipe ou consulta específica)
		let emEquipe = false;
		if (aluno.id_equipe) {
			emEquipe = true;
		} else {
			// Se não houver campo direto, pode-se consultar API de equipes futuramente
		}

		return {
			existe: true,
			cadastroCompleto,
			emEquipe,
			aluno
		};
	} catch (err) {
		alert('Erro ao pesquisar estudante: ' + err.message);
		return { existe: false };
	}
}

// Função para cadastrar equipe
async function cadastrarEquipe(nomeEquipe, idProfessorLider = 1) {
	try {
		const response = await fetch('/api/equipes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nome_equipe: nomeEquipe, id_professor_lider: idProfessorLider })
		});
		if (!response.ok) throw new Error('Erro ao cadastrar equipe');
		return await response.json();
	} catch (err) {
		alert('Erro ao cadastrar equipe: ' + err.message);
		return null;
	}
}

// Lidar com o envio do nome da equipe
// ...existing code...
