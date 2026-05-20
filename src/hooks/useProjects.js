import { useState, useEffect, useCallback } from 'react';
import { projectsApi } from '../services/api';

/**
 * Fetches projects from the backend API.
 * Supports category filtering and re-fetching.
 *
 * @param {string} category - 'All' | 'AI' | 'Full Stack' | 'Featured'
 */
export function useProjects(category = 'All') {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (category === 'Featured') params.featured = 'true';
      else if (category !== 'All') params.category = category;

      const data = await projectsApi.getAll(params);
      setProjects(data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}
