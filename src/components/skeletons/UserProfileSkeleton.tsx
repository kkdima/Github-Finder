import { motion } from 'framer-motion'

export default function UserProfileSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 animate-pulse"
    >
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-32" />
      </div>

      {/* User Profile Skeleton */}
      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 ring-4 ring-gray-200 dark:ring-gray-600" />
          </div>

          {/* User Info Skeleton */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-64 mb-2" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-32" />
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-40" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-32" />
              </div>
            </div>

            {/* Bio Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-4/5" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/5" />
            </div>

            {/* Contact Info Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24" />
                </div>
              ))}
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-12 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 