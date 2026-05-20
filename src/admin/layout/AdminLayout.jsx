import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import AdminTopBar from './AdminTopBar';

const SIDEBAR_W = 240;
const SIDEBAR_W_COL = 64;

const toastOptions = {
  style: {
    background: 'rgba(10,10,26,0.95)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#e2e8f0',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '12px',
    padding: '10px 14px',
  },
  success: { iconTheme: { primary: '#10b981', secondary: '#0a0a1a' } },
  error:   { iconTheme: { primary: '#ef4444', secondary: '#0a0a1a' } },
  loading: { iconTheme: { primary: '#6366f1', secondary: '#0a0a1a' } },
};

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Collapse sidebar on smaller screens by default
  useEffect(() => {
    const handle = () => {
      if (window.innerWidth < 1024) setCollapsed(true);
      else setCollapsed(false);
    };
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const sidebarWidth = collapsed ? SIDEBAR_W_COL : SIDEBAR_W;

  return (
    <div className="min-h-screen bg-dark-950 text-white flex overflow-hidden">
      <Toaster position="bottom-right" toastOptions={toastOptions} />

      {/* ── Desktop sidebar ─────────────────────────────────────── */}
      <motion.aside
        className="hidden lg:flex flex-col h-screen sticky top-0 flex-shrink-0 overflow-hidden"
        style={{
          background: 'rgba(5,5,15,0.8)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
        animate={{ width: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Sidebar collapsed={collapsed} />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="absolute bottom-16 -right-3 w-6 h-6 glass-strong rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10 hover:border-brand-500/50 hover:shadow-glow z-50"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <motion.span
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="text-xs"
          >
            ›
          </motion.span>
        </button>
      </motion.aside>

      {/* ── Mobile sidebar overlay ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-dark-950/70 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: -SIDEBAR_W }}
              animate={{ x: 0 }}
              exit={{ x: -SIDEBAR_W }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden"
              style={{
                width: SIDEBAR_W,
                background: 'rgba(5,5,15,0.98)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(24px)',
              }}
            >
              <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopBar onMenuToggle={() => setMobileOpen((p) => !p)} />

        {/* Grid background */}
        <div className="flex-1 overflow-y-auto relative">
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Ambient glows */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle,#6366f1 0%,transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-20 w-72 h-72 rounded-full opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle,#a855f7 0%,transparent 70%)', filter: 'blur(60px)' }} />

          <main className="relative z-10 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.21, 1.04, 0.58, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
