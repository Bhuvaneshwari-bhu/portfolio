import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiPlay } from 'react-icons/fi';
import { useEffect } from 'react';

const PLACEHOLDER_PATTERN = /your-username|your-repo|example\.com/i;
const isValidLink = (url) => url && url.trim() !== '' && !PLACEHOLDER_PATTERN.test(url);

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-dark-950/80 backdrop-blur-xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl glass-strong rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 40%, #05050f 100%), linear-gradient(135deg, ${project.color}20, transparent 60%)`,
              }}
            />
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 glass rounded-lg flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <FiX size={16} />
            </button>
            {/* Category tag */}
            <div
              className="absolute bottom-4 left-5 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
            >
              {project.category || 'Project'}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5">{project.longDescription}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2.5 py-1 rounded-md"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {isValidLink(project.github) ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs px-4 py-2.5"
                >
                  <FiGithub /> GitHub
                </a>
              ) : (
                <span
                  title="Coming soon"
                  className="btn-secondary text-xs px-4 py-2.5 opacity-35 cursor-not-allowed select-none"
                >
                  <FiGithub /> GitHub
                </span>
              )}
              {isValidLink(project.live) ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-4 py-2.5"
                >
                  <FiExternalLink /> Live Demo
                </a>
              ) : (
                <span
                  title="Coming soon"
                  className="btn-primary text-xs px-4 py-2.5 opacity-35 cursor-not-allowed select-none"
                >
                  <FiExternalLink /> Coming Soon
                </span>
              )}
              {project.video && isValidLink(project.video) && (
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs px-4 py-2.5"
                >
                  <FiPlay /> Video
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
