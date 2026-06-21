const API_BASE = (process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL || '') + '/api/trips';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = body?.error || body?.message || 'Request failed.';
    throw new Error(message);
  }

  return body;
};

export const tripService = {
  fetchTrips: async (token) => {
    const res = await fetch(API_BASE, { headers: getHeaders(token) });
    return parseResponse(res);
  },
  generateTrip: async (payload, token) => {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(payload),
    });
    return parseResponse(res);
  },
  modifyDay: async (id, payload, token) => {
    const res = await fetch(`${API_BASE}/${id}/modify-day`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(payload),
    });
    return parseResponse(res);
  }
};