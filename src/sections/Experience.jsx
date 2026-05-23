import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineCheckBadge,
} from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';
import { experiencesApi } from '../services/api';

const FALLBACK = [
  {
    _id: 'fallback-1',
    title: 'Infosys Springboard Virtual Internship',
    company: 'Infosys Springboard',
    role: 'AI/ML Intern',
    type: 'Virtual Internship',
    duration: 'Sep 2025 – Nov 2025',
    status: 'Completed',
    color: '#a855f7',
    certificate: '',
    responsibilities: [
      'Worked on machine learning model development and evaluation pipelines',
      'Performed dataset preprocessing, feature engineering, and testing workflows',
      'Built a Dog Breed Classification model using deep learning techniques',
    ],
    tags: ['Machine Learning', 'Python', 'Deep Learning', 'Data Preprocessing'],
  },
];

const STATUS_CONFIG = {
  Completed: {
    icon: HiOutlineCheckBadge,
    label: 'Completed',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    color: '#10b981',
  },
  Ongoing: {
    icon: HiOutlineClock,
    label: 'Ongoing',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.3)',
    color: '#f59e0b',
    pulse: true,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 1.04, 0.58, 1] } },
};

function ExperienceCard({ title, company, role, duration, status, color, certificate, responsibilities, tags }) {
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.Completed;
  const StatusIcon = statusCfg.icon;
  const hasCert = !!certificate;
  const accentColor = color || '#a855f7';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="relative glass rounded-2xl p-5 sm:p-6 group cursor-default overflow-hidden"
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 30% 0%, ${accentColor}15 0%, transparent 65%)` }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${accentColor}30` }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          {/* Logo badge */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
          >
            {company.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="min-w-0">
                <h3 className="text-white font-bold text-base leading-tight truncate">{title}</h3>
                <p className="text-white/50 text-sm mt-0.5">{company} · {role}</p>
              </div>

              {/* Status badge */}
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background: statusCfg.bg, border: `1px solid ${statusCfg.border}`, color: statusCfg.color }}
              >
                {statusCfg.pulse
                  ? <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusCfg.color }} />
                  : <StatusIcon size={12} />
                }
                {statusCfg.label}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1.5 mt-2">
              <HiOutlineCalendar size={12} className="text-white/35" />
              <span className="text-white/45 text-xs font-medium">{duration}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-4" />

        {/* Responsibilities */}
        {responsibilities && responsibilities.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineBriefcase size={13} className="text-white/30" />
              <span className="text-white/35 text-[10px] font-semibold uppercase tracking-widest">
                Responsibilities
              </span>
            </div>
            <ul className="space-y-2">
              {responsibilities.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                >
                  <HiOutlineCheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                  <span className="text-white/55 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-md"
                style={{
                  background: `${accentColor}12`,
                  color: `${accentColor}cc`,
                  border: `1px solid ${accentColor}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Certificate badge */}
        {hasCert && (
          <a
            href={certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}
          >
            <HiOutlineSparkles size={13} />
            View Certificate
          </a>
        )}

        {!hasCert && status === 'Completed' && (
          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}
          >
            <HiOutlineSparkles size={13} />
            Certificate Awarded
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/5 rounded-lg w-3/4" />
          <div className="h-3 bg-white/5 rounded-lg w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        {[80, 95, 70].map((w) => (
          <div key={w} className="h-3 bg-white/5 rounded-lg" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    experiencesApi
      .getAll()
      .then((data) => setExperiences(data.length > 0 ? data : FALLBACK))
      .catch(() => setExperiences(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

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
          {loading
            ? <SkeletonCard />
            : experiences.map((exp) => (
                <ExperienceCard key={exp._id || exp.title} {...exp} />
              ))
          }
        </div>
      </div>
    </section>
  );
}
