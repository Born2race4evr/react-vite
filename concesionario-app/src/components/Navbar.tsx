import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    // Estado para el cronómetro de telemetría (Reloj)
    const [currentTime, setCurrentTime] = useState(new Date());

    // Ciclo de actualización del reloj cada segundo
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Traductor de rangos para la interfaz
    const getRoleLabel = (role?: string) => {
        switch (role) {
            case 'admin': return 'DIRECTOR';
            case 'engineer': return 'INGENIERO';
            case 'pilot': return 'PILOTO';
            case 'rookie': return 'NOVATO';
            default: return 'DESCONOCIDO';
        }
    };

    // Formateo de hora de alta precisión
    const formattedTime = currentTime.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <nav className="navbar-container">
            {/* SECCIÓN 1: LOGOTIPO */}
            <div className="navbar-brand-section">
                <h2 className="navbar-brand">MOTOR<span>SPORT</span></h2>
            </div>

            {/* SECCIÓN 2: ENLACES DE NAVEGACIÓN */}
            <div className="navbar-links-section">
                <Link to="/" className="nav-link">Inventario</Link>
                <Link to="/admin" className="nav-link">Gestión Automotriz</Link>

                {/* Solo el Director puede acceder a la Central de Inteligencia de Usuarios */}
                {user?.role === 'admin' && (
                    <Link to="/admin/users" className="nav-link">Usuarios</Link>
                )}
            </div>

            {/* SECCIÓN 3: TELEMETRÍA Y PERFIL */}
            <div className="navbar-user-section">

                {/* RELOJ DIGITAL EN TIEMPO REAL */}
                <div className="live-clock">
                    <span className="clock-time">{formattedTime}</span>
                </div>

                {user && (
                    /* ACCESO AL PERFIL: Enlace directo a /profile */
                    <Link to="/profile" className="profile-link-wrapper">
                        <div className="welcome-container">
                            <div className="user-identity">
                                <span className="welcome-text">ID | </span>
                                <span className="username-highlight">{user.username.toUpperCase()}</span>
                            </div>
                            <div className={`user-rank role-text-${user.role}`}>
                                RANGO: {getRoleLabel(user.role)}
                            </div>
                        </div>

                        {/* MINI-AVATAR DE NAVEGACIÓN */}
                        <div className="nav-avatar-mini">
                            {user.avatar ? (
                                <img src={user.avatar} alt="Profile" className="nav-avatar-img" />
                            ) : (
                                <div className="nav-avatar-placeholder">{user.username[0].toUpperCase()}</div>
                            )}
                        </div>
                    </Link>
                )}

                {/* BOTÓN DE DESCONEXIÓN RÁPIDA */}
                <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="btn-logout-polygon"
                >
                    SALIR
                </button>
            </div>
        </nav>
    );
};