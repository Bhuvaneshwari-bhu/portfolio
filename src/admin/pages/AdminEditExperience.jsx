import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import ExperienceForm from '../components/ExperienceForm';
import { experiencesApi } from '../../services/api';

export default function AdminEditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    experiencesApi.getById(id)
      .then(setData)
      .catch(() => setError('Experience not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          className="w-8 h-8 border-2 border-white/10 border-t-brand-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <p className="text-white/40 text-sm mb-4">{error || 'Experience not found'}</p>
        <button onClick={() => navigate('/admin/experiences')} className="btn-secondary text-sm px-4 py-2">
          Back to Experiences
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.25)' }}>
            <HiOutlinePencilSquare size={18} className="text-accent-purple" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Edit <span className="gradient-text">Experience</span>
          </h1>
        </div>
        <p className="text-white/40 text-sm ml-12 truncate max-w-lg">{data.title}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ExperienceForm mode="edit" initialData={data} />
      </motion.div>
    </div>
  );
}
