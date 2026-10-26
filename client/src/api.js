const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export async function request(path, options = {}) {
  const token = localStorage.getItem('imovies_token');
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
}
