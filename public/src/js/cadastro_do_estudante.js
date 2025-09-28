document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.btn');
  const buscaEscola = document.getElementById('busca-escola');
  const sugestoes = document.getElementById('sugestoes-escola');
  let escolaSelecionada = null;

  // Autocomplete de escola
  let debounceTimeout;
  buscaEscola.addEventListener('input', function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const termo = buscaEscola.value.trim();
      sugestoes.innerHTML = '';
      escolaSelecionada = null;
      if (termo.length < 2) return;
      fetch(`/api/escolas?nome=${encodeURIComponent(termo)}`)
        .then(res => res.json())
        .then(lista => {
          lista.slice(0, 8).forEach(escola => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = `${escola.nome} (${escola.municipio} - ${escola.uf})`;
            div.onclick = () => {
              buscaEscola.value = escola.nome;
              escolaSelecionada = escola;
              sugestoes.innerHTML = '';
            };
            sugestoes.appendChild(div);
          });
        });
    }, 300);
  });

  btn.addEventListener('click', function (e) {
    e.preventDefault();

    // Dados básicos do sessionStorage
    const dadosBasicos = JSON.parse(sessionStorage.getItem('cadastro_basico'));
    if (!dadosBasicos) {
      alert('Dados básicos não encontrados. Volte e preencha o cadastro inicial.');
      return;
    }

    // Captura dos campos específicos do estudante
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
    const nivel = document.querySelector('input[name="nivel"]:checked')?.value;
    const serie = document.querySelector('input[name="serie"]:checked')?.value;

    if (!escolaSelecionada || !tipo || !nivel || !serie) {
      alert('Preencha todos os campos do estudante e selecione uma escola.');
      return;
    }

    // Monta objeto para API
    const dadosAluno = {
      ...dadosBasicos,
      id_escola: escolaSelecionada.id_escola,
      tipo_escola: tipo,
      nivel_ensino: nivel,
      serie
    };

    // Envia para a API
    fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAluno)
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao cadastrar estudante');
        return response.json();
      })
      .then(data => {
        alert('Cadastro de estudante realizado com sucesso!');
        sessionStorage.removeItem('cadastro_basico');
        window.location.href = '/login';
      })
      .catch(error => {
        alert('Erro ao cadastrar estudante.');
        console.error(error);
      });
  });
});
