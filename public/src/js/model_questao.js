const questaoId = window.location.pathname.split('/').pop();

fetch("/api/questoes/" + questaoId)
    .then(response => response.json())
    .then(questao => {
        document.getElementById(".highlight-box").innerText =
            questao.texto + "\n" + questao.enunciado;
    })
    .catch(error => console.error("Erro ao carregar a questão:", error));


fetch("/api/questoes/alternativas/" + questaoId)
    .then(response => response.json())
    .then(alternativas => {
        alternativas.forEach((alt, index) => {
            const altElement = document.querySelector(".form-field" + (index + 1));
            if (altElement) {
                altElement.innerText = alt.texto;
            }
        });

    })
    .catch(error => console.error('Erro ao carregar as alternativas:', error));