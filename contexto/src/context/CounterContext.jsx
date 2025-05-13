import { createContext, useState, useContext } from 'react';

const CounterContext = createContext();

//Função que retorna o contexto do Counter
//Se o contexto estiver disponível, retorna o valor do contexto
export function useCounter() {
  return useContext(CounterContext);
}

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);
  const reset = () => setCount(0);

  const value = {
    count,
    increment,
    decrement,
    reset
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}
