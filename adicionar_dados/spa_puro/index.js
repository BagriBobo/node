var showList = false;
var itens = ['Item 1', 'Item 2', 'Item 3'];

function listElement(){
    if(showList){
        const listElement = document.querySelector('ul');
        listElement.remove();
        showList = false;
        return;
    }

    showList = true;
    const rootElement = document.getElementById('root');
    const listElement = document.createElement('ul');

    itens.forEach(element => {
        const li = document.createElement('li');
        li.innerText = element;
        listElement.appendChild(li);
    });

    rootElement.appendChild(listElement);
}

function addItens(){
    itens.push(`Item ${itens.length + 1}`);
    addItemOnList();
}

function addItemOnList(){
    const rootElement = document.getElementById('root');
    const listElement = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = itens[itens.length - 1];
    listElement.appendChild(li);
    showList = true;
}

window.onload = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = '<h1>Lista de Itens</h1>'
    
    rootElement.innerHTML += '<button id="btn" onclick="listElement()">Mostrar</button>'
    rootElement.innerHTML += '<button id="btn2" onclick="addItens()">Adicionar</button>'
}