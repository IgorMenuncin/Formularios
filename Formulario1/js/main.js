const formulario = document.querySelector("#formulario1");
const cadastros = JSON.parse(localStorage.getItem("cadastro")) || [];
const listarCad = document.querySelector("#listarCadastros"); // constante que guarda a lista que conterá outras listas, ou lista maior

if (document.location.pathname === "/Formulario1/index.html"){
    formulario.addEventListener ("submit", (evento) => {
        evento.preventDefault();
        const pessoa = {
            "nome": evento.target.elements["nome"],
            "email": evento.target.elements["email"],
            "senha": evento.target.elements["senha"],
            "telefone": evento.target.elements["telefone"],
            "dataNasc": evento.target.elements["dataNasc"],
            "opContato": evento.target.elements.opContato, //input do tipo select
            "observacao": evento.target.elements["observacao"]
        }

        if (pessoa.nome.value !== ""){
            const cadastroAtual = {
                "nome": pessoa.nome.value,
                "email": pessoa.email.value,
                "senha": pessoa.senha.value,
                "telefone": pessoa.telefone.value,
                "dataNasc": pessoa.dataNasc.value,
                "opContato": pessoa.opContato.value,
                "observacao": pessoa.observacao.value
            }

            cadastros.push(cadastroAtual);

            localStorage.setItem("cadastro",JSON.stringify(cadastros));
        }

        Object.keys(pessoa).forEach ((elemento) => {
            pessoa[elemento].value = "";
        })
    })
}

if (document.location.pathname === "/Formulario1/exibir.html")
    cadastros.forEach ( (elemento) => { 
        mostrarCadastro(elemento);
    })

function mostrarCadastro (item) {
    const addUl = document.createElement('ul'); // constante para criar ul (lista), que no caso será a lista menor
    addUl.classList.add("cadastrado"); // adicionando classe "cadastrado" a cada lista menor (ul) criada
    addUl.id = item.nome; // adicionando id que sera igual ao nome a ul (lista menor) criada
    listarCad.appendChild(addUl); // adicionando lista menor (ul) a lista maior (listarCad)

    const ulAtual = document.getElementById(item.nome); // constante para armazenar lista menor atual
    
    Object.keys(item).forEach((elemento) => { // funcao que criar um item da lista (li), atribuira a ele um valor do objeto e incluira na lista menor
        const addLi = document.createElement('li'); // constante para criar li (item de lista)
        addLi.innerHTML += `${elemento}: ${item[elemento]}`; // atribui ao item da lista menor um dos valores do objeto
        addLi.classList.add("itemlista"); // adicionando a classe "itemlista" aos itens (li) da lista menor (ul)
        ulAtual.appendChild(addLi); // adicionando li a lista menor atual
    })
}
