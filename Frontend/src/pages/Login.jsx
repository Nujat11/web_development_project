import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
    
    // Check for logout query param
    const params = new URLSearchParams(location.search);
    if (params.get('logout') === 'true') {
      setShowThankYou(true);
      // Clean up URL
      window.history.replaceState({}, document.title, "/login");
    }
  }, [navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-box">
        <h1 className="navbar-brand" style={{textAlign: "center", marginBottom: "15px", fontSize: "2.8rem", display: "block"}}>Expense Tracker</h1>
        
        {showThankYou && (
          <div className="success-msg" style={{textAlign: "center", padding: "15px", background: "rgba(46, 204, 113, 0.1)", color: "#2ecc71", borderRadius: "10px", marginBottom: "20px", border: "1px solid rgba(46, 204, 113, 0.2)"}}>
            ✨ Thank you for using Expense Tracker!
          </div>
        )}

        <h2 className="auth-title" style={{marginTop: 0, fontSize: "1.4rem", color: "#ccc", textAlign: "center", fontWeight: "300"}}>Sign in to manage your budget</h2>
        
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="input-glass"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="input-glass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{background: 'linear-gradient(45deg, #00d4ff, #090979)'}}>Sign In</button>
        </form>
        <Link to="/register" className="auth-link">Don't have an account? Register</Link>
      </div>
    </div>
  );
}

export default Login;
