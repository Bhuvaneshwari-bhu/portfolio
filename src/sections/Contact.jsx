import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSend, FiCheck } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import GlowBlob from '../components/GlowBlob';

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com', color: '#ffffff' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0a66c2' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com', color: '#1da1f2' },
  { icon: FiMail, label: 'Email', href: 'mailto:hello@portfolio.dev', color: '#6366f1' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <GlowBlob color="#6366f1" size={500} x="20%" y="40%" opacity={0.08} delay={0} />
      <GlowBlob color="#ec4899" size={400} x="85%" y="60%" opacity={0.06} delay={2} />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          tag="Contact"
          title="Let's Build"
          highlight="Something Great"
          subtitle="Have a project in mind? I'd love to hear about it. Let's connect and create something amazing together."
        />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-8 mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Available for Freelance</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                I&apos;m currently open to freelance opportunities, full-time roles, and interesting
                collaborations. If you have a project that needs a creative developer, let&apos;s talk.
              </p>

              <div className="flex items-center gap-3 p-3 rounded-xl glass">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-medium">Available Now</div>
                  <div className="text-white/40 text-xs">Response within 24 hours</div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass rounded-xl p-4 group hover:border-white/15 transition-all duration-300"
                  whileHover={{ x: 6 }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon style={{ color }} size={16} />
                  </div>
                  <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors">
                    {label}
                  </span>
                  <div className="ml-auto text-white/20 group-hover:text-white/60 transition-colors text-xs">→</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="input-field resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || submitted}
                className="w-full btn-primary justify-center py-3.5 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? (
                  <>
                    <FiCheck /> Message Sent!
                  </>
                ) : loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </motion.button>

              <p className="text-white/25 text-xs text-center">
                No spam, ever. Typical response time: under 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
