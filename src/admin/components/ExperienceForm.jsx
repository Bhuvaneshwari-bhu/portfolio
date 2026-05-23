import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2';
import { FiArrowLeft } from 'react-icons/fi';
import { experiencesApi } from '../../services/api';

const EMPTY = {
  title: '',
  company: '',
  role: '',
  duration: '',
  description: '',
  responsibilities: [],
  tags: [],
  status: 'Completed',
  certificate: '',
  color: '#a855f7',
  order: 0,
};

const COLOR_OPTIONS = ['#a855f7', '#6366f1', '#22d3ee', '#10b981', '#f59e0b', '#ec4899', '#f97316'];

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-red-400 text-xs">{error}</p>}
    </div>
  );
}

function TagInput({ label, required, error, items, setItems, placeholder }) {
  const [input, setInput] = useState('');

  const add = useCallback(() => {
    const val = input.trim();
    if (!val || items.includes(val)) { setInput(''); return; }
    setItems([...items, val]);
    setInput('');
  }, [input, items, setItems]);

  const remove = (item) => setItems(items.filter((i) => i !== item));

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
    if (e.key === 'Backspace' && !input && items.length) setItems(items.slice(0, -1));
  };

  return (
    <Field label={label} required={required} error={error}>
      <div
        className={`min-h-[44px] w-full rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center
          bg-white/5 border transition-all duration-300
          ${error ? 'border-red-500/60' : 'border-white/10 focus-within:border-brand-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'}`}
      >
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            {item}
            <button type="button" onClick={() => remove(item)} className="text-white/40 hover:text-white transition-colors">
              <HiOutlineXMark size={11} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={add}
          placeholder={items.length ? '' : (placeholder || 'Type & press Enter…')}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-white text-sm placeholder-white/25"
        />
      </div>
      <p className="mt-1.5 text-white/30 text-xs">Press Enter or comma to add</p>
    </Field>
  );
}

export default function ExperienceForm({ initialData, mode = 'add' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...EMPTY, ...initialData });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = 'Title is required';
    if (!form.company.trim())  e.company  = 'Company is required';
    if (!form.role.trim())     e.role     = 'Role is required';
    if (!form.duration.trim()) e.duration = 'Duration is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fix the errors below'); return; }
    setLoading(true);
    try {
      if (mode === 'edit') {
        await experiencesApi.update(initialData._id, form);
        toast.success('Experience updated!');
      } else {
        await experiencesApi.create(form);
        toast.success('Experience added!');
      }
      navigate('/admin/experiences');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Left: main fields ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Core Info */}
          <div className="glass rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Core Info</h3>

            <Field label="Internship / Position Title" required error={errors.title}>
              <input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Infosys Springboard Virtual Internship"
                className={`input-field ${errors.title ? 'border-red-500/60' : ''}`}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Company / Organisation" required error={errors.company}>
                <input
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                  placeholder="e.g. Infosys Springboard"
                  className={`input-field ${errors.company ? 'border-red-500/60' : ''}`}
                />
              </Field>
              <Field label="Role / Designation" required error={errors.role}>
                <input
                  value={form.role}
                  onChange={(e) => set('role', e.target.value)}
                  placeholder="e.g. AI/ML Intern"
                  className={`input-field ${errors.role ? 'border-red-500/60' : ''}`}
                />
              </Field>
            </div>

            <Field label="Duration" required error={errors.duration}>
              <input
                value={form.duration}
                onChange={(e) => set('duration', e.target.value)}
                placeholder="e.g. Sep 2025 – Nov 2025"
                className={`input-field ${errors.duration ? 'border-red-500/60' : ''}`}
              />
            </Field>

            <Field label="Description (optional)">
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Brief overview of the internship or role…"
                rows={3}
                className="input-field resize-none"
              />
            </Field>
          </div>

          {/* Responsibilities */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Responsibilities</h3>
            <TagInput
              label="Key Responsibilities"
              items={form.responsibilities}
              setItems={(val) => set('responsibilities', val)}
              placeholder="Type a responsibility & press Enter…"
            />
          </div>

          {/* Tech Tags */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Tech Tags</h3>
            <TagInput
              label="Technologies / Skills"
              items={form.tags}
              setItems={(val) => set('tags', val)}
              placeholder="e.g. Python, Machine Learning…"
            />
          </div>
        </div>

        {/* ── Right: sidebar ───────────────────────────────── */}
        <div className="space-y-5">

          {/* Status */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Completed', 'Ongoing'].map((s) => {
                const active = form.status === s;
                const cfg = s === 'Completed'
                  ? { color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)' }
                  : { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)' };
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set('status', s)}
                    className="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={active
                      ? { background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Certificate</h3>
            <Field label="Certificate URL (optional)">
              <input
                value={form.certificate}
                onChange={(e) => set('certificate', e.target.value)}
                placeholder="https://credential.net/..."
                type="url"
                className="input-field"
              />
            </Field>
            <p className="text-white/30 text-xs">Leave blank to show a "Certificate Awarded" badge only.</p>
          </div>

          {/* Accent color */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Accent Color</h3>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('color', c)}
                  className="w-7 h-7 rounded-lg transition-all duration-200"
                  style={{
                    background: c,
                    boxShadow: form.color === c ? `0 0 12px ${c}` : 'none',
                    transform: form.color === c ? 'scale(1.2)' : 'scale(1)',
                    border: form.color === c ? '2px solid white' : '2px solid transparent',
                  }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Display order */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Display Order</h3>
            <Field label="Order (lower = first)">
              <input
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => set('order', Number(e.target.value))}
                className="input-field"
              />
            </Field>
          </div>

          {/* Actions */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <motion.span
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                  {mode === 'edit' ? 'Updating…' : 'Creating…'}
                </>
              ) : (
                <>
                  <HiOutlinePlus size={16} />
                  {mode === 'edit' ? 'Update Experience' : 'Add Experience'}
                </>
              )}
            </motion.button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full btn-secondary justify-center py-2.5 text-sm"
            >
              <FiArrowLeft size={14} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
