import React, { useEffect, useState } from 'react';
import { useTravel } from '../../context/TravelContext.js';
import { useAuth } from '../../context/AuthContext.js';
import ThingsToCarry from '../../components/ThingsToCatry/ThingsToCarry.js';
import ProgressBar from '../../components/ProgressBar/ProgressBar.js';
import EmptyState from '../../components/Common/EmptyState.js';

export default function TravelDetails() {
  const { selectedTrip, modifyTripDay } = useTravel();
  const { token } = useAuth();
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [altering, setAltering] = useState(false);

  useEffect(() => {
    setActiveDayIdx(0);
  }, [selectedTrip?._id]);

  if (!selectedTrip) {
    return <EmptyState title="No Active Dashboard" description="Configure parameters on the left pane to calculate travel metrics." />;
  }

  const currentDayData = selectedTrip.dailyItinerary?.[activeDayIdx];

  const handleAlterAction = async (e) => {
    e.preventDefault();
    if (!instructions || !currentDayData) return;
    setAltering(true);
    try {
      await modifyTripDay(selectedTrip._id, { targetDay: currentDayData.day, changeInstructions: instructions }, token);
      setInstructions('');
    } finally {
      setAltering(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 bg-white text-start">
      <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark">{selectedTrip.tripSummary?.destination}</h2>
          <span className="badge bg-secondary me-2">{selectedTrip.tripSummary?.days} Days</span>
          <span className="badge bg-info">{selectedTrip.tripSummary?.budgetCategory} Tier</span>
        </div>
        <div className="text-end text-muted small">
          Best Season: <span className="fw-bold text-primary">{selectedTrip.tripSummary?.bestSeason}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 border-end">
          <div className="d-flex gap-2 overflow-auto pb-2 mb-3">
            {selectedTrip.dailyItinerary?.map((d, i) => (
              <button key={d.day} className={`btn btn-sm fw-bold px-3 ${i === activeDayIdx ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveDayIdx(i)}>
                Day {d.day}
              </button>
            ))}
          </div>

          <ProgressBar current={activeDayIdx + 1} total={selectedTrip.dailyItinerary?.length} />

          {currentDayData && (
            <div className="mt-3">
              <div className="p-3 bg-light rounded mb-2">
                <h6 className="fw-bold text-primary small"><i className="bi bi-brightness-high me-2"></i>Morning Activities</h6>
                <p className="mb-0 small text-secondary">{currentDayData.schedule?.morning}</p>
              </div>
              <div className="p-3 bg-light rounded mb-2">
                <h6 className="fw-bold text-warning small"><i className="bi bi-sun me-2"></i>Afternoon Activities</h6>
                <p className="mb-0 small text-secondary">{currentDayData.schedule?.afternoon}</p>
              </div>
              <div className="p-3 bg-light rounded mb-4">
                <h6 className="fw-bold text-dark small"><i className="bi bi-moon-stars me-2"></i>Evening Activities</h6>
                <p className="mb-0 small text-secondary">{currentDayData.schedule?.evening}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleAlterAction} className="d-flex gap-2 border-top pt-3 mt-4">
            <input type="text" className="form-control form-control-sm" placeholder="Modify this specific day node..." value={instructions} onChange={e => setInstructions(e.target.value)} required />
            <button type="submit" className="btn btn-sm btn-dark text-nowrap" disabled={altering}>Alter Day</button>
          </form>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card border bg-light p-3 mb-3">
            <h6 className="fw-bold text-dark mb-2 small">Budget Matrix</h6>
            <div className="d-flex justify-content-between text-xs border-bottom py-1 small"><span>Hotels:</span><strong>${selectedTrip.budgetBreakdown?.accommodation}</strong></div>
            <div className="d-flex justify-content-between text-xs border-bottom py-1 small"><span>Food:</span><strong>${selectedTrip.budgetBreakdown?.food}</strong></div>
            <div className="d-flex justify-content-between text-xs border-bottom py-1 small"><span>Activities:</span><strong>${selectedTrip.budgetBreakdown?.activities}</strong></div>
            <div className="d-flex justify-content-between pt-2 fw-bold text-success small"><span>Total Cost:</span><span>${selectedTrip.budgetBreakdown?.totalEstimatedBudget}</span></div>
          </div>
          <ThingsToCarry carryLists={selectedTrip.thingsToCarry} />
        </div>
      </div>
    </div>
  );
}
