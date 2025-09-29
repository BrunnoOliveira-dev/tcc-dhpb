// Recupera escola do sessionStorage
let escola = null;
try {
    escola = JSON.parse(sessionStorage.getItem('escola_selecionada'));
} catch {}
if (!escola) {
    window.location.href = '/selecionar_escola';
}
// Exibe info da escola
const escolaInfo = document.getElementById('escola-info');
escolaInfo.innerHTML = escola ? `<b>Escola:</b> ${escola.nome} (${escola.municipio || ''} - ${escola.uf || ''})` : '';

// Carrega processos da escola
function carregarProcessos() {
    fetch(`/api/processos?id_escola=${escola.id_escola}`)
        .then(res => res.json())
        .then(processos => {
            const lista = document.getElementById('lista-processos');
            lista.innerHTML = '';
            if (!processos.length) {
                lista.innerHTML = '<p>Nenhum processo encontrado para esta escola.</p>';
                return;
            }
            processos.forEach(proc => {
                const div = document.createElement('div');
                div.className = `process-card ${proc.status}`;
                div.innerHTML = `
              <div class="process-info">
                <div><b>ID:</b> ${proc.id_processo}</div>
                <div><b>Status:</b> <span class="process-status">${proc.status === 'completo' ? 'Completo' : 'Em andamento'}</span></div>
                <div><b>Início:</b> ${new Date(proc.data_inicio).toLocaleString('pt-BR')}</div>
                ${proc.data_fim ? `<div><b>Fim:</b> ${new Date(proc.data_fim).toLocaleString('pt-BR')}</div>` : ''}
              </div>
              <div>
                <button onclick="window.location.href='/criar_equipe/${proc.id_processo}'" class="btn btn-save">Ver/Cadastrar Equipe</button>
              </div>
            `;
                lista.appendChild(div);
            });
        });
}
carregarProcessos();

// Novo processo
document.querySelector('.btn-novo-processo').onclick = function () {
    fetch('/api/processos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_escola: escola.id_escola
            })
        })
        .then(res => res.json())
        .then(proc => {
            if (proc && proc.id_processo) {
                window.location.href = `/criar_equipe/${proc.id_processo}`;
            } else {
                alert('Erro ao criar processo.');
            }
        });
};