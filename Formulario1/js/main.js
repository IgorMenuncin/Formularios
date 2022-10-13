const formulario = document.querySelector("#formulario1"); // constante para armazenar formulario
const cadastros = JSON.parse(localStorage.getItem("cadastro")) || []; // criando vetor para armazenar localStorage, caso não haja o vetor sera criado vazio
const listarCad = document.querySelector("#listarCadastros"); // constante que guarda a lista que conterá outras listas, ou lista maior
const botaoLimpar = document.querySelector("#limparLocalStorage"); // constante para armazenar o botao de limpar

if (document.location.pathname === "/Formulario1/index.html"){ // validação da pagina
    formulario.addEventListener ("submit", (evento) => { // adicionando evento de clique no botao submit
        evento.preventDefault(); // tornando o evento padrao
        const pessoa = { // objeto que armazenará itens do formulário
            "nome": evento.target.elements["nome"],
            "email": evento.target.elements["email"],
            "senha": evento.target.elements["senha"],
            "telefone": evento.target.elements["telefone"],
            "dataNasc": evento.target.elements["dataNasc"],
            "opContato": evento.target.elements.opContato, //input do tipo select
            "observacao": evento.target.elements["observacao"]
        }

        if (pessoa.nome.value !== ""){ // validando se nome esta vazio, após utilizar required nas tags essa validação pode ser removida
            const cadastroAtual = { // objeto para armazenar as informações do formulario e enviar para localStorage
                "Nome": pessoa.nome.value,
                "Email": pessoa.email.value,
                "Senha": pessoa.senha.value,
                "Telefone": pessoa.telefone.value,
                "Data de Nascimento": pessoa.dataNasc.value,
                "Contato": pessoa.opContato.value,
                "Observacao": pessoa.observacao.value,
                "Id": ""
            }

            const existe = cadastros.find ( elemento => elemento.Nome === pessoa.nome.value); // Verificando se o nome escrito ja foi cadastrado
            if (existe) {    // Caso exista
                cadastroAtual.Id = existe.Id; // Atribuir ao id do cadastro atual o id do nome ja existente
                cadastros[existe.Id] = cadastroAtual; // Atualiza o cadastro antigo pelo novo
            }
            else {
                cadastroAtual.Id = cadastros.length // adiciona um id ao objeto
                cadastros.push(cadastroAtual); // armazenando objeto do localStorage no vetor
            }

            localStorage.setItem("cadastro",JSON.stringify(cadastros)); //tranformando vetor em json e enviando para localStorage
        }

        Object.keys(pessoa).forEach ((elemento) => { // percorrendo objeto
            pessoa[elemento].value = ""; //anulando os valores do formulário para novas respostas
        })
    })
}

if (document.location.pathname === "/Formulario1/exibir.html"){ // validação da pagina
    cadastros.forEach ( (elemento) => { 
        mostrarCadastro(elemento); // chamando função mostrarCadastro
    })
    botaoLimpar.addEventListener("click", limparLocalStorage); // chama funcao para limpar local storage ao clicar no botao
    if (cadastros.length < 2){
        const main = document.querySelector('.espaco');
        main.classList.replace('espaco','espacoSemItens');
    }

}

function mostrarCadastro (item) {
    const addUl = document.createElement('ul'); // constante para criar ul (lista), que no caso será a lista menor
    addUl.classList.add("cadastrado"); // adicionando classe "cadastrado" a cada lista menor (ul) criada
    addUl.dataset.id = item.Id; // adicionando id que sera igual ao nome a ul (lista menor) criada
    listarCad.appendChild(addUl); // adicionando lista menor (ul) a lista maior (listarCad)

    const ulAtual = document.querySelector("[data-id='" + item.Id + "']"); // constante para armazenar lista menor atual
    
    Object.keys(item).forEach((elemento) => { // funcao que criar um item da lista (li), atribuira a ele um valor do objeto e incluira na lista menor
        const addLi = document.createElement('li'); // constante para criar li (item de lista)
        addLi.innerHTML += `${elemento}: ${item[elemento]}`; // atribui ao item da lista menor um dos valores do objeto
        addLi.classList.add("itemlista"); // adicionando a classe "itemlista" aos itens (li) da lista menor (ul)
        ulAtual.appendChild(addLi); // adicionando li a lista menor atual
    })
}

function limparLocalStorage (){ // funcao para limpar o local storage
    localStorage.clear(); // chamando funcao nativa para limpar local storage
    location.reload(); // atualizar pagina
}