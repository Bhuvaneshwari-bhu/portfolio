import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaMicrochip,
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';

const SKILLS = [
  { name: 'HTML5', Icon: FaHtml5, color: '#e34f26', glow: 'rgba(227,79,38,0.35)', level: 95 },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#264de4', glow: 'rgba(38,77,228,0.35)', level: 90 },
  { name: 'JavaScript', Icon: FaJs, color: '#f7df1e', glow: 'rgba(247,223,30,0.35)', level: 88 },
  { name: 'React', Icon: FaReact, color: '#61dafb', glow: 'rgba(97,218,251,0.35)', level: 92 },
  { name: 'Node.js', Icon: FaNodeJs, color: '#68a063', glow: 'rgba(104,160,99,0.35)', level: 82 },
  { name: 'Express.js', Icon: SiExpress, color: '#ffffff', glow: 'rgba(255,255,255,0.15)', level: 80 },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47a248', glow: 'rgba(71,162,72,0.35)', level: 78 },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38bdf8', glow: 'rgba(56,189,248,0.35)', level: 94 },
  { name: 'GitHub', Icon: FaGithub, color: '#ffffff', glow: 'rgba(255,255,255,0.15)', level: 88 },
  { name: 'AI / Gen AI', Icon: HiSparkles, color: '#a855f7', glow: 'rgba(168,85,247,0.35)', level: 76 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.21, 1.04, 0.58, 1] } },
};

function SkillCard({ name, Icon, color, glow, level }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative glass rounded-2xl p-6 group cursor-default overflow-hidden"
      whileHover={{
        scale: 1.06,
        y: -6,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)` }}
      />

      {/* Animated border shimmer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'transparent',
          boxShadow: `0 0 0 1px ${color}40`,
        }}
      />

      {/* Icon */}
      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          <Icon style={{ color, fontSize: 22 }} />
        </div>
        <span className="text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors">
          {level}%
        </span>
      </div>

      <div className="relative z-10">
        <div className="text-white font-semibold text-sm mb-3">{name}</div>

        {/* Progress bar */}
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <GlowBlob color="#22d3ee" size={500} x="90%" y="50%" opacity={0.07} delay={1} />
      <GlowBlob color="#6366f1" size={400} x="5%" y="60%" opacity={0.06} delay={0} />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="Tech Stack"
          title="Skills &"
          highlight="Technologies"
          subtitle="Tools and technologies I use to bring ideas to life — from pixel-perfect UIs to scalable backends."
        />

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-white/30 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          + Docker, REST APIs, GraphQL, CI/CD, Figma, and more
        </motion.p>
      </div>
    </section>
  );
}
