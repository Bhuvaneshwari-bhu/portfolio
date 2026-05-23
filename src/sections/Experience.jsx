import { motion } from 'framer-motion';
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineCpuChip,
} from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';

const experiences = [
  {
    company: 'Infosys Springboard',
    role: 'AI/ML Intern',
    type: 'Virtual Internship',
    duration: 'Sep 2025 – Nov 2025',
    color: '#a855f7',
    accentColor: '#ec4899',
    logo: 'IS',
    hasCertificate: true,
    responsibilities: [
      'Worked on machine learning model development and evaluation pipelines',
      'Performed dataset preprocessing, feature engineering, and testing workflows',
      'Built a Dog Breed Classification model using deep learning techniques',
    ],
    tags: ['Machine Learning', 'Python', 'Deep Learning', 'Data Preprocessing'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 1.04, 0.58, 1] } },
};

function ExperienceCard({
  company, role, type, duration, color, accentColor,
  logo, hasCertificate, responsibilities, tags,
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="relative glass rounded-2xl p-6 group cursor-default overflow-hidden"
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Hover glow backdrop */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 30% 0%, ${color}15 0%, transparent 65%)` }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${color}30` }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, ${accentColor}50, transparent)` }}
      />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-5">
          {/* Logo */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }}
          >
            {logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-white font-bold text-base leading-tight">{role}</h3>
                <p className="text-white/55 text-sm mt-0.5">{company}</p>
              </div>

              {/* Type badge */}
              <span
                className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
              >
                {type}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1.5 mt-2">
              <HiOutlineCalendar size={13} className="text-white/35" />
              <span className="text-white/45 text-xs font-medium">{duration}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-4" />

        {/* Responsibilities */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineBriefcase size={14} className="text-white/35" />
            <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Responsibilities</span>
          </div>
          <ul className="space-y-2.5">
            {responsibilities.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.45 }}
              >
                <HiOutlineCheckCircle
                  size={15}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color }}
                />
                <span className="text-white/60 text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{
                background: `${color}12`,
                color: `${color}cc`,
                border: `1px solid ${color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Certificate badge */}
        {hasCertificate && (
          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{
              background: `${accentColor}10`,
              border: `1px solid ${accentColor}30`,
              color: accentColor,
            }}
          >
            <HiOutlineSparkles size={13} />
            Certificate Awarded
            <HiOutlineCpuChip size={13} className="ml-1 opacity-60" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <GlowBlob color="#a855f7" size={450} x="90%" y="30%" opacity={0.07} delay={1} />
      <GlowBlob color="#ec4899" size={380} x="5%"  y="60%" opacity={0.06} delay={0} />
      <GlowBlob color="#6366f1" size={300} x="50%" y="85%" opacity={0.05} delay={2} />

      <div className="max-w-2xl mx-auto">
        <SectionHeading
          tag="Experience"
          title="Work &"
          highlight="Internships"
          subtitle="Hands-on industry experience building real AI and ML solutions."
        />

        <div className="space-y-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.company + exp.role} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
