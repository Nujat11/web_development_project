import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
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
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      const status = err.response?.status;
      const detail = err.response?.data?.detail;
      if (status === 401 || detail?.toLowerCase().includes('invalid')) {
        setError('Invalid credentials. Please check your email and password.');
      } else if (status === 404) {
        setError('No account found with this email address.');
      } else if (!err.response) {
        setError('Unable to connect to the server. Please try again.');
      } else {
        setError(detail || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-left-brand">💰 Expense Tracker</div>
          <h2>Take control of your <span>finances</span> today</h2>
          <p>Track every taka, understand your habits, and reach your financial goals with ease.</p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">📊</div>
              <div className="auth-feature-text">
                <strong>Visual Analytics</strong>
                Charts and insights at a glance
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">🔒</div>
              <div className="auth-feature-text">
                <strong>Secure & Private</strong>
                Your data stays yours
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">⚡</div>
              <div className="auth-feature-text">
                <strong>Real-time Tracking</strong>
                Instant updates on every transaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-box-header">
            <h1>Welcome back</h1>
            <p>Sign in to manage your expenses</p>
          </div>

          {error && (
            <div className="error-msg" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn-primary ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? '' : 'Sign In →'}
            </button>
          </form>

          <div className="auth-divider">or</div>
          <Link to="/register" className="auth-link">
            Don&apos;t have an account? <strong>Create one free</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
