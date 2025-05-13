# Mini-Redux: Implementação Simplificada do Padrão Reducer

Este projeto demonstra uma implementação simplificada do padrão Redux. O foco principal é entender os conceitos fundamentais do padrão Reducer e como ele funciona por baixo dos panos, sem depender da biblioteca Redux oficial.

## O Padrão Reducer: Explicação Conceitual

O padrão Reducer é uma abordagem para gerenciamento de estado baseada em alguns princípios fundamentais:

1. **Estado Único**: Todo o estado da aplicação é armazenado em um único objeto JavaScript.
2. **Imutabilidade**: O estado nunca é modificado diretamente, mas sim através da criação de novas cópias do estado com as alterações necessárias.
3. **Previsibilidade**: As mudanças no estado são determinísticas e previsíveis, sempre causadas por ações explícitas.

Este padrão foi popularizado pela biblioteca Redux, mas os conceitos podem ser implementados independentemente, como demonstrado neste projeto.

## Componentes do Padrão Reducer

### 1. Store

A Store é o objeto que mantém o estado da aplicação. Ela possui três métodos principais:

- **getState()**: Retorna o estado atual.
- **dispatch(action)**: Envia uma ação para modificar o estado.
- **subscribe(listener)**: Registra funções para serem chamadas quando o estado mudar.

```javascript
//Exemplo simplificado da Store
const store = createStore(reducer);
const state = store.getState(); //Obtém o estado atual
store.dispatch({ type: 'INCREMENT' }); //Despacha uma ação
```

### 2. Reducer

O Reducer é uma função pura que recebe o estado atual e uma ação, e retorna um novo estado. É o núcleo da lógica de negócio da aplicação:

```javascript
//Exemplo de um reducer para contador
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

### 3. Actions

Actions são objetos JavaScript simples que descrevem o que deve acontecer. Elas sempre têm uma propriedade `type` e podem conter dados adicionais:

```javascript
//Exemplos de actions
const incrementAction = { type: 'INCREMENT' };
const addTodoAction = { type: 'ADD_TODO', text: 'Pagar o boleto do curso' };
```

### 4. Action Creators

São funções que criam e retornam actions, facilitando o reuso:

```javascript
//Exemplo de action creators
const increment = () => ({ type: 'INCREMENT' });
const addTodo = (text) => ({ type: 'ADD_TODO', text });
```

## Estrutura do Projeto

```
redux/
├── src/
│   ├── components/
│   │   └── Counter.jsx      #Componente de contador usando a mini-redux
│   ├── redux/
│   │   └── miniRedux.js     #Nossa implementação simplificada do Redux
│   ├── App.jsx              #Componente principal
│   ├── main.jsx             #Ponto de entrada da aplicação
│   └── index.css            #Estilos globais
├── index.html
└── package.json
```

## Como Funciona Nossa Implementação

Nossa implementação `miniRedux.js` contém:

1. **createStore()**: Função para criar uma store que gerencia o estado.
2. **counterReducer()**: Um reducer exemplo para gerenciar um contador.
3. **Action creators**: Funções que criam ações para incrementar, decrementar e resetar o contador.

O componente `Counter.jsx` demonstra como:

1. Obter o estado inicial da store.
2. Inscrever-se para atualizações de estado usando `subscribe()`.
3. Despachar ações para modificar o estado usando `dispatch()`.

## Fluxo de Dados Unidirecional

O padrão Reducer implementa um fluxo de dados unidirecional:

1. O componente dispara uma ação via `dispatch()`.
2. A store passa a ação atual e o estado para o reducer.
3. O reducer calcula o novo estado com base na ação.
4. A store atualiza seu estado interno.
5. A store notifica todos os componentes inscritos.
6. Os componentes atualizados obtêm o novo estado e renderizam a UI.

## Vantagens do Padrão Reducer

1. **Previsibilidade**: O estado só muda em resposta a ações explícitas.
2. **Depuração Facilitada**: Cada alteração de estado pode ser rastreada a uma ação específica.
3. **Centralização**: Todo o estado fica em um único lugar.
4. **Testabilidade**: Reducers são funções puras e fáceis de testar.
5. **Time-travel debugging**: Possibilidade de "voltar no tempo" percorrendo as ações anteriores.
