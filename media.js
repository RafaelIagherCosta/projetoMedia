const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji celebrando" />'; 
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado" />';
const atividades = [];
const notas = []; 
let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionarLinhas();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionarLinhas() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade'); // Corrigido aqui

    const nota = parseFloat(inputNotaAtividade.value); // Captura a nota como número

    if (inputNomeAtividade.value && !isNaN(nota)) {
        // Verifica se a atividade já existe
        if (atividades.includes(inputNomeAtividade.value)) {
            alert('Essa atividade já foi adicionada. Por favor, insira um nome diferente.');
            return; // Sai da função se a atividade já existir
        }

        atividades.push(inputNomeAtividade.value);
        notas.push(nota);

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${nota}</td>`;
        linha += `<td>${nota >= 7 ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;
        linhas += linha;

        inputNomeAtividade.value = '';
        inputNotaAtividade.value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.'); // Mensagem de erro
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // Formata a média para 2 casas decimais
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= 7 ? 'Aprovado' : 'Reprovado';
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return notas.length > 0 ? somaDasNotas / notas.length : 0; // Evita divisão por zero
}
    
