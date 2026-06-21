import React, { useEffect, useState } from 'react';
import { userService } from '../../services/UserServices.js';
import { useAuth } from '../../context/AuthContext.js';
import './Home.css';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  useEffect(() => {
    setError('');
    setPassword('');
    if (isLogin) {
      setName('');
    }
  }, [isLogin]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await userService.login(email, password);
        login(data.token, data.user);
      } else {
        const data = await userService.register(name, email, password);
        login(data.token, data.user);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication process failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container py-4 py-lg-5">
      <div className="row align-items-center g-4 g-lg-5 justify-content-center">
        <div className="col-lg-6">
          <div className="hero-panel text-white p-4 p-lg-5">
            <div className="hero-badge mb-4">Travel smarter, not harder</div>
            <h1 className="display-5 fw-bold mb-3">Plan cleaner itineraries in one place.</h1>
            <p className="lead mb-4 text-white-75">
              Save trips, generate day-by-day plans, and keep every travel detail in a single organized workspace.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="feature-pill"><i className="bi bi-calendar2-week me-2" />Trip planning</span>
              <span className="feature-pill"><i className="bi bi-compass me-2" />Destination ideas</span>
              <span className="feature-pill"><i className="bi bi-backpack2 me-2" />Packing lists</span>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-xl-4">
          <div className="auth-card">
            <div className="auth-card__body p-4 p-md-5 text-start">
              <div className="mb-4 text-center">
                <div className="brand-mark mb-3">
                  <i className="bi bi-airplane-engines-fill" />
                </div>
                <h3 className="fw-bold text-dark mb-2">
                  {isLogin ? 'Welcome back' : 'Create your account'}
                </h3>
                <p className="text-muted mb-0">
                  {isLogin ? 'Sign in to continue planning your next trip.' : 'Set up a profile to start saving travel plans.'}
                </p>
              </div>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}
              <form onSubmit={handleAuth}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-uppercase text-muted">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Alex Morgan"
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-uppercase text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-uppercase text-muted">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold py-3 auth-button" disabled={loading}>
                  {loading ? (
                    <span className="d-inline-flex align-items-center gap-2">
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      Please wait
                    </span>
                  ) : isLogin ? 'Access Dashboard' : 'Create Account'}
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  className="btn btn-link btn-sm text-decoration-none fw-semibold switch-mode"
                  onClick={() => setIsLogin((current) => !current)}
                  type="button"
                >
                  {isLogin ? 'Need a workspace profile? Sign up' : 'Already have an account? Log in'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}