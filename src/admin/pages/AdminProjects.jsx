import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineFolder,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineArrowsUpDown,
} from 'react-icons/hi2';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { projectsApi } from '../../services/api';
import DeleteModal from '../components/DeleteModal';

const CATEGORIES = ['All', 'AI', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Other'];
const PAGE_SIZE = 8;

// ─── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-white/5">
      {[140, 80, 180, 70, 80].map((w, i) => (
        <td key={i} className="px-4 py-4">
          <div
            className="h-4 rounded-lg overflow-hidden relative"
            style={{ width: w, background: 'rgba(255,255,255,0.05)' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </td>
      ))}
    </tr>
  );
}

// ─── Mobile card ───────────────────────────────────────────────────────────────
function MobileCard({ project, onEdit, onDelete }) {
  const tech = project.techStack ?? project.tech ?? [];
  return (
    <motion.div
      className="glass rounded-2xl p-4 space-y-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      layout
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {project.image && (
            <img src={project.image} alt={project.title} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{project.title}</p>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md mt-0.5 inline-block"
              style={{ background: `${project.color||'#6366f1'}18`, color: project.color||'#818cf8', border: `1px solid ${project.color||'#6366f1'}25` }}
            >
              {project.category}
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => onEdit(project)} className="p-2 glass rounded-lg text-white/40 hover:text-brand-400 transition-colors">
            <HiOutlinePencilSquare size={15} />
          </button>
          <button onClick={() => onDelete(project)} className="p-2 glass rounded-lg text-white/40 hover:text-red-400 transition-colors">
            <HiOutlineTrash size={15} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tech.slice(0, 5).map((t) => (
          <span key={t} className="tag text-[10px]">{t}</span>
        ))}
      </div>
      {project.featured && (
        <div className="flex items-center gap-1.5 text-brand-400 text-xs">
          <HiOutlineSparkles size={12} />
          Featured
        </div>
      )}
    </motion.div>
  );
}

// ─── Table row ──────────────────────────────────────────────────────────────────
function TableRow({ project, index, onEdit, onDelete }) {
  const tech = project.techStack ?? project.tech ?? [];
  return (
    <motion.tr
      className="border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      layout
    >
      {/* Image + title */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          {project.image ? (
            <img src={project.image} alt={project.title}
              className="w-9 h-9 rounded-xl object-cover flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
              <HiOutlineFolder size={15} className="text-white/25" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate max-w-[180px]">{project.title}</p>
            <p className="text-white/35 text-xs truncate max-w-[180px]">{project.description?.slice(0, 60)}…</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-lg"
          style={{
            background: `${project.color||'#6366f1'}15`,
            color: project.color||'#818cf8',
            border: `1px solid ${project.color||'#6366f1'}22`,
          }}
        >
          {project.category}
        </span>
      </td>

      {/* Tech stack */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <div className="flex flex-wrap gap-1">
          {tech.slice(0, 4).map((t) => (
            <span key={t} className="tag text-[10px] px-1.5 py-0.5">{t}</span>
          ))}
          {tech.length > 4 && (
            <span className="text-white/25 text-xs self-center">+{tech.length - 4}</span>
          )}
        </div>
      </td>

      {/* Featured */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        {project.featured ? (
          <div className="flex items-center gap-1.5 text-brand-400 text-xs font-medium">
            <HiOutlineSparkles size={13} />
            Featured
          </div>
        ) : (
          <span className="text-white/20 text-xs">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <motion.button
            onClick={() => onEdit(project)}
            className="p-2 rounded-lg hover:bg-brand-500/15 text-white/60 hover:text-brand-400 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Edit"
          >
            <HiOutlinePencilSquare size={16} />
          </motion.button>
          <motion.button
            onClick={() => onDelete(project)}
            className="p-2 rounded-lg hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Delete"
          >
            <HiOutlineTrash size={16} />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage]         = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await projectsApi.getAll();
      setProjects(data.data || []);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // Client-side filter + search
  const filtered = useMemo(() => {
    let list = projects;
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          (p.techStack ?? p.tech ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [projects, category, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filter/search changes
  useEffect(() => { setPage(1); }, [search, category]);

  const handleEdit   = (p) => navigate(`/admin/projects/edit/${p._id}`);
  const handleDelete = (p) => setDeleteTarget(p);

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await projectsApi.remove(deleteTarget._id);
      // Optimistic UI
      setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      toast.success('Project deleted');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-white/40 text-sm">{projects.length} total projects</p>
        </div>
        <Link to="/admin/projects/add" className="btn-primary text-sm px-4 py-2.5">
          <HiOutlinePlusCircle size={16} /> Add Project
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <HiOutlineMagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="input-field pl-9 pr-8"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              <HiOutlineXMark size={14} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                category === c ? 'text-white shadow-glow' : 'text-white/40 glass hover:text-white/70'
              }`}
              style={category === c ? { background: 'linear-gradient(135deg,#6366f1,#a855f7)' } : {}}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Desktop table ─────────────────────────────────────── */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden mb-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              {['Project', 'Category', 'Tech Stack', 'Featured', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3.5 text-white/30 text-xs font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1">{h}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : paginated.length === 0
                ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-white/30">
                        <HiOutlineFolder size={36} />
                        <p className="text-sm">
                          {search || category !== 'All' ? 'No projects match your filters' : 'No projects yet'}
                        </p>
                        {!search && category === 'All' && (
                          <Link to="/admin/projects/add" className="btn-primary text-xs px-4 py-2 mt-1">
                            Add first project
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                )
                : paginated.map((p, i) => (
                  <TableRow
                    key={p._id}
                    project={p}
                    index={i}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              }
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* ─── Mobile cards ──────────────────────────────────────── */}
      <div className="md:hidden space-y-3 mb-4">
        <AnimatePresence mode="popLayout">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-4 h-24 animate-pulse" />
            ))
            : paginated.length === 0
            ? (
              <div className="glass rounded-2xl p-10 text-center text-white/30">
                <HiOutlineFolder size={32} className="mx-auto mb-2" />
                <p className="text-sm">No projects found</p>
              </div>
            )
            : paginated.map((p) => (
              <MobileCard key={p._id} project={p} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          }
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-xs">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 glass rounded-xl text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-xl text-sm font-medium transition-all ${
                  n === page ? 'text-white shadow-glow' : 'glass text-white/40 hover:text-white'
                }`}
                style={n === page ? { background: 'linear-gradient(135deg,#6366f1,#a855f7)' } : {}}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 glass rounded-xl text-white/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          project={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}
