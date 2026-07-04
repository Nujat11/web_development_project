import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Expense Tracker</div>
      <button className="btn-danger" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
