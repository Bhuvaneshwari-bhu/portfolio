import { motion } from 'framer-motion';

export default function SectionHeading({ tag, title, highlight, subtitle }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {tag && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            color: '#818cf8',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {tag}
        </motion.div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
