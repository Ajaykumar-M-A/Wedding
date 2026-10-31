import axios from 'axios';
import API_BASE from './config';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const invitationsAPI = {
  getAll: () => api.get('/invitations'),
  getOne: (id) => api.get(`/invitations/${id}`),
  getByToken: (token) => api.get(`/invitations/by-token/${token}`),
  create: (data) => api.post('/invitations', data),
  update: (id, data) => api.put(`/invitations/${id}`, data),
  delete: (id) => api.delete(`/invitations/${id}`),
};

export const photosAPI = {
  upload: (formData) => api.post('/photos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getUrl: (filename) => {
    if (!filename) return '';
    if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:') || filename.startsWith('blob:')) {
      return filename;
    }
    return `${API_BASE}/photos/${filename}`;
  },
};

export const guestsAPI = {
  submitRSVP: (token, data) => api.post(`/guests/rsvp/${token}`, data),
  getRSVPs: (invId) => api.get(`/guests/${invId}`),
};

export const templatesAPI = {
  getAll: () => api.get('/templates'),
  getOne: (id) => api.get(`/templates/${id}`),
};

export default api;
