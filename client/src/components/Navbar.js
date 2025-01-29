import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🗓️ Terminplaner</Link>
      </div>
      
      {user ? (
        <div className="nav-links">
          <span>Hallo {user.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Registrieren</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;