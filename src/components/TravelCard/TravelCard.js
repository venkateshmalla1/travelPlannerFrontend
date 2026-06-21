import React from 'react';

export default function TravelCard({ trip, isSelected, onClick }) {
  return (
    <div 
      className={`card h-100 shadow-sm border-0 overflow-hidden text-start position-relative ${isSelected ? 'border border-primary border-2' : ''}`}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ height: '140px', overflow: 'hidden' }}>
        <img 
          src={trip.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"} 
          alt={trip.tripSummary?.destination} 
          className="w-100 h-100 object-fit-cover" 
        />
        <span className="position-absolute top-0 end-0 m-2 badge bg-dark">
          {trip.tripSummary?.budgetCategory}
        </span>
      </div>
      <div className="card-body p-3 d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-bold text-dark text-truncate mb-1">{trip.tripSummary?.destination}</h5>
          <p className="card-text text-muted small mb-2">
            <i className="bi bi-calendar3 text-primary me-1"></i> {trip.tripSummary?.days} Days Plan
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2 border-top pt-2">
          <span className="small fw-bold text-success">${trip.budgetBreakdown?.totalEstimatedBudget}</span>
          <span className="btn btn-xs btn-outline-primary py-0 px-2 fw-bold">Open</span>
        </div>
      </div>
    </div>
  );
}