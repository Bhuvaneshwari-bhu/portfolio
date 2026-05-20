import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSquares2X2,
  HiOutlineFolder,
  HiOutlinePlusCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { FiExternalLink } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', icon: HiOutlineSquares2X2, to: '/admin' },
  { label: 'Projects',  icon: HiOutlineFolder,     to: '/admin/projects' },
  { label: 'Add Project', icon: HiOutlinePlusCircle, to: '/admin/projects/add' },
  { label: 'Settings', icon: HiOutlineCog6Tooth,   to: '/admin/settings', disabled: true },
];

export default function Sidebar({ collapsed, onClose }) {
  const location = useLocation();

  const isActive = (to) =>
    to === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(to);

  return (
    <aside className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
        >
          B
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-white font-semibold text-sm leading-none">
                bhu<span className="gradient-text">.dev</span>
              </span>
              <span className="text-white/30 text-[10px] mt-0.5 font-mono">Admin Panel</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin px-2">
        <div className="space-y-1">
          {navItems.map(({ label, icon: Icon, to, disabled }) => {
            const active = isActive(to);
            return (
              <NavLink
                key={to}
                to={disabled ? '#' : to}
                onClick={() => { if (onClose) onClose(); }}
                className={() =>
                  `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${active
                    ? 'text-white'
                    : disabled
                    ? 'text-white/20 cursor-not-allowed pointer-events-none'
                    : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                  }`
                }
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.1))',
                      border: '1px solid rgba(99,102,241,0.3)',
                      boxShadow: '0 0 20px rgba(99,102,241,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  size={18}
                  className={`relative z-10 flex-shrink-0 transition-all duration-200 ${
                    active ? 'text-brand-400' : 'group-hover:text-white/80'
                  }`}
                />

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 flex-1 truncate"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {disabled && !collapsed && (
                  <span className="relative z-10 text-[9px] font-mono text-white/20 bg-white/5 px-1.5 py-0.5 rounded-md flex-shrink-0">
                    SOON
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer links */}
      <div className="border-t border-white/5 px-2 py-3 space-y-1 flex-shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200 group"
        >
          <FiExternalLink size={16} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                View Portfolio
              </motion.span>
            )}
          </AnimatePresence>
        </a>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/25 group">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
            B
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <div className="text-white/60 text-xs font-medium truncate">Bhuvaneshwari</div>
                <div className="text-white/25 text-[10px] truncate">Admin</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
