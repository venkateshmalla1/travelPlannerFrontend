import React from 'react';

export default function EmptyState({ title, description, icon = "bi-compass" }) {
  return (
    <div className="text-center p-5 card border-0 shadow-sm bg-white w-100">
      <i className={`bi ${icon} text-muted display-1`}></i>
      <h4 className="mt-3 fw-bold text-muted">{title}</h4>
      <p className="text-muted max-w-sm mx-auto small">{description}</p>
    </div>
  );
}