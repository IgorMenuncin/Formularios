const formulario = document.querySelector("#formulario1");

formulario.addEventListener ("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements["nome"];
    const email = evento.target.elements["email"];
    const senha = evento.target.elements["senha"];
    const telefone = evento.target.elements["telefone"];
    const dataNasc = evento.target.elements["dataNasc"];
    const opContato = evento.target.elements.opContato; //input do tipo select
    const observacao = evento.target.elements["observacao"];


    console.log(evento.target.elements);
    
    


})

