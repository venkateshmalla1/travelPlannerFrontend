const API_BASE = (process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL || '') + '/api/auth';

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = body?.error || body?.message || 'Request failed.';
    const error = new Error(message);
    error.response = { data: { error: message } };
    throw error;
  }

  return body;
};

export const userService = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return parseResponse(res);
  },
  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return parseResponse(res);
  }
};