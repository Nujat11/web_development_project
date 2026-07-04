import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-box">
        <h1 className="navbar-brand" style={{textAlign: "center", marginBottom: "15px", fontSize: "2.8rem", display: "block"}}>Expense Tracker</h1>
        <h2 className="auth-title" style={{marginTop: 0, fontSize: "1.4rem", color: "#ccc", textAlign: "center", fontWeight: "300"}}>Join us to start tracking</h2>
        
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="input-glass"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn-primary" style={{background: 'linear-gradient(45deg, #00d4ff, #090979)'}}>Create Account</button>
        </form>
        <div style={{textAlign: "center", marginTop: "20px"}}>
          <span style={{color: "#aaa", fontSize: "0.9rem"}}>Already have an account? </span>
          <Link to="/login" className="auth-link" style={{display: "inline", color: "#00d4ff", fontWeight: "600"}}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
