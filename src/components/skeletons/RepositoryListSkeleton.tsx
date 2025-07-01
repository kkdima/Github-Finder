import { motion } from 'framer-motion'

interface RepositoryListSkeletonProps {
  count?: number
}

export default function RepositoryListSkeleton({ count = 6 }: RepositoryListSkeletonProps) {
  return (
    <div className="grid gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-48 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-1" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4" />
            </div>
            <div className="ml-4">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-12" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-8" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-8" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-8" />
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
          </div>
        </motion.div>
      ))}
    </div>
  )
} 