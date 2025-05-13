import { useCounter } from '../context/CounterContext';
import { useTheme } from '../context/ThemeContext';

function CounterControls() {
  const { increment, decrement, reset } = useCounter();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`counter-controls ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default CounterControls;
