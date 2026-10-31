import { photosAPI } from '../api';

export function getPhotoUrl(filename) {
  if (!filename) return null;
  return photosAPI.getUrl(filename);
}

export function formatDate(d) {
  if (!d) return 'To Be Announced';
  try {
    return new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return d; }
}

export function formatTime(t) {
  if (!t) return '';
  try {
    const [h, m] = t.split(':');
    const date = new Date();
    date.setHours(+h, +m);
    return date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch { return t; }
}
