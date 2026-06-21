import React from 'react';
import { useAuth } from '../../context/AuthContext.js';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar shadow-sm">
      <div className="container py-1">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-airplane-engines-fill text-info"></i>
          <span>Travel Planner</span>
        </span>
        {isAuthenticated && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-light small">
              <i className="bi bi-person-circle me-1"></i> {user?.name}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}