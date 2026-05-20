import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <span className="text-white/30 text-xs font-medium tracking-widest uppercase">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-brand-400"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
