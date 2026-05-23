import { motion } from 'framer-motion';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import ExperienceForm from '../components/ExperienceForm';

export default function AdminAddExperience() {
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
            <HiOutlineBriefcase size={18} className="text-accent-purple" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Add <span className="gradient-text">Experience</span>
          </h1>
        </div>
        <p className="text-white/40 text-sm ml-12">
          Fill in the details to add a new internship or work experience.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ExperienceForm mode="add" />
      </motion.div>
    </div>
  );
}
