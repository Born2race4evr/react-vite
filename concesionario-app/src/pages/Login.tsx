import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Auth.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, registeredUsers, registerUser } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const lowerUser = username.toLowerCase();

        // 1. GESTIÓN DEL ADMINISTRADOR MAESTRO
        if (lowerUser === 'admin' && password === 'admin') {
            const adminInList = registeredUsers.find(u => u.username.toLowerCase() === 'admin');

            if (!adminInList) {
                // Si es la primera vez, lo creamos de verdad en la base de datos
                const newAdmin = {
                    username: 'admin',
                    role: 'admin' as const,
                    password: 'admin',
                    avatar: '',
                    contactInfo: []
                };
                registerUser(newAdmin);
                login(newAdmin);
            } else {
                // Si ya existe, entramos con el de la lista (que ya tendrá su foto)
                login(adminInList);
            }
            navigate('/');
            return;
        }

        // 2. GESTIÓN DE PILOTOS NORMALES
        const user = registeredUsers.find(
            u => u.username.toLowerCase() === lowerUser && u.password === password
        );

        if (user) {
            login(user);
            navigate('/');
        } else {
            setError('IDENTIFICACIÓN FALLIDA: Piloto no reconocido.');
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
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Nombre de piloto"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="auth-button-large">Entrar</button>
                </form>
                <Link to="/register" className="auth-link">¿No tienes licencia? Regístrate aquí</Link>
            </div>
        </div>
    );
};