import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <motion.button
        className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-primary/90 text-white shadow-soft hover:bg-primary dark:bg-primary-dark dark:hover:bg-primary"
        onClick={() => setDarkMode(!darkMode)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App