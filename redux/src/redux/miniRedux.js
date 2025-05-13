//STORE - Armazena o estado da aplicação
export function createStore(reducer) {
  let state;
  let listeners = [];

  //Obtém o estado atual
  const getState = () => state;

  //Inscreve funções para serem chamadas quando o estado mudar
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  //Despacha uma ação para mudar o estado
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  };

  //Inicializa o estado com uma ação de inicialização
  dispatch({ type: '@@INIT' });

  return { getState, subscribe, dispatch };
}

//REDUCER - Função que recebe o estado atual e uma ação e retorna um novo estado
//Exemplo de um reducer para um contador
export function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

//ACTIONS - Funções que criam objetos de ação
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
export const reset = () => ({ type: 'RESET' });

//Criar nossa store
export const store = createStore(counterReducer);
