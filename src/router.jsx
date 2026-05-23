import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { motion } from 'framer-motion';

// Eager-load the portfolio (above-the-fold)
import PortfolioPage from './pages/PortfolioPage';

// Lazy-load admin chunks (only downloaded when /admin is visited)
const AdminLayout         = lazy(() => import('./admin/layout/AdminLayout'));
const AdminDashboard      = lazy(() => import('./admin/pages/AdminDashboard'));
const AdminProjects       = lazy(() => import('./admin/pages/AdminProjects'));
const AdminAddProject     = lazy(() => import('./admin/pages/AdminAddProject'));
const AdminEditProject    = lazy(() => import('./admin/pages/AdminEditProject'));
const AdminExperiences    = lazy(() => import('./admin/pages/AdminExperiences'));
const AdminAddExperience  = lazy(() => import('./admin/pages/AdminAddExperience'));
const AdminEditExperience = lazy(() => import('./admin/pages/AdminEditExperience'));

function AdminFallback() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border-2 border-white/10 border-t-brand-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <PortfolioPage />,
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<AdminFallback />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      { index: true,              element: <Suspense fallback={<AdminFallback />}><AdminDashboard /></Suspense> },
      { path: 'projects',         element: <Suspense fallback={<AdminFallback />}><AdminProjects /></Suspense> },
      { path: 'projects/add',     element: <Suspense fallback={<AdminFallback />}><AdminAddProject /></Suspense> },
      { path: 'projects/edit/:id',    element: <Suspense fallback={<AdminFallback />}><AdminEditProject /></Suspense> },
      { path: 'experiences',          element: <Suspense fallback={<AdminFallback />}><AdminExperiences /></Suspense> },
      { path: 'experiences/add',      element: <Suspense fallback={<AdminFallback />}><AdminAddExperience /></Suspense> },
      { path: 'experiences/edit/:id', element: <Suspense fallback={<AdminFallback />}><AdminEditExperience /></Suspense> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
