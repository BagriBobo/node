import { useCounter } from '../context/CounterContext';
import { useTheme } from '../context/ThemeContext';

function CounterDisplay() {
  const { count } = useCounter();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`counter-display ${isDarkMode ? 'dark' : 'light'}`}>
      <h2>Contador: {count}</h2>
    </div>
  );
}

export default CounterDisplay;
