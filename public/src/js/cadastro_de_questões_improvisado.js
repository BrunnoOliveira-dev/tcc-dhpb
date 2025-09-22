// arquivo: cadastro_de_questoes_improvisado.js

const formQuestao = document.getElementById('form-questao');

formQuestao.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturar o enunciado
    const enunciado = document.querySelector('.enunciado-input').value.trim();

    if (!enunciado) {
        alert('O enunciado da questão é obrigatório.');
        return;
    }

    // Capturar alternativas e pontuações
    const alternativas = [
        { texto: document.getElementById('alternativa1').value.trim(), pontuacao: document.getElementById('pontuacao1').value },
        { texto: document.getElementById('alternativa2').value.trim(), pontuacao: document.getElementById('pontuacao2').value },
        { texto: document.getElementById('alternativa3').value.trim(), pontuacao: document.getElementById('pontuacao3').value },
        { texto: document.getElementById('alternativa4').value.trim(), pontuacao: document.getElementById('pontuacao4').value },
    ];

    // Verificar se todas as alternativas e pontuações estão preenchidas
    for (let i = 0; i < alternativas.length; i++) {
        if (!alternativas[i].texto) {
            alert(`A alternativa ${i + 1} é obrigatória.`);
            return;
        }
        if (alternativas[i].pontuacao === '' || alternativas[i].pontuacao < 0) {
            alert(`A pontuação da alternativa ${i + 1} é obrigatória e deve ser >= 0.`);
            return;
        }
        alternativas[i].pontuacao = parseInt(alternativas[i].pontuacao);
    }

    try {
        // Criar a questão
        const questaoResponse = await fetch('/api/questoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enunciado, texto: enunciado })
        });

        if (!questaoResponse.ok) throw new Error('Erro ao criar questão');

        const questaoCriada = await questaoResponse.json();
        const id_questao = questaoCriada.id_questao;

        // Criar alternativas
        for (let alt of alternativas) {
            await fetch('/api/alternativas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texto: alt.texto,
                    pontuacao: alt.pontuacao,
                    id_questao: id_questao
                })
            });
        }

        alert('Questão e alternativas cadastradas com sucesso!');
        formQuestao.reset();

    } catch (err) {
        console.error(err);
        alert('Ocorreu um erro ao cadastrar a questão.');
    }
});