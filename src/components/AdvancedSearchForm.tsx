import { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Code, 
  Users, 
  GitBranch, 
  Calendar,
  User,
  Filter,
  RotateCcw
} from 'lucide-react'
import type { SearchFilters } from '@/types/github'
import { useLanguageSuggestions, useLocationSuggestions } from '@/hooks/useGitHub'

interface AdvancedSearchFormProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
  isLoading?: boolean
  hasResults?: boolean
  initialFilters?: Partial<SearchFilters>
}

const defaultFilters: SearchFilters = {
  query: '',
  location: '',
  language: '',
  minFollowers: undefined,
  maxFollowers: undefined,
  minRepos: undefined,
  maxRepos: undefined,
  accountType: undefined,
  createdBefore: '',
  createdAfter: '',
  sort: 'followers',
  order: 'desc'
}

export default function AdvancedSearchForm({ 
  onSearch, 
  onClear, 
  isLoading = false, 
  hasResults = false,
  initialFilters = {}
}: AdvancedSearchFormProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
  
  const { control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<SearchFilters>({
    defaultValues: { ...defaultFilters, ...initialFilters }
  })

  const { data: languageSuggestions = [] } = useLanguageSuggestions()
  const { data: locationSuggestions = [] } = useLocationSuggestions(locationQuery)

  const watchedValues = watch()
  const hasActiveFilters = Object.entries(watchedValues).some(([key, value]) => {
    if (key === 'query' || key === 'sort' || key === 'order') return false
    return value !== undefined && value !== '' && value !== null
  })

  const onSubmit = useCallback((data: SearchFilters) => {
    const cleanedData = { ...data }
    Object.keys(cleanedData).forEach(key => {
      const value = cleanedData[key as keyof SearchFilters]
      if (value === '' || value === null) {
        delete cleanedData[key as keyof SearchFilters]
      }
    })
    onSearch(cleanedData)
  }, [onSearch])

  const handleClear = useCallback(() => {
    reset(defaultFilters)
    setLocationQuery('')
    onClear()
  }, [onClear, reset])

  const toggleAdvanced = () => {
    setIsAdvancedOpen(!isAdvancedOpen)
  }

  const resetFilters = () => {
    const basicFilters = {
      query: watchedValues.query,
      sort: watchedValues.sort,
      order: watchedValues.order
    }
    reset({ ...defaultFilters, ...basicFilters })
    setLocationQuery('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Search */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <Controller
                name="query"
                control={control}
                rules={{
                  required: watchedValues.query?.trim() === '' && !hasActiveFilters ? 'Please enter a search term or use filters' : false
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Search GitHub users..."
                    className={`input pl-10 pr-4 text-lg h-12 ${
                      errors.query ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                    disabled={isLoading}
                  />
                )}
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

            {/* Sort Options */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-32">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sort by
                </label>
                <Controller
                  name="sort"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="input h-10 text-sm">
                      <option value="followers">Followers</option>
                      <option value="repositories">Repositories</option>
                      <option value="joined">Joined Date</option>
                    </select>
                  )}
                />
              </div>
              <div className="flex-1 min-w-24">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Order
                </label>
                <Controller
                  name="order"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="input h-10 text-sm">
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <button
              type="button"
              onClick={toggleAdvanced}
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
              {hasActiveFilters && (
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              )}
              {isAdvancedOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6"
              >
                {/* Location and Language Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Location
                    </label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            type="text"
                            placeholder="e.g., San Francisco, London"
                            className="input"
                            onChange={(e) => {
                              field.onChange(e)
                              setLocationQuery(e.target.value)
                            }}
                          />
                          {locationSuggestions.length > 0 && locationQuery.length >= 2 && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
                              {locationSuggestions.map((location) => (
                                <button
                                  key={location}
                                  type="button"
                                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                                  onClick={() => {
                                    setValue('location', location)
                                    setLocationQuery('')
                                  }}
                                >
                                  {location}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Code className="h-4 w-4 inline mr-1" />
                      Programming Language
                    </label>
                    <Controller
                      name="language"
                      control={control}
                      render={({ field }) => (
                        <select {...field} className="input">
                          <option value="">Any Language</option>
                          {languageSuggestions.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </div>

                {/* Followers Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="h-4 w-4 inline mr-1" />
                    Followers Count
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="minFollowers"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Min followers"
                          className="input"
                          value={value ?? ''}
                          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          min="0"
                        />
                      )}
                    />
                    <Controller
                      name="maxFollowers"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Max followers"
                          className="input"
                          value={value ?? ''}
                          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          min="0"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Repository Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <GitBranch className="h-4 w-4 inline mr-1" />
                    Public Repositories Count
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="minRepos"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Min repos"
                          className="input"
                          value={value ?? ''}
                          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          min="0"
                        />
                      )}
                    />
                    <Controller
                      name="maxRepos"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Max repos"
                          className="input"
                          value={value ?? ''}
                          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          min="0"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Account Type and Date Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Account Type
                    </label>
                    <Controller
                      name="accountType"
                      control={control}
                      render={({ field }) => (
                        <select {...field} className="input">
                          <option value="">Any Type</option>
                          <option value="user">User</option>
                          <option value="org">Organization</option>
                        </select>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Joined After
                    </label>
                    <Controller
                      name="createdAfter"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="input"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Joined Before
                    </label>
                    <Controller
                      name="createdBefore"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="input"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
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