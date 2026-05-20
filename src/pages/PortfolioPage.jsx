import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

const toastStyle = {
  style: {
    background: 'rgba(15,15,34,0.95)',
    backdropFilter: 'blur(12px)',
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

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      <Toaster position="bottom-right" toastOptions={toastStyle} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
