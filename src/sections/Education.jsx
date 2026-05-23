import { motion } from 'framer-motion';
import {
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';

const educationData = [
  {
    institution: 'Rajiv Gandhi University of Knowledge Technologies, Basar',
    degree: 'B.Tech in Computer Science and Engineering',
    duration: '2023 – 2027',
    cgpa: '9.4',
    type: 'Undergraduate',
    color: '#6366f1',
    icon: HiOutlineAcademicCap,
    logo: '/assets/rgukt.jpeg',
    current: true,
  },
  {
    institution: 'Rajiv Gandhi University of Knowledge Technologies, Basar',
    degree: 'Pre-University Course',
    duration: '2021 – 2023',
    cgpa: '9.81',
    type: 'Pre-University',
    color: '#22d3ee',
    icon: HiOutlineAcademicCap,
    logo: '/assets/rgukt.jpeg',
    current: false,
  },
  {
    institution: 'Victory High School, Chandur',
    degree: 'Secondary School Certificate',
    duration: '2021',
    cgpa: '10',
    type: 'High School',
    color: '#10b981',
    icon: HiOutlineStar,
    logo: '/assets/vhs.png',
    current: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.21, 1.04, 0.58, 1] },
  }),
};

function EducationCard({ institution, degree, duration, cgpa, type, color, icon: Icon, logo, current, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="relative flex gap-0"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center mr-5 flex-shrink-0">
        <motion.div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center z-10 flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}40` }}
        >
          <Icon size={17} style={{ color }} />
          {current && (
            <span
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-dark-950"
              style={{ background: color }}
            >
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{ background: color }}
              />
            </span>
          )}
        </motion.div>

        {index < educationData.length - 1 && (
          <div
            className="w-px flex-1 mt-2 min-h-[2rem]"
            style={{ background: `linear-gradient(180deg, ${color}40, transparent)` }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="relative glass rounded-2xl p-4 sm:p-5 mb-6 flex-1 group cursor-default overflow-hidden"
        whileHover={{ x: 4, transition: { duration: 0.2 } }}
      >
        {/* Hover glows */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 0% 50%, ${color}12 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 0 1px ${color}30` }}
        />
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
          style={{ background: `linear-gradient(180deg, ${color}, ${color}40)` }}
        />

        <div className="relative z-10 pl-3 flex items-start gap-4">
          {/* Institution logo */}
          <div
            className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ background: `${color}10`, border: `1px solid ${color}25` }}
          >
            <img
              src={logo}
              alt={institution}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<span style="color:${color};font-size:20px">🎓</span>`;
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            {/* Type badge + current tag */}
            <div className="flex items-center flex-wrap gap-2 mb-1.5">
              <span
                className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
              >
                {type}
              </span>
              {current && (
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Current
                </span>
              )}
            </div>

            <h3 className="text-white font-bold text-sm sm:text-base leading-snug mb-1">
              {degree}
            </h3>
            <div className="flex items-start gap-1 mb-2.5">
              <HiOutlineMapPin size={12} className="text-white/35 mt-0.5 flex-shrink-0" />
              <p className="text-white/45 text-xs leading-snug">{institution}</p>
            </div>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-1.5">
                <HiOutlineCalendar size={12} className="text-white/35" />
                <span className="text-white/55 text-xs font-medium">{duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineStar size={12} style={{ color }} />
                <span className="text-xs font-semibold" style={{ color }}>
                  CGPA: {cgpa}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative section-padding overflow-hidden">
      <GlowBlob color="#6366f1" size={450} x="5%"  y="30%" opacity={0.07} delay={0} />
      <GlowBlob color="#22d3ee" size={380} x="95%" y="70%" opacity={0.06} delay={2} />
      <GlowBlob color="#10b981" size={320} x="60%" y="90%" opacity={0.05} delay={1} />

      <div className="max-w-2xl mx-auto">
        <SectionHeading
          tag="Education"
          title="Academic"
          highlight="Background"
          subtitle="My educational journey through computer science and engineering."
        />

        <div>
          {educationData.map((entry, i) => (
            <EducationCard key={entry.degree} {...entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
