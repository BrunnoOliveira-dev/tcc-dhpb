document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('next-btn');

  btn.addEventListener('click', function (e) {
    e.preventDefault();

    // Dados básicos do sessionStorage
    const dadosBasicos = JSON.parse(sessionStorage.getItem('cadastro_basico'));
    if (!dadosBasicos) {
      alert('Dados básicos não encontrados. Volte e preencha o cadastro inicial.');
      return;
    }

    // Captura dos campos específicos do professor
    const nome = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = document.getElementById('age').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const cidade = document.getElementById('city').value.trim();
    const rg = document.getElementById('rg').value.trim();
    const disciplina = document.getElementById('disciplina')?.value?.trim() || '';
    // Para declaração, pode ser implementado upload posteriormente

    if (!nome || !email || !idade || !cpf || !cidade || !rg || !disciplina) {
      alert('Preencha todos os campos do professor.');
      return;
    }

    // Monta objeto para API
    const dadosProfessor = {
      ...dadosBasicos,
      nome,
      email,
      idade,
      cpf,
      cidade,
      rg,
      disciplina
    };

    // Envia para a API
    fetch('/api/professores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosProfessor)
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao cadastrar professor');
        return response.json();
      })
      .then(data => {
        alert('Cadastro de professor realizado com sucesso!');
        sessionStorage.removeItem('cadastro_basico');
        window.location.href = '/login';
      })
      .catch(error => {
        alert('Erro ao cadastrar professor.');
        console.error(error);
      });
  });
});
