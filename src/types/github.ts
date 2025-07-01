export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  hireable: boolean | null
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  default_branch: string
  topics: string[]
  visibility: 'public' | 'private'
}

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubUser[]
}

export interface ApiError {
  message: string
  status?: number
  documentation_url?: string
}

// Advanced Search Filter Types
export interface SearchFilters {
  query: string
  location?: string
  language?: string
  minFollowers?: number
  maxFollowers?: number
  minRepos?: number
  maxRepos?: number
  accountType?: 'user' | 'org'
  createdBefore?: string
  createdAfter?: string
  sort?: 'followers' | 'repositories' | 'joined'
  order?: 'asc' | 'desc'
}

export interface AdvancedSearchParams {
  q: string
  sort?: 'followers' | 'repositories' | 'joined'
  order?: 'asc' | 'desc'
  page?: number
  per_page?: number
}

export interface SearchSuggestion {
  id: string
  label: string
  type: 'location' | 'language' | 'user'
  value: string
}

export interface FilterOption {
  value: string
  label: string
  count?: number
} 