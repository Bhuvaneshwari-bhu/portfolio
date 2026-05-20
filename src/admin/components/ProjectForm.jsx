import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineXMark, HiOutlinePhoto } from 'react-icons/hi2';
import { FiArrowLeft } from 'react-icons/fi';
import { projectsApi } from '../../services/api';

const CATEGORIES = ['AI', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Other'];

const EMPTY = {
  title: '',
  description: '',
  longDescription: '',
  techStack: [],
  githubLink: '',
  liveLink: '',
  videoDemoLink: '',
  image: '',
  category: 'Full Stack',
  featured: false,
  color: '#6366f1',
};

function Field({ label, error, required, children }) {
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

export default function ProjectForm({ initialData, mode = 'add' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...EMPTY, ...initialData });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  };

  // Tech stack tag management
  const addTag = useCallback(() => {
    const tag = tagInput.trim();
    if (!tag) return;
    if (form.techStack.includes(tag)) { setTagInput(''); return; }
    set('techStack', [...form.techStack, tag]);
    setTagInput('');
  }, [tagInput, form.techStack]);

  const removeTag = (tag) => set('techStack', form.techStack.filter((t) => t !== tag));

  const handleTagKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
    if (e.key === 'Backspace' && !tagInput && form.techStack.length) {
      set('techStack', form.techStack.slice(0, -1));
    }
  };

  // Validation
  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (form.techStack.length === 0) e.techStack = 'Add at least one technology';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fix the errors below'); return; }

    setLoading(true);
    try {
      if (mode === 'edit') {
        await projectsApi.update(initialData._id, form);
        toast.success('Project updated successfully!');
      } else {
        await projectsApi.create(form);
        toast.success('Project created successfully!');
      }
      navigate('/admin/projects');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const colorOptions = ['#6366f1','#a855f7','#22d3ee','#10b981','#f59e0b','#ec4899','#f97316','#64748b'];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ─── Left: main fields (2 cols) ─────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Core Info</h3>

            <Field label="Project Title" required error={errors.title}>
              <input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. NeuroChat — AI Chatbot Platform"
                className={`input-field ${errors.title ? 'border-red-500/60' : ''}`}
              />
            </Field>

            <Field label="Short Description" required error={errors.description}>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Brief overview shown in project cards (max 500 chars)"
                rows={3}
                maxLength={500}
                className={`input-field resize-none ${errors.description ? 'border-red-500/60' : ''}`}
              />
              <p className="mt-1 text-right text-white/25 text-xs">{form.description.length}/500</p>
            </Field>

            <Field label="Long Description (optional)">
              <textarea
                value={form.longDescription}
                onChange={(e) => set('longDescription', e.target.value)}
                placeholder="Detailed description shown in modal popup…"
                rows={5}
                className="input-field resize-none"
              />
            </Field>
          </div>

          {/* Tech stack */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Tech Stack</h3>

            <Field label="Technologies" required error={errors.techStack}>
              <div
                className={`min-h-[44px] w-full rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center
                  bg-white/5 border transition-all duration-300
                  ${errors.techStack ? 'border-red-500/60' : 'border-white/10 focus-within:border-brand-500/60 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'}`}
              >
                {form.techStack.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}
                  >
                    {t}
                    <button type="button" onClick={() => removeTag(t)} className="text-white/40 hover:text-white transition-colors">
                      <HiOutlineXMark size={11} />
                    </button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKey}
                  onBlur={addTag}
                  placeholder={form.techStack.length ? '' : 'Type & press Enter…'}
                  className="flex-1 min-w-[100px] bg-transparent outline-none text-white text-sm placeholder-white/25"
                />
              </div>
              <p className="mt-1.5 text-white/30 text-xs">Press Enter or comma to add a tag</p>
            </Field>
          </div>

          {/* Links */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Links</h3>
            {[
              { key: 'githubLink',   label: 'GitHub URL',   placeholder: 'https://github.com/...' },
              { key: 'liveLink',     label: 'Live Demo URL', placeholder: 'https://...' },
              { key: 'videoDemoLink',label: 'Video Demo URL (optional)', placeholder: 'https://youtube.com/...' },
            ].map(({ key, label, placeholder }) => (
              <Field key={key} label={label}>
                <input
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  type="url"
                  className="input-field"
                />
              </Field>
            ))}
          </div>
        </div>

        {/* ─── Right: sidebar fields ────────────────────────────── */}
        <div className="space-y-5">
          {/* Image */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Thumbnail</h3>
            <Field label="Image URL">
              <input
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="input-field"
              />
            </Field>
            {/* Preview */}
            <div className="w-full h-36 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              {form.image ? (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
              ) : null}
              <div
                className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-2"
                style={{ display: form.image ? 'none' : 'flex' }}
              >
                <HiOutlinePhoto size={28} />
                <span className="text-xs">No image</span>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="glass rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Meta</h3>

            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="input-field cursor-pointer"
                style={{ appearance: 'none' }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} style={{ background: '#0a0a1a' }}>{c}</option>
                ))}
              </select>
            </Field>

            {/* Color picker */}
            <Field label="Accent Color">
              <div className="flex flex-wrap gap-2 mt-1">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set('color', c)}
                    className="w-7 h-7 rounded-lg transition-all duration-200 flex-shrink-0"
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
              <p className="mt-2 text-white/30 text-xs">Selected: <span style={{ color: form.color }}>{form.color}</span></p>
            </Field>

            {/* Featured toggle */}
            <Field label="Featured">
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                  form.featured ? 'shadow-glow' : ''
                }`}
                style={{
                  background: form.featured
                    ? 'linear-gradient(135deg,#6366f1,#a855f7)'
                    : 'rgba(255,255,255,0.1)',
                }}
                role="switch"
                aria-checked={form.featured}
              >
                <motion.span
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ left: form.featured ? '26px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <p className="text-white/40 text-xs mt-1.5">
                {form.featured ? 'Shown in featured section' : 'Not featured'}
              </p>
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
                  {mode === 'edit' ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <HiOutlinePlus size={16} />
                  {mode === 'edit' ? 'Update Project' : 'Create Project'}
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
