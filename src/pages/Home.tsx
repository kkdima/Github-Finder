import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import AdvancedSearchForm from '@/components/AdvancedSearchForm'
import FilterChips from '@/components/FilterChips'
import UserCard from '@/components/UserCard'
import { UserCardSkeleton } from '@/components/skeletons'
import { useAdvancedSearchUsers } from '@/hooks/useGitHub'
import type { SearchFilters } from '@/types/github'

export default function Home() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    sort: 'followers',
    order: 'desc'
  })
  const [hasSearched, setHasSearched] = useState(false)
  
  const { data, isLoading, error, refetch } = useAdvancedSearchUsers(searchFilters, 1, hasSearched)

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
    setHasSearched(true)
    refetch()
  }

  const handleClear = () => {
    setSearchFilters({
      query: '',
      sort: 'followers',
      order: 'desc'
    })
    setHasSearched(false)
  }

  const handleRemoveFilter = (filterKey: keyof SearchFilters) => {
    const newFilters = { ...searchFilters }
    delete newFilters[filterKey]
    setSearchFilters(newFilters)
    
    // Trigger new search if there are still active filters or query
    if (newFilters.query || hasActiveFilters(newFilters)) {
      refetch()
    } else {
      setHasSearched(false)
    }
  }

  const handleClearAllFilters = () => {
    const basicFilters = {
      query: searchFilters.query,
      sort: searchFilters.sort || 'followers',
      order: searchFilters.order || 'desc'
    }
    setSearchFilters(basicFilters)
    
    if (basicFilters.query) {
      refetch()
    } else {
      setHasSearched(false)
    }
  }

  // Helper function to check if any advanced filters are active
  const hasActiveFilters = (filters: SearchFilters): boolean => {
    return !!(
      filters.location?.trim() ||
      filters.language?.trim() ||
      filters.minFollowers !== undefined ||
      filters.maxFollowers !== undefined ||
      filters.minRepos !== undefined ||
      filters.maxRepos !== undefined ||
      filters.accountType ||
      filters.createdBefore ||
      filters.createdAfter
    )
  }

  const showError = error && hasSearched
  const showResults = data && hasSearched && !isLoading
  const showEmptyState = showResults && data.items.length === 0

  // Show error toast
  if (showError) {
    toast.error(error.message || 'Failed to search users')
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Discover GitHub{' '}
          <span className="text-primary-600 dark:text-primary-400">Developers</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Search and explore GitHub users with advanced filters. Find developers by location, programming language, followers count, and more.
        </p>
      </motion.div>

      {/* Advanced Search Form */}
      <AdvancedSearchForm
        onSearch={handleSearch}
        onClear={handleClear}
        isLoading={isLoading}
        hasResults={showResults}
        initialFilters={searchFilters}
      />

      {/* Active Filter Chips */}
      {hasSearched && hasActiveFilters(searchFilters) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <FilterChips
            filters={searchFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        </motion.div>
      )}

      {/* Results Section */}
      {showError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Search Failed
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error.message || 'Unable to search users. Please try again.'}
            </p>
            <button
              onClick={() => refetch()}
              className="btn btn-primary btn-default"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {showEmptyState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <div className="text-center">
            <Users className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search terms or filters to find more results.
            </p>
          </div>
        </motion.div>
      )}

      {showResults && data.items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Search Results
            </h2>
            <div className="text-right">
              <span className="text-gray-600 dark:text-gray-300">
                {data.total_count.toLocaleString()} users found
              </span>
              {data.incomplete_results && (
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Some results may be incomplete
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </div>

          {/* Search Summary */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Summary
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchFilters.query && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                  Query: "{searchFilters.query}"
                </span>
              )}
              {searchFilters.location && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Location: {searchFilters.location}
                </span>
              )}
              {searchFilters.language && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Language: {searchFilters.language}
                </span>
              )}
              {(searchFilters.minFollowers !== undefined || searchFilters.maxFollowers !== undefined) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  Followers: {searchFilters.minFollowers || 0}-{searchFilters.maxFollowers || '∞'}
                </span>
              )}
              {(searchFilters.minRepos !== undefined || searchFilters.maxRepos !== undefined) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                  Repos: {searchFilters.minRepos || 0}-{searchFilters.maxRepos || '∞'}
                </span>
              )}
              {searchFilters.accountType && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  Type: {searchFilters.accountType === 'org' ? 'Organization' : 'User'}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State with Skeleton */}
      {isLoading && hasSearched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Search Results
            </h2>
            <div className="text-right">
              <span className="text-gray-600 dark:text-gray-300">
                Searching for users...
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
} 