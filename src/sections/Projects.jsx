import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import ProjectSkeleton from '../components/ProjectSkeleton';
import GlowBlob from '../components/GlowBlob';
import { useProjects } from '../hooks/useProjects';

const FILTERS = ['All', 'Featured', 'AI', 'Full Stack'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 1.04, 0.58, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const { projects, loading, error, refetch } = useProjects(filter);

  const handleRetry = () => {
    toast.promise(refetch(), {
      loading: 'Fetching projects...',
      success: 'Projects loaded!',
      error: (err) => `Failed: ${err.message}`,
    });
  };

  const handleFilterChange = (f) => {
    if (f === filter) return;
    setFilter(f);
  };

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <GlowBlob color="#a855f7" size={500} x="80%" y="30%" opacity={0.08} delay={2} />
      <GlowBlob color="#22d3ee" size={400} x="10%" y="70%" opacity={0.06} delay={0} />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="Portfolio"
          title="Featured"
          highlight="Projects"
          subtitle="A curated selection of projects showcasing my skills in frontend, full-stack, and AI development."
        />

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                filter === f
                  ? 'text-white shadow-glow'
                  : 'text-white/40 glass hover:text-white/70'
              }`}
              style={
                filter === f
                  ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)' }
                  : {}
              }
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* ─── Error state ───────────────────────────────────────────────────── */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-20 text-center"
          >
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-red-400">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <p className="text-white/70 font-medium mb-1">Failed to load projects</p>
              <p className="text-white/35 text-sm mb-4">{error}</p>
              <button onClick={handleRetry} className="btn-primary text-sm px-5 py-2.5">
                <FiRefreshCw size={14} /> Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── Skeleton loading grid ─────────────────────────────────────────── */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <ProjectSkeleton />
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── Project grid ──────────────────────────────────────────────────── */}
        {!loading && !error && (
          <>
            {projects.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/40 py-20"
              >
                No projects found for "{filter}".
              </motion.p>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {projects.map((project) => (
                    <motion.div key={project._id} variants={cardVariants}>
                      <ProjectCard
                        project={normalizeProject(project)}
                        onClick={() => setSelected(normalizeProject(project))}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* View more */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="https://github.com/Bhuvaneshwari-bhu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-8 py-3"
              >
                View All on GitHub
              </a>
            </motion.div>
          </>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

/**
 * Maps backend schema fields to the shape ProjectCard/ProjectModal expect.
 * Backend uses `techStack`/`githubLink`/`liveLink`; UI uses `tech`/`github`/`live`.
 */
function normalizeProject(p) {
  return {
    ...p,
    id: p._id,
    tech: p.techStack ?? p.tech ?? [],
    github: p.githubLink ?? p.github ?? '',
    live: p.liveLink ?? p.live ?? '',
    video: p.videoDemoLink ?? p.video ?? null,
  };
}
