import { useNavigate } from 'react-router-dom';
import { getStorageMode } from '../dataService';

function Navbar() {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const user = JSON.parse(localStorage.getItem('user') || '{}');
=======
  const mode = getStorageMode();
>>>>>>> Stashed changes

  const handleLogout = () => {
    // Clear user session, keep configuration
    localStorage.removeItem('user');
    navigate('/login?logout=true');
  };

  return (
    <nav className="navbar">
<<<<<<< Updated upstream
      <div className="navbar-brand">💰 Expense Tracker</div>
      <div className="navbar-right">
        {user?.name && (
          <div className="navbar-user">👋 {user.name}</div>
        )}
        <button className="btn-danger" onClick={handleLogout}>Logout</button>
=======
      <div className="navbar-brand">Expense Tracker</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ 
          fontSize: '0.85rem', 
          padding: '6px 12px', 
          borderRadius: '15px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: mode === 'local' ? '#00d4ff' : '#2ecc71',
          fontWeight: '600'
        }}>
          {mode === 'local' ? '🔒 Database-less: Browser Storage' : '🌐 Database-less: In-memory Server'}
        </span>
        <button className="btn-danger" style={{ padding: '8px 16px', borderRadius: '8px' }} onClick={handleLogout}>Logout</button>
>>>>>>> Stashed changes
      </div>
    </nav>
  );
}

export default Navbar;
