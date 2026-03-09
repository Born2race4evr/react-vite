import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-brand-section">
                <h2 className="navbar-brand">
                    MOTOR<span>SPORT</span>
                </h2>
            </div>

            <div className="navbar-links-section">
                <Link to="/" className="nav-link">Inventario</Link>
                {user && <Link to="/admin" className="nav-link">Control</Link>}
            </div>

            {user && (
                <div className="navbar-user-section">
                    <div className="welcome-container">
                        <span className="welcome-text">BIENVENIDO |</span>
                        <span className="username-highlight">{user.username.toUpperCase()}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-logout-polygon">
                        SALIR
                    </button>
                </div>
            )}
        </nav>
    );
};