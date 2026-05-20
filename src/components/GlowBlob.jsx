import { motion } from 'framer-motion';

export default function GlowBlob({ color = '#6366f1', size = 600, x = '20%', y = '20%', opacity = 0.15, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: 'blur(60px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 1.5, opacity],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
