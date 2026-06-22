import React from 'react';
import PropTypes from 'prop-types';

export default function SafetyAndCautions({ data = {} }) {
  const safety = data.safetyAndCautionTips || {};
  const emergencyContacts = Array.isArray(safety.emergencyContacts) ? safety.emergencyContacts : [];
  const localScams = Array.isArray(safety.localScams) ? safety.localScams : [
    'Unlicensed transport or unofficial guides.',
    'Strangers offering to hold your phone or passport for you.',
    'Areas with no lighting, no people, or no clear exit route.',
  ];
  const weatherAndTerrain = Array.isArray(safety.weatherAndTerrain) ? safety.weatherAndTerrain : [];

  const cautionSections = [
    {
      title: 'Before you leave',
      icon: 'bi-airplane',
      tone: 'primary',
      points: [
        'Share your itinerary with a family member or friend.',
        'Keep digital and printed copies of ID, tickets, and insurance.',
        'Check visa, vaccination, and entry requirements before departure.',
      ],
    },
    {
      title: 'After arrival',
      icon: 'bi-geo-alt',
      tone: 'success',
      points: [
        'Save local emergency numbers and your hotel address on your phone.',
        'Confirm the safest route from the airport or station before traveling.',
        'Use official taxis, rideshare apps, or trusted transfer desks.',
      ],
    },
    {
      title: 'Out at night',
      icon: 'bi-moon-stars',
      tone: 'dark',
      points: [
        'Stay in well-lit areas and avoid isolated shortcuts.',
        'Travel with a charged phone and a small amount of local cash.',
        'Let someone know where you are going and when you plan to return.',
      ],
    },
  ];

  const smartHabits = [
    'Drink bottled or filtered water when local guidance recommends it.',
    'Keep valuables in a zipped bag or hotel safe when possible.',
    'Use a VPN or avoid public Wi-Fi for sensitive logins.',
    'Trust your instincts and move away from situations that feel wrong.',
  ];

  const redFlags = localScams;

  return (
    <div className="container py-4 py-lg-5">
      <div className="row g-4 align-items-center mb-4">
        <div className="col-lg-8">
          <div className="badge rounded-pill text-bg-danger px-3 py-2 mb-3">Safety first</div>
          <h1 className="display-6 fw-bold text-dark mb-3">Safety and cautions for smoother travel days.</h1>
          <p className="lead text-secondary mb-0">
            A few practical habits before, during, and after each trip can reduce risk and help you respond faster if something changes.
          </p>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-4 bg-danger-subtle text-danger d-inline-flex align-items-center justify-content-center"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="bi bi-bell-fill fs-5" />
              </div>
              <div>
                <h5 className="fw-bold mb-1">Emergency quick access</h5>
                <p className="text-muted small mb-0">Keep these contacts ready on your lock screen or notes app.</p>
              </div>
            </div>

            <div className="row g-2">
              {emergencyContacts.length > 0 ? (
                emergencyContacts.map((entry, i) => {
                  // If entry is "Label:Value" try to split, otherwise show as single line
                  const [label, value] = typeof entry === 'string' && entry.includes(':') ? entry.split(':').map(s => s.trim()) : [`Contact ${i + 1}`, entry];
                  return (
                    <div className="col-6" key={`${label}-${i}`}>
                      <div className="p-3 rounded-4 bg-light border h-100">
                        <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                          <i className="bi bi-shield-exclamation text-danger" />
                          <span className="small fw-semibold">{label}</span>
                        </div>
                        <div className="fw-bold fs-5">{value}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // fallback defaults
                <>
                  <div className="col-6">
                    <div className="p-3 rounded-4 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                        <i className="bi bi-shield-exclamation text-danger" />
                        <span className="small fw-semibold">Police</span>
                      </div>
                      <div className="fw-bold fs-5">112</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 rounded-4 bg-light border h-100">
                      <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                        <i className="bi bi-heart-pulse text-danger" />
                        <span className="small fw-semibold">Ambulance</span>
                      </div>
                      <div className="fw-bold fs-5">102</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {cautionSections.map((section) => (
          <div className="col-lg-4" key={section.title}>
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className={`card-header bg-${section.tone} text-white border-0 p-4`}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-4 bg-white bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                    style={{ width: '3rem', height: '3rem' }}
                  >
                    <i className={`bi ${section.icon} fs-5`} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{section.title}</h5>
                    <p className="mb-0 small text-white-50">Simple steps that lower travel stress.</p>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                <ul className="list-unstyled mb-0">
                  {section.points.map((point) => (
                    <li className="d-flex align-items-start gap-2 mb-3" key={point}>
                      <i className="bi bi-check2-circle text-success mt-1" />
                      <span className="small text-secondary">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold mb-0">Good travel habits</h5>
              <span className="badge text-bg-success">Low effort, high value</span>
            </div>
            <div className="row g-3">
              {smartHabits.map((habit) => (
                <div className="col-md-6" key={habit}>
                  <div className="p-3 rounded-4 bg-light border h-100">
                    <div className="d-flex align-items-start gap-2">
                      <i className="bi bi-shield-check text-primary mt-1" />
                      <p className="mb-0 small text-secondary">{habit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm bg-warning-subtle p-4 h-100">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-4 bg-white d-inline-flex align-items-center justify-content-center"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="bi bi-exclamation-triangle-fill text-warning fs-5" />
              </div>
              <div>
                <h5 className="fw-bold mb-1">Red flags to avoid</h5>
                <p className="text-muted small mb-0">If you spot these, slow down and verify before moving forward.</p>
              </div>
            </div>

            <div className="vstack gap-3">
              {redFlags.map((flag) => (
                <div className="d-flex align-items-start gap-2" key={flag}>
                  <i className="bi bi-x-circle-fill text-danger mt-1" />
                  <p className="mb-0 small text-dark">{flag}</p>
                </div>
              ))}
              {weatherAndTerrain.length > 0 && (
                <>
                  <hr />
                  <h6 className="mb-2">Weather & terrain notes</h6>
                  {weatherAndTerrain.map((note) => (
                    <div className="d-flex align-items-start gap-2" key={note}>
                      <i className="bi bi-info-circle text-dark mt-1" />
                      <p className="mb-0 small text-dark">{note}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SafetyAndCautions.propTypes = {
  data: PropTypes.object,
};
