document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-cadastro');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura dos campos
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const tipoPessoaInput = document.querySelector('input[name="tipo_pessoa"]:checked');

    // Validação básica
    if (!nome || !sobrenome || !email || !senha || !cpf || !cidade || !tipoPessoaInput) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const tipo_pessoa = tipoPessoaInput.value;

    // Monta objeto com dados básicos
    const dadosBasicos = {
      nome: `${nome} ${sobrenome}`,
      email,
      senha,
      cpf,
      cidade,
      tipo_pessoa
    };

    // Salva no sessionStorage
    sessionStorage.setItem('cadastro_basico', JSON.stringify(dadosBasicos));

    // Redireciona para a próxima etapa
    if (tipo_pessoa === 'aluno') {
      window.location.href = '/cadastro_do_estudante';
    } else if (tipo_pessoa === 'professor') {
      window.location.href = '/cadastro_professor';
    } else {
      alert('Tipo de pessoa inválido.');
    }
  });
});


// // Envia para a API
// fetch("/api/cadastro", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(dados)
//   })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Erro ao cadastrar");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     alert("Cadastro realizado com sucesso!");
//     console.log("Resposta da API:", data);
//     form.reset(); // limpa o formulário
//     fetch("/login").then(() => {
//       window.location.href = "/login"; // redireciona para a página de login
//     });
//   })
//   .catch((error) => {
//     alert("Ocorreu um erro ao enviar os dados.");
//     console.error(error);
//   });
// });