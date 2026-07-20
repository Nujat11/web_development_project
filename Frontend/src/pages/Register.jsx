import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { dataService } from '../dataService';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await dataService.register(name, email, password);
      // Clean redirect to login as original
      navigate('/login');
    } catch (err) {
<<<<<<< Updated upstream
      const detail = err.response?.data?.detail;
      const status = err.response?.status;
      if (status === 409 || detail?.toLowerCase().includes('exist')) {
        setError('An account with this email already exists.');
      } else if (!err.response) {
        setError('Unable to connect to the server. Please try again.');
      } else {
        setError(detail || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
=======
      setError(err.message || err.response?.data?.detail || 'Registration failed');
>>>>>>> Stashed changes
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-left-brand">💰 Expense Tracker</div>
          <h2>Start your financial <span>journey</span> today</h2>
          <p>Join and get full control over your income and expenses with beautiful insights.</p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">💳</div>
              <div className="auth-feature-text">
                <strong>Track All Expenses</strong>
                Record and categorize every transaction
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">📈</div>
              <div className="auth-feature-text">
                <strong>Smart Summaries</strong>
                See where your money is going
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🎯</div>
              <div className="auth-feature-text">
                <strong>Stay on Budget</strong>
                Make informed financial decisions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-box-header">
            <h1>Create account</h1>
            <p>Free forever — no credit card required</p>
          </div>

          {error && (
            <div className="error-msg" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-glass-wrapper">
                <span className="input-glass-icon">👤</span>
                <input
                  id="name"
                  type="text"
                  className="input-glass"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-glass-wrapper">
                <span className="input-glass-icon">✉</span>
                <input
                  id="email"
                  type="email"
                  className="input-glass"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-glass-wrapper">
                <span className="input-glass-icon">🔑</span>
                <input
                  id="password"
                  type="password"
                  className="input-glass"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn-primary ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? '' : 'Create Account →'}
            </button>
          </form>

          <div className="auth-divider">or</div>
          <Link to="/login" className="auth-link">
            Already have an account? <strong>Sign in</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
