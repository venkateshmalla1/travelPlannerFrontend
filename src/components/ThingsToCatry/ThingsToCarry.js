import React from 'react';

export default function ThingsToCarry({ carryLists }) {
  if (!carryLists) return null;

  return (
    <div className="card border-0 bg-light p-3">
      <h6 className="fw-bold mb-3"><i className="bi bi-backpack2-fill text-primary me-2"></i>Packing Checklist</h6>
      {Object.entries(carryLists).map(([category, items]) => (
        <div key={category} className="mb-2">
          <div className="text-uppercase font-bold text-dark text-xs small fw-bold text-muted">{category}</div>
          <ul className="list-unstyled ps-1 mb-2">
            {items?.slice(0, 3).map((item, idx) => (
              <li key={idx} className="small text-secondary text-truncate">
                <i className="bi bi-check-square text-success me-2"></i>{item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}