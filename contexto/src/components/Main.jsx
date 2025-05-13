import { useTheme } from '../context/ThemeContext';
import CounterDisplay from '../components/CounterDisplay';
import CounterControls from '../components/CounterControls';

function Main() {
  const { isDarkMode } = useTheme();
  
  return (
    <main className={`${isDarkMode ? 'dark' : 'light'}`}>
        <h2>Demonstração de Context API no React</h2>
        <div className="example-section">
            <CounterDisplay />
            <CounterControls />
        </div>
    </main>
  );
}

export default Main;