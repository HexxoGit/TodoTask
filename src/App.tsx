import './App.css';
import { TodoWrapper } from './components/TodoWrapper';
import { createContext, useState } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

function App() {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  const icon = theme === "light" ? "/images/icon-moon.svg?url" : "/images/icon-sun.svg?url";

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className={`App ${theme}`}>
        <button onClick={toggleTheme}>
          <img src={icon} alt={`${theme} mode`} />
        </button>
        <TodoWrapper />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
