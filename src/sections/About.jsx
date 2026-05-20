import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiZap, FiHeart } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';
import { timeline } from '../data';

const traits = [
  { icon: FiCode, label: 'Clean Code', desc: 'Scalable, readable, maintainable', color: '#6366f1' },
  { icon: FiCpu, label: 'AI-First', desc: 'LLMs, automation & smart UX', color: '#a855f7' },
  { icon: FiZap, label: 'Performance', desc: 'Fast load times, optimized UX', color: '#22d3ee' },
  { icon: FiHeart, label: 'Passion', desc: 'Genuinely love what I build', color: '#ec4899' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 1.04, 0.58, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <GlowBlob color="#6366f1" size={500} x="5%" y="50%" opacity={0.07} delay={0} />
      <GlowBlob color="#a855f7" size={400} x="95%" y="30%" opacity={0.06} delay={3} />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="About Me"
          title="The Developer"
          highlight="Behind the Code"
          subtitle="I'm a frontend & AI developer who turns complex ideas into elegant digital experiences."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Avatar placeholder */}
            <div className="relative w-fit mb-8">
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl font-black text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #22d3ee)' }}
              >
                B
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg glass-strong flex items-center justify-center">
                <HiSparkles className="text-brand-400 text-sm" />
              </div>
              <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full border border-accent-green bg-dark-900 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Hi, I&apos;m <span className="gradient-text">Bhuvaneshwari</span>
            </h3>
            <p className="text-white/55 leading-relaxed mb-5">
              A passionate Frontend & AI Developer with a love for crafting beautiful, performant
              web applications. I specialize in React ecosystems and AI integration, bringing a
              designer&apos;s eye to engineering problems.
            </p>
            <p className="text-white/55 leading-relaxed mb-6">
              Currently exploring the intersection of large language models and product development —
              building tools that feel magical but are grounded in robust engineering.
            </p>

            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python', 'OpenAI', 'TypeScript', 'Tailwind'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Trait Cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {traits.map(({ icon: Icon, label, desc, color }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="glass rounded-2xl p-5 card-hover group cursor-default"
                whileHover={{ scale: 1.04 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon style={{ color }} size={18} />
                </div>
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-white/40 text-xs leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            My <span className="gradient-text">Journey</span>
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/0 via-brand-500/40 to-brand-500/0 hidden md:block" />

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Icon dot */}
                  <div className="relative flex-shrink-0 hidden md:flex">
                    <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl z-10 group-hover:shadow-glow transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass rounded-2xl p-5 flex-1 group-hover:border-brand-500/30 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-white font-semibold">{item.title}</div>
                        <div className="text-brand-400 text-sm">{item.org}</div>
                      </div>
                      <span className="text-white/30 text-xs font-mono">{item.year}</span>
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
