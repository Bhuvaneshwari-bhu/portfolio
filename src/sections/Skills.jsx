import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaPython, FaJava,
} from 'react-icons/fa';
import {
  SiExpress, SiMongodb, SiTailwindcss, SiMysql, SiC,
  SiDocker, SiGooglecolab, SiCanva,
} from 'react-icons/si';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';

/* ── Skill categories ─────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Frontend',
    color: '#6366f1',
    skills: [
      { name: 'HTML',         Icon: FaHtml5,       color: '#e34f26' },
      { name: 'CSS',          Icon: FaCss3Alt,     color: '#264de4' },
      { name: 'JavaScript',   Icon: FaJs,          color: '#f7df1e' },
      { name: 'React',        Icon: FaReact,       color: '#61dafb' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38bdf8' },
    ],
  },
  {
    label: 'Backend',
    color: '#22d3ee',
    skills: [
      { name: 'Node.js',    Icon: FaNodeJs,  color: '#68a063' },
      { name: 'Express.js', Icon: SiExpress, color: '#ffffff' },
      { name: 'MongoDB',    Icon: SiMongodb, color: '#47a248' },
      { name: 'MySQL',      Icon: SiMysql,   color: '#4479a1' },
      {
        name: 'MERN Stack',
        Icon: ({ style }) => (
          <span style={{ ...style, fontWeight: 800, fontSize: 13, letterSpacing: '-0.5px' }}>
            MERN
          </span>
        ),
        color: '#a855f7',
      },
    ],
  },
  {
    label: 'Programming',
    color: '#a855f7',
    skills: [
      { name: 'Python', Icon: FaPython, color: '#3776ab' },
      { name: 'Java',   Icon: FaJava,  color: '#f89820' },
      { name: 'C',      Icon: SiC,     color: '#5c6bc0' },
    ],
  },
  {
    label: 'Tools',
    color: '#10b981',
    skills: [
      { name: 'GitHub',       Icon: FaGithub,       color: '#ffffff' },
      { name: 'Docker',       Icon: SiDocker,       color: '#2496ed' },
      { name: 'Google Colab', Icon: SiGooglecolab,  color: '#f9ab00' },
      { name: 'Canva',        Icon: SiCanva,        color: '#00c4cc' },
    ],
  },
];

const categoryGlows = {
  Frontend:    'rgba(99,102,241,0.35)',
  Backend:     'rgba(34,211,238,0.35)',
  Programming: 'rgba(168,85,247,0.35)',
  Tools:       'rgba(16,185,129,0.35)',
};

/* ── Single skill card ────────────────────────────────────────────────────── */
function SkillCard({ name, Icon, color, categoryColor, categoryGlow, index }) {
  return (
    <motion.div
      className="relative glass rounded-2xl p-4 group cursor-default overflow-hidden flex flex-col items-center text-center gap-3"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 1.04, 0.58, 1] }}
      whileHover={{ scale: 1.08, y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
    >
      {/* Hover glow fill */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(circle at 50% 20%, ${categoryGlow} 0%, transparent 65%)` }}
      />
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: `inset 0 0 0 1px ${categoryColor}45` }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}18`, border: `1px solid ${color}28` }}
      >
        <Icon style={{ color, fontSize: 22 }} size={22} />
      </div>

      {/* Name */}
      <span className="relative z-10 text-white/80 group-hover:text-white font-semibold text-xs transition-colors duration-300 leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

/* ── Category block ───────────────────────────────────────────────────────── */
function CategoryBlock({ label, color, skills, groupIndex }) {
  const glow = categoryGlows[label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: groupIndex * 0.1 }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(90deg, ${color}50, transparent)` }}
        />
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{ background: `${color}12`, border: `1px solid ${color}28`, color }}
        >
          {label}
        </div>
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(90deg, transparent, ${color}50)` }}
        />
      </div>

      {/* Skill cards */}
      <div
        className={`grid gap-3 ${
          skills.length <= 3
            ? 'grid-cols-3 sm:grid-cols-3'
            : 'grid-cols-3 sm:grid-cols-5'
        }`}
      >
        {skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            {...skill}
            categoryColor={color}
            categoryGlow={glow}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function Skills() {
  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <GlowBlob color="#22d3ee" size={500} x="90%" y="40%" opacity={0.07} delay={1} />
      <GlowBlob color="#6366f1" size={400} x="5%"  y="65%" opacity={0.06} delay={0} />
      <GlowBlob color="#a855f7" size={350} x="50%" y="90%" opacity={0.05} delay={2} />

      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="Tech Stack"
          title="Skills &"
          highlight="Technologies"
          subtitle="Languages, frameworks, and tools I use to design and build full-stack web applications."
        />

        <div className="space-y-10">
          {CATEGORIES.map((cat, i) => (
            <CategoryBlock key={cat.label} {...cat} groupIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
