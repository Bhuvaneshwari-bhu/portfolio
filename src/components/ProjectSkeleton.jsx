import { motion } from 'framer-motion';

function SkeletonBox({ className }) {
  return (
    <div
      className={`rounded-lg overflow-hidden relative ${className}`}
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default function ProjectSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Image area */}
      <SkeletonBox className="h-48 w-full rounded-none" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <SkeletonBox className="h-5 w-3/4" />
        {/* Description lines */}
        <SkeletonBox className="h-3.5 w-full" />
        <SkeletonBox className="h-3.5 w-5/6" />

        {/* Tech badges */}
        <div className="flex gap-2 pt-1">
          <SkeletonBox className="h-6 w-16" />
          <SkeletonBox className="h-6 w-14" />
          <SkeletonBox className="h-6 w-20" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-white/5">
          <SkeletonBox className="h-7 w-20" />
          <SkeletonBox className="h-7 w-16" />
        </div>
      </div>
    </div>
  );
}
