import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineFolder,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineCpuChip,
  HiOutlinePlusCircle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import StatCard from '../components/StatCard';
import { projectsApi } from '../../services/api';

function PageHeader() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="mb-8">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white/40 text-sm mb-1"
      >
        {greeting}, Bhuvaneshwari 👋
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-2xl font-bold text-white"
      >
        Dashboard <span className="gradient-text">Overview</span>
      </motion.h1>
    </div>
  );
}

function RecentRow({ project, index }) {
  const tech = project.techStack ?? project.tech ?? [];
  return (
    <motion.tr
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-8 h-8 rounded-lg object-cover flex-shrink-0 opacity-80" />
          ) : (
            <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
              <HiOutlineFolder size={14} className="text-white/30" />
            </div>
          )}
          <span className="text-white text-sm font-medium truncate max-w-[180px]">{project.title}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ background: `${project.color || '#6366f1'}18`, color: project.color || '#818cf8', border: `1px solid ${project.color || '#6366f1'}25` }}
        >
          {project.category}
        </span>
      </td>
      <td className="py-3 px-4 hidden md:table-cell">
        <div className="flex gap-1 flex-wrap">
          {tech.slice(0, 3).map((t) => (
            <span key={t} className="tag text-[10px] px-1.5 py-0.5">{t}</span>
          ))}
          {tech.length > 3 && <span className="text-white/25 text-xs">+{tech.length - 3}</span>}
        </div>
      </td>
      <td className="py-3 px-4">
        {project.featured ? (
          <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
            ★ Featured
          </span>
        ) : (
          <span className="text-white/25 text-xs">—</span>
        )}
      </td>
      <td className="py-3 px-4">
        <Link
          to={`/admin/projects/edit/${project._id}`}
          className="text-white/30 hover:text-brand-400 transition-colors"
        >
          <HiOutlinePencilSquare size={15} />
        </Link>
      </td>
    </motion.tr>
  );
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi.getAll().then((d) => {
      setProjects(d.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const featured   = projects.filter((p) => p.featured).length;
  const categories = [...new Set(projects.map((p) => p.category))].length;
  const allTechs   = [...new Set(projects.flatMap((p) => p.techStack ?? p.tech ?? []))].length;

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: HiOutlineFolder,      color: '#6366f1', glow: '#6366f1', delay: 0 },
    { label: 'Featured',       value: featured,         icon: HiOutlineSparkles,    color: '#a855f7', glow: '#a855f7', delay: 0.07 },
    { label: 'Categories',     value: categories,       icon: HiOutlineSquares2X2,  color: '#22d3ee', glow: '#22d3ee', delay: 0.14 },
    { label: 'Technologies',   value: allTechs,         icon: HiOutlineCpuChip,     color: '#10b981', glow: '#10b981', delay: 0.21 },
  ];

  return (
    <div className="max-w-5xl">
      <PageHeader />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        className="grid sm:grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/admin/projects/add" className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-brand-500/30 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <HiOutlinePlusCircle size={20} className="text-brand-400" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Add Project</div>
            <div className="text-white/40 text-xs">Create a new portfolio entry</div>
          </div>
        </Link>

        <a href="/" target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-accent-cyan/30 transition-all duration-300 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
            <HiOutlineArrowTopRightOnSquare size={20} className="text-accent-cyan" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">View Portfolio</div>
            <div className="text-white/40 text-xs">See how it looks live</div>
          </div>
        </a>
      </motion.div>

      {/* Recent projects table */}
      <motion.div
        className="glass rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold text-sm">Recent Projects</h2>
          <Link to="/admin/projects" className="text-brand-400 text-xs hover:text-brand-300 transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <motion.div
              className="w-6 h-6 border-2 border-white/10 border-t-brand-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-white/30">
            <HiOutlineFolder size={28} className="mb-2" />
            <p className="text-sm">No projects yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  {['Project', 'Category', 'Tech Stack', 'Featured', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-white/30 text-xs font-medium uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 6).map((p, i) => (
                  <RecentRow key={p._id} project={p} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
