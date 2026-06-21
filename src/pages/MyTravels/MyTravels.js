import React, { useEffect } from 'react';
import { useTravel } from '../../context/TravelContext.js';
import { useAuth } from '../../context/AuthContext.js';
import TravelCard from '../../components/TravelCard/TravelCard.js';

export default function MyTravels() {
  const { trips = [], selectedTrip, setSelectedTrip, loadUserTrips } = useTravel();
  const { token } = useAuth();

  useEffect(() => {
    if (token) loadUserTrips(token);
  }, [token, loadUserTrips]);

  const safeTrips = Array.isArray(trips) ? trips : [];

  return (
    <div className="card shadow-sm border-0 p-3 bg-white text-start">
      <h6 className="fw-bold text-muted mb-3">
        <i className="bi bi-journals me-2"></i>Saved Dashboards
      </h6>
      <div className="row row-cols-1 g-3 max-vh-50 overflow-auto px-1">
        {safeTrips.length === 0 ? (
          <p className="text-muted small py-2">No itineraries cached yet.</p>
        ) : (
          safeTrips.map(t => (
            <div className="col" key={t._id}>
              <TravelCard
                trip={t}
                isSelected={selectedTrip?._id === t._id}
                onClick={() => setSelectedTrip(t)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
