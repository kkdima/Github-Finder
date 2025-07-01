import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Building, 
  Mail, 
  Link as LinkIcon,
  Calendar,
  Star,
  GitFork,
  Eye,
  AlertCircle
} from 'lucide-react'
import { useUser, useUserRepos } from '@/hooks/useGitHub'
import { UserProfileSkeleton, RepositoryListSkeleton } from '@/components/skeletons'
import type { GitHubRepository } from '@/types/github'

export default function User() {
  const { username } = useParams<{ username: string }>()
  
  const { data: user, isLoading: userLoading, error: userError } = useUser(username!)
  const { data: repos, isLoading: reposLoading, error: reposError } = useUserRepos(username!)

  if (userLoading) {
    return <UserProfileSkeleton />
  }

  if (userError || !user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            User Not Found
          </h3>
          <p className="text-gray-600 mb-4">
            {userError?.message || 'The user you are looking for does not exist.'}
          </p>
          <Link to="/" className="btn btn-primary btn-default">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </Link>

      {/* User Profile */}
      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <motion.img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {user.name || user.login}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">@{user.login}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-default inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on GitHub
                </a>
                {user.hireable && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium rounded-full">
                    Available for hire
                  </span>
                )}
              </div>
            </div>

            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {user.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="h-4 w-4" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${user.email}`} className="hover:text-primary-600">
                    {user.email}
                  </a>
                </div>
              )}
              {user.blog && (
                <div className="flex items-center gap-2 text-gray-600">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 truncate"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.public_repos}</div>
                <div className="text-gray-600 dark:text-gray-400">Repositories</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.followers}</div>
                <div className="text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.following}</div>
                <div className="text-gray-600 dark:text-gray-400">Following</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.public_gists}</div>
                <div className="text-gray-600 dark:text-gray-400">Gists</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Latest Repositories
        </h2>
        
        {reposLoading ? (
          <RepositoryListSkeleton count={6} />
        ) : reposError ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Failed to load repositories</p>
          </div>
        ) : repos && repos.length > 0 ? (
          <div className="grid gap-4">
            {repos.map((repo: GitHubRepository) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 transition-colors"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {repo.visibility}
                  </span>
                </div>
                
                {repo.description && (
                  <p className="text-gray-600 mb-3">{repo.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {repo.watchers_count}
                  </span>
                  <span>
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No public repositories found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
} 