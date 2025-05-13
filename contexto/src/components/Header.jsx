import { useTheme } from '../context/ThemeContext';

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className={`${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Exemplo de Context API</h1>
      <button onClick={toggleTheme}>
        {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>
    </header>
  );
}

export default Header;
