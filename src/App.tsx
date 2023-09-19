import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

function App() {

  const [theme, setTheme] = useState('light');
  const [modeText, setModeText] = useState('');

  useEffect(() => {
    setModeText(theme === 'light' ? 'Modo Diurno' : 'Modo Noturno');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className='theme-mode'>
        <span>{modeText}</span>
        <button onClick={toggleTheme}>
          <img src={theme === 'dark' ? '/images/icon-moon.svg?url' : '/images/icon-sun.svg?url'} alt='Theme Icon' />
        </button>
      </div>
      <TodoWrapper />
    </ThemeContext.Provider>
  )
}

export default App
