const questaoId = window.location.pathname.split('/').pop();

fetch("/api/questoes/" + questaoId)
    .then(response => response.json())
    .then(questao => {
        document.getElementById("highlight-box").innerText =
            questao.texto;
    })
    .catch(error => console.error("Erro ao carregar a questão:", error));

fetch("/api/questoes/alternativas/" + questaoId)
    .then(response => response.json())
    .then(alternativas => {
        alternativas.forEach((alt, index) => {
            // Seleciona o textarea correspondente
            const altElement = document.querySelectorAll(".form-field")[index];
            if (altElement) {
                altElement.value = alt.texto; // Usar 'value' para textarea
            }
        });


        // Se quiser, também pode colocar o enunciado no highlight-box
        const highlightBox = document.getElementById('highlight-box');
        if (highlightBox && alternativas.length > 0 && alternativas[0].Questao) {
            highlightBox.innerText = alternativas[0].Questao.enunciado || '';
        }


    })
    .catch(error => console.error('Erro ao carregar as alternativas:', error));