import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Aplicar tema ao carregar
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Componente do botão de alternância de tema reutilizável
  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  )

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Login 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme}
                ThemeToggleButton={ThemeToggleButton}
              />
            } 
          />
          <Route 
            path="/login" 
            element={
              <Login 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme}
                ThemeToggleButton={ThemeToggleButton}
              />
            } 
          />
          <Route 
            path="/home" 
            element={
              <Home 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme}
                ThemeToggleButton={ThemeToggleButton}
              />
            } 
          />
          {/* Redirecionar rotas não encontradas para login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App