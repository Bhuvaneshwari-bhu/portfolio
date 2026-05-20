import { motion } from 'framer-motion';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import ProjectForm from '../components/ProjectForm';

export default function AdminAddProject() {
  return (
    <div className="max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <HiOutlinePlusCircle size={18} className="text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Add <span className="gradient-text">Project</span>
          </h1>
        </div>
        <p className="text-white/40 text-sm ml-12">
          Fill in the details below to add a new project to your portfolio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProjectForm mode="add" />
      </motion.div>
    </div>
  );
}
