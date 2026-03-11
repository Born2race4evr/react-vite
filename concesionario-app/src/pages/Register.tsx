import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, type Role } from '../store/useAuthStore';
import './Auth.css';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { registerUser, registeredUsers, login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validación silenciosa de contraseñas
        if (password !== confirmPassword) {
            setError('FALLO DE SINCRONIZACIÓN: Las contraseñas no coinciden.');
            return;
        }

        // Verificación de piloto duplicado
        const userExists = registeredUsers.some(
            u => u.username.toLowerCase() === username.toLowerCase()
        );

        if (userExists) {
            setError('IDENTIFICACIÓN RECHAZADA: Ese nombre de piloto ya está en uso.');
            return;
        }

        // Expedimos la licencia con el rango de Novato ('rookie')
        const newUser = {
            username,
            password,
            role: 'rookie' as Role
        };

        registerUser(newUser);
        login(newUser); // Conectamos al usuario a los boxes inmediatamente

        // Redirección directa al inventario
        navigate('/');
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-container">
                <h1 className="auth-title">Motor<span>Sport</span></h1>
                <p className="auth-subtitle">Solicitud de Licencia de Piloto</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* El mensaje de error se muestra integrado en el cristal, sin ventanas emergentes */}
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="username">Identificación (Usuario)</label>
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
                        <label htmlFor="password">Código de Acceso (Contraseña)</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Código</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="auth-button-large">
                        OBTENER LICENCIA
                    </button>
                </form>

                <Link to="/login" className="auth-link">
                    ¿Ya eres miembro de la escudería? Entra en boxes
                </Link>
            </div>
        </div>
    );
};