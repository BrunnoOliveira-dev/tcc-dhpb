// cadastro.js

// Seleciona o formulário
const form = document.querySelector("form");

function limparCPF(cpf) {
    return cpf.replace(/[^\d]+/g, '');
}

// 
// desativado para facilitar os testes
// 

// function validarCPF(cpf) {       // desativado para facilitar os testes
//     cpf = cpf.replace(/[^\d]+/g, '');
//     if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
//     let soma = 0,
//         resto;
//     for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
//     resto = (soma * 10) % 11;
//     if (resto === 10 || resto === 11) resto = 0;
//     if (resto !== parseInt(cpf.substring(9, 10))) return false;
//     soma = 0;
//     for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
//     resto = (soma * 10) % 11;
//     if (resto === 10 || resto === 11) resto = 0;
//     if (resto !== parseInt(cpf.substring(10, 11))) return false;
//     return true;
// }

// Adiciona o evento de submit
form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita recarregar a página

    // Captura os valores dos campos
    const dados = {
        nome: document.getElementById("nome").value.trim(),
        // sobrenome: document.getElementById("sobrenome").value.trim(),
        email: document.getElementById("email").value.trim(),
        senha: document.getElementById("senha").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        endereco: document.getElementById("cidade").value.trim()
        //perfil: document.querySelector('input[name="perfil"]:checked')?.value || ""
    };

    // Validação simples
    if (
        !dados.nome ||
        // !dados.sobrenome ||
        !dados.email ||
        !dados.senha ||
        !dados.cpf ||
        !dados.endereco //||
        //!dados.perfil
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // 
    // desativado para facilitar os testes
    // 

    dados.cpf = limparCPF(dados.cpf);
    // if (!validarCPF(dados.cpf)) {
    //     alert("CPF inválido.");
    //     return;
    // }

    // Envia para a API
    fetch("/api/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar");
            }
            return response.json();
        })
        .then((data) => {
            alert("Cadastro realizado com sucesso!");
            console.log("Resposta da API:", data);
            form.reset(); // limpa o formulário
            fetch("/login").then(() => {
                window.location.href = "/login"; // redireciona para a página de login
            });
        })
        .catch((error) => {
            alert("Ocorreu um erro ao enviar os dados.");
            console.error(error);
        });
});