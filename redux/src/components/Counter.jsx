import { useState, useEffect } from 'react';
import { store, increment, decrement, reset } from '../redux/miniRedux';

function Counter() {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    //Inscreve-se para atualizações do estado
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().count);
    });
    
    //Limpeza quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  //Manipuladores para despachar ações
  const handleIncrement = () => store.dispatch(increment());
  const handleDecrement = () => store.dispatch(decrement());
  const handleReset = () => store.dispatch(reset());

  return (
    <div className="counter">
      <h1>Contador com Mini-Redux</h1>
      <p className="counter-value">Valor atual: {count}</p>
      
      <div className="counter-buttons">
        <button onClick={handleDecrement}>Decrementar (-)</button>
        <button onClick={handleReset}>Resetar (0)</button>
        <button onClick={handleIncrement}>Incrementar (+)</button>
      </div>
    </div>
  );
}

export default Counter;