import { ThemeProvider } from './context/ThemeContext';   
import { CounterProvider } from './context/CounterContext';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ThemeProvider>
      <CounterProvider>
        <Header />
        <Main />
      </CounterProvider>
    </ThemeProvider>
  );
}

export default App;
