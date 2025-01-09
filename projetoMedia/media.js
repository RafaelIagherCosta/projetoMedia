    const form = document.getElementById('form-atividade');
    const imgAprovado = '<img src="./images/aprovado.png" alt="emoji celebrando" />'; 
    const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado" />';
    const atividades = []; //aray esperando o valor
    const notas = [];  //aray esperando o valor
    let linhas = ''; 
    const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
    const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

    const notaMinima = parseFloat(prompt('Digite a nota minima:'))



    form.addEventListener('submit', function(e) {
        e.preventDefault(); // para nao dar  refresh nos inputs ate o evento submit
        adicionarLinhas();
        atualizaTabela();
        atualizaMediaFinal();
    });

    function adicionarLinhas() {
        const inputNomeAtividade = document.getElementById('nome-atividade');
        const inputNotaAtividade = document.getElementById('nota-atividade'); 

        if(atividades.includes(inputNomeAtividade.value)){ // para nao repetir o mesmo nome da atividade
            alert(`A atividade ja foi inserida`)
        }
        else{ //para proseguir caso nao tenha nenhuma atividade repetida
        atividades.push(inputNomeAtividade.value); // adicionar o valor na array atividades
        notas.push(parseFloat(inputNotaAtividade.value)); /* adiciona o valor no array notas 
                                                             +parsefloat para que nao entenda com uma string */ 

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; // para adicionar o nome na tabela a atividade
        linha += `<td>${inputNotaAtividade.value}</td>`; // para adicionar a nota na tabela a atividade
        linha += `<td>${parseFloat(inputNotaAtividade.value) >= notaMinima ? imgAprovado : imgReprovado}</td>`; /* se a nota inserida
                                                                 for maior que a minima emoji aprovado caso ao contrario emoji reprovado */
        linha += `</tr>`;
        linhas += linha;}

        inputNomeAtividade.value = ''; // para dar refresh no input apos o submit
        inputNotaAtividade.value = ''; // para dar refresh no input apos o submit

    }

    function atualizaTabela() {
        const corpoTabela = document.querySelector('tbody');
        corpoTabela.innerHTML = linhas;
    }

    function atualizaMediaFinal() {
        const mediaFinal = calculaMediaFinal();

        document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // aparecer o segundo decimal ex:7.5
        document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
    }

    function calculaMediaFinal() {
        let somaDasNotas = 0;

        for (let i = 0; i < notas.length; i++) {
            somaDasNotas += notas[i];
        }

        return somaDasNotas / notas.length 
    }
    