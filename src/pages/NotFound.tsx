import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="btn btn-primary btn-default inline-flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            to="/"
            className="btn btn-outline btn-default inline-flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search Users
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 