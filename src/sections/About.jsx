import { motion } from 'framer-motion';
import {
  HiOutlineComputerDesktop,
  HiOutlineServerStack,
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlinePaintBrush,
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineBookOpen,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
  HiOutlinePuzzlePiece,
  HiOutlineArrowTrendingUp,
} from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';

/* ── "What I Build" cards ─────────────────────────────────────────────────── */
const buildCards = [
  {
    icon: HiOutlineComputerDesktop,
    title: 'Responsive Web Applications',
    desc: 'Pixel-perfect UIs that work seamlessly across all devices and screen sizes.',
    color: '#6366f1',
  },
  {
    icon: HiOutlineServerStack,
    title: 'Full Stack MERN Projects',
    desc: 'End-to-end applications with MongoDB, Express, React, and Node.js.',
    color: '#22d3ee',
  },
  {
    icon: HiOutlinePaintBrush,
    title: 'Interactive Frontend Experiences',
    desc: 'Smooth animations, clean layouts, and intuitive user interactions.',
    color: '#a855f7',
  },
  {
    icon: HiOutlineCpuChip,
    title: 'AI-Powered Applications',
    desc: 'Integrating AI APIs and models to add intelligent features to web apps.',
    color: '#ec4899',
  },
  {
    icon: HiOutlineCommandLine,
    title: 'REST APIs & Backend Systems',
    desc: 'Scalable Express APIs with proper routing, validation, and database design.',
    color: '#10b981',
  },
];

/* ── Journey bento cards ──────────────────────────────────────────────────── */
const journeyCards = [
  {
    icon: HiOutlineBookOpen,
    title: 'Started with Frontend',
    desc: 'Began my journey with HTML, CSS, and JavaScript — building static pages and learning the fundamentals of the web.',
    color: '#6366f1',
    size: 'large',
  },
  {
    icon: HiOutlineServerStack,
    title: 'Exploring MERN Stack',
    desc: 'Moved into full-stack development, connecting frontends to Node.js + MongoDB backends.',
    color: '#22d3ee',
    size: 'normal',
  },
  {
    icon: HiOutlineCpuChip,
    title: 'Building AI Projects',
    desc: 'Integrating AI APIs and exploring how ML can enhance everyday web applications.',
    color: '#a855f7',
    size: 'normal',
  },
  {
    icon: HiOutlinePaintBrush,
    title: 'Improving UI/UX Skills',
    desc: 'Studying design systems, Tailwind CSS, and motion design to craft premium user experiences.',
    color: '#ec4899',
    size: 'normal',
  },
  {
    icon: HiOutlinePuzzlePiece,
    title: 'Practicing Problem Solving',
    desc: 'Sharpening DSA and logic skills through consistent coding practice and challenges.',
    color: '#f59e0b',
    size: 'normal',
  },
  {
    icon: HiOutlineArrowTrendingUp,
    title: 'Always Levelling Up',
    desc: 'Continuously learning new technologies, frameworks, and best practices every single day.',
    color: '#10b981',
    size: 'large',
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 1.04, 0.58, 1] } },
};

/* ── Build card ───────────────────────────────────────────────────────────── */
function BuildCard({ icon: Icon, title, desc, color, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative glass rounded-2xl p-5 group cursor-default overflow-hidden"
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.25 } }}
    >
      {/* Hover glow backdrop */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 30% 0%, ${color}20 0%, transparent 65%)` }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${color}35` }}
      />

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <h4 className="text-white font-semibold text-sm mb-2 leading-snug">{title}</h4>
        <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Journey bento card ───────────────────────────────────────────────────── */
function JourneyCard({ icon: Icon, title, desc, color, size, index }) {
  const isLarge = size === 'large';
  return (
    <motion.div
      className={`relative glass rounded-2xl p-5 group cursor-default overflow-hidden ${
        isLarge ? 'sm:col-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.21, 1.04, 0.58, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Animated corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${color}18, transparent 70%)` }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${color}30` }}
      />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ background: `${color}18`, border: `1px solid ${color}28` }}
        >
          <Icon size={18} style={{ color }} />
        </div>

        <div>
          <div
            className="text-xs font-semibold mb-1.5 tracking-wide uppercase"
            style={{ color }}
          >
            {title}
          </div>
          <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <GlowBlob color="#6366f1" size={500} x="5%"  y="40%" opacity={0.07} delay={0} />
      <GlowBlob color="#a855f7" size={400} x="95%" y="20%" opacity={0.06} delay={3} />
      <GlowBlob color="#22d3ee" size={350} x="80%" y="80%" opacity={0.05} delay={2} />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="About Me"
          title="The Developer"
          highlight="Behind the Code"
          subtitle="A CSE student passionate about building real-world web experiences with modern technologies."
        />

        {/* ── Bio + avatar ──────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-10 items-start mb-20">

          {/* Left: avatar + bio */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Avatar */}
            <div className="relative w-fit mb-8">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #22d3ee)' }}
              >
                B
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg glass-strong flex items-center justify-center">
                <HiOutlineSparkles className="text-brand-400 text-sm" />
              </div>
              <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full border border-accent-green bg-dark-900 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
              CSE Student &nbsp;·&nbsp; Frontend &nbsp;·&nbsp; Full Stack &nbsp;·&nbsp; AI Enthusiast
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Hi, I&apos;m <span className="gradient-text">Bhuvaneshwari</span>
            </h3>
            <p className="text-white/55 leading-relaxed mb-4">
              I&apos;m a Computer Science Engineering student with a genuine interest in building
              modern web applications. I enjoy working across the full stack — designing clean UIs
              with React and Tailwind, and building reliable backends with Node.js and MongoDB.
            </p>
            <p className="text-white/55 leading-relaxed mb-6">
              I&apos;m actively exploring AI and how it can be integrated into web products.
              I believe in learning by building — every project teaches me something new,
              and I&apos;m always looking to improve my craft.
            </p>

            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'Python', 'Tailwind CSS', 'MERN Stack'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: quick info cards */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {[
              { icon: HiOutlineBookOpen,    label: 'Learning',   value: 'Full Stack Dev',  color: '#6366f1' },
              { icon: HiOutlineRocketLaunch, label: 'Focus',     value: 'MERN + AI',       color: '#a855f7' },
              { icon: HiOutlineLightBulb,   label: 'Approach',   value: 'Build to Learn',  color: '#22d3ee' },
              { icon: HiOutlineWrenchScrewdriver, label: 'Status', value: 'Open to work',  color: '#10b981' },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div
                key={label}
                className="glass rounded-2xl p-4 flex items-center gap-4 group cursor-default"
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-white/35 text-[10px] uppercase tracking-wider font-medium">{label}</div>
                  <div className="text-white font-semibold text-sm">{value}</div>
                </div>
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── What I Build ─────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.h3
            className="text-xl font-bold text-white mb-2 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What I <span className="gradient-text">Build</span>
          </motion.h3>
          <motion.p
            className="text-white/40 text-sm text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The kinds of projects I love working on
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {buildCards.map((card, i) => (
              <BuildCard key={card.title} {...card} index={i} />
            ))}
          </motion.div>
        </div>

        {/* ── Learning & Building Journey bento ──────────────────────── */}
        <div>
          <motion.h3
            className="text-xl font-bold text-white mb-2 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Learning &amp; Building <span className="gradient-text">Journey</span>
          </motion.h3>
          <motion.p
            className="text-white/40 text-sm text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Every step is a lesson; every project, a milestone
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {journeyCards.map((card, i) => (
              <JourneyCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
