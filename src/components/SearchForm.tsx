import { useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

interface SearchFormProps {
  onSearch: (query: string) => void
  onClear: () => void
  isLoading?: boolean
  hasResults?: boolean
}

interface FormData {
  query: string
}

export default function SearchForm({ onSearch, onClear, isLoading = false, hasResults = false }: SearchFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = useCallback((data: FormData) => {
    const trimmedQuery = data.query.trim()
    if (trimmedQuery) {
      onSearch(trimmedQuery)
    }
  }, [onSearch])

  const handleClear = useCallback(() => {
    reset()
    onClear()
  }, [onClear, reset])

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              {...register('query', {
                required: 'Please enter a search term',
                minLength: {
                  value: 1,
                  message: 'Search term must be at least 1 character',
                },
                maxLength: {
                  value: 100,
                  message: 'Search term must be less than 100 characters',
                },
              })}
              type="text"
              placeholder="Search GitHub users..."
              className={`input pl-10 pr-4 text-lg h-12 ${
                errors.query ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full" />
              </div>
            )}
          </div>
          
          {errors.query && (
            <p className="text-red-600 dark:text-red-400 text-sm">{errors.query.message}</p>
          )}

          <div className="flex gap-3">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-default flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search'}
            </motion.button>
            
            {hasResults && (
              <motion.button
                type="button"
                onClick={handleClear}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline btn-default"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
} 