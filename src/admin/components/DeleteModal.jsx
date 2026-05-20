import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiOutlineXMark } from 'react-icons/hi2';
import { useEffect } from 'react';

export default function DeleteModal({ project, onConfirm, onCancel, loading }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-dark-950/85 backdrop-blur-xl"
          onClick={!loading ? onCancel : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Dialog */}
        <motion.div
          className="relative z-10 w-full max-w-md glass-strong rounded-2xl p-6 shadow-[0_0_60px_rgba(239,68,68,0.15)]"
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        >
          {/* Close */}
          <button
            onClick={onCancel}
            disabled={loading}
            className="absolute top-4 right-4 w-7 h-7 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <HiOutlineXMark size={15} />
          </button>

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <HiOutlineTrash size={22} className="text-red-400" />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-1">
            This will permanently delete:
          </p>
          <p className="text-white font-medium text-sm mb-5 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
            {project?.title}
          </p>
          <p className="text-white/35 text-xs mb-6">
            This action cannot be undone. The project will be removed from the database immediately.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 btn-secondary py-2.5 text-sm justify-center"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 py-2.5 text-sm rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: loading
                  ? 'rgba(239,68,68,0.3)'
                  : 'linear-gradient(135deg, #dc2626, #b91c1c)',
                boxShadow: loading ? 'none' : '0 0 20px rgba(239,68,68,0.3)',
              }}
            >
              {loading ? (
                <>
                  <motion.span
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <HiOutlineTrash size={14} />
                  Delete
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
