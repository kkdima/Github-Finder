import { motion } from 'framer-motion'
import { Github, Code, Search, Users } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Search GitHub users with powerful filtering and real-time results.',
    },
    {
      icon: Users,
      title: 'User Profiles',
      description: 'View detailed user profiles with comprehensive information and statistics.',
    },
    {
      icon: Code,
      title: 'Repository Explorer',
      description: 'Browse user repositories with detailed information and metrics.',
    },
    {
      icon: Github,
      title: 'GitHub Integration',
      description: 'Seamless integration with GitHub API for up-to-date information.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      {/* Hero Section */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full mb-6"
        >
          <Github className="w-10 h-10 text-primary-600 dark:text-primary-400" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          About GitHub Finder
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A modern, fast, and intuitive way to discover GitHub users and explore their repositories.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="card p-6 hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-900/20"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Built with Modern Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">React 18</div>
            <div className="text-gray-600 dark:text-gray-400">UI Library</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">TypeScript</div>
            <div className="text-gray-600 dark:text-gray-400">Type Safety</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">Vite</div>
            <div className="text-gray-600 dark:text-gray-400">Build Tool</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">Tailwind CSS</div>
            <div className="text-gray-600 dark:text-gray-400">Styling</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">React Query</div>
            <div className="text-gray-600 dark:text-gray-400">Data Fetching</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">Framer Motion</div>
            <div className="text-gray-600 dark:text-gray-400">Animations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">React Router</div>
            <div className="text-gray-600 dark:text-gray-400">Navigation</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">Lucide React</div>
            <div className="text-gray-600 dark:text-gray-400">Icons</div>
          </div>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center card p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Application Information
        </h2>
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          <p><strong>Version:</strong> 2.0.0</p>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>GitHub API:</strong> v3 (REST API)</p>
        </div>
        <div className="mt-6">
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-default inline-flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub API Documentation
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
} 