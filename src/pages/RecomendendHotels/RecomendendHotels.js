import React from 'react';
import PropTypes from 'prop-types';

const BUDGET_LABELS = {
  Low: 'Budget',
  Medium: 'Mid-range',
  High: 'Luxury',
};

export default function RecommendedHotels({ data = {} }) {
  const hotels = Array.isArray(data.recommendedHotels) ? data.recommendedHotels : [];
  const tripSummary = data.tripSummary || {};
  const budgetCategory = tripSummary.budgetCategory || 'Medium';
  const destination = tripSummary.destination || 'your destination';

  const icons = ['bi-buildings', 'bi-stars', 'bi-house-heart'];

  const bookingChecks = [
    'Compare location with your daily itinerary before booking.',
    'Confirm taxes, resort fees, and cancellation policy up front.',
    'Check the latest guest reviews for noise, cleanliness, and service.',
    'Prioritize free cancellation when your travel dates may shift.',
  ];

  const localTips = [
    'Stay close to the neighborhood you will spend the most time in.',
    'Look for breakfast or transit perks that reduce daily travel costs.',
    'Avoid booking solely by star rating; location usually matters more.',
  ];

  const badgeClass = (categoryKey) =>
    `badge rounded-pill px-3 py-2 ${budgetCategory === categoryKey ? 'text-bg-primary' : 'text-bg-light text-secondary'}`;

  return (
    <div className="container py-4 py-lg-5">
      <div className="row align-items-center g-4 mb-4">
        <div className="col-lg-7">
          <div className="badge rounded-pill text-bg-dark px-3 py-2 mb-3">Recommended stays</div>
          <h1 className="display-6 fw-bold text-dark mb-3">Hotels matched to how you travel.</h1>
          <p className="lead text-secondary mb-0">
            Use these curated hotel options in {destination} to pick the right base for your trip.
          </p>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-4 bg-warning-subtle text-warning-emphasis d-inline-flex align-items-center justify-content-center"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="bi bi-funnel-fill fs-5" />
              </div>
              <div>
                <h5 className="fw-bold mb-1">Trip Tier</h5>
                <p className="text-muted small mb-0">Matched base preference tailored for you.</p>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <span className={badgeClass('Low')}>{BUDGET_LABELS.Low}</span>
              <span className={badgeClass('Medium')}>{BUDGET_LABELS.Medium}</span>
              <span className={badgeClass('High')}>{BUDGET_LABELS.High}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {hotels.map((hotel, index) => {
          const key = hotel._id || hotel._id?.$oid || index;
          const cost = hotel.costPerNight ?? hotel.price ?? '—';
          return (
            <div className="col-md-6 col-xl-4" key={key}>
              <div className="card h-100 border-0 shadow-sm bg-white overflow-hidden">
                <div className="p-4 pb-3 border-bottom bg-light">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <div
                        className="rounded-4 bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-3"
                        style={{ width: '3rem', height: '3rem' }}
                      >
                        <i className={`bi ${icons[index % icons.length]} fs-5`} />
                      </div>
                      <h5 className="fw-bold text-dark mb-1">{hotel.name || 'Unnamed hotel'}</h5>
                      <p className="text-muted small mb-0">
                        From {cost}/night
                      </p>
                    </div>
                    <span className="badge rounded-pill text-bg-dark">{hotel.tier || BUDGET_LABELS[budgetCategory] || 'Tier'}</span>
                  </div>
                </div>

                <div className="card-body p-4">
                  <p className="text-secondary small mb-3"><strong>Area:</strong> {hotel.area || 'Unknown'}</p>
                  <ul className="list-unstyled mb-0 small text-dark">
                    {(hotel.amenities || []).map((amenity) => (
                      <li className="d-flex align-items-center gap-2 mb-2" key={amenity}>
                        <i className="bi bi-check2-circle text-success" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold mb-0">Before you book</h5>
              <span className="badge text-bg-warning">Smart booking</span>
            </div>
            <div className="row g-3">
              {bookingChecks.map((check) => (
                <div className="col-md-6" key={check}>
                  <div className="p-3 rounded-4 bg-light h-100 border">
                    <div className="d-flex align-items-start gap-2">
                      <i className="bi bi-shield-check text-primary mt-1" />
                      <p className="mb-0 small text-secondary">{check}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm bg-dark text-white p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-4 bg-white bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="bi bi-geo-alt-fill fs-5" />
              </div>
              <div>
                <h5 className="fw-bold mb-1">Local stay tips</h5>
                <p className="text-white-50 small mb-0">Small choices that make hotel selection more practical.</p>
              </div>
            </div>

            <div className="vstack gap-3">
              {localTips.map((tip) => (
                <div className="d-flex align-items-start gap-2" key={tip}>
                  <i className="bi bi-dot fs-3 lh-1 text-warning" />
                  <p className="mb-0 small text-white-50">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RecommendedHotels.propTypes = {
  data: PropTypes.object,
};
