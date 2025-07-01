import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import User from './pages/User'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { useTheme } from './hooks/useTheme'

function AppContent() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: resolvedTheme === 'dark' ? '#374151' : '#ffffff',
            color: resolvedTheme === 'dark' ? '#f9fafb' : '#111827',
            border: resolvedTheme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App 