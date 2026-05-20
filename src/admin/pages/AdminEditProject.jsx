import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePencilSquare, HiOutlineArrowLeft } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import ProjectForm from '../components/ProjectForm';
import { projectsApi } from '../../services/api';

function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-10 h-10 border-2 border-white/10 border-t-brand-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-white/40 text-sm">Loading project…</p>
      </div>
    </div>
  );
}

export default function AdminEditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    projectsApi.getById(id)
      .then((data) => setProject(data))
      .catch((err) => {
        setError(err.message);
        toast.error('Failed to load project');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Normalize backend → form shape
  const initialData = project
    ? {
        ...project,
        techStack: project.techStack ?? project.tech ?? [],
        githubLink: project.githubLink ?? project.github ?? '',
        liveLink: project.liveLink ?? project.live ?? '',
        videoDemoLink: project.videoDemoLink ?? project.video ?? '',
      }
    : null;

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm mb-4 transition-colors group"
        >
          <HiOutlineArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to projects
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.25)' }}>
            <HiOutlinePencilSquare size={18} className="text-accent-purple" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Edit <span className="gradient-text">Project</span>
          </h1>
        </div>
        {project && (
          <p className="text-white/40 text-sm ml-12 truncate">{project.title}</p>
        )}
      </motion.div>

      {loading && <Spinner />}

      {error && !loading && (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => navigate('/admin/projects')} className="btn-secondary text-sm px-5 py-2">
            <HiOutlineArrowLeft size={14} /> Back to Projects
          </button>
        </div>
      )}

      {!loading && !error && initialData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProjectForm mode="edit" initialData={initialData} />
        </motion.div>
      )}
    </div>
  );
}
