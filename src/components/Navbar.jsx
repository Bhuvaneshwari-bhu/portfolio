import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 glass-strong shadow-[0_1px_0_rgba(255,255,255,0.05)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => handleNav('#home')}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
              B
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">
              bhu<span className="gradient-text">.dev</span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.3 }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer
                  ${active === link.href ? 'text-white' : 'text-white/50 hover:text-white/90'}`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg glass"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={() => handleNav('#contact')}
              className="hidden md:flex btn-primary text-xs px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors p-2"
            >
              {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-4 right-4 z-40 glass-strong rounded-2xl p-4 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="w-full text-left px-4 py-3 text-white/70 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all duration-200 block"
              >
                {link.label}
              </motion.button>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => handleNav('#contact')}
                className="btn-primary w-full justify-center text-xs"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
