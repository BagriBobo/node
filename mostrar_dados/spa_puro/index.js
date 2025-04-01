var showList = false;

function listElement(){
    if(showList){
        const listElement = document.querySelector('ul');
        listElement.remove();
        showList = false;
        return;
    }

    showList = true;
    const rootElement = document.getElementById('root');
    const itens = ['Item 1', 'Item 2', 'Item 3'];
    const listElement = document.createElement('ul');

    itens.forEach(element => {
        const li = document.createElement('li');
        li.innerText = element;
        listElement.appendChild(li);
    });

    rootElement.appendChild(listElement);
}

window.onload = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = '<h1>Lista de Itens</h1>'
    rootElement.innerHTML += '<button id="btn">Mostrar</button>'
    const btn = document.getElementById('btn');
    btn.addEventListener('click', listElement);
}