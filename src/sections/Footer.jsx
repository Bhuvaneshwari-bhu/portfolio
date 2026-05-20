import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiMail, href: 'mailto:hello@portfolio.dev', label: 'Email' },
];

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              B
            </div>
            <span className="text-white font-semibold">
              bhu<span className="gradient-text">.dev</span>
            </span>
          </motion.div>

          {/* Nav links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/40 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
              >
                {l.label}
              </a>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-white/25 text-xs">
            <p>
              © {new Date().getFullYear()} Bhuvaneshwari. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Built with <FiHeart className="text-brand-400" size={11} /> using React, Vite & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
