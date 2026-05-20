import axios from 'axios';

/**
 * In dev: Vite proxies /api → http://localhost:5000/api (no CORS issues).
 * In prod: set VITE_API_URL to your deployed backend URL.
 */
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Normalize error messages from the backend response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Project endpoints ─────────────────────────────────────────────────────────
export const projectsApi = {
  getAll: (params = {}) =>
    api.get('/projects', { params }).then((r) => r.data),

  getById: (id) =>
    api.get(`/projects/${id}`).then((r) => r.data.data),

  create: (payload) =>
    api.post('/projects', payload).then((r) => r.data.data),

  update: (id, payload) =>
    api.put(`/projects/${id}`, payload).then((r) => r.data.data),

  remove: (id) =>
    api.delete(`/projects/${id}`).then((r) => r.data),
};

export default api;
