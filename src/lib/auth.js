export function getToken() {
  return typeof window === 'undefined' ? null : localStorage.getItem('token');
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

const USER_KEY = 'user';

export function setUser(user) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getRole() {
  const u = getUser();
  return u?.role ?? null;
}

