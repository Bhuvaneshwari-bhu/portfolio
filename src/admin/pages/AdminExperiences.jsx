import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineBriefcase,
  HiOutlineCheckBadge,
  HiOutlineClock,
} from 'react-icons/hi2';
import { experiencesApi } from '../../services/api';

const STATUS_STYLE = {
  Completed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  Ongoing:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)' },
};

function DeleteModal({ item, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-950/85 backdrop-blur-xl" onClick={!loading ? onCancel : undefined} />
      <motion.div
        className="relative z-10 w-full max-w-md glass-strong rounded-2xl p-6"
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <HiOutlineTrash size={22} className="text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Delete Experience?</h3>
        <p className="text-white font-medium text-sm mb-5 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
          {item?.title}
        </p>
        <p className="text-white/35 text-xs mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading} className="flex-1 btn-secondary py-2.5 text-sm justify-center">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 text-sm rounded-xl font-semibold text-white flex items-center justify-center gap-2"
            style={{ background: loading ? 'rgba(239,68,68,0.3)' : 'linear-gradient(135deg,#dc2626,#b91c1c)', boxShadow: loading ? 'none' : '0 0 20px rgba(239,68,68,0.3)' }}
          >
            {loading
              ? <><motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />Deleting…</>
              : <><HiOutlineTrash size={14} />Delete</>
            }
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminExperiences() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await experiencesApi.getAll();
      setExperiences(data);
    } catch {
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await experiencesApi.remove(deleteTarget._id);
      setExperiences((prev) => prev.filter((e) => e._id !== deleteTarget._id));
      toast.success('Experience deleted');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-0.5">
            All <span className="gradient-text">Experiences</span>
          </h1>
          <p className="text-white/40 text-sm">{experiences.length} entr{experiences.length === 1 ? 'y' : 'ies'}</p>
        </div>
        <Link to="/admin/experiences/add" className="btn-primary text-sm px-4 py-2.5">
          <HiOutlinePlusCircle size={16} /> Add Experience
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-5 h-24 animate-pulse" />
            ))
            : experiences.length === 0
            ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <HiOutlineBriefcase size={32} className="mx-auto mb-3 text-white/20" />
                <p className="text-white/40 text-sm mb-4">No experiences yet</p>
                <Link to="/admin/experiences/add" className="btn-primary text-xs px-4 py-2 inline-flex">
                  Add first experience
                </Link>
              </motion.div>
            )
            : experiences.map((exp, i) => {
              const st = STATUS_STYLE[exp.status] || STATUS_STYLE.Completed;
              return (
                <motion.div
                  key={exp._id}
                  className="glass rounded-2xl p-4 sm:p-5 flex items-start gap-4 group"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.05 }}
                  layout
                >
                  {/* Color dot */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white mt-0.5"
                    style={{ background: `linear-gradient(135deg, ${exp.color || '#a855f7'}, ${exp.color || '#a855f7'}99)` }}
                  >
                    {(exp.company || '').slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-0.5">
                      <p className="text-white font-semibold text-sm leading-tight truncate">{exp.title}</p>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1"
                        style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}
                      >
                        {exp.status === 'Completed'
                          ? <HiOutlineCheckBadge size={10} />
                          : <HiOutlineClock size={10} />
                        }
                        {exp.status}
                      </span>
                    </div>
                    <p className="text-white/45 text-xs">{exp.company} · {exp.role}</p>
                    <p className="text-white/30 text-xs mt-0.5">{exp.duration}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/admin/experiences/edit/${exp._id}`)}
                      className="p-2 glass rounded-xl text-white/50 hover:text-brand-400 transition-colors"
                      title="Edit"
                    >
                      <HiOutlinePencilSquare size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(exp)}
                      className="p-2 glass rounded-xl text-white/50 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <HiOutlineTrash size={15} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          }
        </AnimatePresence>
      </div>

      {deleteTarget && (
        <DeleteModal
          item={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}
