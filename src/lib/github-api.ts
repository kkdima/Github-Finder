import type { GitHubUser, GitHubRepository, GitHubSearchResponse, ApiError, SearchFilters } from '@/types/github'

const GITHUB_API_BASE = 'https://api.github.com'

class GitHubApiError extends Error {
  constructor(message: string, public status?: number, public url?: string) {
    super(message)
    this.name = 'GitHubApiError'
  }
}

async function fetchFromGitHub<T>(endpoint: string): Promise<T> {
  const url = `${GITHUB_API_BASE}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Finder-App',
      },
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }))
      
      throw new GitHubApiError(
        errorData.message || `Request failed with status ${response.status}`,
        response.status,
        url
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error
    }
    
    throw new GitHubApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      undefined,
      url
    )
  }
}

export const githubApi = {
  searchUsers: async (query: string, page = 1, perPage = 30): Promise<GitHubSearchResponse> => {
    if (!query.trim()) {
      throw new GitHubApiError('Search query cannot be empty')
    }
    
    return fetchFromGitHub<GitHubSearchResponse>(
      `/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
    )
  },

  // Advanced search with comprehensive filters
  advancedSearchUsers: async (filters: SearchFilters, page = 1, perPage = 30): Promise<GitHubSearchResponse> => {
    const searchQuery = buildAdvancedSearchQuery(filters)
    const params = new URLSearchParams({
      q: searchQuery,
      page: page.toString(),
      per_page: perPage.toString(),
    })

    if (filters.sort) {
      params.append('sort', filters.sort)
    }
    if (filters.order) {
      params.append('order', filters.order)
    }

    return fetchFromGitHub<GitHubSearchResponse>(`/search/users?${params.toString()}`)
  },

  // Get popular programming languages for suggestions
  getPopularLanguages: async (): Promise<string[]> => {
    // Common programming languages for filter suggestions
    return [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby',
      'Go', 'Rust', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'MATLAB',
      'Shell', 'PowerShell', 'HTML', 'CSS', 'Vue', 'React', 'Angular'
    ]
  },

  // Get location suggestions based on popular developer cities
  getLocationSuggestions: async (query: string): Promise<string[]> => {
    const popularLocations = [
      'San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Seattle',
      'Los Angeles', 'Boston', 'Austin', 'Chicago', 'Toronto', 'Sydney',
      'Amsterdam', 'Paris', 'Barcelona', 'Tel Aviv', 'Singapore', 'Bangalore',
      'Munich', 'Dublin', 'Stockholm', 'Copenhagen', 'Zurich', 'Vancouver'
    ]
    
    return popularLocations.filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10)
  },

  getUser: async (username: string): Promise<GitHubUser> => {
    if (!username.trim()) {
      throw new GitHubApiError('Username cannot be empty')
    }
    
    return fetchFromGitHub<GitHubUser>(`/users/${encodeURIComponent(username)}`)
  },

  getUserRepos: async (
    username: string, 
    sort: 'created' | 'updated' | 'pushed' | 'full_name' = 'updated',
    perPage = 10
  ): Promise<GitHubRepository[]> => {
    if (!username.trim()) {
      throw new GitHubApiError('Username cannot be empty')
    }
    
    return fetchFromGitHub<GitHubRepository[]>(
      `/users/${encodeURIComponent(username)}/repos?sort=${sort}&per_page=${perPage}`
    )
  },
}

// Helper function to build advanced search queries
function buildAdvancedSearchQuery(filters: SearchFilters): string {
  const queryParts: string[] = []
  
  // Base query
  if (filters.query.trim()) {
    queryParts.push(filters.query.trim())
  }
  
  // Location filter
  if (filters.location?.trim()) {
    queryParts.push(`location:"${filters.location.trim()}"`)
  }
  
  // Language filter
  if (filters.language?.trim()) {
    queryParts.push(`language:"${filters.language.trim()}"`)
  }
  
  // Followers count filters
  if (filters.minFollowers !== undefined && filters.minFollowers >= 0) {
    if (filters.maxFollowers !== undefined && filters.maxFollowers >= filters.minFollowers) {
      queryParts.push(`followers:${filters.minFollowers}..${filters.maxFollowers}`)
    } else {
      queryParts.push(`followers:>=${filters.minFollowers}`)
    }
  } else if (filters.maxFollowers !== undefined && filters.maxFollowers >= 0) {
    queryParts.push(`followers:<=${filters.maxFollowers}`)
  }
  
  // Repository count filters
  if (filters.minRepos !== undefined && filters.minRepos >= 0) {
    if (filters.maxRepos !== undefined && filters.maxRepos >= filters.minRepos) {
      queryParts.push(`repos:${filters.minRepos}..${filters.maxRepos}`)
    } else {
      queryParts.push(`repos:>=${filters.minRepos}`)
    }
  } else if (filters.maxRepos !== undefined && filters.maxRepos >= 0) {
    queryParts.push(`repos:<=${filters.maxRepos}`)
  }
  
  // Account type filter
  if (filters.accountType) {
    queryParts.push(`type:${filters.accountType}`)
  }
  
  // Creation date filters
  if (filters.createdAfter) {
    queryParts.push(`created:>=${filters.createdAfter}`)
  }
  if (filters.createdBefore) {
    queryParts.push(`created:<=${filters.createdBefore}`)
  }
  
  // If no query parts, add a basic search to avoid empty query
  if (queryParts.length === 0) {
    queryParts.push('type:user')
  }
  
  return queryParts.join(' ')
}

export { GitHubApiError } 