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
    console.log(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className={`App ${theme}`}>
        <span>{modeText}</span>
        <button onClick={toggleTheme}>
          <img src={theme === 'dark' ? '/images/icon-moon.svg?url' : '/images/icon-sun.svg?url'} alt='Theme Icon' />
        </button>
      </div>
      <TodoWrapper theme={theme}/>
    </ThemeContext.Provider>
  )
}

export default App
