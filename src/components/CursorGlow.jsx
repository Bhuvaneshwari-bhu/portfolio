import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const posX = useSpring(0, { stiffness: 120, damping: 22 });
  const posY = useSpring(0, { stiffness: 120, damping: 22 });
  const visible = useRef(false);
  const dotRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      posX.set(e.clientX);
      posY.set(e.clientY);
      if (!visible.current && dotRef.current) {
        dotRef.current.style.opacity = '1';
        visible.current = true;
      }
    };
    const hide = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      visible.current = false;
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', hide);
    };
  }, [posX, posY]);

  return (
    <>
      {/* Outer glow — large, soft */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          x: posX,
          y: posY,
          width: 320,
          height: 320,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      {/* Inner dot — tight, crisp */}
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: posX,
          y: posY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          boxShadow: '0 0 10px rgba(99,102,241,0.8)',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
    </>
  );
}
