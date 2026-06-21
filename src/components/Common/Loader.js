import React from 'react';

export default function Loader({ message = "Computing structural itinerary variants..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 w-100 text-center">
      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
      <h5 className="fw-bold text-secondary mb-1">{message}</h5>
      <p className="text-muted small">Talking securely to Gemini AI engine via backend...</p>
    </div>
  );
}