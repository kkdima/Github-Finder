import { useQuery } from '@tanstack/react-query'
import { githubApi } from '@/lib/github-api'
import type { GitHubUser, GitHubRepository, GitHubSearchResponse, SearchFilters } from '@/types/github'

export const useSearchUsers = (query: string, enabled = true) => {
  return useQuery<GitHubSearchResponse, Error>({
    queryKey: ['searchUsers', query],
    queryFn: () => githubApi.searchUsers(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

// Advanced search hook with comprehensive filters
export const useAdvancedSearchUsers = (filters: SearchFilters, page = 1, enabled = true) => {
  return useQuery<GitHubSearchResponse, Error>({
    queryKey: ['advancedSearchUsers', filters, page],
    queryFn: () => githubApi.advancedSearchUsers(filters, page),
    enabled: enabled && (filters.query.trim().length > 0 || hasActiveFilters(filters)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

// Hook for language suggestions
export const useLanguageSuggestions = () => {
  return useQuery<string[], Error>({
    queryKey: ['languageSuggestions'],
    queryFn: () => githubApi.getPopularLanguages(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  })
}

// Hook for location suggestions
export const useLocationSuggestions = (query: string) => {
  return useQuery<string[], Error>({
    queryKey: ['locationSuggestions', query],
    queryFn: () => githubApi.getLocationSuggestions(query),
    enabled: query.trim().length >= 2,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useUser = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ['user', username],
    queryFn: () => githubApi.getUser(username),
    enabled: !!username,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  })
}

export const useUserRepos = (username: string, sort: 'created' | 'updated' | 'pushed' | 'full_name' = 'updated') => {
  return useQuery<GitHubRepository[], Error>({
    queryKey: ['userRepos', username, sort],
    queryFn: () => githubApi.getUserRepos(username, sort),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

// Helper function to check if any advanced filters are active
function hasActiveFilters(filters: SearchFilters): boolean {
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