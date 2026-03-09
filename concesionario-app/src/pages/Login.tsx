import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Auth.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, registeredUsers } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = registeredUsers.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            login(user); // Login directo sin avisos
            navigate('/');
        } else {
            setError('Credenciales incorrectas. Revisa tu usuario y contraseña.');
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-container">
                <h1 className="auth-title">Motor<span>Sport</span></h1>
                <p className="auth-subtitle">Acceso exclusivo a la plataforma</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Nombre de piloto"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="auth-button-large">
                        Entrar
                    </button>
                </form>

                <Link to="/register" className="auth-link">
                    ¿No tienes licencia? Regístrate aquí
                </Link>
            </div>
        </div>
    );
};