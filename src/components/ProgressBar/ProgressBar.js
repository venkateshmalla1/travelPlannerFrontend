import React from 'react';

export default function ProgressBar({ current, total, label = 'Trip Progression' }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const progressColor =
    percentage < 20 ? '#ef4444' :
    percentage < 40 ? '#f97316' :
    percentage < 60 ? '#eab308' :
    percentage < 80 ? '#3b82f6' :
    '#22c55e';

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between text-xs small text-muted mb-1">
        <span>{label}</span>
        <span>{percentage}% Complete</span>
      </div>
      <div className="progress" style={{ height: '6px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%`, backgroundColor: progressColor }}
        ></div>
      </div>
    </div>
  );
}