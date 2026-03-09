import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Auth.css';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login, registerUser, registeredUsers } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (registeredUsers.some((u) => u.username === username)) {
            setError('Ese nombre de piloto ya está registrado.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const newUser = { username, password, role: 'user' as const };
        registerUser(newUser);
        login(newUser); // Registro y login automático e inmediato
        navigate('/');
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-container">
                <h1 className="auth-title">Crear <span>Cuenta</span></h1>
                <p className="auth-subtitle">Únete a la escudería MotorSport</p>

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
                            placeholder="Elige tu nombre"
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
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Repite tu contraseña"
                        />
                    </div>

                    <button type="submit" className="auth-button-large">
                        Registrarse
                    </button>
                </form>

                <Link to="/login" className="auth-link">
                    ¿Ya tienes cuenta? Inicia sesión
                </Link>
            </div>
        </div>
    );
};