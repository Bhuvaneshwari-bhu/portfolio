import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import GlowBlob from '../components/GlowBlob';
import TypeWriter from '../components/TypeWriter';
import ScrollIndicator from '../components/ScrollIndicator';
import { LINKS } from '../constants/links';

const socials = [
  { icon: FiGithub,   href: LINKS.github,   label: 'GitHub' },
  { icon: FiLinkedin, href: LINKS.linkedin, label: 'LinkedIn' },
  { icon: FiMail,     href: LINKS.email,    label: 'Email' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.21, 1.04, 0.58, 1], delay },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background blobs */}
      <GlowBlob color="#6366f1" size={700} x="15%" y="30%" opacity={0.12} delay={0} />
      <GlowBlob color="#a855f7" size={500} x="80%" y="20%" opacity={0.1}  delay={2} />
      <GlowBlob color="#22d3ee" size={400} x="70%" y="75%" opacity={0.08} delay={4} />
      <GlowBlob color="#ec4899" size={300} x="10%" y="80%" opacity={0.07} delay={1} />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12 flex flex-col items-center">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: '#a5b4fc',
            }}
          >
            <HiSparkles className="text-brand-400" />
            Computer Science Engineering Student
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6"
        >
          AI &{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #818cf8, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradient 5s ease infinite',
            }}
          >
            Full Stack Developer
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          {...fadeUp(0.35)}
          className="text-2xl md:text-3xl font-semibold text-white/60 mb-6 h-10"
        >
          I&apos;m a <TypeWriter />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.45)}
          className="text-white/45 text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          I build modern, responsive, and interactive web experiences with clean UI
          and scalable backend systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-sm px-7 py-3.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects <FiArrowRight />
          </motion.a>
          {LINKS.resume ? (
            <motion.a
              href={LINKS.resume}
              download
              className="btn-secondary text-sm px-7 py-3.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiDownload /> Download Resume
            </motion.a>
          ) : (
            <motion.span
              className="btn-secondary text-sm px-7 py-3.5 opacity-40 cursor-not-allowed select-none"
              title="Resume coming soon"
            >
              <FiDownload /> Resume Coming Soon
            </motion.span>
          )}
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.65)} className="flex items-center gap-4 mb-20">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:border-brand-500/50 transition-all duration-300"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
          <div className="w-px h-4 bg-white/10" />
          <span className="text-white/30 text-xs">Let&apos;s connect</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div {...fadeUp(0.75)}>
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}
