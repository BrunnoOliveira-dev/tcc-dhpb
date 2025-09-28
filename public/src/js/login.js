const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita recarregar a página

    // Captura os valores dos campos
    const dados = {

        // sobrenome: document.getElementById("sobrenome").value.trim(),
        email: document.getElementById("email").value.trim(),
        senha: document.getElementById("senha").value.trim(),

    };

    // Validação simples
    if (
        !dados.email ||
        !dados.senha
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Envia para a API
    fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(async (response) => {
            const data = await response.json(); // agora data existe

            if (!response.ok) {
                throw new Error(data.erro || "Erro ao fazer login");
            }

            return data; // segue para o próximo then
        })
        .then((data) => {
            alert("Login realizado com sucesso!");
            console.log("Resposta da API:", data);
            form.reset(); // limpa o formulário

            // salva os dados do usuário no localStorage
            localStorage.setItem("usuario", JSON.stringify({
                id_pessoa: data.pessoa.id_pessoa,
                nome: data.pessoa.nome,
                email: data.pessoa.email
            }));


            // redireciona para a página inicial
            window.location.href = "/";
        })
        .catch((error) => {
            alert(error.message); // mostra o erro certo vindo do backend
            console.error(error);
        });

});