import React from 'react';
import { useAuth } from '../../context/AuthContext.js';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container py-4 text-start">
      <div className="card shadow-sm border-0 p-4 max-w-md bg-white">
        <h4 className="fw-bold text-dark mb-3">User Profile Context</h4>
        <div className="mb-2 small"><strong>Name Identifier:</strong> {user?.name}</div>
        <div className="mb-2 small"><strong>Email Handle:</strong> {user?.email}</div>
        <div className="badge bg-success align-self-start mt-2">Active Workspace Session</div>
      </div>
    </div>
  );
}