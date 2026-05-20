import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const rafRef = useRef();
  const startRef = useRef();

  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const start = performance.now();
    startRef.current = start;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

export default function StatCard({ label, value, icon: Icon, color = '#6366f1', glow, suffix = '', delay = 0 }) {
  const count = useCountUp(typeof value === 'number' ? value : 0);

  return (
    <motion.div
      className="relative glass rounded-2xl p-5 overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.21, 1.04, 0.58, 1] }}
      whileHover={{ scale: 1.02, y: -3 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 0%,${glow || color}22 0%,transparent 65%)`,
          boxShadow: `inset 0 0 0 1px ${color}30`,
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">{label}</p>
          <div className="text-3xl font-black text-white">
            {typeof value === 'number' ? count : value}
            {suffix && <span className="text-lg text-white/40 ml-1">{suffix}</span>}
          </div>
        </div>

        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}18`, border: `1px solid ${color}28` }}
        >
          <Icon style={{ color }} size={20} />
        </div>
      </div>
    </motion.div>
  );
}
