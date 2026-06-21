import React from 'react';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100) || 0;

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between text-xs small text-muted mb-1">
        <span>Trip Progression</span>
        <span>{percentage}% Complete</span>
      </div>
      <div className="progress" style={{ height: '6px' }}>
        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}