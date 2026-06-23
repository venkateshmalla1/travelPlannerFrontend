import React, { useState } from 'react';
import { useTravel } from '../../context/TravelContext.js';
import { useAuth } from '../../context/AuthContext.js';
import MyTravels from '../MyTravels/MyTravels.js';
import TravelDetails from '../TravelDetails/TravelDxetails.js';
import Loader from '../../components/Common/Loader.js';

export default function Dashboard() {
  const { generateNewTrip, loading } = useTravel();
  const auth = useAuth();

  const [destination, setDestination] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(3);
  const [budgetCategory, setBudgetCategory] = useState('Medium');
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interestsOptions = ['Food', 'Culture', 'Adventure', 'Shopping', 'Beaches', 'Historical', 'Luxury'];

  const handleInterest = (interest) => {
    setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const handlePlanningSubmit = async (e) => {
  e.preventDefault();

  if (!destination || loading) return;

  try {
    await generateNewTrip(
      {
        destination,
        numberOfDays,
        budgetCategory,
        interests: selectedInterests
      },
      auth.token
    );

    setDestination('');
    setSelectedInterests([]);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="container-fluid px-4">
      <div className="row">
        <div className="col-xl-3 col-lg-4 mb-4 text-start">
          <div className="card shadow-sm border-0 p-3 bg-white">
            <h5 className="fw-bold mb-3 text-dark"><i className="bi bi-magic me-2 text-primary"></i>Plan New Trip</h5>
            <form onSubmit={handlePlanningSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Where to?</label>
                <input type="text" className="form-control" placeholder="Goa, Tokyo, Paris" value={destination} onChange={e => setDestination(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Duration (Days)</label>
                <input type="number" className="form-control" min="1" max="14" value={numberOfDays} onChange={e => setNumberOfDays(Number(e.target.value))} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Budget Preference</label>
                <select className="form-select" value={budgetCategory} onChange={e => setBudgetCategory(e.target.value)}>
                  <option value="Low">Low Budget</option>
                  <option value="Medium">Medium Budget</option>
                  <option value="High">High Budget</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Interests</label>
                <div className="d-flex flex-wrap gap-2">
                  {interestsOptions.map(opt => (
                    <button type="button" key={opt} className={`btn btn-sm py-1 px-2 ${selectedInterests.includes(opt) ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => handleInterest(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <button
  type="submit"
  className="btn btn-success w-100 fw-bold mt-2"
  disabled={loading}
>
  {loading ? 'Generating...' : 'Generate Plan'}
</button>
            </form>
          </div>
          <div className="mt-4">
            <MyTravels />
          </div>
        </div>

        <div className="col-xl-9 col-lg-8">
          {loading ? <Loader /> : <TravelDetails />}
        </div>
      </div>
    </div>
  );
}
