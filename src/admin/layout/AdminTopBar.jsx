import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBars3, HiOutlineBell, HiOutlineSparkles } from 'react-icons/hi2';
import { FiChevronRight } from 'react-icons/fi';

const breadcrumbMap = {
  '/admin':              [{ label: 'Dashboard' }],
  '/admin/projects':     [{ label: 'Projects', to: '/admin/projects' }],
  '/admin/projects/add': [{ label: 'Projects', to: '/admin/projects' }, { label: 'Add Project' }],
};

function getBreadcrumbs(pathname) {
  if (pathname.includes('/admin/projects/edit/')) {
    return [
      { label: 'Projects', to: '/admin/projects' },
      { label: 'Edit Project' },
    ];
  }
  return breadcrumbMap[pathname] || [{ label: 'Dashboard' }];
}

export default function AdminTopBar({ onMenuToggle }) {
  const location = useLocation();
  const crumbs = getBreadcrumbs(location.pathname);

  return (
    <header className="h-14 flex-shrink-0 glass-strong border-b border-white/5 flex items-center justify-between px-5 sticky top-0 z-30">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <HiOutlineBars3 size={20} />
        </button>

        <nav className="flex items-center gap-1.5 text-sm">
          <Link to="/admin" className="text-white/40 hover:text-white/70 transition-colors">
            Admin
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <FiChevronRight size={12} className="text-white/20" />
              {c.to ? (
                <Link to={c.to} className="text-white/50 hover:text-white/80 transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: status badge + notification */}
      <div className="flex items-center gap-3">
        <motion.div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: '#10b981',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          API Connected
        </motion.div>

        <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all relative">
          <HiOutlineBell size={18} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-400" />
        </button>

        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
          style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
        >
          B
        </div>
      </div>
    </header>
  );
}
