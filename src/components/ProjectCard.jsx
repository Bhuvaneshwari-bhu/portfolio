import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiPlay, FiMaximize2 } from 'react-icons/fi';

export default function ProjectCard({ project, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => onClick(project)}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.color}50, 0 0 40px ${project.color}20` }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(180deg, transparent 30%, #05050f 100%), linear-gradient(135deg, ${project.color}20, transparent)`,
          }}
        />

        {/* Expand icon */}
        <div className="absolute top-3 right-3 w-7 h-7 glass rounded-lg flex items-center justify-center text-white/0 group-hover:text-white/80 transition-all duration-300 group-hover:scale-100 scale-75 opacity-0 group-hover:opacity-100">
          <FiMaximize2 size={12} />
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ background: `${project.color}12`, color: `${project.color}cc`, border: `1px solid ${project.color}20` }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs text-white/30 px-2 py-0.5">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors duration-200 hover:bg-white/5 px-2.5 py-1.5 rounded-lg"
          >
            <FiGithub size={13} /> GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors duration-200 hover:bg-white/5 px-2.5 py-1.5 rounded-lg"
          >
            <FiExternalLink size={13} /> Live
          </a>
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors duration-200 hover:bg-white/5 px-2.5 py-1.5 rounded-lg"
            >
              <FiPlay size={13} /> Video
            </a>
          )}
          <div className="ml-auto">
            <div
              className="w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: project.color, boxShadow: `0 0 10px ${project.color}` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
