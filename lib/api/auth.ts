import api from './client';

export async function loginUser(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return { user };
}

export async function signupUser(email: string, password: string, name: string) {
  const response = await api.post('/auth/register', { email, password, name });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return { user };
}

export async function checkSession() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await api.get('/auth/me');
    return { user: response.data };
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
}