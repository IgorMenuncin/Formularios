const formulario = document.querySelector("#formulario1");
const cadastros = JSON.parse(localStorage.getItem("cadastro")) || [];

formulario.addEventListener ("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements["nome"];
    const email = evento.target.elements["email"];
    const senha = evento.target.elements["senha"];
    const telefone = evento.target.elements["telefone"];
    const dataNasc = evento.target.elements["dataNasc"];
    const opContato = evento.target.elements.opContato; //input do tipo select
    const observacao = evento.target.elements["observacao"];

    const cadastroAtual = {
        "nome": nome.value,
        "email": email.value,
        "senha": senha.value,
        "telefone": telefone.value,
        "dataNasc": dataNasc.value,
        "opContato": opContato.value,
        "observacao": observacao.value
    }

    cadastros.push(cadastroAtual);

    localStorage.setItem("cadastro",JSON.stringify(cadastros));
})

