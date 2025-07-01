import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface UseThemeReturn {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    let actualTheme: 'light' | 'dark'

    if (newTheme === 'system') {
      actualTheme = getSystemTheme()
    } else {
      actualTheme = newTheme
    }

    setResolvedTheme(actualTheme)

    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add new theme class
    root.classList.add(actualTheme)

    // Update CSS custom properties for smooth transitions
    if (actualTheme === 'dark') {
      root.style.setProperty('--background', '222.2 84% 4.9%')
      root.style.setProperty('--foreground', '210 40% 98%')
      root.style.setProperty('--card', '222.2 84% 4.9%')
      root.style.setProperty('--card-foreground', '210 40% 98%')
      root.style.setProperty('--primary', '217.2 91.2% 59.8%')
      root.style.setProperty('--primary-foreground', '222.2 84% 4.9%')
      root.style.setProperty('--secondary', '217.2 32.6% 17.5%')
      root.style.setProperty('--secondary-foreground', '210 40% 98%')
      root.style.setProperty('--muted', '217.2 32.6% 17.5%')
      root.style.setProperty('--muted-foreground', '215 20.2% 65.1%')
      root.style.setProperty('--accent', '217.2 32.6% 17.5%')
      root.style.setProperty('--accent-foreground', '210 40% 98%')
      root.style.setProperty('--border', '217.2 32.6% 17.5%')
      root.style.setProperty('--input', '217.2 32.6% 17.5%')
      root.style.setProperty('--ring', '217.2 91.2% 59.8%')
    } else {
      root.style.setProperty('--background', '0 0% 100%')
      root.style.setProperty('--foreground', '222.2 84% 4.9%')
      root.style.setProperty('--card', '0 0% 100%')
      root.style.setProperty('--card-foreground', '222.2 84% 4.9%')
      root.style.setProperty('--primary', '221.2 83.2% 53.3%')
      root.style.setProperty('--primary-foreground', '210 40% 98%')
      root.style.setProperty('--secondary', '210 40% 96%')
      root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%')
      root.style.setProperty('--muted', '210 40% 96%')
      root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%')
      root.style.setProperty('--accent', '210 40% 96%')
      root.style.setProperty('--accent-foreground', '222.2 84% 4.9%')
      root.style.setProperty('--border', '214.3 31.8% 91.4%')
      root.style.setProperty('--input', '214.3 31.8% 91.4%')
      root.style.setProperty('--ring', '221.2 83.2% 53.3%')
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  useEffect(() => {
    // Apply theme on initial load
    applyTheme(theme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
} 