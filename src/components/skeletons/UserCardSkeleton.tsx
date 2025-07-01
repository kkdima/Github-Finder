import { motion } from 'framer-motion'

interface UserCardSkeletonProps {
  index?: number
}

export default function UserCardSkeleton({ index = 0 }: UserCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card p-6 animate-pulse"
    >
      <div className="flex items-start gap-4">
        {/* Avatar Skeleton */}
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-gray-200 dark:ring-gray-600" />
        
        {/* User Info Skeleton */}
        <div className="flex-1 min-w-0">
          {/* Name and username */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-32" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
          </div>
          
          {/* Bio */}
          <div className="space-y-2 mb-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4" />
          </div>
          
          {/* User Details */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-24" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-28" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-8 mb-1" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-12" />
            </div>
            <div className="text-center">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-8 mb-1" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-16" />
            </div>
            <div className="text-center">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-8 mb-1" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-16" />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md flex-1" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>
        </div>
      </div>
    </motion.div>
  )
} 