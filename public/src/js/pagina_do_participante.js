document.addEventListener("DOMContentLoaded", function() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        window.location.href = "/login";
        return;
    }
    document.getElementById("nome").textContent = usuario.nome;

    // Carrega o conteúdo dinâmico
});