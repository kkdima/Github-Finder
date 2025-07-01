import { Link } from 'react-router-dom'
import { ExternalLink, MapPin, Building, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import type { GitHubUser } from '@/types/github'

interface UserCardProps {
  user: GitHubUser
  index?: number
}

export default function UserCard({ user, index = 0 }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card p-6 hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-900/20"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <motion.img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {user.name || user.login}
            </h3>
            {user.name && (
              <span className="text-sm text-gray-500 dark:text-gray-400">@{user.login}</span>
            )}
          </div>
          
          {user.bio && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
              {user.bio}
            </p>
          )}
          
          {/* User Details */}
          <div className="space-y-1 mb-4">
            {user.location && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3" />
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Building className="h-3 w-3" />
                <span>{user.company}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{user.public_repos}</div>
              <div className="text-gray-500 dark:text-gray-400">Repos</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{user.followers}</div>
              <div className="text-gray-500 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{user.following}</div>
              <div className="text-gray-500 dark:text-gray-400">Following</div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Link
              to={`/user/${user.login}`}
              className="btn btn-primary btn-sm flex-1 text-center"
            >
              View Profile
            </Link>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              title="View on GitHub"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 