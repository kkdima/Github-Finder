import { X, MapPin, Code, Users, GitBranch, Calendar, User, Building } from 'lucide-react'
import type { SearchFilters } from '@/types/github'

interface FilterChipsProps {
  filters: SearchFilters
  onRemoveFilter: (filterKey: keyof SearchFilters) => void
  onClearAll: () => void
}

interface FilterChip {
  key: keyof SearchFilters
  label: string
  value: string
  icon: React.ComponentType<any>
  color: string
}

export default function FilterChips({ filters, onRemoveFilter, onClearAll }: FilterChipsProps) {
  const activeFilters: FilterChip[] = []

  // Build active filters array
  if (filters.location) {
    activeFilters.push({
      key: 'location',
      label: 'Location',
      value: filters.location,
      icon: MapPin,
      color: 'blue'
    })
  }

  if (filters.language) {
    activeFilters.push({
      key: 'language',
      label: 'Language',
      value: filters.language,
      icon: Code,
      color: 'green'
    })
  }

  if (filters.minFollowers !== undefined || filters.maxFollowers !== undefined) {
    const min = filters.minFollowers || 0
    const max = filters.maxFollowers || '∞'
    activeFilters.push({
      key: 'minFollowers', // We'll handle both min/max together
      label: 'Followers',
      value: `${min}-${max}`,
      icon: Users,
      color: 'purple'
    })
  }

  if (filters.minRepos !== undefined || filters.maxRepos !== undefined) {
    const min = filters.minRepos || 0
    const max = filters.maxRepos || '∞'
    activeFilters.push({
      key: 'minRepos', // We'll handle both min/max together
      label: 'Repositories',
      value: `${min}-${max}`,
      icon: GitBranch,
      color: 'orange'
    })
  }

  if (filters.accountType) {
    activeFilters.push({
      key: 'accountType',
      label: 'Type',
      value: filters.accountType === 'org' ? 'Organization' : 'User',
      icon: filters.accountType === 'org' ? Building : User,
      color: 'gray'
    })
  }

  if (filters.createdAfter) {
    activeFilters.push({
      key: 'createdAfter',
      label: 'Joined After',
      value: new Date(filters.createdAfter).toLocaleDateString(),
      icon: Calendar,
      color: 'indigo'
    })
  }

  if (filters.createdBefore) {
    activeFilters.push({
      key: 'createdBefore',
      label: 'Joined Before',
      value: new Date(filters.createdBefore).toLocaleDateString(),
      icon: Calendar,
      color: 'indigo'
    })
  }

  const handleRemoveFilter = (filterKey: keyof SearchFilters) => {
    // Handle removal of related filters
    if (filterKey === 'minFollowers') {
      onRemoveFilter('minFollowers')
      onRemoveFilter('maxFollowers')
    } else if (filterKey === 'minRepos') {
      onRemoveFilter('minRepos')
      onRemoveFilter('maxRepos')
    } else {
      onRemoveFilter(filterKey)
    }
  }

  if (activeFilters.length === 0) return null

  const colorVariants = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
    green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700',
    gray: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600',
    indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700'
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Active Filters:
      </span>
      
      {activeFilters.map((filter) => {
        const Icon = filter.icon
        return (
          <div
            key={`${filter.key}-${filter.value}`}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition-colors ${
              colorVariants[filter.color as keyof typeof colorVariants]
            }`}
          >
            <Icon className="h-3 w-3" />
            <span className="font-medium">{filter.label}:</span>
            <span>{filter.value}</span>
            <button
              onClick={() => handleRemoveFilter(filter.key)}
              className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
              title={`Remove ${filter.label} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )
      })}
      
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  )
} 