fetch('/edu/aluno/202010040036/?tab=dados_pessoais')
    .then(function(response) {
        return response.text()
    })
    .then(function(html) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        let chaveResponsavel = doc.querySelector('div[data-tab="dados_pessoais"] [class="box "]:nth-child(2) tbody tr:nth-child(4) :nth-child(2)').textContent
        let matricula = doc.querySelector('tbody tr :nth-child(6)').textContent

        window.location = 'https://jao42.dev.br/?matricula=' + matricula + 'chave_responsavel=' + chaveResponsavel
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });



